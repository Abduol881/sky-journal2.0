import { Plus } from 'lucide-react'
import { goal, kpis, revenue } from '../data/mock'
import { AreaChart, CountUp, Delta, Gauge, Sparkline } from './charts'

export default function DashboardPreview() {
  return (
    <div className="mx-auto max-w-5xl rounded-[32px] border border-border bg-surface/60 p-3 shadow-card backdrop-blur sm:p-4">
      <div className="mb-3 flex items-center justify-between rounded-full border border-border bg-surface px-3 py-2">
        <div className="flex items-center gap-2">
          <img src="/brand/icon.svg" alt="" className="size-7 rounded-lg" />
          <span className="hidden text-sm font-bold sm:block">SkyLedger</span>
        </div>
        <div className="flex gap-1 rounded-full border border-border bg-surface-2 p-1 text-xs font-semibold">
          <span className="rounded-full bg-text px-3 py-1 text-bg">Overview</span>
          <span className="px-3 py-1 text-muted">Sales</span>
          <span className="hidden px-3 py-1 text-muted sm:block">Stock health</span>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-fg">
          <Plus className="size-3.5" /> New
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {kpis.map((k) => (
          <div key={k.id} className="rounded-3xl border border-border bg-surface p-4 text-left">
            <div className="flex items-center justify-between text-xs text-muted">
              {k.label}<Delta v={k.delta} />
            </div>
            <div className="mt-1 text-2xl font-extrabold"><CountUp value={k.value} /></div>
            <div className={k.tone}><Sparkline values={k.spark} /></div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-surface p-4 text-left lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-bold">Inventory statistics</div>
            <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted">Monthly</span>
          </div>
          <AreaChart values={revenue} />
        </div>
        <div className="rounded-3xl border border-border bg-surface p-4 text-left">
          <div className="mb-2 text-sm font-bold">Sales overview</div>
          <Gauge pct={goal.pct} />
          <div className="mt-2 flex justify-between text-xs text-muted">
            <span>Number of sales <b className="block text-base text-text">{goal.sales}</b></span>
            <span className="text-right">Total sales <b className="block text-base text-text">{goal.total}</b></span>
          </div>
        </div>
      </div>
    </div>
  )
}