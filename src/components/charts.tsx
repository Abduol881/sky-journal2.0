import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import type { StockMonth } from '../data/mock'
import { smoothPath } from '../lib/chart'

export function Sparkline({ values }: { values: number[] }) {
  return (
    <svg viewBox="0 0 120 36" preserveAspectRatio="none" fill="none" className="h-9 w-full">
      <path d={smoothPath(values, 120, 36)} stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export function Delta({ v }: { v: number }) {
  const up = v >= 0
  const Icon = up ? ArrowUpRight : ArrowDownRight
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${up ? 'text-success' : 'text-danger'}`}>
      <Icon className="size-3.5" />{Math.abs(v)}%
    </span>
  )
}

export function Gauge({ pct }: { pct: number }) {
  const n = 60
  return (
    <svg viewBox="0 0 200 110" className="mx-auto w-full max-w-[260px]">
      {Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1)
        const a = Math.PI + t * Math.PI
        const on = t <= pct / 100
        return (
          <line key={i}
            x1={100 + 68 * Math.cos(a)} y1={100 + 68 * Math.sin(a)}
            x2={100 + 90 * Math.cos(a)} y2={100 + 90 * Math.sin(a)}
            strokeWidth="2" strokeLinecap="round"
            style={{
              stroke: on
                ? `color-mix(in oklab, var(--accent), var(--primary) ${Math.round(t * 100)}%)`
                : 'var(--border)',
            }} />
        )
      })}
      <text x="100" y="92" textAnchor="middle" fontSize="24" fontWeight="800" fill="var(--text)">{pct}%</text>
      <text x="100" y="106" textAnchor="middle" fontSize="8" fill="var(--muted)">Sales goal</text>
    </svg>
  )
}

const money = (v: number) => `$${v.toLocaleString('en-US')}`

export function StockBars({ data }: { data: StockMonth[] }) {
  const [hover, setHover] = useState(data.length - 1)
  const top = 50000
  const pct = (v: number) => `${Math.min(v / top, 1) * 100}%`
  const labels = ['$50k', '$40k', '$30k', '$20k', '$10k', '$0']

  return (
    <div className="flex gap-3">
      <div className="flex h-56 flex-col justify-between pb-6 text-[11px] text-muted">
        {labels.map((l) => <span key={l}>{l}</span>)}
      </div>
      <div className="relative min-w-0 flex-1">
        <div className="absolute inset-x-0 top-0 flex h-[12.5rem] flex-col justify-between">
          {labels.map((l) => <div key={l} className="border-t border-dashed border-border" />)}
        </div>
        <div className="relative flex h-56 gap-1.5">
          {data.map((d, i) => (
            <div key={d.month} className="relative flex flex-1 flex-col"
              onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} tabIndex={0}>
              <div className="flex flex-1 items-end justify-center gap-0.5">
                <div className="w-1/4 rounded-t-md bg-warning" style={{ height: pct(d.in) }} />
                <div className="w-1/4 rounded-t-md bg-success" style={{ height: pct(d.out) }} />
                <div className={`w-1/3 rounded-t-md transition-colors ${hover === i ? 'bg-primary' : 'bg-text/10'}`}
                  style={{ height: pct(d.value) }} />
              </div>
              <span className="h-6 pt-1.5 text-center text-[11px] text-muted">{d.month}</span>

              {hover === i && (
                <div className={`pointer-events-none absolute top-2 z-10 w-40 rounded-2xl border border-border bg-surface p-3 text-left text-xs shadow-card ${
                  i < 3 ? 'left-0' : i > data.length - 4 ? 'right-0' : 'left-1/2 -translate-x-1/2'
                }`}>
                  <div className="mb-1.5 font-bold">{d.month}</div>
                  {[
                    ['bg-warning', 'Stock in', d.in],
                    ['bg-success', 'Stock out', d.out],
                    ['bg-primary', 'Stock value', d.value],
                  ].map(([dot, label, v]) => (
                    <div key={label as string} className="flex items-center justify-between py-0.5">
                      <span className="flex items-center gap-1.5 text-muted">
                        <span className={`size-2 rounded-full ${dot}`} />{label}
                      </span>
                      <b>{money(v as number)}</b>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}