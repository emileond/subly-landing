import { LogoMark } from '@/components/site/logo'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Manifesto',
  description: 'Why Subly is an independent, bootstrapped product that answers to the people who use it.',
  path: '/manifesto',
})

const paragraphs = [
  'In business, we say the customer comes first. The reality today is that stakeholders come first. Most large companies answer to investors: The bank. Their board. The customer has become the user, a number on the wall.',
  'Subly started with the mission of developing free and accesible tools to empower people to control their financial life.',
  'We support independent companies to make business personal. Because we want to see our community thrive. Because we believe in an idea.',
  'By supporting an independent project like Subly, you support a product that answers to its users. Your feedback will likely turn into a feature. The numbers are important to a self-funded business, but so are the names.',
  'And as an independent and bootstrapped business, we wear our story with pride.',
]

export default function ManifestoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-center font-display text-4xl font-bold tracking-tight sm:text-5xl">The Manifesto</h1>
      <div className="mt-12 space-y-6 text-lg leading-relaxed sm:text-xl">
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <LogoMark className="h-10 w-auto text-brand" />
      </div>
    </div>
  )
}
