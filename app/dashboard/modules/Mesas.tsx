'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE } from '@/lib/constants'
import { TableRow, Guest } from '@/lib/types'

interface Props { tables: TableRow[]; setTables: (t: TableRow[]) => void; guests: Guest[]; setGuests: (g: Guest[]) => void }

const GROUP_COLORS = ['#AAA396', '#C9A876', '#9BAA96', '#B08BC4', '#D19A6A', '#7FA3B8', '#C4849A', '#8FA88F']

function groupColor(group: string) {
  if (!group) return '#DCD4C8'
  let hash = 0
  for (let i = 0; i < group.length; i++) hash = group.charCodeAt(i) + ((hash << 5) - hash)
  return GROUP_COLORS[Math.abs(hash) % GROUP_COLORS.length]
}

function GuestChip({ g, onDragStart, onRemove, onClick, conflict }: { g: Guest; onDragStart: () => void; onRemove?: () => void; onClick: () => void; conflict?: boolean }) {
  return (
    <div
      draggable onDragStart={onDragStart} onClick={onClick}
      title={g.group || 'Sin grupo'}
      style={{
        background: conflict ? '#FBEAE7' : '#F8F3E8', border: conflict ? '1px solid #C0594F' : '1px solid transparent',
        borderRadius: 8, padding: '4px 9px', fontSize: 11, color: INK, cursor: 'grab',
        display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap'
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: groupColor(g.group), flexShrink: 0 }} />
      {conflict && <span title="Conflicto: preferís separarlos" style={{ color: '#C0594F' }}>⚠</span>}
      {g.name}
      {onRemove && <span onClick={e => { e.stopPropagation(); onRemove() }} style={{ color: '#C9BCA8', cursor: 'pointer', fontWeight: 700 }}>×</span>}
    </div>
  )
}

function GuestEditor({ guest, allGuests, onClose, onSave }: { guest: Guest; allGuests: Guest[]; onClose: () => void; onSave: (group: string, avoid: string[]) => void }) {
  const [group, setGroup] = useState(guest.group)
  const [avoid, setAvoid] = useState<string[]>(guest.avoid)
  const others = allGuests.filter(g => g.id !== guest.id)

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(36,28,23,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 16, width: 340, padding: '22px 24px' }}>
        <p style={{ fontFamily: F, fontSize: 17, color: INK, marginBottom: 14 }}>{guest.name}</p>

        <p style={{ fontSize: 11, color: MUTE, marginBottom: 6 }}>GRUPO / FAMILIA</p>
        <input value={group} onChange={e => setGroup(e.target.value)} placeholder="ej. Familia García" style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 10, padding: '9px 12px', fontSize: 13, outline: 'none', marginBottom: 16 }} />

        <p style={{ fontSize: 11, color: MUTE, marginBottom: 6 }}>NO SENTAR JUNTO A</p>
        <div style={{ maxHeight: 160, overflowY: 'auto', border: '1px solid #F5EFE0', borderRadius: 10, padding: 8 }}>
          {others.length === 0 ? (
            <p style={{ fontSize: 11, color: '#C9BCA8', padding: 4 }}>No hay otros invitados.</p>
          ) : others.map(o => (
            <label key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: INK, padding: '4px 4px', cursor: 'pointer' }}>
              <input type="checkbox" checked={avoid.includes(o.id)} onChange={e => setAvoid(e.target.checked ? [...avoid, o.id] : avoid.filter(id => id !== o.id))} />
              {o.name}
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 18 }}>
          <button onClick={onClose} style={{ border: '1px solid #241c17', background: 'white', borderRadius: 999, padding: '8px 16px', fontSize: 12, cursor: 'pointer' }}>Cancelar</button>
          <button onClick={() => { onSave(group, avoid); onClose() }} style={{ background: '#241c17', color: 'white', border: 'none', borderRadius: 999, padding: '8px 18px', fontSize: 12, cursor: 'pointer' }}>Guardar</button>
        </div>
      </div>
    </div>
  )
}

export default function Mesas({ tables, setTables, guests, setGuests }: Props) {
  const [newName, setNewName] = useState('')
  const [newShape, setNewShape] = useState<'round' | 'rect' | 'standing'>('round')
  const [newCapacity, setNewCapacity] = useState('8')
  const [draggedGuest, setDraggedGuest] = useState<string | null>(null)
  const [dragOverTable, setDragOverTable] = useState<string | null>(null)
  const [dragOverUnassigned, setDragOverUnassigned] = useState(false)
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null)

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

  function guestHasConflict(g: Guest, tableGuests: Guest[]) {
    return tableGuests.some(o => o.id !== g.id && (g.avoid.includes(o.id) || o.avoid.includes(g.id)))
  }

  const unassigned = guests.filter(g => !g.table_name)
  const totalCapacity = tables.filter(t => t.shape !== 'standing').reduce((a, t) => a + t.capacity, 0)
  const conflictCount = guests.filter(g => g.table_name && guestHasConflict(g, guests.filter(o => o.table_name === g.table_name))).length / 2

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Plano de mesas</h1>
      <p style={{ fontSize: 12, color: MUTE, marginBottom: 24 }}>
        {tables.length} mesas · {guests.length - unassigned.length}/{guests.length} invitados asignados · {totalCapacity} plazas disponibles
        {conflictCount > 0 && <span style={{ color: '#C0594F' }}> · {conflictCount} conflicto{conflictCount !== 1 ? 's' : ''} de asientos</span>}
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

      <p style={{ fontSize: 10.5, color: MUTE, marginBottom: 14 }}>
        Clicad en un invitado para asignarle grupo o marcar con quién no debe sentarse. El punto de color indica el grupo/familia; ⚠ señala un conflicto.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20, alignContent: 'flex-start' }}>
          {tables.length === 0 ? (
            <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '40px 0', gridColumn: '1/-1' }}>Sin mesas todavía. Añadid la primera arriba.</p>
          ) : tables.map(table => {
            const seated = guests.filter(g => g.table_name === table.name)
            const isStanding = table.shape === 'standing'
            const isRound = table.shape === 'round'
            const isFull = !isStanding && seated.length >= table.capacity
            const isOver = dragOverTable === table.id

            return (
              <div key={table.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10 }}>
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

                {isStanding ? (
                  <div
                    onDragOver={e => e.preventDefault()}
                    style={{ width: '100%', minHeight: 90, border: '1.5px dashed #C9BCE8', borderRadius: 14, background: '#F8F5FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <p style={{ fontSize: 11, color: '#9B8EC4' }}>Zona de pie · sin límite</p>
                  </div>
                ) : isRound ? (
                  <div
                    onDragOver={e => { e.preventDefault(); if (!isFull) setDragOverTable(table.id) }}
                    onDragLeave={() => setDragOverTable(null)}
                    onDrop={() => { if (draggedGuest && !isFull) assignGuest(draggedGuest, table.name) }}
                    style={{ position: 'relative', width: 210, height: 210 }}
                  >
                    <div style={{
                      position: 'absolute', inset: 30, borderRadius: '50%',
                      border: `2px solid ${isOver ? BLUE : '#E3DCC9'}`, background: isOver ? '#F4EFE8' : 'white', transition: 'background 0.15s, border-color 0.15s'
                    }} />
                    {seated.length === 0 && <p style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, color: '#C9BCA8', textAlign: 'center', padding: 40 }}>Arrastra aquí</p>}
                    {seated.map((g, i) => {
                      const angle = (i / Math.max(seated.length, 1)) * 2 * Math.PI - Math.PI / 2
                      const x = 105 + 95 * Math.cos(angle)
                      const y = 105 + 95 * Math.sin(angle)
                      return (
                        <div key={g.id} style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', zIndex: 2 }}>
                          <GuestChip g={g} onDragStart={() => setDraggedGuest(g.id)} onRemove={() => assignGuest(g.id, null)} onClick={() => setEditingGuest(g)} conflict={guestHasConflict(g, seated)} />
                        </div>
                      )
                    })}
                    {isFull && <p style={{ position: 'absolute', bottom: -20, left: 0, right: 0, textAlign: 'center', fontSize: 10, color: '#B8862F' }}>Mesa completa</p>}
                  </div>
                ) : (
                  <div
                    onDragOver={e => { e.preventDefault(); if (!isFull) setDragOverTable(table.id) }}
                    onDragLeave={() => setDragOverTable(null)}
                    onDrop={() => { if (draggedGuest && !isFull) assignGuest(draggedGuest, table.name) }}
                    style={{
                      width: '100%', minHeight: 110, border: `2px solid ${isOver ? BLUE : '#E3DCC9'}`, borderRadius: 10,
                      background: isOver ? '#F4EFE8' : 'white', transition: 'background 0.15s, border-color 0.15s',
                      padding: 12, display: 'flex', flexWrap: 'wrap', gap: 6, alignContent: 'flex-start'
                    }}
                  >
                    {seated.length === 0 && <p style={{ fontSize: 11, color: '#C9BCA8' }}>Arrastra invitados aquí</p>}
                    {seated.map(g => (
                      <GuestChip key={g.id} g={g} onDragStart={() => setDraggedGuest(g.id)} onRemove={() => assignGuest(g.id, null)} onClick={() => setEditingGuest(g)} conflict={guestHasConflict(g, seated)} />
                    ))}
                    {isFull && <p style={{ fontSize: 10, color: '#B8862F', width: '100%' }}>Mesa completa</p>}
                  </div>
                )}
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
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {unassigned.map(g => (
                <GuestChip key={g.id} g={g} onDragStart={() => setDraggedGuest(g.id)} onClick={() => setEditingGuest(g)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {editingGuest && (
        <GuestEditor
          guest={editingGuest}
          allGuests={guests}
          onClose={() => setEditingGuest(null)}
          onSave={(group, avoid) => setGuests(guests.map(g => g.id === editingGuest.id ? { ...g, group, avoid } : g))}
        />
      )}
    </div>
  )
}
