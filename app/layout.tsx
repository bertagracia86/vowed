import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vowed — Wedding Planner',
  description: 'Organiza vuestra boda perfecta, paso a paso.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
