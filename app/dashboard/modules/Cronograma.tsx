'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE } from '@/lib/constants'
import { Milestone } from '@/lib/types'

interface Props { milestones: Milestone[]; setMilestones: (m: Milestone[]) => void; weddingDate: string; setWeddingDate: (d: string) => void }

export default function Cronograma({ milestones, setMilestones, weddingDate, setWeddingDate }: Props) {
  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')

  let daysLeft: number | null = null
  let hoursLeft = 0
  if (weddingDate) {
    const diff = new Date(weddingDate).getTime() - Date.now()
    daysLeft = Math.max(0, Math.floor(diff / 86400000))
    hoursLeft = Math.max(0, Math.floor((diff % 86400000) / 3600000))
  }

  function add() {
    if (!newTitle.trim() || !newDate) return
    setMilestones([...milestones, { id: Date.now().toString(), title: newTitle, date: newDate, done: false }])
    setNewTitle(''); setNewDate('')
  }

  function toggle(id: string) {
    setMilestones(milestones.map(m => m.id === id ? { ...m, done: !m.done } : m))
  }

  function remove(id: string) {
    setMilestones(milestones.filter(m => m.id !== id))
  }

  const sorted = [...milestones].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 20 }}>Cronograma</h1>

      <div style={{ background: `linear-gradient(135deg, #F1E7D0, #F8F3E8)`, borderRadius: 16, padding: '28px 32px', marginBottom: 24 }}>
        <p style={{ fontSize: 12, color: MUTE, marginBottom: 6 }}>Fecha de la boda</p>
        <input
          type="date" value={weddingDate} onChange={e => setWeddingDate(e.target.value)}
          style={{ border: '1px solid #E3DCC9', borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none', marginBottom: 16, background: 'white' }}
        />
        {daysLeft !== null ? (
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: F, fontSize: 64, fontWeight: 300, color: BLUE, lineHeight: 1 }}>{daysLeft}</p>
              <p style={{ fontSize: 11, color: MUTE, letterSpacing: '0.08em', marginTop: 4 }}>DÍAS</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: F, fontSize: 64, fontWeight: 300, color: BLUE, lineHeight: 1 }}>{hoursLeft}</p>
              <p style={{ fontSize: 11, color: MUTE, letterSpacing: '0.08em', marginTop: 4 }}>HORAS</p>
            </div>
          </div>
        ) : (
          <p style={{ fontSize: 13, color: MUTE }}>Introduce la fecha para ver la cuenta atrás</p>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Hito (ej: Enviar invitaciones)" style={{ flex: 1, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
        <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} style={{ border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 14px', fontSize: 13, outline: 'none' }} />
        <button onClick={add} style={{ background: BLUE, color: 'white', border: 'none', borderRadius: 12, padding: '11px 22px', fontSize: 13, cursor: 'pointer' }}>Añadir</button>
      </div>

      {sorted.length === 0 ? (
        <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '30px 0' }}>Sin hitos todavía.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {sorted.map((m) => {
            const isPast = new Date(m.date) < new Date()
            return (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'white', border: '1px solid #F5EFE0', borderRadius: 12, marginBottom: 6 }}>
                <span onClick={() => toggle(m.id)} style={{ width: 18, height: 18, borderRadius: 6, flexShrink: 0, border: m.done ? 'none' : '1.5px solid #E3DCC9', background: m.done ? BLUE : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  {m.done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, color: m.done ? '#C9BCA8' : INK, textDecoration: m.done ? 'line-through' : 'none' }}>{m.title}</p>
                  <p style={{ fontSize: 11, color: isPast && !m.done ? '#C0594F' : MUTE }}>
                    {new Date(m.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {isPast && !m.done ? ' · Vencido' : ''}
                  </p>
                </div>
                <button onClick={() => remove(m.id)} style={{ background: 'none', border: 'none', color: '#C9BCA8', cursor: 'pointer', fontSize: 16 }}>×</button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
