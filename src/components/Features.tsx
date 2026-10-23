import { features } from '../data/marketing'
import Section from './Section'

export default function Features() {
  return (
    <Section id="features" eyebrow="Features" title="Everything your business needs, nothing it doesn't"
      intro="Stock, sales and notes finally live together.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title}
            className="group rounded-card border border-border bg-surface p-6 shadow-card transition hover:-translate-y-1">
            <span className="grid size-11 place-items-center rounded-2xl bg-surface-2 text-primary transition group-hover:bg-primary group-hover:text-primary-fg">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="mt-1.5 text-sm text-muted">{text}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}