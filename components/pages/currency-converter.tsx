import { AnchorButton } from '@/components/ui/button'
import { Container } from '@/components/ui/section'
import { APP_URL } from '@/lib/site'

const popular = [
  ['usd', 'United States Dollar (USD)'],
  ['eur', 'Euro (EUR)'],
  ['gbp', 'British Pound (GBP)'],
  ['inr', 'Indian Rupee (INR)'],
  ['aud', 'Australian Dollar (AUD)'],
  ['cad', 'Canadian Dollar (CAD)'],
  ['sgd', 'Singapore Dollar (SGD)'],
  ['chf', 'Swiss Franc (CHF)'],
  ['myr', 'Malaysian Ringgit (MYR)'],
  ['jpy', 'Japanese Yen (JPY)'],
  ['cny', 'Chinese Yuan (CNY)'],
  ['aed', 'UAE Dirham (AED)'],
]

/** Everything below the converter: the pitch and the popular currencies */
export default function ConverterMore() {
  return (
    <>
      <Container className="py-16 text-center sm:py-20">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-tight text-balance">Want to manage multi-currency expenses?</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">
          Subly keeps every item in its own currency and shows your totals in yours, so you never lose track of what you are paying for.
        </p>
        <AnchorButton href={APP_URL} size="lg" className="mt-6">
          Get started
        </AnchorButton>
      </Container>

      <Container className="max-w-4xl border-t border-border py-16">
        <h2 className="font-display text-xl font-bold tracking-tight">Convert between 100+ currencies</h2>
        <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map(([cc, name]) => (
            <li key={cc} className="flex items-center gap-3 py-2">
              <img src={`/flags/${cc}.svg`} alt="" width={28} height={28} loading="lazy" decoding="async" className="h-7 w-7 rounded-full border border-border object-cover" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
