import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

const font = (name: string) => readFile(path.join(process.cwd(), 'assets/fonts', name))

const DEFAULT_TITLE = 'Your recurring money, on autopilot.'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = (searchParams.get('title') || DEFAULT_TITLE).slice(0, 90)
  const size = title.length > 60 ? 64 : title.length > 36 ? 76 : 92

  const [display, sans, mono] = await Promise.all([
    font('bricolage-700.ttf'),
    font('geist-500.ttf'),
    font('geist-mono-500.ttf'),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0E0E10',
          backgroundImage:
            'radial-gradient(circle at 85% 0%, rgba(140,120,255,0.38), rgba(14,14,16,0) 55%), radial-gradient(circle at 0% 100%, rgba(140,120,255,0.12), rgba(14,14,16,0) 50%)',
          color: '#F2F2F4',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="34" height="52" viewBox="0 0 33.59 52.18" fill="#8C78FF">
            <path d="M33.08,27.2,26,20.06,11.24,33.73a2.27,2.27,0,0,1-2.75.14L7.63,33,2.48,37.79a3.39,3.39,0,0,0-1.15,2.67L4.1,51.32c0,.8,1.29,1.16,2,.57L33,29.64A1.61,1.61,0,0,0,33.08,27.2Z" />
            <path d="M25.11,19.21l.85.85,5.14-4.79a3.38,3.38,0,0,0,1.16-2.66L29.41.86c0-.8-1.29-1.16-2-.57L.6,23.44a1.61,1.61,0,0,0-.08,2.44L7.63,33,22.36,19.34A2.28,2.28,0,0,1,25.11,19.21Z" />
          </svg>
          <div style={{ fontFamily: 'Bricolage', fontSize: 44, letterSpacing: -1 }}>Subly</div>
        </div>

        <div
          style={{
            fontFamily: 'Bricolage',
            fontSize: size,
            lineHeight: 1.04,
            letterSpacing: -2,
            maxWidth: 980,
            display: 'flex',
          }}
        >
          {title}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Geist', fontSize: 30, color: '#A5A5B0', display: 'flex' }}>
            The finance teammate for small teams
          </div>
          <div style={{ fontFamily: 'GeistMono', fontSize: 28, color: '#A898FF', display: 'flex' }}>subly.app</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Bricolage', data: display, weight: 700, style: 'normal' },
        { name: 'Geist', data: sans, weight: 500, style: 'normal' },
        { name: 'GeistMono', data: mono, weight: 500, style: 'normal' },
      ],
    },
  )
}
