export type Faq = { q: string; a: string }

export const faqs: Faq[] = [
  {
    q: 'Does Subly pay for itself?',
    a: 'That is the idea. Subly pays for itself the first time it catches a renewal you forgot, a price rise you missed, or a refund window that was about to close, or a slow week for cash that you saw coming. That is also what lets us keep building.',
  },
  {
    q: 'Can I use Subly with Claude or my own agents?',
    a: 'Yes. Subly has a connector for Claude (it speaks MCP, so other compatible agents can use it too), a REST API with an OpenAPI spec, and signed webhooks for every signal. Ask what renews this quarter, add an item or assign an owner without opening the app. The connector and API are part of Personal, Business and Team, and of the AI & Automation add-on for lifetime deals.',
  },
  {
    q: 'What can Subly keep track of?',
    a: 'Money going out and money coming in: software, tools, domains, insurance, client retainers, payouts and lifetime deals. It handles any recurring payment in any currency, and one-time ones too.',
  },
  {
    q: 'How do I get my data in?',
    a: 'Upload a bank or card statement (PDF or CSV), forward receipts to your own Subly address, connect a bank, or import an AppSumo export. Most people see their first total within two minutes. You can also add things by hand.',
  },
  {
    q: 'Does Subly connect to my bank?',
    a: 'If you want it to. Bank connections work in the US, Canada and Europe and go through Plaid, so your bank login never reaches Subly. The connection is read-only: Subly can see transactions but cannot move money. You do not need one: uploading a statement works anywhere and needs no bank login.',
  },
  {
    q: 'How many items can I track?',
    a: 'The Free plan tracks up to 20 items. Personal, Business and Team are unlimited.',
  },
  {
    q: 'What plan should I choose?',
    a: 'Start with Free. Personal ($5 a month) is for individuals who want statement reading, receipt forwarding, Ask and the Claude connector and API. Business ($19 a month) is for founders, freelancers and small teams: 10 people and 5 banks, the Slack app, the 13-week view of how long your money lasts, Stripe import and priority support. Team ($49 a month) is for agencies and growing teams. New accounts start with a 14-day Business trial.',
  },
  {
    q: 'Do I need a credit card to start?',
    a: 'No. The 14-day Business trial starts without a card. When it ends you keep the Free plan, unless you choose a paid one.',
  },
  {
    q: 'Is there a contract or long-term commitment?',
    a: 'No. Plans are month to month unless you choose yearly, which costs about two months less. You can cancel at any time.',
  },
  {
    q: 'I have a lifetime deal. What happens to it?',
    a: 'It stays exactly as it is. If you want the newer features (statement reading, receipt forwarding, Ask, the Slack app and the Claude connector), the AI & Automation add-on is $3 a month or $30 a year.',
  },
  {
    q: 'Does Subly replace my accountant or my accounting software?',
    a: 'No. Subly watches your recurring money and tells you what needs a decision. It does not close your books or file taxes.',
  },
  {
    q: 'How is my data handled?',
    a: 'Your data is yours. It is encrypted in transit and at rest, never sold and never used for any other purpose. Bank connections are read-only. You can download all your data at any time, and if you ever decide to leave Subly, your data is deleted from our servers.',
  },
  {
    q: 'Is Subly available in my language?',
    a: 'The app speaks English, Spanish, Portuguese (Brazil), French, German, Italian, Norwegian, Swedish and Danish. This website is in English for now.',
  },
  {
    q: 'I have feedback or a feature request. Where do I send it?',
    a: 'Post it on the feedback board in the app (Help → Feedback, or web.subly.app/feedback). It is a direct line to the team, and we prioritize by what people ask for.',
  },
  {
    q: 'Do you have an affiliate program?',
    a: 'Yes. Details are on the affiliate program page.',
  },
]
