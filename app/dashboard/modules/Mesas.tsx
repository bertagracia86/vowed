'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE } from '@/lib/constants'
import { TableRow, Guest } from '@/lib/types'

interface Props { tables: TableRow[]; setTables: (t: TableRow[]) => void; guests: Guest[]; setGuests: (g: Guest[]) => void }

export default function Mesas({ tables, setTables, guests, setGuests }: Props) {
  const [newName, setNewName] = useState('')
  const [newShape, setNewShape] = useState<'round' | 'rect' | 'standing'>('round')
  const [newCapacity, setNewCapacity] = useState('8')
  const [draggedGuest, setDraggedGuest] = useState<string | null>(null)
  const [dragOverTable, setDragOverTable] = useState<string | null>(null)
  const [dragOverUnassigned, setDragOverUnassigned] = useState(false)

  function addTable() {
    if (!newName.trim()) return
    setTables([...tables, { id: Date.now().toString(), name: newName, shape: newShape, capacity: Number(newCapacity) || 8 }])
    setNewName(''); setNewCapacity('8')
  }

  function removeTable(id: string, name: string) {
    setTables(tables.filter(t => t.id !== id))
    setGuests(guests.map(g => g.table_name === name ? { ...g, table_name: null } : g))
  }

  function assignGuest(guestId: string, tableName: string | null) {
    setGuests(guests.map(g => g.id === guestId ? { ...g, table_name: tableName } : g))
    setDraggedGuest(null)
    setDragOverTable(null)
    setDragOverUnassigned(false)
  }

  const unassigned = guests.filter(g => !g.table_name)
  const totalCapacity = tables.filter(t => t.shape !== 'standing').reduce((a, t) => a + t.capacity, 0)

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Plano de mesas</h1>
      <p style={{ fontSize: 12, color: MUTE, marginBottom: 24 }}>
        {tables.length} mesas · {guests.length - unassigned.length}/{guests.length} invitados asignados · {totalCapacity} plazas disponibles
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <input value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTable()} placeholder="Nombre de la mesa (ej: Mesa 1)" style={{ flex: 1, minWidth: 160, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
        <select value={newShape} onChange={e => setNewShape(e.target.value as any)} style={{ border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 14px', fontSize: 13, outline: 'none', background: 'white' }}>
          <option value="round">Redonda</option>
          <option value="rect">Rectangular</option>
          <option value="standing">Zona de pie</option>
        </select>
        {newShape !== 'standing' && (
          <input value={newCapacity} onChange={e => setNewCapacity(e.target.value)} type="number" min={1} placeholder="Plazas" style={{ width: 90, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 14px', fontSize: 13, outline: 'none' }} />
        )}
        <button onClick={addTable} style={{ background: BLUE, color: 'white', border: 'none', borderRadius: 12, padding: '11px 22px', fontSize: 13, cursor: 'pointer' }}>+ Mesa</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, alignContent: 'flex-start' }}>
          {tables.length === 0 ? (
            <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '40px 0', gridColumn: '1/-1' }}>Sin mesas todavía. Añadid la primera arriba.</p>
          ) : tables.map(table => {
            const seated = guests.filter(g => g.table_name === table.name)
            const isStanding = table.shape === 'standing'
            const isFull = !isStanding && seated.length >= table.capacity
            const isOver = dragOverTable === table.id
            return (
              <div
                key={table.id}
                onDragOver={e => { e.preventDefault(); if (!isStanding && !isFull) setDragOverTable(table.id) }}
                onDragLeave={() => setDragOverTable(null)}
                onDrop={() => { if (draggedGuest && !isStanding && !isFull) assignGuest(draggedGuest, table.name) }}
                style={{
                  border: `1.5px ${isStanding ? 'dashed' : 'solid'} ${isStanding ? '#C9BCE8' : isOver ? BLUE : '#E3DCC9'}`,
                  borderRadius: table.shape === 'round' ? 20 : 14, padding: 16, minHeight: 130,
                  background: isStanding ? '#F8F5FE' : isOver ? '#F4EFE8' : 'white', transition: 'background 0.15s, border-color 0.15s',
                  display: 'flex', flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <p style={{ fontFamily: F, fontSize: 15, color: INK }}>{table.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {!isStanding && (
                      <span style={{ fontSize: 10.5, color: isFull ? '#B8862F' : MUTE, background: isFull ? '#FBF0D9' : '#F5F2EC', borderRadius: 999, padding: '2px 8px' }}>
                        {seated.length}/{table.capacity}
                      </span>
                    )}
                    <button onClick={() => removeTable(table.id, table.name)} style={{ background: 'none', border: 'none', color: '#C9BCA8', cursor: 'pointer', fontSize: 16 }}>×</button>
                  </div>
                </div>
                {!isStanding && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, flex: 1 }}>
                    {seated.map(g => (
                      <div key={g.id} draggable onDragStart={() => setDraggedGuest(g.id)} style={{ background: '#F8F3E8', borderRadius: 8, padding: '4px 10px', fontSize: 11, color: INK, cursor: 'grab', display: 'flex', alignItems: 'center', gap: 4 }}>
                        {g.name}
                        <span onClick={() => assignGuest(g.id, null)} style={{ color: '#C9BCA8', cursor: 'pointer', fontWeight: 700 }}>×</span>
                      </div>
                    ))}
                    {seated.length === 0 && <p style={{ fontSize: 11, color: '#C9BCA8' }}>Arrastra invitados aquí</p>}
                    {isFull && <p style={{ fontSize: 10, color: '#B8862F', width: '100%', marginTop: 4 }}>Mesa completa</p>}
                  </div>
                )}
                {isStanding && <p style={{ fontSize: 11, color: '#9B8EC4' }}>Zona de pie · sin límite</p>}
              </div>
            )
          })}
        </div>

        <div
          onDragOver={e => { e.preventDefault(); setDragOverUnassigned(true) }}
          onDragLeave={() => setDragOverUnassigned(false)}
          onDrop={() => { if (draggedGuest) assignGuest(draggedGuest, null) }}
          style={{ border: `1.5px ${dragOverUnassigned ? 'solid' : 'dashed'} ${dragOverUnassigned ? BLUE : '#F5EFE0'}`, borderRadius: 14, padding: 16, alignSelf: 'flex-start', maxHeight: 560, overflowY: 'auto', background: dragOverUnassigned ? '#F4EFE8' : 'transparent', transition: 'background 0.15s, border-color 0.15s' }}
        >
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
