import Link from 'next/link'
import type { ComponentProps } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border border-input bg-card text-foreground hover:bg-accent',
  ghost: 'text-foreground hover:bg-accent',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim()
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  variant?: Variant
  size?: Size
  className?: string
}

export function LinkButton({ variant, size, className, ...props }: LinkButtonProps) {
  return <Link {...props} className={buttonClass(variant, size, className)} />
}

type AnchorButtonProps = ComponentProps<'a'> & { variant?: Variant; size?: Size }

/** For links that leave the site (the app, Slack, etc.) */
export function AnchorButton({ variant, size, className, ...props }: AnchorButtonProps) {
  return <a {...props} className={buttonClass(variant, size, className)} />
}

type ButtonProps = ComponentProps<'button'> & { variant?: Variant; size?: Size }

export function Button({ variant, size, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} {...props} className={buttonClass(variant, size, className)} />
}
