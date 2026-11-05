---
title: 'Subscription tracker spreadsheet: free template and how to use it'
description: 'A free subscription tracker template for Google Sheets or Excel, with the columns to keep, formulas for yearly cost and days to renewal, and when to move on.'
lede: 'Download a ready-made CSV, add three formulas, and you have a subscription tracker that shows what you pay a year and what renews next. Plus an honest look at where a spreadsheet stops being enough.'
slug: 'subscription-tracker-spreadsheet'
status: 'published'
category: 'Subscriptions'
tags: ['subscriptions', 'spreadsheet', 'template', 'google sheets', 'excel']
author: 'emilio'
publishedAt: '2026-11-04T10:00:00.000Z'
summary:
  - 'A useful subscription tracker needs ten columns: name, category, owner, amount, currency, billing cycle, next renewal, payment method, cancel-by date and notes.'
  - 'Add three formulas: a yearly total, a monthly equivalent, and days until renewal, so a $191.88 yearly plan and a $15.99 monthly one compare at a glance.'
  - 'Sort by days to renewal and color anything under 30 days; that one view prevents most surprise charges.'
  - 'Keep it current with a 15-minute monthly check against your card and bank statements.'
  - 'A spreadsheet stops working when you have to find every charge yourself, nobody gets an alert, price rises slip by, or several people and currencies are involved.'
faq:
  - q: 'Is there a free subscription tracker template for Google Sheets?'
    a: 'Yes. The CSV in this post opens in Google Sheets with File, Import, Upload, and in Excel by opening the file directly. Add the three formulas from the post and it is ready to use.'
  - q: 'How do I calculate the monthly cost of a yearly subscription?'
    a: 'Divide the yearly price by 12. A $191.88 yearly plan is $15.99 a month. In the template, the formula works it out from the billing cycle column so you do not have to.'
  - q: 'Can a spreadsheet remind me before a subscription renews?'
    a: 'Not on its own. You can color rows that renew within 30 days, but you still have to open the sheet. For reminders, put the dates on a calendar or use a tracker that sends alerts.'
  - q: 'Can I import my spreadsheet into Subly later?'
    a: 'Yes. Subly imports a CSV or Excel list with columns for name, amount and date, and the template''s headers are picked up as they are. You check the column matches before anything is added.'
cta:
  title: 'Keep the spreadsheet, skip the upkeep.'
  body: 'Import your sheet or upload a statement, and Subly tells you before each renewal and price rise.'
  button: 'Start free trial'
---

A subscription tracker spreadsheet is a list of everything you pay for on repeat, with what it costs, how often it bills and when it renews next. Done well, it answers two questions in seconds: what do we pay a year, and what is about to charge us.

You can build one in under an hour. Download the template below, open it in Google Sheets or Excel, add three formulas, and fill it from your last few statements. This post explains each column, the formulas to add, how to keep the sheet current, and the point where a spreadsheet stops being the right tool.

::download[Subscription tracker template (CSV)]{href="/templates/subscription-tracker.csv"}

The template comes with eight example rows (Figma, Notion, Google Workspace, Adobe Creative Cloud, Zoom, a domain, business insurance and a server billed in euros) so you can see how each column is meant to be filled. Delete them once you add your own.

## How do I open the template in Google Sheets or Excel?

In **Google Sheets**, create a blank sheet, then File, Import, Upload, and choose the CSV. Pick "Replace current sheet". In **Excel**, open the file directly. If the date columns arrive as plain text, select them and format them as dates; the template uses the YYYY-MM-DD format, which both programs read reliably.

A CSV cannot store formulas or formatting, so the template is just the data. You add the formulas once, in the next section, and then save the file as a Google Sheet or an .xlsx.

## What columns should a subscription tracker have?

Each column earns its place by answering a question you will actually ask.

| Column | What goes in it | Why it matters |
| --- | --- | --- |
| Name | The tool or bill, as you would say it | So everyone recognizes the line |
| Category | Design, Productivity, Hosting, Insurance… | Shows where the money goes |
| Owner | One person who decides keep or cancel | Someone is asked before it renews |
| Amount | The price per billing cycle, a plain number | The basis for every total |
| Currency | A three-letter code, like USD or EUR | Keeps foreign charges honest |
| Billing cycle | monthly, quarterly or yearly | Needed to compare plans |
| Next renewal | The next charge date, YYYY-MM-DD | Drives your reminders |
| Payment method | Which card or account pays | So you can find the charge |
| Cancel by | The last day to cancel or give notice | Some contracts need notice weeks ahead |
| Notes | Seats, plan name, past prices | The context for the decision |

Two columns are easy to skip and worth keeping. **Owner** turns the sheet from a record into a decision list; if you work with a team, our post on [who owns each tool](/blog/saas-ownership-for-small-teams) explains how to pick owners. **Cancel by** catches annual contracts like insurance, where the deadline to give notice can be a month or more before the renewal, not the renewal itself.

## Which formulas should I add?

Add three columns to the right of Notes. The formulas below assume the template's layout: Amount in column D, Billing cycle in F, Next renewal in G and Cancel by in I. Type each formula in row 2, then fill it down.

**Yearly total (column K).** Turns every plan into what it costs a year:

```
=D2*SWITCH(F2,"monthly",12,"quarterly",4,"yearly",1)
```

**Monthly equivalent (column L).** The same cost spread over a month, so a yearly plan and a monthly one sit side by side:

```
=K2/12
```

**Days to renewal (column M).** How long until the next charge:

```
=G2-TODAY()
```

Format column M as a plain number, not a date. If you want a countdown for the notice deadline too, add `=IF(I2="","",I2-TODAY())` in column N.

Then add totals at the bottom: `=SUM(K2:K100)` for what you pay a year, and `=SUMIF(B2:B100,"Design",K2:K100)` for one category. If you pay in more than one currency, `SUM` adds euros and dollars together, so total each currency on its own with `=SUMIF(E2:E100,"USD",K2:K100)` and convert before you combine them. These formulas work the same in Google Sheets and in current versions of Excel.

:::tip[The one view that prevents surprises]
Sort by days to renewal, smallest first, and add conditional formatting that colors any row where column M is 30 or less. Open the sheet once a week and look only at the colored rows.
:::

With the example rows, the yearly totals come to about $3,760 in US dollars plus €114 for the server. Adobe Creative Cloud alone is $59.99 a month, about $720 a year, and it is the one row with no owner. That is the kind of line the sheet is meant to surface.

## How do I handle subscriptions in other currencies?

Keep the amount in the currency you are charged in, and convert only for totals. In Google Sheets, `=GOOGLEFINANCE("CURRENCY:EURUSD")` returns a current rate you can multiply by. In Excel, keep one cell with the rate and update it by hand when you review the sheet. Your bank's conversion will differ a little from any published rate, so treat the converted total as an estimate. For a quick check, the [currency converter](/currency-converter) gives you a rate without opening a sheet.

## How do I keep the spreadsheet up to date?

A tracker is only as good as its last update. A short monthly routine is enough:

:::steps
1. **Open last month's card and bank statements.** Every account that pays for tools, including the ones on personal cards.
2. **Tick off each recurring charge against the sheet.** Anything not on the sheet gets a new row. The [guide to finding recurring charges on a bank statement](/blog/find-recurring-charges-on-bank-statement) helps you spot the ones that hide.
3. **Compare amounts.** If a charge differs from the Amount column, update it and note the old price in Notes.
4. **Roll the dates forward.** For anything that renewed, move Next renewal to the next cycle.
5. **Look at the colored rows.** Decide keep or cancel for anything renewing in the next 30 days.
:::

Most people need about 15 minutes a month once the sheet exists. Once a year, do a deeper pass; the [SaaS subscription audit guide](/blog/saas-subscription-audit) covers what to look for.

## When does a spreadsheet stop working?

A spreadsheet is a good tracker as long as someone keeps feeding it. It tends to break in the same places:

- **You have to find every charge yourself.** The sheet knows only what you type. A new tool someone added in March is invisible until you notice it on a statement.
- **No alerts.** The sheet cannot tell you a renewal is coming; you have to open it, and a renewal slips through in any week nobody does.
- **Price rises go unnoticed.** Notion going from $10 to $12 a seat is a 20% rise, but the sheet still says $10 unless you compare every line.
- **Currencies drift.** Each foreign line needs a rate, and the totals are only as fresh as your last update.
- **Teammates.** Shared sheets get edited, sorted and filtered by several people, and owners still have to remember to look.

::cta[Upload one statement and see every recurring charge, with yearly costs and renewal dates, in two minutes.]{button="Start free trial"}

## Spreadsheet or subscription tracker app?

Both are fine choices. Here is the honest comparison:

| | Spreadsheet | Subly |
| --- | --- | --- |
| Cost | Free | Free plan for up to 20 items; paid plans from $5 a month |
| Flexibility | Any column, any formula | Fixed fields, plus categories, projects and notes |
| Finding charges | You read statements yourself | Reads a bank or card statement (PDF or CSV) and finds the recurring charges |
| Renewal reminders | Only if you open the sheet | Alerts before renewals by email on every plan |
| Price rises | You compare amounts by hand | Flags a charge that went up |
| Currencies | One rate per currency, updated by you | 150+ currencies, rates refreshed daily |
| Teammates | A shared file | Owners on each item, notes and mentions |
| Leaving | It is your file | Export everything any time |

If you have a dozen subscriptions, all in one currency, and you enjoy a monthly check, a spreadsheet may be all you need. If you keep forgetting to open it, the alerts are what you are missing.

:::subly[Already have a sheet?]
You do not have to start over. Subly imports a CSV or Excel list, and the template's headers (Name, Amount, Currency, Billing cycle, Next renewal, Category) are matched to the right fields; you confirm the matches before anything is added. The Free plan tracks up to 20 items and reads one statement, so you can import the sheet, upload last month's statement and see what the sheet missed. Every new account also starts with a 14-day Business trial, no credit card needed.
:::

Whichever you pick, the habit is what saves the money: every charge on one list, a date next to each one, and a look at what renews before it does.
