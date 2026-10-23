export type ThemePref = 'light' | 'dark' | 'system'
const KEY = 'skyledger-theme'

export function getPref(): ThemePref {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'light' || v === 'dark' || v === 'system') return v
  } catch {}
  return 'system'
}

function resolve(p: ThemePref) {
  if (p !== 'system') return p
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(p: ThemePref) {
  document.documentElement.classList.toggle('dark', resolve(p) === 'dark')
}

// dark mode opens as a circle from the button you pressed
export function wipe(origin: Element | null | undefined, change: () => void) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!origin || reduce || !('startViewTransition' in document)) {
    change()
    return
  }
  const r = origin.getBoundingClientRect()
  const x = r.left + r.width / 2
  const y = r.top + r.height / 2
  const end = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  document.startViewTransition(change).ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
      {
        duration: 620,
        easing: 'cubic-bezier(.65,0,.35,1)',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  })
}

export function setTheme(p: ThemePref, origin?: Element | null) {
  try { localStorage.setItem(KEY, p) } catch {}
  wipe(origin, () => applyTheme(p))
}