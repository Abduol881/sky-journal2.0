import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { ClipboardEvent, KeyboardEvent } from 'react'

export type OtpState = 'idle' | 'verifying' | 'error' | 'success'

type Props = {
  value: string[]
  onChange: (v: string[]) => void
  state: OtpState
  onComplete?: (code: string) => void
}

export default function OtpInput({ value, onChange, state, onComplete }: Props) {
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const locked = state === 'verifying' || state === 'success'

  useEffect(() => { refs.current[0]?.focus() }, [])

  const setDigit = (i: number, d: string) => {
    const next = [...value]
    next[i] = d
    onChange(next)
    if (d && i < 3) refs.current[i + 1]?.focus()
    if (next.every(Boolean)) onComplete?.(next.join(''))
  }

  const onKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (value[i]) setDigit(i, '')
      else if (i > 0) {
        const next = [...value]
        next[i - 1] = ''
        onChange(next)
        refs.current[i - 1]?.focus()
      }
    } else if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus()
    else if (e.key === 'ArrowRight' && i < 3) refs.current[i + 1]?.focus()
  }

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    if (!text) return
    e.preventDefault()
    const next = ['', '', '', '']
    text.split('').forEach((c, i) => (next[i] = c))
    onChange(next)
    refs.current[Math.min(text.length, 3)]?.focus()
    if (text.length === 4) onComplete?.(text)
  }

  const tone =
    state === 'error' ? 'border-danger bg-danger/10 text-danger'
    : state === 'success' ? 'border-success bg-success text-white'
    : 'otp-box text-text'
  const bar =
    state === 'error' ? 'bg-danger' : state === 'success' ? 'bg-white/60' : 'bg-accent'

  return (
    <motion.div
      animate={state === 'error' ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.45 }}
      className="flex justify-center gap-3"
    >
      {value.map((digit, i) => (
        <div key={i} className="relative">
          <input
            ref={(el) => { refs.current[i] = el }}
            inputMode="numeric"
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            aria-label={`Digit ${i + 1}`}
            value={digit}
            disabled={locked}
            data-filled={!!digit}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setDigit(i, e.target.value.replace(/\D/g, '').slice(-1))}
            onKeyDown={(e) => onKeyDown(i, e)}
            onPaste={onPaste}
            className={`size-16 rounded-2xl border-2 text-center text-2xl font-extrabold outline-none transition sm:size-[72px] ${tone}`}
          />
          <span className={`pointer-events-none absolute inset-x-5 bottom-3 h-0.5 rounded-full ${bar}`} />
        </div>
      ))}
    </motion.div>
  )
}