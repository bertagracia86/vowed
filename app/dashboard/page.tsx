'use client'
import { useState } from 'react'
import { F, BLUE, BLUE_DARK, INK, MUTE, BG, PASSWORD } from '@/lib/constants'
import { DEFAULT_TASKS, DEFAULT_GUESTS, DEFAULT_BUDGET, DEFAULT_VENDORS, DEFAULT_MILESTONES, DEFAULT_TABLES, DEFAULT_WEDDING } from '@/lib/defaults'

import Resumen from './modules/Resumen'
import Planning from './modules/Planning'
import Timeline from './modules/Timeline'
import Tareas from './modules/Tareas'
import Presupuesto from './modules/Presupuesto'
import Invitados from './modules/Invitados'
import Mesas from './modules/Mesas'
import Proveedores from './modules/Proveedores'
import Notas from './modules/Notas'
import Invitaciones from './modules/Invitaciones'
import Regalos from './modules/Regalos'
import Mensajes from './modules/Mensajes'
import Consejos from './modules/Consejos'
import LunasMiel from './modules/LunasMiel'
import Ajustes from './modules/Ajustes'
import AiPlanner from './modules/AiPlanner'
import BodasDestino from './modules/BodasDestino'

const NAV_TOP = [
  { id: 'resumen', label: 'Vuestra boda', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM9 22V12h6v10' },
  { id: 'planning', label: 'Planning', icon: 'M8 3v4M16 3v4M3 10h18M5 5h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z' },
  { id: 'timeline', label: 'Timeline', icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2' },
  { id: 'proveedores', label: 'Espacio y proveedores', icon: 'M20.59 13.41L13.42 20.58a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01' },
  { id: 'regalos', label: 'Detalles', icon: 'M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z' },
  { id: 'invitaciones', label: 'Invitaciones y papelería', icon: 'M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6' },
  { id: 'presupuesto', label: 'Presupuesto', icon: 'M12 3a9 9 0 100 18A9 9 0 0012 3zM12 8v8M9 10.5c0-1.5 1.5-2 3-2s3 .8 3 2-1 1.5-3 2-3 1-3 2.5 1.5 2 3 2 3-.6 3-2' },
  { id: 'invitados', label: 'Invitados y RSVP', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
  { id: 'mensajes', label: 'Mensajes a invitados', icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
  { id: 'mesas', label: 'Plano de mesas', icon: 'M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z' },
]

const NAV_SECONDARY = [
  { id: 'tareas', label: 'Checklist', icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' },
  { id: 'notas', label: 'Notas', icon: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18 2l4 4-10 10H8v-4L18 2z' },
  { id: 'consejos', label: 'Consejos de expertos', icon: 'M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2zM9 21h6M10 18h4' },
  { id: 'lunas-miel', label: 'Lunas de miel', icon: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z' },
  { id: 'bodas-destino', label: 'Bodas de destino', icon: 'M12 2C8 2 5 5.5 5 9.5 5 15 12 22 12 22s7-7 7-12.5C19 5.5 16 2 12 2zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' },
]

const NAV_BOTTOM = [
  { id: 'precios', label: 'Precios', icon: 'M2 8h20v13H2zM2 8l10 7 10-7' },
  { id: 'ia', label: 'IA', icon: 'M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z' },
  { id: 'ajustes', label: 'Ajustes', icon: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19 12a7 7 0 01-.1 1.2l2 1.6-2 3.4-2.4-.7a7 7 0 01-2 1.2l-.4 2.5H10l-.4-2.5a7 7 0 01-2-1.2l-2.4.7-2-3.4 2-1.6A7 7 0 015 12a7 7 0 01.1-1.2l-2-1.6 2-3.4 2.4.7a7 7 0 012-1.2L10 2.5h4l.4 2.5a7 7 0 012 1.2l2.4-.7 2 3.4-2 1.6A7 7 0 0119 12z' },
]

const ALL_NAV = [...NAV_TOP, ...NAV_SECONDARY, ...NAV_BOTTOM]

const NOTIFICATIONS = [
  { id: '1', text: 'Ana Martínez aún no ha confirmado su asistencia.', time: 'Hace 2 días' },
  { id: '2', text: 'Recordatorio: pago pendiente a Catering Saborea.', time: 'Hace 4 días' },
  { id: '3', text: 'Faltan 3 direcciones por recopilar para las invitaciones.', time: 'Hace 1 semana' },
]

function SideIcon({ d }: { d: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

interface Note { id: string; title: string; content: string; color: string }

export default function Dashboard() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState('')
  const [tab, setTab] = useState('resumen')
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch] = useState('')
  const [showNotifs, setShowNotifs] = useState(false)

  const [tasks, setTasks] = useState(DEFAULT_TASKS)
  const [guests, setGuests] = useState(DEFAULT_GUESTS)
  const [budget, setBudget] = useState(DEFAULT_BUDGET)
  const [vendors, setVendors] = useState(DEFAULT_VENDORS)
  const [milestones, setMilestones] = useState(DEFAULT_MILESTONES)
  const [tables, setTables] = useState(DEFAULT_TABLES)
  const [weddingInfo, setWeddingInfo] = useState(DEFAULT_WEDDING)
  const [notes, setNotes] = useState<Note[]>([])
  const [weddingDate, setWeddingDate] = useState(DEFAULT_WEDDING.date)

  function checkPw(e: React.FormEvent) {
    e.preventDefault()
    if (pw === PASSWORD) { setAuthed(true); setPwErr('') }
    else setPwErr('Contraseña incorrecta')
  }

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: BG, fontFamily: F }}>
        <form onSubmit={checkPw} style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 18, padding: '40px 36px', width: 320, textAlign: 'center' }}>
          <div style={{ fontFamily: F, fontSize: 26, fontStyle: 'italic', fontWeight: 700, color: '#898a76', marginBottom: 6 }}>mylov3</div>
          <p style={{ fontSize: 12, color: MUTE, marginBottom: 24 }}>Introduce la contraseña para entrar</p>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="••••" autoFocus
            style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 12, padding: '12px 16px', fontSize: 14, outline: 'none', textAlign: 'center', marginBottom: 12 }} />
          {pwErr && <p style={{ fontSize: 12, color: '#C0594F', marginBottom: 12 }}>{pwErr}</p>}
          <button type="submit" style={{ width: '100%', background: BLUE, color: 'white', border: 'none', borderRadius: 12, padding: '12px 0', fontSize: 14, cursor: 'pointer' }}>Entrar</button>
        </form>
      </div>
    )
  }

  return (
    <div className="dash-root" style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: BG, fontFamily: F, overflow: 'hidden' }}>
      <style>{`.dash-root, .dash-root p, .dash-root span, .dash-root div, .dash-root button, .dash-root input, .dash-root textarea, .dash-root a, .dash-root li, .dash-root td, .dash-root th, .dash-root label { font-weight: 500; }`}</style>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>

      <aside onMouseEnter={() => setCollapsed(false)} style={{ width: collapsed ? 60 : 210, minWidth: collapsed ? 60 : 210, background: '#fcf9f6', borderRight: '1px solid #ECE9E4', padding: collapsed ? '14px 8px' : '14px 12px', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden', transition: 'width 0.18s ease, min-width 0.18s ease, padding 0.18s ease' }}>
        <button onClick={() => setCollapsed(c => !c)} style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: 8, padding: '2px 8px 8px', background: 'none', border: 'none', cursor: 'pointer' }}>
          {collapsed
            ? <span style={{ fontSize: 18, color: '#898a76' }}>♡</span>
            : <span style={{ fontFamily: F, fontSize: 24, fontWeight: 700, fontStyle: 'italic', color: '#898a76' }}>mylov3</span>}
        </button>

        {NAV_TOP.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} title={n.label} style={{
            display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: 8, textAlign: 'left', padding: collapsed ? '9px 0' : '7px 10px', borderRadius: 10, border: 'none',
            background: tab === n.id ? '#F4E7D8' : 'transparent', color: INK,
            fontWeight: tab === n.id ? 700 : 400, fontSize: 12.5, cursor: 'pointer', marginBottom: 2
          }}>
            <SideIcon d={n.icon} />{!collapsed && n.label}
          </button>
        ))}

        <div style={{ height: 1, background: '#ECE9E4', margin: '9px 10px' }} />

        {!collapsed && <span style={{ fontSize: 12.5, fontWeight: 700, color: INK, padding: '2px 10px 6px' }}>Consejos de expertos</span>}

        {!collapsed && NAV_SECONDARY.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} style={{
            display: 'block', textAlign: 'left', padding: '6px 10px', borderRadius: 8, border: 'none',
            background: 'transparent', color: INK,
            fontWeight: tab === n.id ? 600 : 400, fontSize: 12.5, cursor: 'pointer'
          }}>
            {n.label}
          </button>
        ))}

        <div style={{ marginTop: 'auto' }}>
          {NAV_BOTTOM.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} title={n.label} style={{
              display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: 10, textAlign: 'left', padding: collapsed ? '9px 0' : '7px 10px', borderRadius: 9, border: 'none',
              background: tab === n.id ? '#F4EFE8' : 'transparent', color: INK,
              fontWeight: tab === n.id ? 600 : 400, fontSize: 12.5, cursor: 'pointer', marginBottom: 1
            }}>
              <SideIcon d={n.icon} />{!collapsed && n.label}
            </button>
          ))}
        </div>
      </aside>

      <div onMouseEnter={() => setCollapsed(true)} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ borderBottom: '1px solid #ECE9E4', padding: '10px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, background: 'white', flexShrink: 0 }}>
          <span style={{ fontFamily: F, fontSize: 19, fontWeight: 600, color: INK, flexShrink: 0 }}>Vuestra boda</span>
          <div style={{ position: 'relative', flex: 1, maxWidth: 420 }}>
            <div style={{ border: '1px solid #ECE9E4', borderRadius: 10, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Buscar secciones del panel..."
                style={{ border: 'none', outline: 'none', fontSize: 12, color: INK, flex: 1, background: 'transparent', fontFamily: F }}
              />
            </div>
            {search.trim() && (
              <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, background: 'white', border: '1px solid #ECE9E4', borderRadius: 10, boxShadow: '0 8px 20px rgba(0,0,0,0.08)', zIndex: 40, overflow: 'hidden' }}>
                {ALL_NAV.filter(n => n.label.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
                  <p style={{ padding: '10px 14px', fontSize: 12, color: MUTE }}>Sin resultados</p>
                ) : ALL_NAV.filter(n => n.label.toLowerCase().includes(search.toLowerCase())).map(n => (
                  <button key={n.id} onClick={() => { setTab(n.id); setSearch('') }} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: 'left', padding: '9px 14px', border: 'none', background: 'white', cursor: 'pointer', fontSize: 12.5, color: INK }}>
                    <SideIcon d={n.icon} />{n.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <svg onClick={() => setTab('mensajes')} width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.6" style={{ cursor: 'pointer' }}><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6"/></svg>
            <svg onClick={() => setTab('regalos')} width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.6" style={{ cursor: 'pointer' }}><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>
            <div style={{ position: 'relative' }}>
              <svg onClick={() => setShowNotifs(s => !s)} width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.6" style={{ cursor: 'pointer' }}><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/></svg>
              <span onClick={() => setShowNotifs(s => !s)} style={{ position: 'absolute', top: -6, right: -6, background: '#c0594f', color: 'white', fontSize: 9, width: 15, height: 15, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{NOTIFICATIONS.length}</span>
              {showNotifs && (
                <div style={{ position: 'absolute', top: '140%', right: 0, width: 280, background: 'white', border: '1px solid #ECE9E4', borderRadius: 12, boxShadow: '0 8px 20px rgba(0,0,0,0.1)', zIndex: 40, overflow: 'hidden' }}>
                  <p style={{ fontFamily: F, fontSize: 13, color: INK, padding: '10px 14px', borderBottom: '1px solid #F5EFE0' }}>Notificaciones</p>
                  {NOTIFICATIONS.map(n => (
                    <div key={n.id} style={{ padding: '10px 14px', borderBottom: '1px solid #F5EFE0' }}>
                      <p style={{ fontSize: 12, color: INK, marginBottom: 2, lineHeight: 1.4 }}>{n.text}</p>
                      <p style={{ fontSize: 10.5, color: MUTE }}>{n.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <svg onClick={() => setTab('precios')} width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.6" style={{ cursor: 'pointer' }}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
            <div onClick={() => setTab('ajustes')} style={{ width: 30, height: 30, borderRadius: '50%', background: '#F4EFE7', border: `1px solid ${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: BLUE_DARK, fontFamily: F, cursor: 'pointer' }}>LM</div>
          </div>
        </header>

        <main onMouseEnter={() => setCollapsed(true)} style={{ flex: 1, minWidth: 0, padding: '12px 32px', overflowY: 'auto', overflowX: 'hidden', background: 'white' }}>
          {tab === 'resumen' && <Resumen tasks={tasks} guests={guests} budget={budget} vendors={vendors} weddingInfo={weddingInfo} weddingDate={weddingDate} setTab={setTab} />}
          {tab === 'planning' && <Planning tasks={tasks} setTasks={setTasks} milestones={milestones} setMilestones={setMilestones} weddingDate={weddingDate} setTab={setTab} />}
          {tab === 'ia' && <AiPlanner tasks={tasks} guests={guests} budget={budget} />}
          {tab === 'timeline' && <Timeline weddingDate={weddingDate} guestCount={guests.length} />}
          {tab === 'tareas' && <Tareas tasks={tasks} setTasks={setTasks} />}
          {tab === 'presupuesto' && <Presupuesto budget={budget} setBudget={setBudget} guestCount={guests.length} />}
          {tab === 'invitados' && <Invitados guests={guests} setGuests={setGuests} onNavigate={setTab} />}
          {tab === 'mesas' && <Mesas tables={tables} setTables={setTables} guests={guests} setGuests={setGuests} />}
          {tab === 'proveedores' && <Proveedores vendors={vendors} setVendors={setVendors} />}
          {tab === 'notas' && <Notas notes={notes} setNotes={setNotes} />}
          {tab === 'invitaciones' && <Invitaciones weddingInfo={weddingInfo} />}
          {tab === 'regalos' && <Regalos weddingInfo={weddingInfo} />}
          {tab === 'mensajes' && <Mensajes guests={guests} />}
          {tab === 'consejos' && <Consejos />}
          {tab === 'lunas-miel' && <LunasMiel />}
          {tab === 'bodas-destino' && <BodasDestino />}

          {tab === 'precios' && (
            <div>
              <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 24 }}>Precios</h1>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 16, padding: 28 }}>
                  <p style={{ fontFamily: F, fontSize: 22, color: INK, marginBottom: 6 }}>Organizador</p>
                  <p style={{ fontFamily: F, fontSize: 36, color: INK, marginBottom: 12 }}>Gratis</p>
                  <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.8 }}>Todas las herramientas de planificación: tareas, presupuesto, invitados, mesas, cronograma y notas.</p>
                </div>
                <div style={{ background: 'white', border: `2px solid ${BLUE}`, borderRadius: 16, padding: 28 }}>
                  <p style={{ fontFamily: F, fontSize: 22, color: INK, marginBottom: 6 }}>Plantillas de invitación</p>
                  <p style={{ fontFamily: F, fontSize: 36, color: BLUE, marginBottom: 12 }}>Desde 10 €</p>
                  <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.8 }}>Diseños digitales listos para personalizar. Pago único, descarga inmediata.</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'ajustes' && <Ajustes weddingInfo={weddingInfo} setWeddingInfo={setWeddingInfo} weddingDate={weddingDate} setWeddingDate={setWeddingDate} onLogout={() => setAuthed(false)} />}
        </main>
      </div>
      </div>
    </div>
  )
}
