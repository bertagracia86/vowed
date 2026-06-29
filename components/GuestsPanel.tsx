'use client'

import { useState } from 'react'

interface Guest {
  id: number
  name: string
  table: string
  reserva: boolean
  inv: boolean
  asist: 'Sí' | 'No' | 'Pendiente'
  notes: string
}

const DEFAULT: Guest[] = [
  { id: 1, name: 'María García', table: 'Mesa 1', reserva: true, inv: true, asist: 'Sí', notes: '' },
  { id: 2, name: 'Carlos López', table: 'Mesa 1', reserva: true, inv: true, asist: 'Sí', notes: '' },
  { id: 3, name: 'Ana Martínez', table: 'Mesa 2', reserva: true, inv: false, asist: 'Pendiente', notes: 'Vegetariana' },
]

export default function GuestsPanel() {
  const [guests, setGuests] = useState<Guest[]>(DEFAULT)

  const conf = guests.filter(g => g.asist === 'Sí').length
  const no = guests.filter(g => g.asist === 'No').length

  function update<K extends keyof Guest>(id: number, field: K, value: Guest[K]) {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g))
  }

  function addGuest() {
    setGuests(prev => [...prev, { id: Date.now(), name: '', table: 'Mesa 1', reserva: false, inv: false, asist: 'Pendiente', notes: '' }])
  }

  function deleteGuest(id: number) {
    setGuests(prev => prev.filter(g => g.id !== id))
  }

  const dotClass = (asist: string) =>
    asist === 'Sí' ? 'bg-green-500' : asist === 'No' ? 'bg-red-400' : 'bg-gray-300'

  return (
    <div>
      <div className="mb-10 pb-6 border-b border-gray-100 flex items-end justify-between">
        <div>
          <div className="font-mono-custom text-xs tracking-widest uppercase text-[#C9A84C] mb-2">Lista completa</div>
          <h1 className="font-display text-4xl font-light italic">Invitados</h1>
          <p className="font-mono-custom text-xs text-gray-400 mt-2 tracking-wider uppercase">
            {guests.length} invitados · {conf} confirmados · {no} declinados
          </p>
        </div>
        <button
          onClick={addGuest}
          className="font-mono-custom text-xs tracking-widest uppercase border border-gray-200 px-5 py-2.5 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
        >
          + Añadir invitado
        </button>
      </div>

      <div className="border border-gray-100 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {['Nombre', 'Mesa', 'Reserva fecha', 'Invitación', 'Asistencia', 'Notas', ''].map(h => (
                <th key={h} className="font-mono-custom text-xs tracking-widest uppercase text-gray-400 text-left px-4 py-3 border-b border-gray-100 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {guests.map(g => (
              <tr key={g.id} className="border-b border-gray-50 hover:bg-[#FDFAF2] transition-colors">
                <td className="px-4 py-3">
                  <input
                    className="text-sm w-full bg-transparent outline-none focus:bg-[#FDFAF2]"
                    value={g.name}
                    onChange={e => update(g.id, 'name', e.target.value)}
                    placeholder="Nombre"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    className="font-mono-custom text-xs w-20 bg-transparent outline-none focus:bg-[#FDFAF2]"
                    value={g.table}
                    onChange={e => update(g.id, 'table', e.target.value)}
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <input type="checkbox" className="accent-[#C9A84C] w-4 h-4 cursor-pointer" checked={g.reserva} onChange={e => update(g.id, 'reserva', e.target.checked)} />
                </td>
                <td className="px-4 py-3 text-center">
                  <input type="checkbox" className="accent-[#C9A84C] w-4 h-4 cursor-pointer" checked={g.inv} onChange={e => update(g.id, 'inv', e.target.checked)} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotClass(g.asist)}`} />
                    <select
                      className="font-mono-custom text-xs bg-transparent outline-none cursor-pointer"
                      value={g.asist}
                      onChange={e => update(g.id, 'asist', e.target.value as Guest['asist'])}
                    >
                      <option>Sí</option>
                      <option>No</option>
                      <option>Pendiente</option>
                    </select>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <input
                    className="text-xs w-full bg-transparent outline-none text-gray-400 focus:bg-[#FDFAF2]"
                    value={g.notes}
                    onChange={e => update(g.id, 'notes', e.target.value)}
                    placeholder="—"
                  />
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => deleteGuest(g.id)} className="font-mono-custom text-xs text-gray-300 hover:text-black transition-colors">×</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
