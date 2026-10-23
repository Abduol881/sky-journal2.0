import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import DashboardPreview from './DashboardPreview'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease, delay },
})

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-36 text-center">
      <motion.div {...rise(0)}
        className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs font-semibold text-muted shadow-card backdrop-blur">
        <span className="size-1.5 rounded-full bg-success" />
        Your business journal and inventory, in one place
      </motion.div>

      <motion.h1 {...rise(0.08)}
        className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
        Run your whole business from one <span className="text-primary">calm dashboard</span>
      </motion.h1>

      <motion.p {...rise(0.16)} className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted sm:text-lg">
        Track stock, sales and daily notes together. See what is moving, what is running low
        and how the business is really doing, without the spreadsheets.
      </motion.p>

      <motion.div {...rise(0.24)} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href="/signup"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-fg shadow-card transition hover:opacity-90">
          Start free <ArrowRight className="size-4" />
        </a>
        <a href="#how"
          className="rounded-full border border-border bg-surface/70 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-surface">
          See how it works
        </a>
      </motion.div>

      <motion.div {...rise(0.36)} className="mt-14">
        <DashboardPreview />
      </motion.div>
    </section>
  )
}