import { Check } from 'lucide-react'
import { plans } from '../data/marketing'
import Section from './Section'

export default function Pricing() {
  return (
    <Section id="pricing" eyebrow="Pricing" title="Simple plans that grow with you"
      intro="Start free. Upgrade when the business needs more.">
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name}
            className={`rounded-card border p-6 shadow-card ${
              p.featured ? 'border-primary bg-primary text-primary-fg' : 'border-border bg-surface'
            }`}>
            <div className="text-sm font-bold">{p.name}</div>
            <div className="mt-3 text-4xl font-extrabold">{p.price}</div>
            <div className={`text-sm ${p.featured ? 'opacity-80' : 'text-muted'}`}>{p.note}</div>
            <ul className="mt-6 space-y-2.5 text-sm">
              {p.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2">
                  <Check className="size-4 shrink-0" />{perk}
                </li>
              ))}
            </ul>
            <a href="/signup"
              className={`mt-8 block rounded-full px-5 py-2.5 text-center text-sm font-semibold transition hover:opacity-90 ${
                p.featured ? 'bg-primary-fg text-primary' : 'bg-primary text-primary-fg'
              }`}>
              Get started
            </a>
          </div>
        ))}
      </div>
    </Section>
  )
}