'use client'
import { F, BLUE, INK, MUTE } from '@/lib/constants'
import { Task, Guest, BudgetItem, Vendor, WeddingInfo } from '@/lib/types'

interface Props {
  tasks: Task[]
  guests: Guest[]
  budget: BudgetItem[]
  vendors: Vendor[]
  weddingInfo: WeddingInfo
  weddingDate: string
  setTab: (t: string) => void
}

function Row({ title, sub, cta, onClick }: { title: string; sub: string; cta: string; onClick: () => void }) {
  return (
    <div style={{ padding: '6px 0', borderBottom: '1px solid #ECE9E4', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: INK, marginBottom: 1 }}>{title}</p>
        <p style={{ fontSize: 10, color: MUTE, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</p>
      </div>
      <button onClick={onClick} style={{ flexShrink: 0, border: '1px solid #ECE9E4', borderRadius: 8, padding: '5px 11px', background: 'white', fontSize: 10, color: INK, cursor: 'pointer', whiteSpace: 'nowrap' }}>
        {cta}
      </button>
    </div>
  )
}

export default function Resumen({ tasks, guests, budget, vendors, weddingInfo, weddingDate, setTab }: Props) {
  const confirmedGuests = guests.filter(g => g.rsvp === 'Sí').length
  const budgetPaid = budget.reduce((a, b) => a + b.paid, 0)
  const budgetEst = budget.reduce((a, b) => a + b.estimated, 0)
  const vendorsContratados = vendors.filter(v => v.status === 'Contratado').length

  const hashtag = `#${(weddingInfo.partner1 || 'Nuestra').replace(/\s/g, '')}Y${(weddingInfo.partner2 || 'Boda').replace(/\s/g, '')}`
  const dateLabel = weddingDate ? new Date(weddingDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Sin definir'

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 20, height: '100%' }}>

      {/* IZQUIERDA — foto, nombres, pills, QR */}
      <div>
        <div style={{ position: 'relative', height: 100, borderRadius: 14, border: '1.5px dashed #DDD8D0', background: '#F4F2EE', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 8 }}>
          <span style={{ fontSize: 10, color: MUTE }}>Subir foto de portada</span>
        </div>

        <p style={{ fontFamily: F, fontSize: 17, fontWeight: 600, color: INK, textAlign: 'center', marginBottom: 6 }}>
          {weddingInfo.partner1 || 'Vosotros'} &amp; {weddingInfo.partner2 || 'dos'}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', marginBottom: 8 }}>
          <span style={{ border: '1px solid #ECE9E4', borderRadius: 999, padding: '3px 9px', fontSize: 9, color: MUTE }}>{dateLabel}</span>
          <span style={{ border: '1px solid #ECE9E4', borderRadius: 999, padding: '3px 9px', fontSize: 9, color: MUTE }}>{weddingInfo.venue || 'Sin definir'}</span>
          <span style={{ border: '1px solid #ECE9E4', borderRadius: 999, padding: '3px 9px', fontSize: 9, color: MUTE }}>{hashtag}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: `repeating-linear-gradient(45deg, ${INK} 0 4px, white 4px 8px)`, opacity: 0.85 }} />
        </div>
        <p style={{ fontSize: 9, color: MUTE, textAlign: 'center', marginTop: 5 }}>Compartid vuestro progreso</p>
      </div>

      {/* DERECHA — secciones, todo visible sin scroll */}
      <div>
        <Row
          title="Web de la boda"
          sub={weddingInfo.message ? weddingInfo.message : 'Aún no habéis publicado vuestra web'}
          cta="Editar web"
          onClick={() => setTab('web-boda')}
        />
        <Row
          title="Espacio y proveedores"
          sub={`${vendorsContratados}/${vendors.length} contratados`}
          cta="Ver proveedores"
          onClick={() => setTab('proveedores')}
        />
        <Row
          title="Invitaciones y papelería"
          sub="Diseños listos para personalizar y enviar"
          cta="Ver invitaciones"
          onClick={() => setTab('invitaciones')}
        />
        <Row
          title="Invitados y RSVP"
          sub={`${guests.length} invitados · ${confirmedGuests} confirmados`}
          cta="Añadir invitados"
          onClick={() => setTab('invitados')}
        />
        <Row
          title="Presupuesto"
          sub={`${budgetPaid.toLocaleString('es-ES')} € pagados de ${budgetEst.toLocaleString('es-ES')} €`}
          cta="Gestionar"
          onClick={() => setTab('presupuesto')}
        />
        <Row
          title="Plano de mesas"
          sub={`${guests.filter(g => g.table_name).length}/${guests.length} invitados asignados`}
          cta="Ver mesas"
          onClick={() => setTab('mesas')}
        />
        <Row
          title="Lista de tareas"
          sub={`${tasks.filter(t => t.done).length}/${tasks.length} completadas`}
          cta="Ver tareas"
          onClick={() => setTab('tareas')}
        />
      </div>
    </div>
  )
}
