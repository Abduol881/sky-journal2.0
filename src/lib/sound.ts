const KEY = 'skyledger-sound'
let ctx: AudioContext | null = null
let enabled = read()
const listeners = new Set<() => void>()

function read() {
  try { return localStorage.getItem(KEY) !== 'off' } catch { return true }
}

export const isSoundOn = () => enabled

export function subscribeSound(cb: () => void) {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}

export function setSoundOn(on: boolean) {
  enabled = on
  try { localStorage.setItem(KEY, on ? 'on' : 'off') } catch {}
  listeners.forEach((l) => l())
  if (on) playTap()
}

// a short, soft phone-style touch tick
export function playTap() {
  if (!enabled) return
  ctx ??= new AudioContext()
  if (ctx.state === 'suspended') void ctx.resume()
  const t = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(1400, t)
  osc.frequency.exponentialRampToValueAtTime(700, t + 0.04)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(0.18, t + 0.004)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06)
  osc.connect(gain).connect(ctx.destination)
  osc.start(t)
  osc.stop(t + 0.07)
}

// one global listener: any button, link or toggle makes the tap sound
export function installTapSound() {
  if (document.documentElement.dataset.tapSound) return
  document.documentElement.dataset.tapSound = '1'
  document.addEventListener(
    'pointerdown',
    (e) => {
      if (!enabled) return
      const el = (e.target as Element | null)?.closest(
        'button, a[href], [role="button"], summary, label[for], input[type="checkbox"], input[type="radio"]',
      )
      if (!el || (el as HTMLButtonElement).disabled) return
      playTap()
    },
    { capture: true, passive: true },
  )
}