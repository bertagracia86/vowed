'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE } from '@/lib/constants'
import { Guest } from '@/lib/types'

interface Props { guests: Guest[]; setGuests: (g: Guest[]) => void }

export default function Invitados({ guests, setGuests }: Props) {
  const [newName, setNewName] = useState('')
  const confirmed = guests.filter(g => g.rsvp === 'Sí').length
  const pending = guests.filter(g => g.rsvp === 'Pendiente').length

  function add() {
    if (!newName.trim()) return
    setGuests([...guests, { id: Date.now().toString(), name: newName, contact: '', rsvp: 'Pendiente', table_name: null, menu: '' }])
    setNewName('')
  }

  function update(id: string, field: keyof Guest, value: string) {
    setGuests(guests.map(g => g.id === id ? { ...g, [field]: value } : g))
  }

  function remove(id: string) {
    setGuests(guests.filter(g => g.id !== id))
  }

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Invitados</h1>
      <p style={{ fontSize: 12, color: MUTE, marginBottom: 24 }}>{guests.length} en la lista · {confirmed} confirmados · {pending} por confirmar</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="Nombre del invitado..." style={{ flex: 1, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
        <button onClick={add} style={{ background: BLUE, color: 'white', border: 'none', borderRadius: 12, padding: '11px 22px', fontSize: 13, cursor: 'pointer' }}>Añadir</button>
      </div>

      {guests.length === 0 ? (
        <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '40px 0' }}>Sin invitados todavía.</p>
      ) : (
        <div style={{ border: '1px solid #F5EFE0', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 0.8fr 1fr 1fr auto', padding: '10px 18px', background: '#FBF9F5', borderBottom: '1px solid #F5EFE0' }}>
            {['NOMBRE', 'CONTACTO', 'MESA', 'MENÚ', 'ASISTENCIA', ''].map(h => (
              <span key={h} style={{ fontSize: 10, color: MUTE, letterSpacing: '0.04em' }}>{h}</span>
            ))}
          </div>
          {guests.map((g, i) => (
            <div key={g.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 0.8fr 1fr 1fr auto', alignItems: 'center', padding: '10px 18px', borderBottom: i < guests.length - 1 ? '1px solid #F5EFE0' : 'none' }}>
              <span style={{ fontSize: 13, color: INK }}>{g.name}</span>
              <input value={g.contact} onChange={e => update(g.id, 'contact', e.target.value)} placeholder="Email o teléfono" style={{ border: 'none', background: 'transparent', fontSize: 12, color: MUTE, outline: 'none' }} />
              <input value={g.table_name || ''} onChange={e => update(g.id, 'table_name', e.target.value)} placeholder="—" style={{ border: 'none', background: 'transparent', fontSize: 12, color: MUTE, outline: 'none', width: '100%' }} />
              <input value={g.menu} onChange={e => update(g.id, 'menu', e.target.value)} placeholder="Normal" style={{ border: 'none', background: 'transparent', fontSize: 12, color: MUTE, outline: 'none' }} />
              <select value={g.rsvp} onChange={e => update(g.id, 'rsvp', e.target.value)} style={{ border: '1px solid #F5EFE0', borderRadius: 8, padding: '5px 8px', fontSize: 11, color: INK, background: 'white', outline: 'none' }}>
                <option>Pendiente</option><option>Sí</option><option>No</option>
              </select>
              <button onClick={() => remove(g.id)} style={{ background: 'none', border: 'none', color: '#C9BCA8', cursor: 'pointer', fontSize: 16, padding: '0 4px' }}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
