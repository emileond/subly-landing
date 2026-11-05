---
title: 'How to ask Claude about your business spending and renewals'
description: 'Connect Claude to Subly and ask what renews this quarter, where the money goes or who owns a tool. Answers use your real numbers, and it asks before changes.'
lede: 'What it is like to ask an AI assistant about your money when it can see the real numbers, how to connect Claude to Subly in a few minutes, and what it can and cannot do once it is connected.'
slug: 'ask-claude-about-your-business-spending'
status: 'published'
category: 'AI and agents'
tags: ['claude', 'mcp', 'ai', 'automation', 'subscriptions']
author: 'emilio'
publishedAt: '2026-11-04T08:00:00.000Z'
summary:
  - 'An AI assistant can only answer money questions well when it reads your actual charges; without them it guesses from what you paste in.'
  - 'MCP is an open standard that lets assistants like Claude connect to other apps, so Claude can look things up in Subly while you talk to it.'
  - 'To connect, add Subly as a custom connector in Claude''s settings with the server address from Subly''s Connections page, then sign in to Subly and press Allow.'
  - 'Once connected, Claude can list upcoming renewals, total spend by category, summarize a month, add an item, assign an owner or mark something cancelled, and it checks with you before any change.'
  - 'It cannot move money: Subly is read-only at the bank, and the connector cannot delete anything, see bank details or change billing.'
faq:
  - q: 'Can Claude see my bank account through Subly?'
    a: 'No. Claude sees what you see in Subly: recurring items, charges, totals and monthly summaries. It cannot see bank details, and Subly itself is read-only at the bank, so nothing connected to it can move money.'
  - q: 'Does the Subly connector work with assistants other than Claude?'
    a: 'Yes. It is a remote MCP server, so any assistant or tool that supports remote MCP servers can use the same address, including Claude Code with one command.'
  - q: 'Which Subly plans include the Claude connector?'
    a: 'Personal, Business and Team include the Claude connector and the API. Lifetime-deal owners get them with the AI & Automation add-on, $3 a month or $30 a year.'
  - q: 'How do I disconnect Claude from Subly?'
    a: 'Open Connected apps in Subly and press Disconnect next to Claude. Its access stops right away.'
cta:
  title: 'Ask your AI about the real numbers.'
  body: 'Start a free trial, upload one statement, and connect Claude to see what renews and who owns it.'
  button: 'Start free trial'
---

Ask a general AI assistant "what software are we paying for?" and the honest answer is "I don't know." It has never seen your card statement. You can paste one in, and it will do a decent job on that one file, but next week you start over, and it has no idea who on your team owns which tool or what renews in March.

Connect it to the place where your recurring money already lives and the conversation changes. "What renews this quarter, and who owns each one?" gets a list with dates, amounts and names, pulled from your actual charges. This post shows what that looks like with Claude and Subly, how to set it up, and where the limits are.

## What changes when the assistant works from real numbers?

Three things. **Answers stop being guesses**: the totals come from your charges, already converted to your currency, rather than from what the assistant thinks a Figma seat costs. **Context carries over**: owners, categories, projects and notes are already there, so you do not explain your setup each time. And **you can act in the same conversation**: if Claude finds a renewal with no owner, you can assign one without opening another app.

What stays the same is that you are the one deciding. The assistant looks things up, adds up numbers and drafts changes. It does not cancel anything at the vendor or pay anyone.

## What is MCP, in plain words?

MCP, the Model Context Protocol, is an open standard that lets AI assistants connect to other apps. An app that supports it offers a short list of actions, such as "find items" or "upcoming charges", and the assistant can call them while you talk to it. You give permission once by signing in, and you can take it back any time. Subly offers an MCP server, which is why the same connection works in Claude, in Claude Code and in other assistants that support remote MCP servers.

## What can you ask Claude about your spending?

Here are questions people ask once Claude is connected, with the kind of answer that comes back. The numbers are examples; yours come from your own workspace.

**"Which of our tools renew before the end of the year, and who owns each one?"**
Four renewals before December 31, $1,260 in total: Adobe ($720, November 5, no owner), Webflow ($168, November 21, no owner), Figma ($180, December 2, Sam) and Zoom ($192, December 9, Dana). Two have no owner, and Claude can offer to assign them.

**"Where does our money go?"**
What your recurring costs add up to each month and year, broken down by category, so you can see that design tools are a third of the total before you open a spreadsheet.

**"Add Linear, 6 seats at $8."**
Claude repeats back what it is about to add (Linear, $48 a month, monthly) and asks you to confirm before it creates the item.

**"Who owns Webflow?"**
Nobody, yet. Claude can set an owner when you name one, and that person then gets its renewal reminders.

**"What did we actually pay last quarter?"**
The charges recorded between two dates, with the total in your currency and the largest items first. This is what was really paid, not what the plans say, so a seat added mid-quarter or a one-time fee shows up too.

**"Summarize October."**
The month in numbers: what went out, what came in, what changed and what renews next month, with Subly's written summary when there is one.

:::tip[Ask the follow-up]
The useful questions are usually the second ones: "which of those has gone up in price?", "what would we save by cancelling the two with no owner?" Claude keeps the earlier answer in mind, so you can narrow down without starting over.
:::

## How do I connect Claude to Subly?

The connection takes a few minutes. You need a Subly account on Personal, Business or Team (or a lifetime deal with the AI & Automation add-on), and access to custom connectors in Claude.

:::steps
1. **Copy the server address from Subly.** In Subly, open **Connections** and choose **Claude**. The card shows the server address with a Copy button.
2. **Add a custom connector in Claude.** In Claude, open Settings, then Connectors, then Add custom connector.
3. **Paste the address and name it Subly.** Save the connector.
4. **Sign in to Subly when asked and press Allow.** The screen shows which account you are signed in as and exactly what Claude will be able to see and do.
5. **Ask your first question.** Try "what renews next week?" or "how much do we spend on design tools?"
:::

If you use **Claude Code**, the same Connections card has a one-line command (`claude mcp add --transport http subly` followed by the address) you can paste into your terminal. For other assistants and tools that speak remote MCP, the **MCP server** card in Connections has the same address and a small JSON config for tools that read one from a file. Every app you connect shows up under **Connected apps**.

::cta[Start a trial, upload one statement, and ask Claude what renews this quarter.]{button="Start free trial"}

## Is it safe to give an AI assistant access to my finances?

It is reasonable to ask. Here is exactly what the connection allows.

- **What Claude can see:** your recurring items, charges, totals and monthly summaries in your workspaces. The same things you see in Subly.
- **What Claude can change:** it can add items, mark them as cancelled and set owners. It is set up to check with you before any of these, and it repeats the details back so you can say yes or no.
- **What Claude cannot do:** delete anything, see bank details or change billing.
- **What nothing connected to Subly can do:** move money. Subly is read-only at the bank. It can see transactions; it cannot pay anyone or change anything at your bank. If you connect a bank, it goes through Plaid, so your bank login never reaches Subly.

"Mark as cancelled" means marking it in Subly after you have cancelled with the vendor. Subly does not cancel subscriptions for you. And you can disconnect Claude in Connected apps at any time; its access stops right away.

:::note
An assistant can still misread a question. When an answer will drive a decision, ask Claude which charges it used. The totals come from Subly, so you can check any line in the app.
:::

## What about the API, webhooks, Zapier and Make?

If you would rather automate than chat, the same data is available in other ways:

- **REST API** with an OpenAPI spec. Read and update items, charges, what is coming up and signals from your own scripts. Create keys in Connections.
- **Signed webhooks** for every signal. A price change, a late client payment or a crossed budget can wake your own tools the moment it happens. Personal includes 3 webhooks, Business 5 and Team 10.
- **Zapier and Make.** Send a renewal to your task board or a late payment to your CRM without writing code.

A common setup is to let webhooks push the urgent things (a renewal in seven days, a client three days late) and use Claude for the questions that come up in between. If you track income too, the post on [tracking recurring revenue](/blog/track-recurring-revenue) shows what to put in so "summarize October" covers money in as well as money out.

## What do I need to get started?

:::subly[Where this fits in Subly]
The Claude connector and the API are part of Personal ($5 a month), Business and Team, and of the AI & Automation add-on for lifetime deals. Inside the app, **Ask Subly** answers the same kind of question in plain words, and every answer links to the charges behind it. Every new account starts with a 14-day Business trial, no credit card needed, so you can upload a statement, connect Claude and try it on your own numbers. More on the [agents page](/agents).
:::

Before connecting anything, get your recurring charges into one place; the assistant can only be as good as the list behind it. The [SaaS subscription audit guide](/blog/saas-subscription-audit) is a good first pass, and if your team shares tools, [giving each tool an owner](/blog/saas-ownership-for-small-teams) makes answers like "who owns Webflow?" worth asking.
