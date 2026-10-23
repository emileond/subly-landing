import Image from 'next/image'

/** The real Subly mark (public/logo.svg, public/logo-dark.svg), never recoloured. */
export function LogoMark({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <>
      <Image src="/logo.svg" alt="" width={33} height={52} unoptimized className={`${className} dark:hidden`} />
      <Image src="/logo-dark.svg" alt="" width={33} height={52} unoptimized className={`${className} hidden dark:block`} />
    </>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-6 w-auto" />
      <span className="font-display text-xl font-bold tracking-tight">Subly</span>
    </span>
  )
}
