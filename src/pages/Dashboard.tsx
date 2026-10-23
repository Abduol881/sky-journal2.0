import { Navigate, useNavigate } from 'react-router-dom'
import { isSignedIn, signOut } from '../lib/auth'

export default function Dashboard() {
  const nav = useNavigate()
  if (!isSignedIn()) return <Navigate to="/login" replace />
  return (
    <div className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">You're in 🎉</h1>
        <p className="mt-2 text-muted">The dashboard is the next thing we build.</p>
        <button onClick={() => { signOut(); nav('/') }}
          className="mt-6 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold shadow-card">
          Sign out
        </button>
      </div>
    </div>
  )
}