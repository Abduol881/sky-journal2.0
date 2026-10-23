import { Moon, Sun, Volume2, VolumeX } from 'lucide-react'
import { useSyncExternalStore } from 'react'
import { isSoundOn, setSoundOn, subscribeSound } from '../lib/sound'
import { setTheme } from '../lib/theme'

export default function ThemeToggle({ vertical = false }: { vertical?: boolean }) {
  const sound = useSyncExternalStore(subscribeSound, isSoundOn)

  const pick = (p: 'light' | 'dark') => (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = document.documentElement.classList.contains('dark')
    if (isDark === (p === 'dark')) return
    setTheme(p, e.currentTarget)
  }
  const base = 'grid size-8 place-items-center rounded-full transition-colors'

  return (
    <div role="group" aria-label="Theme and sound"
      className={`flex items-center gap-1 rounded-full border border-border ${
        vertical ? 'flex-col bg-surface p-1.5 shadow-card' : 'bg-surface-2 p-1'
      }`}>
      <button aria-label="Light theme" onClick={pick('light')}
        className={`${base} bg-primary text-primary-fg dark:bg-transparent dark:text-muted`}>
        <Sun className="size-4" />
      </button>
      <button aria-label="Dark theme" onClick={pick('dark')}
        className={`${base} text-muted dark:bg-primary dark:text-primary-fg`}>
        <Moon className="size-4" />
      </button>
      <span className={vertical ? 'h-px w-5 bg-border' : 'h-5 w-px bg-border'} />
      <button aria-label={sound ? 'Turn sounds off' : 'Turn sounds on'} aria-pressed={sound}
        onClick={() => setSoundOn(!sound)}
        className={`${base} text-muted hover:text-text`}>
        {sound ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
      </button>
    </div>
  )
}