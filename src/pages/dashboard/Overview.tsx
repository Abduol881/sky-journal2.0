import { motion } from 'framer-motion'
import { AlertTriangle, Boxes, DollarSign, FlaskConical, Plus } from 'lucide-react'
import type { ReactNode } from 'react'
import { Delta, Gauge, Sparkline, StockBars } from '../../components/charts'
import { goal, kpis, stockMonths, todo } from '../../data/mock'
import { getProfile } from '../../lib/auth'

const icons = { units: Boxes, value: DollarSign, low: AlertTriangle } as const

function Rise({ i = 0, className = '', children }: { i?: number; className?: string; children: ReactNode }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}>
      {children}
    </motion.div>
  )
}

const card = 'rounded-card border border-border bg-surface p-5 shadow-card'

export default function Overview() {
  const first = (getProfile()?.name ?? '').split(' ')[0] || 'there'
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-4">
        <Rise className="sm:col-span-3 xl:col-span-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted">
            <span className="size-1.5 rounded-full bg-success" /> {today}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight">Welcome back, {first}!</h1>
          <p className="mt-2 text-sm text-muted">
            Here's what's moving today: <b className="text-text">{todo.orders} orders</b> to ship
            and <b className="text-text">{todo.batches} batches</b> waiting on QA.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-fg shadow-card transition hover:opacity-90">
              <Plus className="size-4" /> New order
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold transition hover:bg-surface-2">
              <FlaskConical className="size-4" /> Make a batch
            </button>
          </div>
        </Rise>

        {kpis.map((k, i) => {
          const Icon = icons[k.id as keyof typeof icons]
          return (
            <Rise key={k.id} i={i + 1}>
              <div className={`${card} h-full`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-muted">{k.label}</div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold">{k.value}</span>
                      <Delta v={k.delta} />
                    </div>
                  </div>
                  <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                </div>
                <div className={`mt-3 ${k.tone}`}><Sparkline values={k.spark} /></div>
              </div>
            </Rise>
          )
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Rise i={4} className="xl:col-span-2">
          <div className={card}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-bold">Inventory statistics</div>
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-warning" />Stock in</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-success" />Stock out</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary" />Stock value</span>
                <span className="rounded-full border border-border bg-surface-2 px-3 py-1">Monthly</span>
              </div>
            </div>
            <StockBars data={stockMonths} />
          </div>
        </Rise>

        <Rise i={5}>
          <div className={`${card} h-full`}>
            <div className="mb-3 text-sm font-bold">Sales overview</div>
            <Gauge pct={goal.pct} />
            <div className="mt-4 flex justify-between text-xs text-muted">
              <span>Number of sales<b className="block text-lg text-text">{goal.sales}</b></span>
              <span className="text-right">Total sales<b className="block text-lg text-text">{goal.total}</b></span>
            </div>
          </div>
        </Rise>
      </div>
    </div>
  )
}