export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <img src="/brand/icon.svg" alt="" className="size-9 rounded-[11px] shadow-card" />
      <img src="/brand/wordmark.svg" alt="SkyLedger" className="hidden h-6 w-auto sm:block dark:sm:hidden" />
      <img src="/brand/wordmark-light.svg" alt="SkyLedger" className="hidden h-6 w-auto dark:sm:block" />
    </span>
  )
}