import type { InputHTMLAttributes } from 'react'

export default function Field({ label, ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-left">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border border-border bg-surface-2 px-4 py-3 text-sm outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-accent/30"
      />
    </label>
  )
}