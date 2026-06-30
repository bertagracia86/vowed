'use client'
import { F, BLUE, INK, MUTE } from '@/lib/constants'
import { Task, Guest, BudgetItem, Vendor } from '@/lib/types'

interface Props {
  tasks: Task[]
  guests: Guest[]
  budget: BudgetItem[]
  vendors: Vendor[]
  weddingDate: string
  setTab: (t: string) => void
}

export default function Resumen({ tasks, guests, budget, vendors, weddingDate, setTab }: Props) {
  const doneTasks = tasks.filter(t => t.done).length
  const confirmedGuests = guests.filter(g => g.rsvp === 'Sí').length
  const budgetPaid = budget.reduce((a, b) => a + b.paid, 0)
  const budgetEst = budget.reduce((a, b) => a + b.estimated, 0)
  const nextTasks = tasks.filter(t => !t.done).slice(0, 3)

  let daysLeft: number | null = null
  if (weddingDate) {
    const diff = Math.ceil((new Date(weddingDate).getTime() - Date.now()) / 86400000)
    daysLeft = Math.max(0, diff)
  }

  const cards = [
    { label: 'Presupuesto', value: `${budgetPaid.toLocaleString('es-ES')} €`, sub: `${Math.max(0, budgetEst - budgetPaid).toLocaleString('es-ES')} € restantes`, border: '#ECE9E4', ibg: '#F4F2EE' },
    { label: 'Tareas', value: `${doneTasks}/${tasks.length}`, sub: `${tasks.length - doneTasks} pendientes`, border: '#F3D9D9', ibg: '#FBEEEE' },
    { label: 'Invitados', value: `${guests.length}`, sub: `${confirmedGuests} confirmados`, border: '#EFE0C2', ibg: '#FBF3E1' },
    { label: 'Proveedores', value: `${vendors.filter(v => v.status === 'Contratado').length}/${vendors.length}`, sub: 'contratados', border: '#D9E8D9', ibg: '#EEF5EE' },
  ]

  return (
    <div>
      {daysLeft !== null && (
        <div style={{ background: `linear-gradient(135deg, #EAF1FA, #F3F7FC)`, borderRadius: 16, padding: '24px 28px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: F, fontSize: 22, color: INK, marginBottom: 4 }}>¡Queda poco! ♡</p>
            <p style={{ fontSize: 13, color: MUTE }}>Vuestro gran día se acerca</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: F, fontSize: 56, fontWeight: 300, color: BLUE, lineHeight: 1 }}>{daysLeft}</p>
            <p style={{ fontSize: 11, color: MUTE, letterSpacing: '0.08em' }}>DÍAS</p>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
        {cards.map(c => (
          <div key={c.label} style={{ background: 'white', border: `1px solid ${c.border}`, borderRadius: 16, padding: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: c.ibg, marginBottom: 12 }} />
            <p style={{ fontSize: 12, color: MUTE, marginBottom: 6 }}>{c.label}</p>
            <p style={{ fontFamily: F, fontSize: 24, fontWeight: 600, color: INK, marginBottom: 2 }}>{c.value}</p>
            <p style={{ fontSize: 11, color: MUTE }}>{c.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 16, padding: 22 }}>
          <p style={{ fontSize: 12, color: MUTE, marginBottom: 14 }}>Próximas tareas</p>
          {nextTasks.length > 0 ? nextTasks.map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', fontSize: 13, color: INK }}>
              <span style={{ width: 5, height: 5, borderRadius: 999, background: BLUE, flexShrink: 0 }} />
              {t.title}
            </div>
          )) : <p style={{ fontSize: 12, color: MUTE }}>Todo al día ♡</p>}
          <p onClick={() => setTab('tareas')} style={{ fontSize: 12, color: BLUE, marginTop: 12, cursor: 'pointer' }}>Ver todas →</p>
        </div>

        <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 16, padding: 22 }}>
          <p style={{ fontSize: 12, color: MUTE, marginBottom: 16 }}>Acciones rápidas</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Gestionar presupuesto', tab: 'presupuesto' },
              { label: 'Ver tareas pendientes', tab: 'tareas' },
              { label: 'Gestionar invitados', tab: 'invitados' },
              { label: 'Ver proveedores', tab: 'proveedores' },
            ].map(a => (
              <button key={a.tab} onClick={() => setTab(a.tab)} style={{ textAlign: 'left', border: '1px solid #ECE9E4', borderRadius: 9, padding: '9px 14px', background: 'white', fontSize: 13, color: INK, cursor: 'pointer' }}>
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
