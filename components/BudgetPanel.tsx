'use client'

import { useState } from 'react'

interface BudgetItem {
  id: number
  cat: string
  est: number
  real: number
  paid: number
}

const DEFAULT_ITEMS: BudgetItem[] = [
  { id: 1, cat: 'Catering & bebida', est: 8000, real: 8200, paid: 3000 },
  { id: 2, cat: 'Finca y espacio', est: 5000, real: 4500, paid: 500 },
  { id: 3, cat: 'Fotografía y vídeo', est: 3000, real: 2800, paid: 2800 },
  { id: 4, cat: 'Flores y decoración', est: 2000, real: 0, paid: 0 },
  { id: 5, cat: 'Música', est: 1500, real: 1200, paid: 600 },
]

const fmt = (n: number) => n.toLocaleString('es-ES') + ' €'

export default function BudgetPanel() {
  const [items, setItems] = useState<BudgetItem[]>(DEFAULT_ITEMS)
  const [newCat, setNewCat] = useState('')
  const [newEst, setNewEst] = useState('')

  const totalEst = items.reduce((a, b) => a + b.est, 0)
  const totalPaid = items.reduce((a, b) => a + b.paid, 0)
  const totalReal = items.reduce((a, b) => a + b.real, 0)

  function update(id: number, field: keyof BudgetItem, value: string) {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, [field]: field === 'cat' ? value : parseFloat(value) || 0 } : item
    ))
  }

  function addItem() {
    if (!newCat.trim()) return
    setItems(prev => [...prev, { id: Date.now(), cat: newCat, est: parseFloat(newEst) || 0, real: 0, paid: 0 }])
    setNewCat('')
    setNewEst('')
  }

  function deleteItem(id: number) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function getStatus(item: BudgetItem) {
    if (item.paid > 0 && item.paid >= (item.real || item.est)) return 'Pagado'
    if (item.paid > 0) return 'Parcial'
    return 'Pendiente'
  }

  function getStatusClass(item: BudgetItem) {
    const s = getStatus(item)
    if (s === 'Pagado') return 'text-green-600 border-green-200 bg-green-50'
    if (s === 'Parcial') return 'text-[#C9A84C] border-[#C9A84C] bg-[#FDFAF2]'
    return 'text-gray-400 border-gray-200'
  }

  return (
    <div>
      <div className="mb-10 pb-6 border-b border-gray-100 flex items-end justify-between">
        <div>
          <div className="font-mono-custom text-xs tracking-widest uppercase text-[#C9A84C] mb-2">Control de gastos</div>
          <h1 className="font-display text-4xl font-light italic">Presupuesto</h1>
        </div>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-3 gap-px bg-gray-100 border border-gray-100 mb-8">
        {[
          { label: 'Total estimado', value: fmt(totalEst) },
          { label: 'Pagado', value: fmt(totalPaid) },
          { label: 'Restante', value: fmt(Math.max(0, totalEst - totalReal)) },
        ].map(t => (
          <div key={t.label} className="bg-white p-6">
            <div className="font-mono-custom text-xs tracking-widest uppercase text-gray-400 mb-2">{t.label}</div>
            <div className="font-display text-3xl font-light">{t.value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="border border-gray-100 overflow-x-auto mb-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {['Categoría', 'Presup. est.', 'Coste real', 'Pagado', 'Restante', 'Estado', ''].map(h => (
                <th key={h} className="font-mono-custom text-xs tracking-widest uppercase text-gray-400 text-left px-4 py-3 border-b border-gray-100">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-gray-50 hover:bg-[#FDFAF2] transition-colors">
                <td className="px-4 py-3">
                  <input
                    className="font-display text-sm font-light w-full bg-transparent outline-none focus:bg-[#FDFAF2]"
                    value={item.cat}
                    onChange={e => update(item.id, 'cat', e.target.value)}
                  />
                </td>
                {(['est', 'real', 'paid'] as const).map(f => (
                  <td key={f} className="px-4 py-3 text-right">
                    <input
                      type="number"
                      className="font-mono-custom text-xs w-24 text-right bg-transparent outline-none focus:bg-[#FDFAF2]"
                      value={item[f]}
                      onChange={e => update(item.id, f, e.target.value)}
                    />
                  </td>
                ))}
                <td className="px-4 py-3 font-mono-custom text-xs text-right">
                  {fmt(Math.max(0, (item.real || item.est) - item.paid))}
                </td>
                <td className="px-4 py-3">
                  <span className={`font-mono-custom text-xs px-2 py-1 border ${getStatusClass(item)}`}>
                    {getStatus(item)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="font-mono-custom text-xs text-gray-300 hover:text-black transition-colors"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add row */}
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <input
            className="w-full border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#C9A84C] transition-colors"
            placeholder="Nueva categoría"
            value={newCat}
            onChange={e => setNewCat(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addItem()}
          />
        </div>
        <div>
          <input
            type="number"
            className="w-36 border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#C9A84C] transition-colors"
            placeholder="Presupuesto €"
            value={newEst}
            onChange={e => setNewEst(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addItem()}
          />
        </div>
        <button
          onClick={addItem}
          className="font-mono-custom text-xs tracking-widest uppercase border border-gray-200 px-5 py-2.5 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
        >
          + Añadir
        </button>
      </div>
    </div>
  )
}
