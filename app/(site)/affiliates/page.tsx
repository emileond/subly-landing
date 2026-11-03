import { CalendarDays, LayoutDashboard, Wallet } from 'lucide-react'
import { AnchorButton } from '@/components/ui/button'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Join our affiliate program',
  description: 'Partner with Subly and earn a recurring 30% commission for every referral.',
  path: '/affiliates',
})

const perks = [
  { icon: Wallet, title: 'Paypal Payouts', body: 'Monthly payout via PayPal. No minimum threshold.' },
  { icon: CalendarDays, title: '60-day cookie', body: 'Get credit for all sales made within 60 days of a referral.' },
  { icon: LayoutDashboard, title: 'Sales dashboard', body: 'Track your sales in your affiliate dashboard. Powered by Partnero.' },
]

const steps = [
  { title: '1. Sign up for our affiliate program' },
  {
    title: '2. Share your referral link with your audience',
    body: 'Share your link with friends, family, clients, social media, blogs, etc.',
  },
  {
    title: '3. Get paid 30% commission for every referral',
    body: 'Receive 30% recurring commission for every successful referral',
  },
]

const terms = [
  'Self-referrals are not allowed (i.e. signing up for Testimonial through your own affiliate link)',
  'Abuse, gaming, or attempting to mislead (i.e. posting fake discounts to coupon-sharing websites) will result in your account being permanently banned.',
  'No search engine ads (especially on branded terms or domain names), Facebook ads or other ads that would compete with our own marketing and cause potential confusion for customers.',
  'No spamming, including sending unsolicited emails, posting spam on social media, or other forms of spam.',
  'No pretending to be acting on behalf of us (ie. as an employee).',
  'In some cases, we can give credit to an affiliate even if the customer didn’t sign up through an affiliate link or coupon code. If you have a case like this, please contact us and we’ll do our best to help.',
]

export default function AffiliatesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-6xl">
          Join our affiliate program, earn 30% commission.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">Partner with us to earn a recurring 30% commission per referral.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <AnchorButton href="https://affiliates.subly.app/register" target="_blank" rel="noopener noreferrer" size="lg" className="w-full rounded-full sm:w-auto">
            Join Now
          </AnchorButton>
          <AnchorButton href="https://affiliates.subly.app/login" target="_blank" rel="noopener noreferrer" variant="outline" size="lg" className="w-full rounded-full sm:w-auto">
            Affiliate login
          </AnchorButton>
        </div>
      </div>

      <ul className="mt-20 grid gap-4 md:grid-cols-3">
        {perks.map(({ icon: Icon, title, body }) => (
          <li key={title} className="rounded-xl border border-border bg-card p-6">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand-ink">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-display text-lg font-bold tracking-tight">{title}</h2>
            <p className="mt-2 text-muted-foreground">{body}</p>
          </li>
        ))}
      </ul>

      <section className="mt-20">
        <h2 className="font-display text-3xl font-bold tracking-tight">How it works</h2>
        <ol className="mt-6 space-y-6">
          {steps.map((s) => (
            <li key={s.title}>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              {s.body && <p className="mt-1 text-muted-foreground">{s.body}</p>}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 rounded-3xl border border-border bg-card px-6 py-12 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Join our affiliate program</h2>
        <p className="mt-3 text-lg text-muted-foreground">Partner with us to earn a recurring 30% commission per referral.</p>
        <AnchorButton href="https://affiliates.subly.app" target="_blank" rel="noopener noreferrer" size="lg" className="mt-6 rounded-full">
          Join Now
        </AnchorButton>
      </section>

      <section className="mt-20 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight">Affiliate Program Terms</h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
          We have a few simple rules to ensure that our partnership is mutually beneficial. No hidden tricks or surprises, just some straightforward guidelines to follow.
        </p>
        <ul className="mx-auto mt-8 max-w-xl list-disc space-y-4 pl-6 text-left">
          {terms.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
