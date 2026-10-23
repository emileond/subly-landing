import { FileText, Landmark, Mail, Tag } from 'lucide-react'
import { Pill } from '@/components/home/mock'
import { Section, SectionHeading } from '@/components/ui/section'

const ways = [
  {
    icon: FileText,
    title: 'Upload a statement',
    body: 'Drop in a PDF or CSV from your bank or card. Subly reads it and finds what repeats. No bank login needed.',
  },
  {
    icon: Mail,
    title: 'Forward your receipts',
    body: 'Your workspace gets its own address. Forward a receipt and the new charge adds itself.',
  },
  {
    icon: Landmark,
    title: 'Connect a bank',
    body: 'Link your bank in the US, Canada or Europe and recurring charges show up on their own.',
  },
  {
    icon: Tag,
    title: 'Import your AppSumo deals',
    body: 'Bring in your export. Every deal, what you paid, and which ones you can still get refunded.',
  },
]

export function BringDataIn() {
  return (
    <Section id="how-it-works">
      <SectionHeading
        eyebrow="Start in two minutes"
        title="Bring your data in. See the whole picture."
        lede="Pick whichever way is quickest. Subly shows you a real total before you set anything up."
      />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ways.map(({ icon: Icon, title, body }, i) => (
          <li key={title} className="flex flex-col rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-soft text-brand-ink">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-mono text-xs text-faint">0{i + 1}</span>
            </div>
            <h3 className="mt-5 font-display text-lg font-bold tracking-tight">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-2xl border border-border bg-card px-5 py-10 text-center sm:px-10 sm:py-14">
        <p className="text-sm text-muted-foreground">From your September statement, Subly found</p>
        <p className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-balance sm:text-5xl">
          23 recurring charges, <span className="text-brand-ink">about $1,184 a month</span>
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Pill tone="attention">4 look forgotten</Pill>
          <Pill tone="brand">3 renew in the next 30 days</Pill>
          <Pill tone="problem">1 price increase</Pill>
        </div>
      </div>
    </Section>
  )
}
