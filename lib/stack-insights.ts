import type { Finding, PreviewSignal } from '@/components/tools/report'
import { type Line, cost, money, usablePlans } from '@/lib/stack-link'
import { TOOLS_BY_ID } from '@/lib/tool-prices'

/**
 * What a stack tells you once it is added up: tools that do the same job, things a suite you
 * already pay for includes, what yearly billing would save, what each new person costs, and the
 * biggest line. Only facts about the stack itself; nothing here guesses usage.
 */

/** Tools that do the same job. Teams often pay for two after a switch that never finished. */
const JOBS: { job: string; ids: string[] }[] = [
  { job: 'email and documents', ids: ['google-workspace', 'microsoft-365'] },
  { job: 'team chat', ids: ['slack', 'microsoft-teams'] },
  { job: 'projects and tasks', ids: ['asana', 'trello', 'clickup', 'monday', 'linear', 'jira'] },
  { job: 'passwords', ids: ['1password', 'bitwarden'] },
  { job: 'file storage', ids: ['dropbox', 'box'] },
  { job: 'accounting', ids: ['quickbooks-online', 'xero', 'freshbooks'] },
  { job: 'e-signatures', ids: ['docusign', 'pandadoc'] },
  { job: 'customer support', ids: ['intercom', 'zendesk', 'help-scout'] },
  { job: 'forms', ids: ['typeform', 'tally'] },
  { job: 'automation', ids: ['zapier', 'make'] },
  { job: 'SEO research', ids: ['ahrefs', 'semrush'] },
  { job: 'your website', ids: ['webflow', 'framer', 'squarespace', 'wix', 'wordpress-com'] },
  { job: 'booking calls', ids: ['calendly', 'cal-com'] },
  { job: 'time tracking', ids: ['toggl-track', 'harvest'] },
  { job: 'hosting', ids: ['vercel', 'netlify'] },
  { job: 'code hosting', ids: ['github', 'gitlab'] },
  { job: 'email marketing', ids: ['mailchimp', 'kit'] },
  { job: 'AI chat', ids: ['chatgpt', 'claude'] },
]

/** A suite that already covers a job another tool on the list is paid for */
const INCLUDED: { suite: string; tool: string; what: string }[] = [
  { suite: 'google-workspace', tool: 'zoom', what: 'Google Workspace includes Google Meet for video calls' },
  { suite: 'microsoft-365', tool: 'zoom', what: 'Microsoft 365 business plans include Teams meetings' },
  { suite: 'microsoft-365', tool: 'microsoft-teams', what: 'Microsoft 365 business plans include Teams' },
  { suite: 'google-workspace', tool: 'dropbox', what: 'Google Workspace includes Google Drive storage' },
  { suite: 'google-workspace', tool: 'box', what: 'Google Workspace includes Google Drive storage' },
  { suite: 'microsoft-365', tool: 'dropbox', what: 'Microsoft 365 includes OneDrive storage' },
  { suite: 'microsoft-365', tool: 'box', what: 'Microsoft 365 includes OneDrive storage' },
]

const list = (names: string[]) => (names.length <= 2 ? names.join(' and ') : `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`)

export type StackInsight = { findings: Finding[]; signals: PreviewSignal[]; savingsYear: number }

export function stackInsights(lines: Line[], team: number): StackInsight {
  const priced = lines.map((line) => ({ line, ...cost(line), tool: 'id' in line ? TOOLS_BY_ID[line.id] : undefined }))
  const total = priced.reduce((sum, p) => sum + p.monthly, 0)
  const byId = new Map(priced.filter((p) => p.tool).map((p) => [p.tool!.id, p]))
  const findings: Finding[] = []
  const signals: PreviewSignal[] = []
  let savingsYear = 0

  // Two tools for one job
  for (const { job, ids } of JOBS) {
    const both = ids.map((id) => byId.get(id)).filter((p): p is NonNullable<typeof p> => !!p && p.monthly > 0)
    if (both.length < 2) continue
    const names = both.map((p) => p.tool!.name)
    const kept = Math.max(...both.map((p) => p.monthly))
    const extra = both.reduce((sum, p) => sum + p.monthly, 0) - kept
    savingsYear += extra * 12
    findings.push({
      kind: 'overlap',
      title: `Two tools for ${job}`,
      body: `${list(names)} do the same job. Keeping only the bigger one would save about ${money(extra * 12)} a year.`,
      amount: `${money(extra * 12)}/yr`,
    })
    signals.push({ title: `${list(names)} both do ${job}`, body: `Is anyone still using ${both[both.length - 1].tool!.name}?`, website: both[both.length - 1].tool!.website, tone: 'attention' })
  }

  // Paid twice: a suite already includes it
  for (const { suite, tool, what } of INCLUDED) {
    const s = byId.get(suite)
    const t = byId.get(tool)
    if (!s || !t || t.monthly <= 0 || findings.some((f) => f.body.includes(t.tool!.name) && f.kind === 'overlap')) continue
    savingsYear += t.monthly * 12
    findings.push({ kind: 'overlap', title: `${t.tool!.name} may be paid twice`, body: `${what}. Check whether the team still needs ${t.tool!.name}.`, amount: `${money(t.monthly * 12)}/yr` })
    signals.push({ title: `${t.tool!.name} may be paid twice`, body: `${what}.`, website: t.tool!.website, tone: 'attention' })
  }

  // Monthly plans that are cheaper yearly
  const yearly = priced.filter((p) => p.saving > 0).sort((a, b) => b.saving - a.saving)
  const yearlySaving = yearly.reduce((sum, p) => sum + p.saving, 0)
  if (yearlySaving >= 12) {
    savingsYear += yearlySaving
    const names = yearly.slice(0, 3).map((p) => p.tool!.name)
    findings.push({
      kind: 'save',
      title: 'Cheaper on yearly billing',
      body: `${yearly.length > 3 ? `${names.join(', ')} and ${yearly.length - 3} more` : list(names)} ${yearly.length === 1 ? 'costs' : 'cost'} less a month billed yearly. Switch the ones you are sure to keep.`,
      amount: `${money(yearlySaving)}/yr`,
    })
    const top = yearly[0]
    signals.push({ title: `${top.tool!.name} is cheaper yearly`, body: `Paying yearly would save ${money(top.saving)} a year.`, website: top.tool!.website })
  }

  // What one more person costs
  const perSeat = priced.filter((p) => {
    if (!p.tool || !('plan' in p.line)) return false
    const plan = usablePlans(p.tool)[p.line.plan]
    return plan?.perSeat && p.monthly > 0
  })
  if (perSeat.length >= 2) {
    const perPerson = perSeat.reduce((sum, p) => sum + p.monthly / Math.max(1, 'seats' in p.line ? p.line.seats : 1), 0)
    findings.push({
      kind: 'people',
      title: `Each new person adds ${money(perPerson)} a month`,
      body: `${perSeat.length} of your tools charge per seat. When someone leaves, remove their seats before the next renewal.`,
      amount: `${money(perPerson * 12)}/yr`,
    })
  }

  // The biggest line
  const biggest = [...priced].sort((a, b) => b.monthly - a.monthly)[0]
  if (biggest && total > 0 && priced.length >= 3 && biggest.monthly / total >= 0.25) {
    const name = biggest.tool?.name ?? ('custom' in biggest.line ? biggest.line.custom : '')
    findings.push({
      kind: 'info',
      title: `${name} is ${Math.round((biggest.monthly / total) * 100)}% of the total`,
      body: `${money(biggest.monthly * 12)} a year. Make sure someone owns it and decides before it renews.`,
    })
    signals.push({ title: `${name} is your biggest tool`, body: `${money(biggest.monthly)} a month, about ${money(biggest.monthly * 12)} a year. Who owns it?`, website: biggest.tool?.website })
  }

  if (team > 0 && total > 0 && !findings.some((f) => f.kind === 'people')) {
    findings.push({ kind: 'people', title: `${money(total / team)} a month per person`, body: `Across ${team} ${team === 1 ? 'person' : 'people'}. A useful number when you hire or budget.` })
  }

  return { findings, signals, savingsYear }
}
