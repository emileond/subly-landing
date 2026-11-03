import { avatarArt } from '@/lib/avatar-art'

const SIZES = { xs: 'h-5 w-5', sm: 'h-6 w-6', md: 'h-8 w-8', lg: 'h-10 w-10' } as const

/** A small generated face, the same one the app draws for people without a picture. */
export function Avatar({ seed, size = 'md', className = '' }: { seed: string; size?: keyof typeof SIZES; className?: string }) {
  const art = avatarArt(seed)
  return (
    <svg
      viewBox="0 0 36 36"
      aria-hidden="true"
      role="presentation"
      className={`inline-block shrink-0 overflow-hidden rounded-full bg-secondary align-middle ${SIZES[size]} ${className}`}
    >
      <rect width="36" height="36" style={{ fill: art.background }} />
      <rect
        x="0"
        y="0"
        width="36"
        height="36"
        rx="36"
        transform={`translate(${art.blobX} ${art.blobY}) rotate(${art.blobRotate} 18 18) scale(${art.blobScale})`}
        style={{ fill: art.blob }}
      />
      <g
        transform={`translate(${art.faceX} ${art.faceY}) rotate(${art.faceRotate} 18 18)`}
        style={{ fill: 'none', stroke: 'var(--card)', strokeLinecap: 'round' }}
        strokeWidth="1.6"
      >
        {art.mouthOpen ? (
          <path d="M13 21 a1 0.75 0 0 0 10 0 Z" style={{ fill: 'var(--card)', stroke: 'none' }} />
        ) : (
          <path d="M14 22 q4 2.4 8 0" />
        )}
        <line x1={18 - art.eyeSpread / 2} y1="14" x2={18 - art.eyeSpread / 2} y2="16" />
        <line x1={18 + art.eyeSpread / 2} y1="14" x2={18 + art.eyeSpread / 2} y2="16" />
      </g>
    </svg>
  )
}
