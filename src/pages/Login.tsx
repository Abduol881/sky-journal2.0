import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import Field from '../components/Field'
import { startOtp } from '../lib/auth'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    startOtp(email)
    nav('/verify')
  }

  return (
    <AuthShell>
      <h1 className="text-2xl font-extrabold tracking-tight">Welcome back</h1>
      <p className="mt-1.5 text-sm text-muted">Enter your email and we will send you a 4-digit code.</p>
      <form onSubmit={submit} className="mt-7 space-y-4">
        <Field label="Email" type="email" required placeholder="you@business.com"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-fg shadow-card transition hover:opacity-90">
          Send code <ArrowRight className="size-4" />
        </button>
      </form>
      <p className="mt-6 text-sm text-muted">
        New to SkyLedger? <Link to="/signup" className="font-semibold text-primary">Create an account</Link>
      </p>
    </AuthShell>
  )
}