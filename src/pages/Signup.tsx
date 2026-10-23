import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import Field from '../components/Field'
import { startOtp } from '../lib/auth'

export default function Signup() {
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [email, setEmail] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    startOtp(email, { name: name.trim(), business: business.trim() })
    nav('/verify')
  }

  return (
    <AuthShell>
      <h1 className="text-2xl font-extrabold tracking-tight">Create your account</h1>
      <p className="mt-1.5 text-sm text-muted">Start tracking your whole business in minutes.</p>
      <form onSubmit={submit} className="mt-7 space-y-4">
        <Field label="Your name" required placeholder="Imani Okafor"
          value={name} onChange={(e) => setName(e.target.value)} />
        <Field label="Business name" required placeholder="Marlow & Fern"
          value={business} onChange={(e) => setBusiness(e.target.value)} />
        <Field label="Email" type="email" required placeholder="you@business.com"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-fg shadow-card transition hover:opacity-90">
          Create account <ArrowRight className="size-4" />
        </button>
      </form>
      <p className="mt-6 text-sm text-muted">
        Already have an account? <Link to="/login" className="font-semibold text-primary">Log in</Link>
      </p>
    </AuthShell>
  )
}