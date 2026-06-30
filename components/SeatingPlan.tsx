'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase'

const F = "'Cormorant Garamond',serif"
const BLUE = '#6E8FC9'
const INK = '#2C3E5C'
const MUTE = '#7A93B5'

interface Guest { id: string; name: string; table_name: string | null }
interface TableItem { id: string; name: string; shape: string; pos_x: number; pos_y: number }

interface Props {
  guests: Guest[]
  tables: TableItem[]
  setTables: React.Dispatch<React.SetStateAction<TableItem[]>>
  assignGuestToTable: (guestId: string, tableName: string | null) => void
  userId: string
}

export default function SeatingPlan({ guests, tables, setTables, assignGuestToTable, userId }: Props) {
  const [newName, setNewName] = useState('')
  const [newShape, setNewShape] = useState<'round' | 'rect' | 'standing'>('round')
  const [draggedGuest, setDraggedGuest] = useState<string | null>(null)
  const [draggedTable, setDraggedTable] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const planRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  const unassignedGuests = guests.filter(g => !g.table_name)

  async function addTable() {
    if (!newName.trim()) return
    const pos_x = 40 + (tables.length % 4) * 160
    const pos_y = 40 + Math.floor(tables.length / 4) * 160
    const { data } = await supabase.from('tables_list').insert({
      user_id: userId, name: newName, shape: newShape, pos_x, pos_y
    }).select().single()
    if (data) setTables(prev => [...prev, data])
    setNewName('')
  }

  async function moveTable(id: string, x: number, y: number) {
    setTables(prev => prev.map(t => t.id === id ? { ...t, pos_x: x, pos_y: y } : t))
    await supabase.from('tables_list').update({ pos_x: x, pos_y: y }).eq('id', id)
  }

  async function deleteTable(id: string, name: string) {
    const seated = guests.filter(g => g.table_name === name)
    for (const g of seated) await assignGuestToTable(g.id, null)
    setTables(prev => prev.filter(t => t.id !== id))
    await supabase.from('tables_list').delete().eq('id', id)
  }

  function handlePlanDrop(e: React.DragEvent) {
    if (!draggedTable || !planRef.current) return
    const rect = planRef.current.getBoundingClientRect()
    const x = Math.max(0, (e.clientX - rect.left) / zoom - 50)
    const y = Math.max(0, (e.clientY - rect.top) / zoom - 50)
    moveTable(draggedTable, x, y)
    setDraggedTable(null)
  }

  return (
    <div className="grid grid-cols-[1fr_220px] gap-4">
      <div>
        <div className="flex gap-2 mb-4 items-center flex-wrap">
          <input
            value={newName} onChange={e=>setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTable()}
            placeholder="Nombre (ej: Mesa 1, Barra)"
            style={{flex:1,minWidth:160,border:'1px solid #DCE7F4',borderRadius:12,padding:'10px 14px',fontSize:13,outline:'none'}}
          />
          <select
            value={newShape} onChange={e=>setNewShape(e.target.value as any)}
            style={{border:'1px solid #DCE7F4',borderRadius:12,padding:'10px 14px',fontSize:12,outline:'none',background:'white'}}
          >
            <option value="round">Mesa redonda</option>
            <option value="rect">Mesa rectangular</option>
            <option value="standing">Zona de pie</option>
          </select>
          <button onClick={addTable} style={{background:BLUE,color:'white',border:'none',borderRadius:12,padding:'10px 20px',fontSize:13,cursor:'pointer'}}>+ Añadir</button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <button onClick={() => setZoom(z => Math.max(0.6, z - 0.1))} style={{border:'1px solid #DCE7F4',borderRadius:8,width:28,height:28,fontSize:14,color:MUTE,background:'white',cursor:'pointer'}}>−</button>
          <span style={{fontSize:11,color:MUTE,width:36,textAlign:'center'}}>{Math.round(zoom*100)}%</span>
          <button onClick={() => setZoom(z => Math.min(1.6, z + 0.1))} style={{border:'1px solid #DCE7F4',borderRadius:8,width:28,height:28,fontSize:14,color:MUTE,background:'white',cursor:'pointer'}}>+</button>
        </div>

        <div
          ref={planRef}
          onDragOver={e => e.preventDefault()}
          onDrop={handlePlanDrop}
          style={{
            position:'relative', border:'1px solid #EEF2F7', borderRadius:18,
            background:'#FBFCFE', minHeight:480, overflow:'auto', padding:8
          }}
        >
          <div style={{position:'relative', width:'100%', minHeight:460, transform:`scale(${zoom})`, transformOrigin:'top left'}}>
            {tables.length === 0 && (
              <p style={{position:'absolute',top:20,left:20,fontSize:13,color:MUTE}}>Añadid vuestra primera mesa o zona arriba.</p>
            )}
            {tables.map(table => {
              const seated = guests.filter(g => g.table_name === table.name)
              const isStanding = table.shape === 'standing'
              const isRound = table.shape === 'round'

              return (
                <div
                  key={table.id}
                  draggable
                  onDragStart={() => setDraggedTable(table.id)}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.stopPropagation(); if (draggedGuest && !isStanding) assignGuestToTable(draggedGuest, table.name) }}
                  style={{
                    position:'absolute', left:table.pos_x, top:table.pos_y,
                    width: isRound ? 100 : isStanding ? 110 : 130,
                    height: isRound ? 100 : 70,
                    borderRadius: isRound ? '50%' : 14,
                    background: isStanding ? '#F3F0FA' : '#EDF2FA',
                    border: `1.5px ${isStanding ? 'dashed' : 'solid'} ${isStanding ? '#C9BCE8' : '#C7D6EC'}`,
                    display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                    cursor:'grab', padding:8, textAlign:'center'
                  }}
                >
                  <p style={{fontFamily:F,fontSize:13,color:INK,marginBottom:2}}>{table.name}</p>
                  {!isStanding && <p style={{fontSize:9,color:MUTE}}>{seated.length} sentados</p>}
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteTable(table.id, table.name) }}
                    style={{position:'absolute',top:-8,right:-8,width:18,height:18,borderRadius:'50%',background:'white',border:'1px solid #EEF2F7',fontSize:10,color:MUTE,cursor:'pointer',lineHeight:1}}
                  >×</button>

                  {!isStanding && seated.map((g, i) => {
                    const angle = (i / Math.max(seated.length,1)) * Math.PI * 2 - Math.PI/2
                    const radius = isRound ? 62 : 0
                    const offX = isRound ? Math.cos(angle) * radius : (i - seated.length/2) * 50
                    const offY = isRound ? Math.sin(angle) * radius : 44
                    return (
                      <div
                        key={g.id}
                        draggable
                        onDragStart={e => { e.stopPropagation(); setDraggedGuest(g.id) }}
                        style={{
                          position:'absolute',
                          left: (isRound ? 50 : 65) + offX - 24,
                          top: (isRound ? 50 : 35) + offY - 10,
                          background:'white', border:'1px solid #DCE7F4', borderRadius:999,
                          padding:'3px 8px', fontSize:9, color:INK, whiteSpace:'nowrap', cursor:'grab'
                        }}
                      >
                        {g.name}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{border:'1px solid #EEF2F7',borderRadius:16,padding:14,alignSelf:'flex-start',maxHeight:540,overflowY:'auto'}}>
        <p style={{fontSize:11,color:MUTE,marginBottom:10}}>Invitados por asignar</p>
        {unassignedGuests.length === 0 ? (
          <p style={{fontSize:11,color:'#C7D2E0'}}>Todos asignados ♡</p>
        ) : unassignedGuests.map(g => (
          <div
            key={g.id}
            draggable
            onDragStart={() => setDraggedGuest(g.id)}
            style={{background:'white',border:'1px solid #EEF2F7',borderRadius:8,padding:'7px 10px',fontSize:12,color:INK,marginBottom:6,cursor:'grab'}}
          >
            {g.name}
          </div>
        ))}
      </div>
    </div>
  )
}
