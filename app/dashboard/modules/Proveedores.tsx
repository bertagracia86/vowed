'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE } from '@/lib/constants'
import { Vendor } from '@/lib/types'

interface Props { vendors: Vendor[]; setVendors: (v: Vendor[]) => void }

const CATEGORIES = ['Fotografía', 'Vídeo', 'Catering', 'Finca', 'Música/DJ', 'Flores', 'Vestido', 'Pastel', 'Transporte', 'Otro']
const STATUS_COLORS: Record<string, string> = { Buscando: '#EFE0C2', Contactado: '#E3DCC9', Contratado: '#D9E8D9' }
const STATUS_TEXT: Record<string, string> = { Buscando: '#B8862F', Contactado: '#5C4A3D', Contratado: '#3A6B3A' }

export default function Proveedores({ vendors, setVendors }: Props) {
  const [newName, setNewName] = useState('')
  const [newCat, setNewCat] = useState('Fotografía')
  const [newContact, setNewContact] = useState('')
  const [newBudget, setNewBudget] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  function add() {
    if (!newName.trim()) return
    setVendors([...vendors, { id: Date.now().toString(), name: newName, category: newCat, contact: newContact, status: 'Buscando', budget: Number(newBudget) || 0, notes: '' }])
    setNewName(''); setNewContact(''); setNewBudget('')
  }

  function update(id: string, field: keyof Vendor, value: string | number) {
    setVendors(vendors.map(v => v.id === id ? { ...v, [field]: value } : v))
  }

  function remove(id: string) {
    setVendors(vendors.filter(v => v.id !== id))
  }

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Proveedores</h1>
      <p style={{ fontSize: 12, color: MUTE, marginBottom: 24 }}>
        {vendors.filter(v => v.status === 'Contratado').length} contratados · {vendors.filter(v => v.status === 'Buscando').length} buscando
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Nombre del proveedor" style={{ flex: 1, minWidth: 160, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
        <select value={newCat} onChange={e => setNewCat(e.target.value)} style={{ border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 14px', fontSize: 13, outline: 'none', background: 'white' }}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <input value={newContact} onChange={e => setNewContact(e.target.value)} placeholder="Contacto" style={{ width: 160, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
        <input value={newBudget} onChange={e => setNewBudget(e.target.value)} type="number" placeholder="Presupuesto €" style={{ width: 130, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
        <button onClick={add} style={{ background: BLUE, color: 'white', border: 'none', borderRadius: 12, padding: '11px 22px', fontSize: 13, cursor: 'pointer' }}>Añadir</button>
      </div>

      {vendors.length === 0 ? (
        <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '40px 0' }}>Sin proveedores todavía.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {vendors.map(v => (
            <div key={v.id} style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', gap: 14, cursor: 'pointer' }} onClick={() => setExpanded(expanded === v.id ? null : v.id)}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: INK }}>{v.name}</p>
                  <p style={{ fontSize: 11, color: MUTE }}>{v.category} · {v.contact}</p>
                </div>
                <span style={{ background: STATUS_COLORS[v.status], color: STATUS_TEXT[v.status], fontSize: 11, borderRadius: 999, padding: '4px 12px', fontWeight: 500 }}>{v.status}</span>
                <span style={{ fontFamily: F, fontSize: 15, color: INK }}>{v.budget.toLocaleString('es-ES')} €</span>
                <button onClick={e => { e.stopPropagation(); remove(v.id) }} style={{ background: 'none', border: 'none', color: '#C9BCA8', cursor: 'pointer', fontSize: 18 }}>×</button>
              </div>

              {expanded === v.id && (
                <div style={{ padding: '0 18px 16px', borderTop: '1px solid #F5EFE0', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ marginTop: 12 }}>
                    <p style={{ fontSize: 10, color: MUTE, marginBottom: 4 }}>ESTADO</p>
                    <select value={v.status} onChange={e => update(v.id, 'status', e.target.value)} style={{ border: '1px solid #F5EFE0', borderRadius: 8, padding: '7px 10px', fontSize: 12, outline: 'none', background: 'white' }}>
                      <option>Buscando</option><option>Contactado</option><option>Contratado</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, marginTop: 12 }}>
                    <p style={{ fontSize: 10, color: MUTE, marginBottom: 4 }}>NOTAS</p>
                    <input value={v.notes} onChange={e => update(v.id, 'notes', e.target.value)} placeholder="Añadir notas..." style={{ width: '100%', border: '1px solid #F5EFE0', borderRadius: 8, padding: '7px 10px', fontSize: 12, outline: 'none' }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
