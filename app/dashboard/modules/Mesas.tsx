'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE } from '@/lib/constants'
import { TableRow, Guest } from '@/lib/types'

interface Props { tables: TableRow[]; setTables: (t: TableRow[]) => void; guests: Guest[]; setGuests: (g: Guest[]) => void }

export default function Mesas({ tables, setTables, guests, setGuests }: Props) {
  const [newName, setNewName] = useState('')
  const [newShape, setNewShape] = useState<'round' | 'rect' | 'standing'>('round')
  const [draggedGuest, setDraggedGuest] = useState<string | null>(null)

  function addTable() {
    if (!newName.trim()) return
    setTables([...tables, { id: Date.now().toString(), name: newName, shape: newShape }])
    setNewName('')
  }

  function removeTable(id: string, name: string) {
    setTables(tables.filter(t => t.id !== id))
    setGuests(guests.map(g => g.table_name === name ? { ...g, table_name: null } : g))
  }

  function assignGuest(guestId: string, tableName: string) {
    setGuests(guests.map(g => g.id === guestId ? { ...g, table_name: tableName } : g))
    setDraggedGuest(null)
  }

  const unassigned = guests.filter(g => !g.table_name)

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Mesas</h1>
      <p style={{ fontSize: 12, color: MUTE, marginBottom: 24 }}>{tables.length} mesas · {guests.length - unassigned.length} invitados asignados</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTable()} placeholder="Nombre de la mesa (ej: Mesa 1)" style={{ flex: 1, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
        <select value={newShape} onChange={e => setNewShape(e.target.value as any)} style={{ border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 14px', fontSize: 13, outline: 'none', background: 'white' }}>
          <option value="round">Redonda</option>
          <option value="rect">Rectangular</option>
          <option value="standing">Zona de pie</option>
        </select>
        <button onClick={addTable} style={{ background: BLUE, color: 'white', border: 'none', borderRadius: 12, padding: '11px 22px', fontSize: 13, cursor: 'pointer' }}>+ Mesa</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {tables.length === 0 ? (
            <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '40px 0', gridColumn: '1/-1' }}>Sin mesas todavía. Añadid la primera arriba.</p>
          ) : tables.map(table => {
            const seated = guests.filter(g => g.table_name === table.name)
            const isStanding = table.shape === 'standing'
            return (
              <div
                key={table.id}
                onDragOver={e => e.preventDefault()}
                onDrop={() => { if (draggedGuest && !isStanding) assignGuest(draggedGuest, table.name) }}
                style={{ border: `1.5px ${isStanding ? 'dashed' : 'solid'} ${isStanding ? '#C9BCE8' : '#E3DCC9'}`, borderRadius: 14, padding: 16, minHeight: 100, background: isStanding ? '#F8F5FE' : 'white' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <p style={{ fontFamily: F, fontSize: 15, color: INK }}>{table.name}</p>
                  <button onClick={() => removeTable(table.id, table.name)} style={{ background: 'none', border: 'none', color: '#C9BCA8', cursor: 'pointer', fontSize: 16 }}>×</button>
                </div>
                {!isStanding && seated.map(g => (
                  <div key={g.id} draggable onDragStart={() => setDraggedGuest(g.id)} style={{ background: '#F8F3E8', borderRadius: 8, padding: '4px 10px', fontSize: 11, color: INK, marginBottom: 4, cursor: 'grab' }}>
                    {g.name}
                  </div>
                ))}
                {!isStanding && seated.length === 0 && <p style={{ fontSize: 11, color: '#C9BCA8' }}>Arrastra invitados aquí</p>}
                {isStanding && <p style={{ fontSize: 11, color: '#9B8EC4' }}>Zona de pie</p>}
              </div>
            )
          })}
        </div>

        <div style={{ border: '1px solid #F5EFE0', borderRadius: 14, padding: 16, alignSelf: 'flex-start', maxHeight: 500, overflowY: 'auto' }}>
          <p style={{ fontSize: 11, color: MUTE, marginBottom: 10 }}>Sin asignar ({unassigned.length})</p>
          {unassigned.length === 0 ? (
            <p style={{ fontSize: 11, color: '#C9BCA8' }}>Todos asignados ♡</p>
          ) : unassigned.map(g => (
            <div key={g.id} draggable onDragStart={() => setDraggedGuest(g.id)} style={{ background: 'white', border: '1px solid #F5EFE0', borderRadius: 8, padding: '7px 10px', fontSize: 12, color: INK, marginBottom: 6, cursor: 'grab' }}>
              {g.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
