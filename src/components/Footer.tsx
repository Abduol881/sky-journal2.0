import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-10 pt-6">
      <div className="flex flex-col items-center justify-between gap-4 rounded-full border border-border bg-surface/70 px-6 py-4 text-sm text-muted backdrop-blur sm:flex-row">
        <Logo />
        <span>© {new Date().getFullYear()} SkyLedger. All rights reserved.</span>
      </div>
    </footer>
  )
}