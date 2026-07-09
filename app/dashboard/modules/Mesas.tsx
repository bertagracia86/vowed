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

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map(p => p[0]?.toUpperCase() || '').join('')
}

function Seat({ guest, onDrop, onDragStart, onDragOverSeat, isOver, conflict }: {
  guest: Guest | null; onDrop: () => void; onDragStart?: () => void; onDragOverSeat: (e: React.DragEvent) => void; isOver: boolean; conflict?: boolean
}) {
  return (
    <div
      onDragOver={onDragOverSeat}
      onDrop={e => { e.preventDefault(); e.stopPropagation(); onDrop() }}
      draggable={!!guest}
      onDragStart={e => { e.stopPropagation(); onDragStart && onDragStart() }}
      title={guest?.name}
      style={{
        width: 54, height: 54, borderRadius: '50%',
        border: conflict ? '2px solid #C0594F' : isOver ? `2px solid ${BLUE}` : guest ? '2px solid #8b5f3e' : '2px dashed #DDD8D0',
        background: conflict ? '#FBEAE7' : guest ? '#F8F3E8' : isOver ? '#F4EFE8' : 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: guest ? 'grab' : 'default', flexShrink: 0, position: 'relative', transition: 'background 0.15s, border-color 0.15s'
      }}
    >
      {guest ? (
        <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>{initials(guest.name)}</span>
      ) : (
        <span style={{ fontSize: 16, color: '#DDD8D0' }}>+</span>
      )}
      {guest && <span style={{ position: 'absolute', bottom: -3, right: -3, width: 10, height: 10, borderRadius: '50%', background: groupColor(guest.group), border: '1.5px solid white' }} />}
      {conflict && <span style={{ position: 'absolute', top: -6, left: -6, fontSize: 12 }}>⚠</span>}
    </div>
  )
}

function SeatLabel({ guest }: { guest: Guest | null }) {
  return (
    <p style={{ fontSize: 10, color: guest ? INK : '#DDD8D0', textAlign: 'center', width: 66, marginTop: 4, lineHeight: 1.2, minHeight: 24 }}>
      {guest ? guest.name.split(' ')[0] : ''}
    </p>
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
  const [dragged, setDragged] = useState<{ guestId: string; fromTable: string | null; fromSeat: number | null } | null>(null)
  const [overSeat, setOverSeat] = useState<string | null>(null)
  const [dragOverUnassigned, setDragOverUnassigned] = useState(false)
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null)

  function addTable() {
    if (!newName.trim()) return
    setTables([...tables, { id: Date.now().toString(), name: newName, shape: newShape, capacity: Number(newCapacity) || 8 }])
    setNewName(''); setNewCapacity('8')
  }

  function removeTable(id: string, name: string) {
    setTables(tables.filter(t => t.id !== id))
    setGuests(guests.map(g => g.table_name === name ? { ...g, table_name: null, seat: null } : g))
  }

  function guestAt(tableName: string, seat: number) {
    return guests.find(g => g.table_name === tableName && g.seat === seat) || null
  }

  function placeAt(tableName: string, seat: number) {
    if (!dragged) return
    const occupant = guestAt(tableName, seat)
    setGuests(guests.map(g => {
      if (g.id === dragged.guestId) return { ...g, table_name: tableName, seat }
      if (occupant && g.id === occupant.id) {
        // swap: occupant takes the dragged guest's old spot (or unassigned if it had none)
        return { ...g, table_name: dragged.fromTable, seat: dragged.fromSeat }
      }
      return g
    }))
    setDragged(null)
    setOverSeat(null)
  }

  function unassign(guestId: string) {
    setGuests(guests.map(g => g.id === guestId ? { ...g, table_name: null, seat: null } : g))
    setDragged(null)
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

      <p style={{ fontSize: 10.5, color: MUTE, marginBottom: 18 }}>
        Arrastrad a un invitado hasta un asiento concreto para decidir exactamente quién va a cada lado. Clicad en un invitado para asignarle grupo o marcar con quién no debe sentarse.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginBottom: 32 }}>
        {tables.length === 0 ? (
          <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '40px 0' }}>Sin mesas todavía. Añadid la primera arriba.</p>
        ) : tables.map(table => {
          const isStanding = table.shape === 'standing'
          const isRound = table.shape === 'round'
          const seatedCount = guests.filter(g => g.table_name === table.name).length
          const tableGuests = guests.filter(g => g.table_name === table.name)

          return (
            <div key={table.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <p style={{ fontFamily: F, fontSize: 17, color: INK }}>{table.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {!isStanding && (
                    <span style={{ fontSize: 11, color: MUTE, background: '#F5F2EC', borderRadius: 999, padding: '3px 10px' }}>{seatedCount}/{table.capacity} plazas</span>
                  )}
                  <button onClick={() => removeTable(table.id, table.name)} style={{ background: 'none', border: 'none', color: '#C9BCA8', cursor: 'pointer', fontSize: 17 }}>×</button>
                </div>
              </div>

              {isStanding ? (
                <div onDragOver={e => e.preventDefault()} onDrop={() => dragged && placeAt(table.name, 0)} style={{ minHeight: 90, border: '1.5px dashed #C9BCE8', borderRadius: 16, background: '#F8F5FE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 8, padding: 14 }}>
                  {tableGuests.length === 0 ? (
                    <p style={{ fontSize: 12, color: '#9B8EC4' }}>Zona de pie · sin límite · arrastra invitados aquí</p>
                  ) : tableGuests.map(g => (
                    <span key={g.id} draggable onDragStart={() => setDragged({ guestId: g.id, fromTable: table.name, fromSeat: null })} style={{ background: 'white', border: '1px solid #C9BCE8', borderRadius: 999, padding: '5px 12px', fontSize: 12, color: INK, cursor: 'grab' }}>{g.name}</span>
                  ))}
                </div>
              ) : isRound ? (
                (() => {
                  const size = Math.max(280, 60 * table.capacity * 0.55)
                  const radius = size / 2 - 40
                  const center = size / 2
                  return (
                    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
                      <div style={{
                        position: 'absolute', left: center - radius + 30, top: center - radius + 30, width: (radius - 30) * 2, height: (radius - 30) * 2,
                        borderRadius: '50%', background: '#FBF9F5', border: '1.5px solid #E3DCC9', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <span style={{ fontFamily: F, fontSize: 13, color: MUTE }}>{table.name}</span>
                      </div>
                      {Array.from({ length: table.capacity }).map((_, seat) => {
                        const angle = (seat / table.capacity) * 2 * Math.PI - Math.PI / 2
                        const x = center + radius * Math.cos(angle)
                        const y = center + radius * Math.sin(angle)
                        const guest = guestAt(table.name, seat)
                        const seatKey = `${table.name}-${seat}`
                        return (
                          <div key={seat} style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Seat
                              guest={guest}
                              isOver={overSeat === seatKey}
                              conflict={!!guest && guestHasConflict(guest, tableGuests)}
                              onDragOverSeat={e => { e.preventDefault(); setOverSeat(seatKey) }}
                              onDragStart={() => guest && setDragged({ guestId: guest.id, fromTable: table.name, fromSeat: seat })}
                              onDrop={() => placeAt(table.name, seat)}
                            />
                            <div onClick={() => guest && setEditingGuest(guest)} style={{ cursor: guest ? 'pointer' : 'default' }}>
                              <SeatLabel guest={guest} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                })()
              ) : (
                (() => {
                  const topCount = Math.ceil(table.capacity / 2)
                  const bottomCount = table.capacity - topCount
                  const seatWidth = 78
                  const width = Math.max(topCount, bottomCount) * seatWidth + 60
                  const renderRow = (count: number, startSeat: number) => (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
                      {Array.from({ length: count }).map((_, i) => {
                        const seat = startSeat + i
                        const guest = guestAt(table.name, seat)
                        const seatKey = `${table.name}-${seat}`
                        return (
                          <div key={seat} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Seat
                              guest={guest}
                              isOver={overSeat === seatKey}
                              conflict={!!guest && guestHasConflict(guest, tableGuests)}
                              onDragOverSeat={e => { e.preventDefault(); setOverSeat(seatKey) }}
                              onDragStart={() => guest && setDragged({ guestId: guest.id, fromTable: table.name, fromSeat: seat })}
                              onDrop={() => placeAt(table.name, seat)}
                            />
                            <div onClick={() => guest && setEditingGuest(guest)} style={{ cursor: guest ? 'pointer' : 'default' }}>
                              <SeatLabel guest={guest} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                  return (
                    <div style={{ width, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                      {renderRow(topCount, 0)}
                      <div style={{ width: '92%', height: 46, background: '#FBF9F5', border: '1.5px solid #E3DCC9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: F, fontSize: 13, color: MUTE }}>{table.name}</span>
                      </div>
                      {renderRow(bottomCount, topCount)}
                    </div>
                  )
                })()
              )}
            </div>
          )
        })}
      </div>

      <div
        onDragOver={e => { e.preventDefault(); setDragOverUnassigned(true) }}
        onDragLeave={() => setDragOverUnassigned(false)}
        onDrop={() => dragged && unassign(dragged.guestId)}
        style={{ border: `1.5px ${dragOverUnassigned ? 'solid' : 'dashed'} ${dragOverUnassigned ? BLUE : '#F5EFE0'}`, borderRadius: 14, padding: 16, background: dragOverUnassigned ? '#F4EFE8' : 'transparent', transition: 'background 0.15s, border-color 0.15s' }}
      >
        <p style={{ fontSize: 11, color: MUTE, marginBottom: 10 }}>Sin asignar ({unassigned.length})</p>
        {unassigned.length === 0 ? (
          <p style={{ fontSize: 11, color: '#C9BCA8' }}>Todos asignados ♡</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {unassigned.map(g => (
              <div key={g.id} draggable onDragStart={() => setDragged({ guestId: g.id, fromTable: null, fromSeat: null })} onClick={() => setEditingGuest(g)} style={{ background: 'white', border: '1px solid #F5EFE0', borderRadius: 999, padding: '7px 12px', fontSize: 12, color: INK, cursor: 'grab', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: groupColor(g.group) }} />
                {g.name}
              </div>
            ))}
          </div>
        )}
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
