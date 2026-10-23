import { useLocation } from 'react-router-dom'

export default function ComingSoon() {
  const { pathname } = useLocation()
  const raw = pathname.split('/').filter(Boolean).pop() ?? ''
  const name = raw.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase())
  return (
    <div className="grid min-h-[50vh] place-items-center rounded-card border border-border bg-surface p-8 text-center shadow-card">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">{name}</h1>
        <p className="mt-2 text-sm text-muted">This page is coming in a later step.</p>
      </div>
    </div>
  )
}