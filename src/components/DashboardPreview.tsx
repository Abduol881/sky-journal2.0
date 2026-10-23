import { ArrowDownRight, ArrowUpRight, Plus } from 'lucide-react'
import { goal, kpis, revenue } from '../data/mock'
import { smoothPath } from '../lib/chart'

function Sparkline({ values }: { values: number[] }) {
  return (
    <svg viewBox="0 0 120 36" preserveAspectRatio="none" fill="none" className="h-9 w-full">
      <path d={smoothPath(values, 120, 36)} stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function Delta({ v }: { v: number }) {
  const up = v >= 0
  const Icon = up ? ArrowUpRight : ArrowDownRight
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${up ? 'text-success' : 'text-danger'}`}>
      <Icon className="size-3.5" />{Math.abs(v)}%
    </span>
  )
}

function AreaChart() {
  const w = 600, h = 200
  const line = smoothPath(revenue, w, h, 16)
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-44 w-full text-primary" fill="none">
      <defs>
        <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} x1="0" x2={w} y1={h * t} y2={h * t} stroke="var(--border)" strokeDasharray="4 6" />
      ))}
      <path d={`${line} L${w},${h} L0,${h} Z`} fill="url(#rev-fill)" />
      <path d={line} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function Gauge({ pct }: { pct: number }) {
  const n = 48
  return (
    <svg viewBox="0 0 200 110" className="mx-auto w-full max-w-[220px]">
      {Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1)
        const a = Math.PI + t * Math.PI
        return (
          <line key={i}
            x1={100 + 70 * Math.cos(a)} y1={100 + 70 * Math.sin(a)}
            x2={100 + 90 * Math.cos(a)} y2={100 + 90 * Math.sin(a)}
            stroke={t <= pct / 100 ? 'var(--primary)' : 'var(--border)'}
            strokeWidth="2.2" strokeLinecap="round" />
        )
      })}
      <text x="100" y="92" textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--text)">{pct}%</text>
      <text x="100" y="106" textAnchor="middle" fontSize="8" fill="var(--muted)">Sales goal</text>
    </svg>
  )
}

export default function DashboardPreview() {
  return (
    <div className="mx-auto max-w-5xl rounded-[32px] border border-border bg-surface/60 p-3 shadow-card backdrop-blur sm:p-4">
      {/* mini top bar */}
      <div className="mb-3 flex items-center justify-between rounded-full border border-border bg-surface px-3 py-2">
        <div className="flex items-center gap-2">
          <img src="/brand/icon.svg" alt="" className="size-7 rounded-lg" />
          <span className="hidden text-sm font-bold sm:block">SkyLedger</span>
        </div>
        <div className="flex gap-1 rounded-full border border-border bg-surface-2 p-1 text-xs font-semibold">
          <span className="rounded-full bg-primary px-3 py-1 text-primary-fg">Overview</span>
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
            <div className="mt-1 text-2xl font-extrabold">{k.value}</div>
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
          <AreaChart />
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