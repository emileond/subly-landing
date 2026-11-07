/**
 * A calendar file (.ics) made in the browser, so a free tool can hand over its dates with no
 * sign-up: refund deadlines, renewals. All-day events with a reminder a few days before.
 */
export type CalendarEvent = { title: string; date: string; description?: string; remindDaysBefore?: number }

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
const ymd = (iso: string) => iso.replaceAll('-', '')
const nextDay = (iso: string) => new Date(Date.parse(`${iso}T00:00:00Z`) + 86_400_000).toISOString().slice(0, 10)

export function toIcs(name: string, events: CalendarEvent[]) {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '')
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Subly//Free tools//EN', 'CALSCALE:GREGORIAN', `X-WR-CALNAME:${esc(name)}`]
  events.forEach((e, i) => {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${stamp}-${i}@subly.app`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${ymd(e.date)}`,
      `DTEND;VALUE=DATE:${ymd(nextDay(e.date))}`,
      `SUMMARY:${esc(e.title)}`,
      ...(e.description ? [`DESCRIPTION:${esc(e.description)}`] : []),
    )
    if (e.remindDaysBefore) lines.push('BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${esc(e.title)}`, `TRIGGER:-P${e.remindDaysBefore}D`, 'END:VALARM')
    lines.push('END:VEVENT')
  })
  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}

/** Saves the file through a temporary link; nothing leaves the browser */
export function downloadIcs(filename: string, name: string, events: CalendarEvent[]) {
  const url = URL.createObjectURL(new Blob([toIcs(name, events)], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
