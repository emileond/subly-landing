import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

const font = (name: string) => readFile(path.join(process.cwd(), 'assets/fonts', name))

const DEFAULT_TITLE = 'Your money, under control. Your next move, clear.'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = (searchParams.get('title') || DEFAULT_TITLE).slice(0, 90)
  const size = title.length > 60 ? 64 : title.length > 36 ? 76 : 92

  const logo = `data:image/svg+xml;base64,${(await readFile(path.join(process.cwd(), 'public/logo-dark.svg'))).toString('base64')}`
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={34} height={52} alt="" />
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
