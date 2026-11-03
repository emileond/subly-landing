/**
 * A small deterministic face for people without a picture, in the spirit of
 * boring-avatars' "beam": a soft square, a rounded blob and a face, all drawn
 * from the kit's own colours (same generator as the app). The same seed
 * (a user id, or an email for someone not yet a member) always draws the same face.
 */

/** Backgrounds: the quiet end of the kit (violet wash and neutral greys) */
export const AVATAR_BACKGROUNDS = ['var(--brand-soft)', 'var(--secondary)', 'var(--accent)', 'var(--muted)'] as const
/** The blob behind the face: violet accents and the strong neutrals */
export const AVATAR_BLOBS = ['var(--brand)', 'var(--brand-ink)', 'var(--primary)', 'var(--muted-foreground)'] as const

export type AvatarArt = {
  background: (typeof AVATAR_BACKGROUNDS)[number]
  blob: (typeof AVATAR_BLOBS)[number]
  /** Blob placement in a 36 × 36 box */
  blobX: number
  blobY: number
  blobRotate: number
  blobScale: number
  /** Face placement and tilt */
  faceX: number
  faceY: number
  faceRotate: number
  /** Distance between the eyes, and whether the mouth is open (a smile) or a line */
  eyeSpread: number
  mouthOpen: boolean
}

/** 32-bit FNV-1a: small, stable across runtimes, spreads short ids well */
export function hashSeed(seed: string): number {
  let hash = 0x811c9dc5
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return hash >>> 0
}

/** The nth digit of the hash, 0 to `range - 1` (each digit reads a different slice of the hash) */
const unit = (hash: number, n: number, range: number) => Math.floor(hash / 10 ** n) % range

export function avatarArt(seed: string): AvatarArt {
  const hash = hashSeed(seed || '?')
  const sign = (n: number) => (unit(hash, n, 2) ? 1 : -1)
  return {
    background: AVATAR_BACKGROUNDS[unit(hash, 0, AVATAR_BACKGROUNDS.length)],
    blob: AVATAR_BLOBS[unit(hash, 1, AVATAR_BLOBS.length)],
    blobX: sign(2) * (4 + unit(hash, 3, 5)),
    blobY: sign(4) * (4 + unit(hash, 5, 5)),
    blobRotate: unit(hash, 6, 360),
    blobScale: 1.1 + unit(hash, 7, 4) / 10,
    faceX: sign(8) * unit(hash, 9, 4),
    faceY: sign(0) * unit(hash, 1, 3),
    faceRotate: sign(2) * unit(hash, 3, 10),
    eyeSpread: 5 + unit(hash, 4, 3),
    mouthOpen: unit(hash, 5, 2) === 1
  }
}
