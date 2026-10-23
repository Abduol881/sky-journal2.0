import { motion } from 'framer-motion'
import { ArrowRight, Check, CircleAlert, Lock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import OtpInput from '../components/OtpInput'
import type { OtpState } from '../components/OtpInput'
import { MOCK_OTP, getPendingEmail, maskEmail, verifyOtp } from '../lib/auth'

const RESEND_SECONDS = 30

function StatusIcon({ state }: { state: OtpState }) {
  const tone =
    state === 'error' ? 'border-danger/40 bg-danger/10 text-danger'
    : state === 'success' ? 'border-success/40 bg-success text-white'
    : 'border-border bg-surface-2 text-primary'
  return (
    <div className="relative mx-auto grid size-20 place-items-center">
      {state === 'verifying' && (
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
      )}
      <motion.div key={state} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className={`grid size-16 place-items-center rounded-full border-2 ${tone}`}>
        {state === 'success' ? <Check className="size-7" /> : <Lock className="size-6" />}
      </motion.div>
    </div>
  )
}

export default function Verify() {
  const nav = useNavigate()
  const email = getPendingEmail()
  const [digits, setDigits] = useState(['', '', '', ''])
  const [state, setState] = useState<OtpState>('idle')
  const [left, setLeft] = useState(RESEND_SECONDS)

  useEffect(() => { if (!email) nav('/login', { replace: true }) }, [email, nav])

  useEffect(() => {
    if (left <= 0) return
    const t = setTimeout(() => setLeft((l) => l - 1), 1000)
    return () => clearTimeout(t)
  }, [left])

  if (!email) return null

  const complete = digits.every(Boolean)

  const submit = async (code: string) => {
    setState('verifying')
    const ok = await verifyOtp(code)
    setState(ok ? 'success' : 'error')
  }

  const change = (v: string[]) => {
    setDigits(v)
    if (state === 'error') setState('idle')
  }

  const resend = () => {
    setDigits(['', '', '', ''])
    setState('idle')
    setLeft(RESEND_SECONDS)
  }

  const onButton = () => {
    if (state === 'success') nav('/dashboard')
    else if (complete) submit(digits.join(''))
  }

  return (
    <AuthShell>
      <StatusIcon state={state} />
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight">
        {state === 'success' ? "You're verified" : "Verify it's you"}
      </h1>
      <p className="mt-1.5 text-sm text-muted">
        {state === 'success' ? (
          'Your account has been verified.'
        ) : (
          <>Enter the 4-digit code we just sent to<br />
            <b className="text-text">{maskEmail(email)}</b></>
        )}
      </p>

      <div className="mt-7">
        <OtpInput value={digits} onChange={change} state={state} onComplete={submit} />
      </div>

      <div className="mt-4 h-6 text-sm font-medium text-danger">
        {state === 'error' && (
          <span className="inline-flex items-center gap-1.5">
            <CircleAlert className="size-4" /> That code didn't match. Try again.
          </span>
        )}
      </div>

      <button onClick={onButton} disabled={state === 'verifying' || (state !== 'success' && !complete)}
        className={`mt-2 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-card transition hover:opacity-90 disabled:opacity-50 ${
          state === 'success' ? 'bg-success text-white' : 'bg-primary text-primary-fg'
        }`}>
        {state === 'verifying' && (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {state === 'verifying' ? 'Verifying' : state === 'success' ? <>Continue <ArrowRight className="size-4" /></> : 'Verify code'}
      </button>

      {state !== 'success' && (
        <p className="mt-5 flex items-center justify-center gap-2 text-sm text-muted">
          Didn't get a code?
          {left > 0 ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="size-3.5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
              Resend in <b className="text-text">0:{String(left).padStart(2, '0')}</b>
            </span>
          ) : (
            <button onClick={resend} className="font-semibold text-primary">Resend code</button>
          )}
        </p>
      )}

      {import.meta.env.DEV && (
        <p className="mt-6 text-xs text-muted">Dev only: your OTP is <b className="text-text">{MOCK_OTP}</b></p>
      )}
    </AuthShell>
  )
}