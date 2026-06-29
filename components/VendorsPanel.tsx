'use client'

import { useState } from 'react'

interface Vendor {
  id: number
  name: string
  type: string
  contact: string
  status: 'Contactar' | 'Negociando' | 'Contratado'
}

const TYPES = ['Fotografía','Vídeo','Música — DJ','Música — Grupo','Catering','Flores','Finca / Espacio','Pastelería','Invitaciones','Transporte','Estilismo','Otros']

const DEFAULT: Vendor[] = [
  { id: 1, name: 'Estudio Núria Vila', type: 'Fotografía', contact: 'nuria@estudio.com', status: 'Contratado' },
  { id: 2, name: 'DJ Almería Sessions', type: 'Música — DJ', contact: '673 000 111', status: 'Contratado' },
  { id: 3, name: 'Finca Las Olivas', type: 'Finca / Espacio', contact: '950 000 222', status: 'Negociando' },
  { id: 4, name: 'Flores del Sur', type: 'Flores', contact: '958 000 333', status: 'Contactar' },
]

export default function VendorsPanel() {
  const [vendors, setVendors] = useState<Vendor[]>(DEFAULT)
  const [form, setForm] = useState({ name: '', type: TYPES[0], contact: '', status: 'Contactar' as Vendor['status'] })
  const [showForm, setShowForm] = useState(false)

  function addVendor() {
    if (!form.name.trim()) return
    setVendors(prev => [...prev, { id: Date.now(), ...form }])
    setForm({ name: '', type: TYPES[0], contact: '', status: 'Contactar' })
    setShowForm(false)
  }

  function deleteVendor(id: number) {
    setVendors(prev => prev.filter(v => v.id !== id))
  }

  const statusClass = (s: string) =>
    s === 'Contratado' ? 'text-green-600 border-green-200' :
    s === 'Negociando' ? 'text-[#C9A84C] border-[#C9A84C]' : 'text-gray-400 border-gray-200'

  const dotClass = (s: string) =>
    s === 'Contratado' ? 'bg-green-500' :
    s === 'Negociando' ? 'bg-[#C9A84C]' : 'bg-gray-300'

  return (
    <div>
      <div className="mb-10 pb-6 border-b border-gray-100 flex items-end justify-between">
        <div>
          <div className="font-mono-custom text-xs tracking-widest uppercase text-[#C9A84C] mb-2">Agenda</div>
          <h1 className="font-display text-4xl font-light italic">Proveedores</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="font-mono-custom text-xs tracking-widest uppercase border border-gray-200 px-5 py-2.5 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
        >
          + Añadir proveedor
        </button>
      </div>

      {showForm && (
        <div className="border border-[#C9A84C] p-6 mb-6 bg-[#FDFAF2]">
          <div className="font-mono-custom text-xs tracking-widest uppercase text-[#C9A84C] mb-4">Nuevo proveedor</div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="font-mono-custom text-xs uppercase tracking-widest text-gray-400 block mb-2">Nombre</label>
              <input className="w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#C9A84C]" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Nombre del proveedor" />
            </div>
            <div>
              <label className="font-mono-custom text-xs uppercase tracking-widest text-gray-400 block mb-2">Categoría</label>
              <select className="w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#C9A84C] bg-white" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="font-mono-custom text-xs uppercase tracking-widest text-gray-400 block mb-2">Contacto</label>
              <input className="w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#C9A84C]" value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} placeholder="Email o teléfono" />
            </div>
            <div>
              <label className="font-mono-custom text-xs uppercase tracking-widest text-gray-400 block mb-2">Estado</label>
              <select className="w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#C9A84C] bg-white" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Vendor['status'] }))}>
                <option>Contactar</option><option>Negociando</option><option>Contratado</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={addVendor} className="font-mono-custom text-xs tracking-widest uppercase bg-black text-white px-6 py-2.5 hover:bg-gray-900 transition-colors">Añadir</button>
            <button onClick={() => setShowForm(false)} className="font-mono-custom text-xs tracking-widest uppercase border border-gray-200 px-6 py-2.5 text-gray-400 hover:text-black transition-colors">Cancelar</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100">
        {vendors.map(v => (
          <div key={v.id} className="bg-white p-6 flex gap-4">
            <div className="flex-1">
              <div className="font-mono-custom text-xs tracking-widest uppercase text-[#C9A84C] mb-1">{v.type}</div>
              <div className="font-display text-lg font-light mb-1">{v.name}</div>
              <div className="font-mono-custom text-xs text-gray-400">{v.contact}</div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <div className={`flex items-center gap-2 font-mono-custom text-xs px-3 py-1 border ${statusClass(v.status)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dotClass(v.status)}`} />
                {v.status}
              </div>
              <button onClick={() => deleteVendor(v.id)} className="font-mono-custom text-xs text-gray-300 hover:text-black transition-colors">×</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
