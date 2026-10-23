import { Bell, LogOut, Plus, Search } from 'lucide-react'
import { Link, Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo'
import ThemeToggle from '../../components/ThemeToggle'
import { navItems, tabs } from '../../data/nav'
import { getProfile, isSignedIn, signOut } from '../../lib/auth'

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}

function Tabs() {
  return (
    <div className="flex gap-1 rounded-full border border-border bg-surface-2 p-1">
      {tabs.map((t) => (
        <NavLink key={t.to} to={t.to} end={t.end}
          className={({ isActive }) =>
            `whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              isActive ? 'bg-text text-bg' : 'text-muted hover:text-text'
            }`}>
          {t.label}
        </NavLink>
      ))}
    </div>
  )
}

function Shell() {
  const nav = useNavigate()
  const name = getProfile()?.name || 'there'
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase() || 'S'

  return (
    <div className="min-h-screen">
      {/* top bar */}
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 rounded-full border border-border bg-surface/80 px-3 py-2 shadow-card backdrop-blur-xl">
          <Link to="/dashboard" aria-label="SkyLedger dashboard"><Logo /></Link>
          <div className="hidden md:block"><Tabs /></div>
          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-sm text-muted lg:flex">
              <Search className="size-4" /> Search
              <kbd className="rounded-md border border-border px-1.5 text-[10px]">⌘K</kbd>
            </button>
            <div className="md:hidden"><ThemeToggle /></div>
            <button aria-label="Notifications"
              className="relative grid size-10 place-items-center rounded-full border border-border bg-surface-2">
              <Bell className="size-4" />
              <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-danger text-[10px] font-bold text-white">3</span>
            </button>
            <button className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-fg shadow-card transition hover:opacity-90 sm:flex">
              <Plus className="size-4" /> New
            </button>
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface-2 p-1 lg:pr-4">
              <span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-fg">{initials}</span>
              <span className="hidden text-left leading-tight lg:block">
                <span className="block text-[10px] text-muted">{greeting()}</span>
                <span className="block text-sm font-semibold">{name}</span>
              </span>
            </div>
            <button aria-label="Sign out" onClick={() => { signOut(); nav('/') }}
              className="grid size-10 place-items-center rounded-full border border-border bg-surface-2 text-muted transition hover:text-text">
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] gap-4 px-4 pb-28 pt-24 md:pb-8">
        {/* left rail (desktop) */}
        <aside className="sticky top-24 hidden h-fit shrink-0 flex-col items-center gap-3 md:flex">
          <ThemeToggle vertical />
          <nav className="flex flex-col items-center gap-1 rounded-full border border-border bg-surface p-2 shadow-card">
            {navItems.map(({ to, label, icon: Icon, end, badge }) => (
              <NavLink key={to} to={to} end={end} aria-label={label}
                className={({ isActive }) =>
                  `group relative grid size-11 place-items-center rounded-full transition ${
                    isActive ? 'bg-primary text-primary-fg' : 'text-muted hover:bg-surface-2 hover:text-text'
                  }`}>
                <Icon className="size-5" />
                {badge > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-danger text-[10px] font-bold text-white">{badge}</span>
                )}
                <span className="pointer-events-none absolute left-full z-20 ml-3 whitespace-nowrap rounded-lg bg-text px-2.5 py-1 text-xs font-medium text-bg opacity-0 transition group-hover:opacity-100">
                  {label}
                </span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-4 overflow-x-auto md:hidden"><Tabs /></div>
          <Outlet />
        </main>
      </div>

      {/* bottom nav (mobile) */}
      <nav className="fixed inset-x-4 bottom-4 z-40 flex justify-between rounded-full border border-border bg-surface/90 p-2 shadow-card backdrop-blur-xl md:hidden">
        {navItems.map(({ to, label, icon: Icon, end, badge }) => (
          <NavLink key={to} to={to} end={end} aria-label={label}
            className={({ isActive }) =>
              `relative grid size-10 place-items-center rounded-full transition ${
                isActive ? 'bg-primary text-primary-fg' : 'text-muted'
              }`}>
            <Icon className="size-5" />
            {badge > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-danger text-[10px] font-bold text-white">{badge}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default function DashboardLayout() {
  if (!isSignedIn()) return <Navigate to="/login" replace />
  return <Shell />
}