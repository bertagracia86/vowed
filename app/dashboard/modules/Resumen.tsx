'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE, TEXT_PRIMARY, TEXT_SECONDARY } from '@/lib/constants'
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

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0 }}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function Pill({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <span style={{ border: '1px solid #ECE9E4', borderRadius: 999, padding: '4px 10px 4px 8px', fontSize: 10, color: TEXT_SECONDARY, display: 'flex', alignItems: 'center', gap: 4 }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.8"><path d={icon} /></svg>
      {children}
    </span>
  )
}

function Section({ title, badge, open, onToggle, children }: { title: string; badge?: string; open: boolean; onToggle: () => void; children?: React.ReactNode }) {
  return (
    <div style={{ borderBottom: '1px solid #ECE9E4', padding: '10px 0' }}>
      <div onClick={onToggle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY }}>{title}</span>
          {badge && <span style={{ background: '#F4EFE8', color: '#898a76', fontSize: 9, fontWeight: 600, borderRadius: 999, padding: '2px 8px' }}>{badge}</span>}
        </div>
        <Chevron open={open} />
      </div>
      {open && children}
    </div>
  )
}

export default function Resumen({ tasks, guests, budget, vendors, weddingInfo, weddingDate, setTab }: Props) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ invitados: true })
  const toggle = (id: string) => setOpenSections(s => ({ ...s, [id]: !s[id] }))

  const confirmedGuests = guests.filter(g => g.rsvp === 'Sí').length
  const budgetPaid = budget.reduce((a, b) => a + b.paid, 0)
  const budgetEst = budget.reduce((a, b) => a + b.estimated, 0)
  const vendorsContratados = vendors.filter(v => v.status === 'Contratado').length

  const hashtag = `#${(weddingInfo.partner1 || 'Nuestra').replace(/\s/g, '')}Y${(weddingInfo.partner2 || 'Boda').replace(/\s/g, '')}`
  const dateLabel = weddingDate ? new Date(weddingDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Sin definir'

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20 }}>

        {/* IZQUIERDA — foto, nombres, pills, QR */}
        <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 16, padding: 14 }}>
          <div style={{ position: 'relative', height: 230, borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
            <img src="/pareja-portada.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <span style={{ position: 'absolute', left: 8, bottom: 8, background: 'rgba(255,255,255,0.9)', borderRadius: 999, padding: '4px 10px', fontSize: 9, color: TEXT_PRIMARY, display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7l2-3h4l2 3" /></svg>
              Subir foto
            </span>
          </div>

          <p style={{ fontFamily: F, fontSize: 20, fontWeight: 600, color: TEXT_PRIMARY, textAlign: 'center', marginBottom: 4 }}>
            {weddingInfo.partner1 || 'Vosotros'} &amp; {weddingInfo.partner2 || 'dos'}
          </p>
          <p style={{ textAlign: 'center', color: BLUE, fontSize: 12, marginBottom: 10 }}>♡</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center', marginBottom: 12 }}>
            <Pill icon="M8 2v4M16 2v4M3 10h18M5 5h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z">{weddingDate ? dateLabel : 'Fecha de la boda'}</Pill>
            <Pill icon="M12 2C8 2 5 5.5 5 9.5 5 15 12 22 12 22s7-7 7-12.5C19 5.5 16 2 12 2zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z">{weddingInfo.venue || 'Tu ubicación'}</Pill>
            <Pill icon="M5 9h14M5 15h14M10 3L8 21M16 3l-2 18">{weddingInfo.partner1 ? hashtag : 'Tu hashtag'}</Pill>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: 10, background: `repeating-linear-gradient(45deg, ${INK} 0 4px, white 4px 8px)`, opacity: 0.85 }} />
          </div>
          <p style={{ fontSize: 10, color: TEXT_SECONDARY, textAlign: 'center', marginTop: 6 }}>Consigue la app iOS</p>
        </div>

        {/* DERECHA — acordeón de secciones */}
        <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 16, padding: '4px 20px' }}>
          <Section title="Espacio y proveedores" open={!!openSections['proveedores']} onToggle={() => toggle('proveedores')}>
            <div onClick={() => setTab('proveedores')} style={{ marginTop: 8, marginBottom: 4, background: '#FBF6EF', borderRadius: 10, padding: '9px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: TEXT_PRIMARY, cursor: 'pointer' }}>
              <span>{vendorsContratados}/{vendors.length} contratados. ¿Buscamos más?</span>
              <span style={{ color: '#898a76', fontWeight: 600, whiteSpace: 'nowrap' }}>Ver más →</span>
            </div>
          </Section>

          <Section title="Invitaciones y papelería" open={!!openSections['invitaciones']} onToggle={() => toggle('invitaciones')}>
            <p onClick={() => setTab('invitaciones')} style={{ fontSize: 11.5, color: TEXT_SECONDARY, margin: '6px 0 10px', cursor: 'pointer' }}>Diseños listos para personalizar y enviar.</p>
          </Section>

          <Section title="Regalos" open={!!openSections['regalos']} onToggle={() => toggle('regalos')}>
            <p onClick={() => setTab('regalos')} style={{ fontSize: 11.5, color: TEXT_SECONDARY, margin: '6px 0 10px', cursor: 'pointer' }}>Cread vuestra lista y compartidla con los invitados.</p>
          </Section>

          <Section title="Invitados y RSVP" open={!!openSections['invitados']} onToggle={() => toggle('invitados')}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, marginBottom: 4, gap: 16 }}>
              <div>
                <p style={{ fontSize: 11.5, color: TEXT_SECONDARY, marginBottom: 8, lineHeight: 1.5, maxWidth: 300 }}>
                  Una lista de invitados completa es la mejor forma de tener un recuento preciso. ¡Seguid así!
                </p>
                <button onClick={() => setTab('invitados')} style={{ background: '#898a76', color: 'white', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 11.5, fontWeight: 600, cursor: 'pointer' }}>
                  Añadir invitados
                </button>
              </div>
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <p style={{ fontFamily: F, fontSize: 26, color: TEXT_PRIMARY, fontWeight: 600 }}>{guests.length}</p>
                <p style={{ fontSize: 10, color: TEXT_SECONDARY }}>Invitados</p>
              </div>
            </div>
          </Section>

          <Section title="Presupuesto" open={!!openSections['presupuesto']} onToggle={() => toggle('presupuesto')}>
            <p onClick={() => setTab('presupuesto')} style={{ fontSize: 11.5, color: TEXT_SECONDARY, margin: '6px 0 10px', cursor: 'pointer' }}>
              {budgetPaid.toLocaleString('es-ES')} € pagados de {budgetEst.toLocaleString('es-ES')} €
            </p>
          </Section>

          <p onClick={() => setTab('mesas')} style={{ fontSize: 10.5, color: TEXT_SECONDARY, textAlign: 'right', padding: '8px 0 2px', cursor: 'pointer' }}>
            ≡ Reordenar
          </p>
        </div>
      </div>

      {/* FEATURED INSPIRATION */}
      <div style={{ marginTop: 18, background: 'white', border: '1px solid #ECE9E4', borderRadius: 16, padding: 16, display: 'grid', gridTemplateColumns: '220px repeat(4, 1fr)', gap: 12, alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: '#898a76', letterSpacing: 0.5, marginBottom: 6 }}>INSPIRACIÓN DESTACADA</span>
          <p style={{ fontFamily: F, fontSize: 17, color: TEXT_PRIMARY, lineHeight: 1.25, marginBottom: 10 }}>
            Historias de amor que tuvimos el honor de acompañar
          </p>
          <button style={{ alignSelf: 'flex-start', border: '1px solid #ECE9E4', background: 'white', color: TEXT_PRIMARY, borderRadius: 8, padding: '7px 14px', fontSize: 11, cursor: 'pointer' }}>
            Ver portfolio
          </button>
        </div>
        {['/showcase-1.png', '/showcase-2.png', '/showcase-3.png', '/detalles.png'].map((src, i) => (
          <div key={i} style={{ borderRadius: 12, overflow: 'hidden', minHeight: 150 }}>
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  )
}
