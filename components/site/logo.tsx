export function LogoMark({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 33.59 52.18" className={className} fill="currentColor" aria-hidden="true">
      <path d="M33.08,27.2,26,20.06,11.24,33.73a2.27,2.27,0,0,1-2.75.14L7.63,33,2.48,37.79a3.39,3.39,0,0,0-1.15,2.67L4.1,51.32c0,.8,1.29,1.16,2,.57L33,29.64A1.61,1.61,0,0,0,33.08,27.2Z" />
      <path d="M25.11,19.21l.85.85,5.14-4.79a3.38,3.38,0,0,0,1.16-2.66L29.41.86c0-.8-1.29-1.16-2-.57L.6,23.44a1.61,1.61,0,0,0-.08,2.44L7.63,33,22.36,19.34A2.28,2.28,0,0,1,25.11,19.21Z" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-6 w-auto text-brand" />
      <span className="font-display text-xl font-bold tracking-tight">Subly</span>
    </span>
  )
}
