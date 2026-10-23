import { steps } from '../data/marketing'
import Section from './Section'

export default function HowItWorks() {
  return (
    <Section id="how" eyebrow="How it works" title="Set up in an afternoon, useful from day one">
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="rounded-card border border-border bg-surface p-6 shadow-card">
            <div className="text-4xl font-extrabold text-accent">{s.n}</div>
            <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{s.text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}