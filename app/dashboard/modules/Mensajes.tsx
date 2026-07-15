'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE, TEXT_PRIMARY, TEXT_SECONDARY, GREEN } from '@/lib/constants'
import { Guest } from '@/lib/types'

interface Props { guests: Guest[] }

interface MsgTemplate { id: string; title: string; body: string }

const TEMPLATES: MsgTemplate[] = [
  { id: '1', title: 'Save the date', body: '¡Nos casamos! Guardad la fecha, pronto llegará la invitación oficial.' },
  { id: '2', title: 'Recordatorio de RSVP', body: 'Nos encantaría contar con vosotros. Confirmad vuestra asistencia antes del 30 de abril.' },
  { id: '3', title: 'Detalles del gran día', body: 'Ya tenemos todos los detalles listos: horario, ubicación y dress code en nuestra web.' },
  { id: '4', title: 'Agradecimiento', body: 'Gracias por acompañarnos en el día más especial de nuestras vidas. ¡Os queremos!' },
]

export default function Mensajes({ guests }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const confirmed = guests.filter(g => g.rsvp === 'Sí').length
  const pending = guests.filter(g => g.rsvp !== 'Sí' && g.rsvp !== 'No').length

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: TEXT_PRIMARY, marginBottom: 4 }}>Mensajes a invitados</h1>
      <p style={{ fontSize: 12, color: TEXT_SECONDARY, marginBottom: 20 }}>Enviad recordatorios y novedades a todos vuestros invitados desde un solo sitio.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14, padding: '16px 18px' }}>
          <p style={{ fontFamily: F, fontSize: 24, color: TEXT_PRIMARY }}>{guests.length}</p>
          <p style={{ fontSize: 11.5, color: TEXT_SECONDARY }}>Invitados totales</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14, padding: '16px 18px' }}>
          <p style={{ fontFamily: F, fontSize: 24, color: 'GREEN' }}>{confirmed}</p>
          <p style={{ fontSize: 11.5, color: TEXT_SECONDARY }}>Confirmados</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14, padding: '16px 18px' }}>
          <p style={{ fontFamily: F, fontSize: 24, color: '#B8862F' }}>{pending}</p>
          <p style={{ fontSize: 11.5, color: TEXT_SECONDARY }}>Pendientes de responder</p>
        </div>
      </div>

      <p style={{ fontFamily: F, fontSize: 18, color: TEXT_PRIMARY, marginBottom: 12 }}>Plantillas de mensaje</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {TEMPLATES.map(t => (
          <div key={t.id} onClick={() => setSelected(t.id)} style={{
            border: selected === t.id ? `1.5px solid ${BLUE}` : '1px solid #ECE9E4', background: selected === t.id ? '#F7F4EF' : 'white',
            borderRadius: 14, padding: '14px 18px', cursor: 'pointer'
          }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 4 }}>{t.title}</p>
            <p style={{ fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.5 }}>{t.body}</p>
          </div>
        ))}
      </div>

      <button disabled={!selected} style={{
        background: selected ? '#898a76' : '#DCD4C8', color: 'white', border: 'none', borderRadius: 999, padding: '12px 26px', fontSize: 13,
        cursor: selected ? 'pointer' : 'default'
      }}>
        Enviar a {pending > 0 ? `${pending} pendientes` : 'todos los invitados'}
      </button>
    </div>
  )
}
