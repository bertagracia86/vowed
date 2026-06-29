'use client'

import { useState } from 'react'

const CHECKLIST = [
  { period: '18 meses antes', items: [
    { id: 'c1', t: 'Definir el presupuesto total', d: 'El primer paso. Todo lo demás depende de esta cifra.' },
    { id: 'c2', t: 'Elegir la fecha tentativa', d: 'Tened en cuenta la temporada, el clima y la disponibilidad familiar.' },
    { id: 'c3', t: 'Hacer una lista preliminar de invitados', d: 'El número de invitados condiciona el espacio y el coste.' },
    { id: 'c4', t: 'Visitar y reservar el espacio', d: 'Las buenas fincas se agotan 18 meses antes.' },
    { id: 'c5', t: 'Contratar al fotógrafo', d: 'Los mejores tienen agenda llena con mucha antelación.' },
  ]},
  { period: '12 meses antes', items: [
    { id: 'c6', t: 'Buscar y contratar catering', d: 'Pedid degustación antes de firmar.' },
    { id: 'c7', t: 'Contratar músicos o DJ', d: 'Decidid el arco musical: ceremonia, cóctel, cena y baile.' },
    { id: 'c8', t: 'Reservar alojamiento para invitados', d: 'Negociad tarifas de grupo con hoteles cercanos.' },
    { id: 'c9', t: 'Buscar florista y definir el moodboard floral', d: 'Compartid referencias visuales antes de la primera reunión.' },
    { id: 'c10', t: 'Elegir el vestido / traje', d: 'Los plazos de confección pueden ser de 6 a 9 meses.' },
  ]},
  { period: '9 meses antes', items: [
    { id: 'c11', t: 'Reservar luna de miel', d: 'Los mejores destinos se agotan con antelación.' },
    { id: 'c12', t: 'Contratar videógrafo', d: 'Si queréis vídeo, no lo dejéis para el final.' },
    { id: 'c13', t: 'Definir el menú definitivo', d: 'Incluid opciones vegetarianas, veganas e infantiles.' },
    { id: 'c14', t: 'Elegir pastelería y diseño de tarta', d: 'Pedid degustación de sabores.' },
  ]},
  { period: '6 meses antes', items: [
    { id: 'c15', t: 'Diseñar y encargar invitaciones', d: 'Tened en cuenta los plazos de impresión.' },
    { id: 'c16', t: 'Crear la web de boda', d: 'Con toda la información para los invitados.' },
    { id: 'c17', t: 'Contratar transporte', d: 'Traslados desde la iglesia a la finca y al final de la noche.' },
    { id: 'c18', t: 'Definir detalles y regalos para invitados', d: 'Los más personales son los más recordados.' },
  ]},
  { period: '3 meses antes', items: [
    { id: 'c19', t: 'Enviar invitaciones', d: 'Con 3 meses mínimo. 4 si es en verano o festivo.' },
    { id: 'c20', t: 'Confirmar asistencia de todos los invitados', d: 'Importante para el seating y el número de menús.' },
    { id: 'c21', t: 'Primera prueba de vestido / traje', d: 'Dejad tiempo para ajustes.' },
    { id: 'c22', t: 'Reunión de coordinación con todos los proveedores', d: 'Repasad el timing del día con cada uno.' },
  ]},
  { period: '1 mes antes', items: [
    { id: 'c23', t: 'Confirmar menús y número de comensales', d: 'Incluid alergias e intolerancias.' },
    { id: 'c24', t: 'Finalizar el seating', d: 'Asignad mesas a todos los invitados confirmados.' },
    { id: 'c25', t: 'Preparar la lista de canciones', d: 'Canciones deseadas y canciones prohibidas para el DJ.' },
    { id: 'c26', t: 'Última prueba de vestido / traje', d: 'Con el calzado definitivo.' },
  ]},
  { period: 'La semana antes', items: [
    { id: 'c27', t: 'Confirmar horarios con cada proveedor', d: 'Llamad a todos para repasar el orden del día.' },
    { id: 'c28', t: 'Preparar los pagos pendientes', d: 'Muchos proveedores cobran el día de la boda.' },
    { id: 'c29', t: 'Delegar la coordinación del día', d: 'Designad a alguien de confianza para resolver imprevistos.' },
    { id: 'c30', t: 'Descansar', d: 'El día de la boda lo necesitaréis.' },
  ]},
]

export default function ChecklistPanel() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [open, setOpen] = useState<number>(0)

  const total = CHECKLIST.reduce((a, p) => a + p.items.length, 0)
  const done = Object.values(checked).filter(Boolean).length

  function toggle(id: string) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div>
      <div className="mb-10 pb-6 border-b border-gray-100 flex items-end justify-between">
        <div>
          <div className="font-mono-custom text-xs tracking-widest uppercase text-[#C9A84C] mb-2">
            Por etapas
          </div>
          <h1 className="font-display text-4xl font-light italic">Checklist</h1>
          <p className="font-mono-custom text-xs text-gray-400 mt-2 tracking-wider uppercase">
            {done} de {total} tareas completadas
          </p>
        </div>
      </div>

      <div>
        {CHECKLIST.map((period, i) => {
          const pdone = period.items.filter(it => checked[it.id]).length
          const pct = Math.round((pdone / period.items.length) * 100)
          const isOpen = open === i

          return (
            <div key={i} className="border-b border-gray-100">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full flex items-center gap-6 py-5 text-left hover:bg-gray-50 transition-colors px-1"
              >
                <div className={`font-display text-4xl font-light italic leading-none w-12 text-right transition-colors ${isOpen ? 'text-[#C9A84C]' : 'text-gray-100'}`}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{period.period}</div>
                  <div className="font-mono-custom text-xs text-gray-400 mt-1 tracking-wider">
                    {pdone} / {period.items.length} · {pct}%
                  </div>
                </div>
                <div className={`font-mono-custom text-xs px-3 py-1 border transition-colors ${pdone === period.items.length ? 'border-green-600 text-green-600 bg-green-50' : 'border-gray-200 text-gray-400'}`}>
                  {pdone === period.items.length ? 'Completado' : pct + '%'}
                </div>
                <div className={`font-mono-custom text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}>›</div>
              </button>

              {isOpen && (
                <div className="pl-[72px] pb-4">
                  {period.items.map(item => (
                    <div key={item.id} className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-0">
                      <button
                        onClick={() => toggle(item.id)}
                        className={`w-4 h-4 border mt-0.5 flex-shrink-0 flex items-center justify-center transition-all ${
                          checked[item.id]
                            ? 'bg-[#C9A84C] border-[#C9A84C]'
                            : 'border-gray-200 hover:border-[#C9A84C]'
                        }`}
                      >
                        {checked[item.id] && (
                          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                            <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                      <div>
                        <div className={`text-sm ${checked[item.id] ? 'line-through text-gray-300' : 'text-gray-800'}`}>
                          {item.t}
                        </div>
                        <div className="font-mono-custom text-xs text-gray-400 mt-1">{item.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
