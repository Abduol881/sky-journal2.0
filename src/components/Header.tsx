import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border bg-surface/80 px-3 py-2 shadow-card backdrop-blur-xl">
        <a href="/" aria-label="SkyLedger home"><Logo /></a>

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-surface-2 p-1 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-text">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="/login" className="hidden px-3 text-sm font-semibold text-text sm:block">Log in</a>
          <a href="/signup"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-fg shadow-card transition hover:opacity-90">
            Get started
          </a>
        </div>
      </div>
    </header>
  )
}