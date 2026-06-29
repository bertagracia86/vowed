'use client'

import type { Page } from '@/app/dashboard/page'

interface Props {
  name1: string
  name2: string
  setPage: (p: Page) => void
}

const areas = [
  { key: 'checklist', label: 'Checklist', value: '0 / 30', sub: 'tareas completadas', page: 'checklist' as Page },
  { key: 'budget', label: 'Presupuesto', value: '0 €', sub: 'gastado', page: 'budget' as Page },
  { key: 'guests', label: 'Invitados', value: '0', sub: 'confirmados', page: 'guests' as Page },
  { key: 'vendors', label: 'Proveedores', value: '0 / 0', sub: 'contratados', page: 'vendors' as Page },
]

export default function HomePanel({ name1, name2, setPage }: Props) {
  const h = new Date().getHours()
  const greeting = h < 13 ? 'Buenos días' : h < 20 ? 'Buenas tardes' : 'Buenas noches'

  return (
    <div>
      <div className="mb-10 pb-6 border-b border-gray-100">
        <div className="font-mono-custom text-xs tracking-widest uppercase text-[#C9A84C] mb-2">
          Panel general
        </div>
        <h1 className="font-display text-4xl font-light italic">
          {greeting}, {name1} & {name2}
        </h1>
        <p className="font-mono-custom text-xs text-gray-400 mt-2 tracking-wider uppercase">
          Empezad por el checklist para ver vuestro progreso
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-px bg-gray-100 border border-gray-100 mb-8">
        {areas.map(a => (
          <button
            key={a.key}
            onClick={() => setPage(a.page)}
            className="bg-white p-6 text-left hover:bg-[#FDFAF2] transition-colors group"
          >
            <div className="font-mono-custom text-xs tracking-widest uppercase text-gray-400 mb-3 group-hover:text-[#C9A84C] transition-colors">
              {a.label}
            </div>
            <div className="font-display text-3xl font-light">{a.value}</div>
            <div className="font-mono-custom text-xs text-gray-400 mt-1">{a.sub}</div>
          </button>
        ))}
      </div>

      {/* Next steps */}
      <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100">
        <div className="bg-white p-8">
          <div className="font-mono-custom text-xs tracking-widest uppercase text-gray-400 mb-6">
            Por dónde empezar
          </div>
          {[
            'Completad el checklist para ver vuestro progreso',
            'Añadid vuestro presupuesto total',
            'Importad vuestra lista de invitados',
            'Añadid vuestros primeros proveedores',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
              <div className="w-1 h-1 rounded-full bg-[#C9A84C] mt-2 flex-shrink-0" />
              <div className="text-sm text-gray-600">{item}</div>
            </div>
          ))}
        </div>
        <div className="bg-[#0A0A0A] p-8 flex flex-col justify-between">
          <div>
            <div className="font-mono-custom text-xs tracking-widest uppercase text-[#C9A84C] mb-4">
              Vuestro plan
            </div>
            <p className="font-display text-2xl font-light italic text-white leading-snug">
              Cada boda es única.<br />El vuestro también.
            </p>
          </div>
          <div className="w-8 h-px bg-[#C9A84C]" />
        </div>
      </div>
    </div>
  )
}
