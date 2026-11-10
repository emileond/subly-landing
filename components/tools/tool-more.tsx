import { Section, SectionHeading } from '@/components/ui/section'
import { TOOL_RELATED, type Tool } from '@/lib/tools'

/** Under a tool: the short answer to its question, and how it works */
export function ToolMore({ tool }: { tool: Tool }) {
  const related = TOOL_RELATED[tool.slug] ?? []
  return (
    <>
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-balance sm:text-3xl">{tool.answer.question}</h2>
          {tool.answer.paragraphs.map((text) => (
            <p key={text} className="mt-4 text-pretty text-muted-foreground sm:text-lg">
              {text}
            </p>
          ))}
          {related.length > 0 && (
            <ul className="mt-6 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
              {related.map((r) => (
                <li key={r.href}>
                  <a href={r.href} className="text-brand-ink underline-offset-4 hover:underline">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>
      <Section tone="sunken">
        <SectionHeading eyebrow="How it works" title="Three steps, no sign-up" />
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {tool.steps.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-border bg-card p-6">
              <span className="font-mono text-xs text-brand-ink">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-display text-xl font-bold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  )
}
