# Writing for the Subly blog

How posts in `content/posts` are written and formatted. Read it before adding or editing a post.

## Who we write for

Founders, freelancers and small teams (agencies, studios, small companies), plus households on the Personal plan. They pay for a pile of software and services, some of them get paid on retainers or subscriptions, and nobody on the team is a finance person. They come from Google or an AI assistant with a concrete question ("how do I find all my subscriptions", "how much cash will I have in March").

## Voice

- Plain words, short sentences, second person ("you"). US English. No exclamation marks, no hype ("revolutionary", "game-changer", "unlock", "supercharge", "seamless", "effortless").
- Outcomes before features: say what the reader will know or avoid, then how.
- Frame Subly as what makes a business more capable: "you'll know before a charge hits", "run your money like the company you're becoming". Never compare the reader to bigger companies or what they cannot afford (no "the CFO you can't afford", no "like the big guys").
- Be useful without Subly. Every post must answer its question completely for someone who never signs up: steps, numbers, examples, a template. Subly appears where it genuinely removes work, in a `:::subly` box or an inline `::cta`, not in every paragraph.
- Concrete beats abstract: "$59.99 a month, about $720 a year" instead of "significant costs". Use realistic small-business examples (Figma, Notion, Slack, Adobe, Zoom, Google Workspace, Webflow, a $2,500 client retainer).
- No made-up statistics, studies or quotes. If you state a fact about the world (a law, a policy, a percentage), it must be well established; otherwise phrase it as advice ("check the deal page for its refund window"). The only Subly numbers you may use are on the site: 26,000+ accounts opened, 95,000+ recurring payments tracked, $3M+ a year saved in cancelled subscriptions.

## What Subly v2 does (the only claims you may make)

Use these facts; do not invent features, integrations or numbers.

- **What it tracks:** money going out and coming in. Software, tools, domains, insurance, client retainers, payouts, lifetime deals. Any recurring payment in any currency (150+ currencies, each item keeps its own; totals in yours, rates refreshed daily), and one-time ones too.
- **Getting data in (minutes, no migration):** upload a bank or card statement (PDF or CSV; no bank login needed, works anywhere). Subly reads it and finds the recurring charges, e.g. "23 recurring charges, about $1,184 a month: 4 look forgotten, 3 renew soon, 1 price increase". Forward receipts to your own Subly address. Connect a bank (US, Canada, Europe, through Plaid, read-only). Import recurring revenue from Stripe (Business and Team). Import an AppSumo export (on AppSumo: Account → Products → export purchases as CSV). A spreadsheet. Or just type it.
- **Today:** the home screen lists what needs a decision this week, with Keep / Plan to cancel / Snooze on each.
- **Signals it raises:** renewals coming up, price rises ("Notion Plus went up 20%: $10 → $12"), charges after you cancelled, refund windows closing (lifetime deals), late client payments, bank connection issues, budgets crossed.
- **Alerts where you work:** email on every plan; push, Discord, Telegram and Microsoft Teams from Personal; the Slack app with Keep / Plan to cancel / Snooze buttons from Business. You choose the rhythm.
- **Understand:** a monthly summary in plain words (every plan), share this month (a clean view-only copy, e.g. for your accountant), Ask Subly in plain words and reports (Personal and up; every answer links to the charges), a 13-week cash forecast with what-ifs (test a cancel or a price change against the coming weeks before you commit; Business and Team).
- **Organise:** categories and projects (by type of spend or by client), budgets per category or project that speak up at 80% and again when crossed.
- **Teams:** every item can have an owner; notes and mentions on items ("is anyone still using this?"); a For you feed; renewals go to the person who can decide. Items without an owner show up on Today.
- **Agents:** a Claude connector (MCP; other MCP-compatible agents work too): ask what renews this quarter, where the money goes, add an item, assign an owner, mark something cancelled; it checks with you before it changes anything. REST API with an OpenAPI spec, signed webhooks for every signal, Zapier and Make. Connector and API from Personal.
- **Safety:** read-only. Subly can see transactions; it cannot move money, pay anyone or change anything at your bank. Bank logins never reach Subly (Plaid). Encrypted in transit and at rest. Never sold. Export everything any time; leave and it is deleted.
- **Also confirmed in the app (Nov 2026):** signed webhooks per plan: Personal 3, Business 5, Team 10. The Claude connector can look up items, charges, totals and monthly summaries, add items, mark them cancelled and set owners; it cannot delete anything, see bank details or change billing, and you can disconnect it any time in Connected apps. To connect: in Claude, Settings → Connectors → Add custom connector, paste the server address from Subly's Connections page, name it Subly, sign in and press Allow (Claude Code: `claude mcp add --transport http subly <address>`). The AppSumo import is on every plan, Free included, and skips downloads, merchandise, refunded or transferred deals and expired AppSumo Plus memberships. The spreadsheet import reads CSV and Excel.
- **Spelling:** "cancelled" and "cancel" follow the app's own wording.
- **Not:** Subly does not replace your accountant or accounting software, does not close books or file taxes, does not cancel subscriptions for you or negotiate prices.
- **Languages:** the app is in English, Spanish, Portuguese (Brazil), French, German, Italian, Norwegian, Swedish and Danish.
- **Plans (USD):** Free $0 (up to 20 items, money in and out, any currency, 1 statement read, email alerts, monthly summary). Personal $5/month or $48/year (unlimited items and statements, receipt forwarding, Ask and reports, Claude connector and API, push and chat alerts, 3 people, 1 bank). Business $19/month or $190/year (adds Slack app, 13-week forecast with what-ifs, Stripe import, 10 people, 5 banks, priority support). Team $49/month or $490/year (20 people, 10 banks, 20 GB files, 10 webhooks). Every new account starts with a 14-day Business trial, no credit card; afterwards you keep Free. Lifetime-deal owners keep their deal; the AI & Automation add-on is $3/month or $30/year.

Links: sign up `https://web.subly.app/signup` (the `::cta` component already links there). Site pages: `/pricing`, `/agents`, `/for/teams`, `/for/founders`, `/for/households`, `/currency-converter`. Link to other posts as `/blog/<slug>`.

## Structure that ranks and gets cited

- **Title (H1):** the reader's question or the promised outcome, 50–65 characters, with the main search phrase near the start. No year unless the post is about that year.
- **`description`:** 140–160 characters, the answer in one sentence. Used for search snippets.
- **`lede`:** one or two sentences under the title that say what the reader will get.
- **`summary`:** 3–5 bullets that answer the question on their own. AI assistants and skimmers read this first. Each bullet one sentence, concrete.
- **Body:** open with 2–3 short paragraphs that answer directly (no throat-clearing). Then `##` sections phrased the way people search ("How do I find every subscription on a bank statement?"). Use `###` sparingly. Keep paragraphs to 2–4 sentences. 1,200–1,900 words.
- **Formatting:** use the components below where the content calls for them: steps for procedures, a checklist for things to do, a table for comparisons, stats for numbers worth remembering, a tip or warning for asides. Do not decorate: at most one of each component per post unless the content really needs more. Bold the key phrase of a list item, not whole sentences.
- **One inline `::cta`** in the middle, where the reader has just felt the problem. The end CTA comes from front matter.
- **`faq`:** 3–5 questions people actually ask, answered in 1–3 sentences each. They become an FAQ block and FAQ structured data, so do not repeat the body word for word.
- **Internal links:** 2–4 links to other posts or site pages where they help.

Comparisons with other products are not blog posts. They are pages under `/compare`, built from the facts in `lib/compare.ts` (see the rules at the top of that file). Link to them from a post as `/compare` or `/compare/<product>`.

## Front matter

```yaml
---
title: 'How to find every subscription on your bank statement'
description: 'One sentence, 140–160 characters, that answers the question.'
lede: 'One or two sentences under the title.'
slug: 'find-recurring-charges-on-bank-statement'
status: 'published'
category: 'Subscriptions'   # Subscriptions · Cash flow · Teams · Lifetime deals · AI and agents · Product
tags: ['subscriptions', 'bank statements']
author: 'emilio'
publishedAt: '2026-11-04T12:00:00.000Z'
updatedAt: '2026-11-04T12:00:00.000Z'   # only when the post was revised after publishing
summary:
  - 'First takeaway.'
  - 'Second takeaway.'
faq:
  - q: 'A question people ask?'
    a: 'A short answer.'
cta:
  title: 'Headline for the end of the post, tied to its topic.'
  body: 'One sentence on what they will see in Subly.'
  button: 'Start free trial'
---
```

Quote every string with single quotes; double an apostrophe inside one (`'it''s'`).

## Components (inside the Markdown body)

Containers open with `:::name` on its own line and close with `:::`. An optional title goes in brackets.

```md
:::tip[Quick win]
Sort your statement by amount before you start; the expensive renewals jump out.
:::

:::note
Neutral aside or context.
:::

:::warning[Watch the refund window]
Something that costs money if missed.
:::

:::subly[How Subly helps]
Upload the statement and Subly lists every recurring charge for you, with what it costs a year.
:::

:::steps
1. **Export last month's statement.** One or two sentences.
2. **Mark everything that repeats.** One or two sentences.
:::

:::checklist
- Every tool has an owner
- Annual renewals are on a calendar
:::

:::stats
- **$720** a year for one forgotten Adobe seat
- **20%** price rise on a $10 plan is $24 a year
- **13 weeks** of cash, week by week
:::
```

Single-line components:

```md
::cta[Upload one statement and see every recurring charge in two minutes.]{button="Start free trial"}

::download[Subscription tracker template (CSV)]{href="/templates/subscription-tracker.csv"}
```

GitHub-style tables work and are styled. Use them for comparisons (spreadsheet vs app, monthly vs yearly).
