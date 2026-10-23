const PENDING = 'skyledger-pending-email'
const SESSION = 'skyledger-session'
const PROFILE = 'skyledger-profile'
export const MOCK_OTP = '1234'

export function startOtp(email: string, profile?: { name: string; business: string }) {
  try {
    sessionStorage.setItem(PENDING, email.trim())
    if (profile) localStorage.setItem(PROFILE, JSON.stringify(profile))
  } catch {}
}

export function getPendingEmail() {
  try { return sessionStorage.getItem(PENDING) } catch { return null }
}

export async function verifyOtp(code: string) {
  await new Promise((r) => setTimeout(r, 900))
  const ok = code === MOCK_OTP
  if (ok) { try { localStorage.setItem(SESSION, '1') } catch {} }
  return ok
}

export function isSignedIn() {
  try { return localStorage.getItem(SESSION) === '1' } catch { return false }
}

export function signOut() {
  try { localStorage.removeItem(SESSION) } catch {}
}

export function maskEmail(email: string) {
  const [user, domain] = email.split('@')
  if (!domain) return email
  return `${user[0]}${'•'.repeat(Math.max(user.length - 1, 3))}@${domain}`
}

export function getProfile(): { name: string; business: string } | null {
  try {
    const raw = localStorage.getItem(PROFILE)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}