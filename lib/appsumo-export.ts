import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import currencies from '@/data/currencies.json'

dayjs.extend(customParseFormat)

/**
 * Reads the purchase history AppSumo lets you export (Account → Products), in the browser:
 * the file never leaves the visitor's device. A copy of the parser in the Subly app
 * (subly-web lib/v2/import/appsumo.ts, without its AI vendor lookup), so a deal reads the same
 * here and after it is handed to the app. Keep the two in step.
 */

export const REFUND_DAYS = 60

/** "ADOBE *Creative Cloud" and "Adobe Creative Cloud" group together (subly-web lib/v2/import/detect.ts) */
export function merchantKey(name: string) {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\b(inc|llc|ltd|gmbh|sa|sl|bv|ab|as|aps|srl|spa|co|corp|com)\b/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

// ---------------------------------------------------------------- CSV

/** Counted over the first lines, since an export can start with a one-cell title */
function detectDelimiter(text: string) {
  const counts: Record<string, number> = { ',': 0, ';': 0, '\t': 0 }
  for (const line of text.split(/\r?\n/).filter(line => line.trim()).slice(0, 5)) {
    let inQuotes = false
    for (const char of line) {
      if (char === '"') inQuotes = !inQuotes
      else if (!inQuotes && char in counts) counts[char]++
    }
  }
  const [delimiter, count] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
  return count > 0 ? delimiter : ','
}

/** RFC 4180 style: quoted fields, doubled quotes, newlines inside quotes. */
export function parseCsv(input: string): string[][] {
  const text = input.replace(/^﻿/, '')
  const delimiter = detectDelimiter(text)
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false

  const endField = () => {
    row.push(field)
    field = ''
  }
  const endRow = () => {
    endField()
    if (row.some(cell => cell.trim())) rows.push(row)
    row = []
  }

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else inQuotes = false
      } else field += char
    } else if (char === '"' && !field) inQuotes = true
    else if (char === delimiter) endField()
    else if (char === '\n') endRow()
    else if (char === '\r') {
      if (text[i + 1] === '\n') i++
      endRow()
    } else field += char
  }
  if (field || row.length) endRow()
  return rows
}

// ---------------------------------------------------------------- columns

type Field = 'name' | 'plan' | 'amount' | 'currency' | 'date' | 'status' | 'url' | 'code' | 'orderId' | 'refundDate' | 'transferDate'

const FIELD_ORDER: Field[] = ['name', 'date', 'amount', 'currency', 'status', 'url', 'code', 'plan', 'orderId', 'refundDate', 'transferDate']

const SYNONYMS: Record<Field, string[]> = {
  name: ['product', 'productname', 'producttitle', 'name', 'title', 'deal', 'dealname', 'dealtitle', 'item', 'itemname', 'tool', 'software', 'app', 'appname'],
  plan: ['plan', 'planname', 'plantier', 'tier', 'tiername', 'licensetier', 'licensetype', 'package', 'option', 'variant', 'sku', 'dealplan'],
  amount: ['price', 'amount', 'cost', 'total', 'paid', 'amountpaid', 'pricepaid', 'purchaseprice', 'orderamount', 'ordertotal', 'charged', 'amountcharged', 'amountusd', 'priceusd', 'amounts'],
  currency: ['currency', 'currencycode', 'cur'],
  date: ['date', 'dates', 'purchasedate', 'purchaseddate', 'purchasedon', 'orderdate', 'dateofpurchase', 'datepurchased', 'boughton', 'created', 'createdat', 'createdon', 'paidon', 'paiddate', 'transactiondate', 'initialpaymentdate'],
  status: ['status', 'state', 'orderstatus', 'paymentstatus', 'refundstatus', 'refunded', 'details'],
  url: ['url', 'website', 'link', 'producturl', 'dealurl', 'dealpage', 'productlink', 'productwebsite', 'site', 'homepage', 'weburl'],
  code: ['code', 'codes', 'licensecode', 'redemptioncode', 'couponcode', 'activationcode', 'licensekey', 'key'],
  refundDate: ['refunddate', 'refundedon', 'refundedat', 'dateofrefund', 'daterefunded'],
  transferDate: ['transferdate', 'transferredon', 'transferredat', 'dateoftransfer', 'datetransferred'],
  orderId: ['orderid', 'order', 'ordernumber', 'orderno', 'ordernum', 'invoice', 'invoiceid', 'invoicenumber', 'receipt', 'transactionid', 'id', 'uuid']
}

// For headers no synonym matched exactly, e.g. "Date purchased (UTC)"
const LOOSE: [Field, RegExp][] = [
  ['refundDate', /refund.*date|date.*refund/],
  ['transferDate', /transfer.*date|date.*transfer/],
  ['date', /date|purchased|bought/],
  ['amount', /price|amount|cost|total|paid/],
  ['status', /status|refund/],
  ['url', /url|link|website/],
  ['code', /code|key/],
  ['plan', /plan|tier|licen/],
  ['name', /product|deal|title|name/]
]

const normaliseHeader = (header: string) => header.toLowerCase().replace(/[^a-z0-9]+/g, '')

export function mapColumns(header: string[]): Partial<Record<Field, number>> {
  const normalised = header.map(normaliseHeader)
  const columns: Partial<Record<Field, number>> = {}
  const taken = new Set<number>()

  for (const field of FIELD_ORDER) {
    const index = normalised.findIndex((value, i) => !taken.has(i) && SYNONYMS[field].includes(value))
    if (index >= 0) {
      columns[field] = index
      taken.add(index)
    }
  }
  for (const [field, pattern] of LOOSE) {
    if (columns[field] !== undefined) continue
    const index = normalised.findIndex((value, i) => !taken.has(i) && pattern.test(value))
    if (index >= 0) {
      columns[field] = index
      taken.add(index)
    }
  }
  return columns
}

// ---------------------------------------------------------------- values

const CURRENCY_CODES = new Set(Object.keys((currencies as { data: Record<string, unknown> }).data))

// Longest first, so "US$" wins over "$"
const SYMBOLS: [string, string][] = [
  ['US$', 'USD'],
  ['CA$', 'CAD'],
  ['AU$', 'AUD'],
  ['NZ$', 'NZD'],
  ['C$', 'CAD'],
  ['A$', 'AUD'],
  ['R$', 'BRL'],
  ['€', 'EUR'],
  ['£', 'GBP'],
  ['₹', 'INR'],
  ['¥', 'JPY'],
  ['$', 'USD']
]

function normaliseNumber(raw: string) {
  const lastComma = raw.lastIndexOf(',')
  const lastDot = raw.lastIndexOf('.')
  let decimal: ',' | '.' | null = null
  if (lastComma > -1 && lastDot > -1) decimal = lastComma > lastDot ? ',' : '.'
  else if (lastComma > -1) decimal = raw.split(',').length === 2 && /,\d{1,2}$/.test(raw) ? ',' : null
  else if (lastDot > -1) decimal = raw.split('.').length === 2 ? '.' : null
  const digits = raw.replace(/[^\d.,]/g, '')
  const value = decimal
    ? digits.replace(decimal === ',' ? /\./g : /,/g, '').replace(decimal, '.')
    : digits.replace(/[.,]/g, '')
  return Number(value)
}

/** "$59", "59.00 USD", "USD 59", "€49,00", "1,299.00", "-$59", "(59.00)" */
export function parseAmount(text: string): { amount: number; currency: string | null; negative: boolean } | null {
  const value = text.trim()
  const number = value.match(/\d[\d.,' ]*\d|\d/)
  if (!number) return /^(free|gratis)$/i.test(value) ? { amount: 0, currency: null, negative: false } : null
  const amount = normaliseNumber(number[0].replace(/['\s]/g, ''))
  if (!Number.isFinite(amount)) return null

  const negative = /^\(.*\)$/.test(value) || /(^|[^\w])-\s*\D?\s*\d/.test(value) || /\d\s*-$/.test(value)
  const code = Array.from(value.matchAll(/(?:^|[^A-Za-z])([A-Za-z]{3})(?![A-Za-z])/g))
    .map(match => match[1].toUpperCase())
    .find(candidate => CURRENCY_CODES.has(candidate))
  const symbol = SYMBOLS.find(([sign]) => value.includes(sign))
  return { amount: Math.abs(amount), currency: code ?? symbol?.[1] ?? null, negative }
}

const NUMERIC_DATE = /^(\d{1,2})[./-](\d{1,2})[./-](\d{2,4})/
const NUMERIC_FORMATS = {
  mdy: ['MM/DD/YYYY', 'M/D/YYYY', 'MM.DD.YYYY', 'M.D.YYYY', 'MM-DD-YYYY', 'M-D-YYYY', 'MM/DD/YY', 'M/D/YY', 'MM.DD.YY', 'M.D.YY'],
  dmy: ['DD/MM/YYYY', 'D/M/YYYY', 'DD.MM.YYYY', 'D.M.YYYY', 'DD-MM-YYYY', 'D-M-YYYY', 'DD/MM/YY', 'D/M/YY', 'DD.MM.YY', 'D.M.YY']
}
const OTHER_FORMATS = [
  'YYYY-MM-DD',
  'YYYY/MM/DD',
  'YYYY.MM.DD',
  'MMM D, YYYY',
  'MMMM D, YYYY',
  'MMM DD, YYYY',
  'MMMM DD, YYYY',
  'MMM D YYYY',
  'MMMM D YYYY',
  'MMM DD YYYY',
  'MMMM DD YYYY',
  'D MMM YYYY',
  'D MMMM YYYY',
  'DD MMM YYYY',
  'DD MMMM YYYY',
  'D MMM, YYYY',
  'D MMMM, YYYY',
  'DD MMM, YYYY',
  'DD MMMM, YYYY'
]

/** 03/04/2023 is March 4th unless some date in the file can only be day-first */
export function detectDayFirst(values: string[]) {
  let dayFirst = false
  let monthFirst = false
  for (const value of values) {
    const match = value.trim().match(NUMERIC_DATE)
    if (!match) continue
    if (Number(match[1]) > 12) dayFirst = true
    if (Number(match[2]) > 12) monthFirst = true
  }
  return dayFirst && !monthFirst
}

/** Returns YYYY-MM-DD, or null when the text isn't a plausible purchase date. */
export function parseDate(text: string, dayFirst = false): string | null {
  let value = text
    .trim()
    .replace(/(\d)(st|nd|rd|th)\b/gi, '$1')
    .replace(/\s+/g, ' ')
  if (!value) return null

  const iso = value.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ].*)?$/)
  if (iso) value = `${iso[1]}-${iso[2]}-${iso[3]}`
  else {
    value = value
      .replace(/[ T]\d{1,2}:\d{2}(?::\d{2})?(?:\.\d+)?\s*(?:am|pm)?\s*(?:z|utc|gmt|[+-]\d{2}:?\d{2})?$/i, '')
      .replace(/\b([A-Za-z])([A-Za-z]{2,})\b/g, (_, first: string, rest: string) => first.toUpperCase() + rest.toLowerCase())
      .replace(/\bSept\b/, 'Sep')
      .replace(/,(?=\S)/g, ', ')
  }

  const parsed = dayjs(value, [...NUMERIC_FORMATS[dayFirst ? 'dmy' : 'mdy'], ...OTHER_FORMATS], true)
  if (!parsed.isValid()) return null
  const year = parsed.year()
  if (year < 2000 || year > dayjs().year() + 1) return null
  return parsed.format('YYYY-MM-DD')
}

const REFUNDED = /refund|chargeback|cancel|revers|return/i
const TRUTHY = /^(yes|true|y|1)$/i

/** AppSumo wording around deals: "Product - Lifetime Deal", "Product (LTD)" */
export function cleanProductName(raw: string) {
  return raw
    .replace(/\s+/g, ' ')
    .replace(/\s*[-–—|:]\s*(a\s+)?lifetime\s+(deal|access|license|licence)\b.*$/i, '')
    .replace(/\s*\((lifetime\s+)?(deal|ltd)\)\s*$/i, '')
    .trim()
}

export function websiteDomain(value: string | null | undefined) {
  const domain = String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/[/?#].*$/, '')
  return /^[a-z0-9][a-z0-9-]*(\.[a-z0-9-]+)+$/.test(domain) ? domain : null
}

/** Deal pages on appsumo.com say nothing about the vendor's own site */
const vendorDomain = (value: string | null | undefined) => {
  const domain = websiteDomain(value)
  return domain && !/(^|\.)appsumo\.com$/.test(domain) ? domain : null
}

/** A bundle row lists its codes in one cell, split by | ; or new lines (trailing separators happen) */
export function splitCodes(value: string) {
  return value
    .split(/[|;\n\r]+/)
    .map(code => code.trim().replace(/^[\s,]+|[\s,]+$/g, ''))
    .filter(Boolean)
}

const NOT_A_TOOL_PLAN = /digital\s+download|physical|merch|shipping|swag/i
/** AppSumo's own membership; once it has expired there is nothing left to track */
const APPSUMO_PLUS = /^appsumo\s*plus\b/i
const NOT_A_TOOL_NAME =
  /^how\s+(to|i|we)\b|^how\s.{0,50}\b(does|do|did)\b|\bstickers?\b|marketing\s+plan|\bplaybook\b|\be-?books?\b|\bswipe\s+files?\b|\bcheat\s?sheets?\b|\bmasterclass\b|\bwebinar\b|\bworkshop\b|\btemplate\s+(pack|bundle)\b/i

/** Guides, downloads and merchandise sold on AppSumo: there is nothing to cancel or renew */
export function isNotATool(name: string, plan: string | null) {
  return NOT_A_TOOL_NAME.test(name) || (!!plan && NOT_A_TOOL_PLAN.test(plan))
}

// ---------------------------------------------------------------- parsing

export type ParsedPurchase = {
  /** 1-based line in the file, for error messages */
  line: number
  rawName: string
  name: string
  plan: string | null
  code: string | null
  /** Every code on the row: a bundle lists several in one cell */
  codes: string[]
  orderId: string | null
  amount: number
  /** What the first purchase cost, kept for the asuid when purchases of one product are merged */
  firstAmount?: number
  /** How many purchases of this product this stands for (more than one after merging) */
  purchases?: number
  currency: string
  /** YYYY-MM-DD */
  purchasedOn: string
  refunded: boolean
  /** AppSumo's Status says `expired`: bought, but the code or the access has run out */
  ended: boolean
  /** Every purchase date this stands for, so an earlier import of any one of them is recognised */
  dates?: string[]
  /** Vendor domain given in the file, when it isn't an appsumo.com page */
  website: string | null
}

/**
 * Rows that are valid but not a deal to track: `not_a_tool` is a download, a sticker order or a marketing plan,
 * `transferred` was handed to someone else, `refunded` was given back, and `expired` is an AppSumo Plus membership that
 * ran out (AppSumo's own, not a tool). Otherwise AppSumo's Status is never a reason: `redeemed` is a code used at the
 * vendor (the deal is in use) and any other expired deal is added as ended. `redeemed` stays in the type because reads
 * stored before November 2026 carry it.
 */
export type SkipReason = 'expired' | 'redeemed' | 'not_a_tool' | 'transferred' | 'refunded'
export type SkippedRow = { line: number; name: string; reason: SkipReason }

export type ParsedExport = {
  purchases: ParsedPurchase[]
  /** Rows that were read but are not added as active lifetime deals, with the reason */
  skipped: SkippedRow[]
  /** Rows we could not use, with the reason */
  invalid: { line: number; reason: 'missing_name' | 'invalid_date' }[]
  duplicates: number
  /** Set when the file has no column we can use */
  error: 'no_columns' | null
}

const cell = (row: string[], index: number | undefined) => (index === undefined ? '' : (row[index] ?? '').trim())

export function parseAppsumoExport(csv: string): ParsedExport {
  const rows = parseCsv(csv)
  const empty = (error: ParsedExport['error']): ParsedExport => ({ purchases: [], skipped: [], invalid: [], duplicates: 0, error })

  // The header is normally the first line, but exports sometimes start with a title
  let headerIndex = -1
  let columns: Partial<Record<Field, number>> = {}
  for (let i = 0; i < Math.min(rows.length, 5); i++) {
    const found = mapColumns(rows[i])
    if (found.name !== undefined && found.date !== undefined) {
      headerIndex = i
      columns = found
      break
    }
  }
  if (headerIndex < 0) return empty('no_columns')

  const body = rows.slice(headerIndex + 1)
  const dayFirst = detectDayFirst(body.map(row => cell(row, columns.date)))
  const statusHeader = normaliseHeader(rows[headerIndex][columns.status ?? -1] ?? '')

  const invalid: ParsedExport['invalid'] = []
  const skipped: SkippedRow[] = []
  const negatives: ParsedPurchase[] = []
  const seen = new Map<string, ParsedPurchase>()
  let duplicates = 0

  body.forEach((row, offset) => {
    const line = headerIndex + offset + 2
    const rawName = cell(row, columns.name)
    const name = cleanProductName(rawName)
    if (!name) return invalid.push({ line, reason: 'missing_name' })
    const purchasedOn = parseDate(cell(row, columns.date), dayFirst)
    if (!purchasedOn) return invalid.push({ line, reason: 'invalid_date' })

    const money = parseAmount(cell(row, columns.amount))
    const explicitCurrency = cell(row, columns.currency).toUpperCase()
    const status = cell(row, columns.status)
    const codes = splitCodes(cell(row, columns.code))
    const purchase: ParsedPurchase = {
      line,
      rawName,
      name,
      plan: cell(row, columns.plan) || null,
      code: codes[0] ?? null,
      codes,
      orderId: cell(row, columns.orderId) || null,
      amount: money?.amount ?? 0,
      // AppSumo charges in US dollars
      currency: (CURRENCY_CODES.has(explicitCurrency) ? explicitCurrency : money?.currency) || 'USD',
      purchasedOn,
      refunded:
        statusHeader === 'refunded' ? TRUTHY.test(status) : REFUNDED.test(status) || !!cell(row, columns.refundDate),
      ended: /^expired$/i.test(status),
      website: vendorDomain(cell(row, columns.url))
    }

    // Read but not a deal of the person's: kept apart so the review can say what was left out
    const reason: SkipReason | null = isNotATool(name, purchase.plan) ? 'not_a_tool' : cell(row, columns.transferDate) ? 'transferred' : null
    if (reason) return skipped.push({ line, name, reason })

    // A negative amount is a refund line, matched to its purchase below
    if (money?.negative) return negatives.push(purchase)
    if (purchase.ended && !purchase.refunded && APPSUMO_PLUS.test(name)) return skipped.push({ line, name, reason: 'expired' })

    // The same row twice in a file is one purchase. Another order id or another code is another purchase: AppSumo's own
    // export has neither a price nor an order id, so a deal stacked the same day differs only by its code
    const key = [purchase.purchasedOn, merchantKey(purchase.name), purchase.amount, purchase.orderId ?? '', purchase.codes.join('|')].join('|')
    const earlier = seen.get(key)
    if (earlier) {
      earlier.refunded ||= purchase.refunded
      earlier.ended &&= purchase.ended
      earlier.code ||= purchase.code
      earlier.codes = Array.from(new Set([...earlier.codes, ...purchase.codes]))
      earlier.plan ||= purchase.plan
      duplicates++
      return
    }
    seen.set(key, purchase)
  })

  const all = Array.from(seen.values())
  for (const refund of negatives) {
    const original = all.find(p => !p.refunded && merchantKey(p.name) === merchantKey(refund.name) && p.amount === refund.amount)
    if (original) original.refunded = true
    // A refund whose purchase isn't in this file still tells us the deal was returned
    else all.push({ ...refund, refunded: true })
  }
  // A refunded deal was given back: left out, with the reason, once duplicates and refund lines are settled
  const purchases = all.filter(purchase => !purchase.refunded).sort((a, b) => a.line - b.line)
  for (const purchase of all) if (purchase.refunded) skipped.push({ line: purchase.line, name: purchase.name, reason: 'refunded' })
  skipped.sort((a, b) => a.line - b.line)

  return { purchases, skipped, invalid, duplicates, error: null }
}

