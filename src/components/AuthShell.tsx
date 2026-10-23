import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

export default function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative grid min-h-screen place-items-center px-4 py-24">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6">
        <Link to="/" aria-label="SkyLedger home"><Logo /></Link>
        <ThemeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-[28px] border border-border bg-surface p-7 text-center shadow-card sm:p-9"
      >
        {children}
      </motion.div>
    </div>
  )
}