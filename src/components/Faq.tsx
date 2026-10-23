import { ChevronDown } from 'lucide-react'
import { faqs } from '../data/marketing'
import Section from './Section'

export default function Faq() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Questions, answered">
      <div className="mx-auto max-w-2xl space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-3xl border border-border bg-surface px-5 py-4 shadow-card">
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
              {f.q}
              <ChevronDown className="size-4 text-muted transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}