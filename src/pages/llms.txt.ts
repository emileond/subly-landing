import { llmsIndex } from '@/lib/machine-pages'

export function GET() {
  return new Response(llmsIndex(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
