import { AlertTriangle, Package, TrendingUp } from 'lucide-react'
import Header from './components/Header'

const cards = [
  { icon: Package, label: 'Units on hand', value: '4,345', tone: 'text-primary' },
  { icon: TrendingUp, label: 'Total stock value', value: '$32,041', tone: 'text-success' },
  { icon: AlertTriangle, label: 'Low stock items', value: '7', tone: 'text-warning' },
]

export default function App() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 pt-32">
        <h1 className="text-4xl font-extrabold tracking-tight">Welcome to SkyLedger</h1>
        <p className="mt-2 text-muted">Foundation check: tokens, cards and the theme wipe.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {cards.map(({ icon: Icon, label, value, tone }) => (
            <div key={label} className="rounded-card border border-border bg-surface p-5 shadow-card">
              <div className="flex items-center justify-between text-sm text-muted">
                {label}
                <span className={`grid size-9 place-items-center rounded-xl bg-surface-2 ${tone}`}><Icon className="size-4" /></span>
              </div>
              <div className="mt-3 text-3xl font-bold">{value}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}