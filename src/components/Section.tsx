import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function Section({
  id, eyebrow, title, intro, children,
}: { id: string; eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-28 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</span>
          <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
          {intro && <p className="mt-3 text-muted">{intro}</p>}
        </div>
        <div className="mt-12">{children}</div>
      </motion.div>
    </section>
  )
}