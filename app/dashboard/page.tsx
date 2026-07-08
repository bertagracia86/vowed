'use client'
import { useState } from 'react'
import { F, BLUE, BLUE_DARK, INK, MUTE, BG, PASSWORD } from '@/lib/constants'
import { DEFAULT_TASKS, DEFAULT_GUESTS, DEFAULT_BUDGET, DEFAULT_VENDORS, DEFAULT_MILESTONES, DEFAULT_TABLES, DEFAULT_WEDDING } from '@/lib/defaults'

import Resumen from './modules/Resumen'
import Tareas from './modules/Tareas'
import Presupuesto from './modules/Presupuesto'
import Invitados from './modules/Invitados'
import Mesas from './modules/Mesas'
import Cronograma from './modules/Cronograma'
import Proveedores from './modules/Proveedores'
import WebBoda from './modules/WebBoda'
import Notas from './modules/Notas'
import Invitaciones from './modules/Invitaciones'

const NAV_TOP = [
  { id: 'resumen', label: 'Vuestra boda', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM9 22V12h6v10' },
  { id: 'proveedores', label: 'Espacio y proveedores', icon: 'M20.59 13.41L13.42 20.58a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01' },
  { id: 'web-boda', label: 'Web de la boda', icon: 'M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20' },
  { id: 'regalos', label: 'Regalos', icon: 'M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z' },
  { id: 'invitaciones', label: 'Invitaciones y papelería', icon: 'M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6' },
  { id: 'presupuesto', label: 'Presupuesto', icon: 'M12 3a9 9 0 100 18A9 9 0 0012 3zM12 8v8M9 10.5c0-1.5 1.5-2 3-2s3 .8 3 2-1 1.5-3 2-3 1-3 2.5 1.5 2 3 2 3-.6 3-2' },
  { id: 'invitados', label: 'Invitados y RSVP', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
  { id: 'mensajes', label: 'Mensajes a invitados', icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' },
  { id: 'mesas', label: 'Plano de mesas', icon: 'M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z' },
]

const NAV_SECONDARY = [
  { id: 'tareas', label: 'Checklist', icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' },
  { id: 'cronograma', label: 'Cronograma', icon: 'M8 3v4M16 3v4M3 10h18M5 5h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z' },
  { id: 'notas', label: 'Notas', icon: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18 2l4 4-10 10H8v-4L18 2z' },
  { id: 'consejos', label: 'Consejos de expertos', icon: 'M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2zM9 21h6M10 18h4' },
  { id: 'lunas-miel', label: 'Lunas de miel', icon: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z' },
  { id: 'bodas-destino', label: 'Bodas de destino', icon: 'M12 2C8 2 5 5.5 5 9.5 5 15 12 22 12 22s7-7 7-12.5C19 5.5 16 2 12 2zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' },
]

const NAV_BOTTOM = [
  { id: 'precios', label: 'Precios', icon: 'M2 8h20v13H2zM2 8l10 7 10-7' },
  { id: 'ajustes', label: 'Ajustes', icon: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19 12a7 7 0 01-.1 1.2l2 1.6-2 3.4-2.4-.7a7 7 0 01-2 1.2l-.4 2.5H10l-.4-2.5a7 7 0 01-2-1.2l-2.4.7-2-3.4 2-1.6A7 7 0 015 12a7 7 0 01.1-1.2l-2-1.6 2-3.4 2.4.7a7 7 0 012-1.2L10 2.5h4l.4 2.5a7 7 0 012 1.2l2.4-.7 2 3.4-2 1.6A7 7 0 0119 12z' },
]

function SideIcon({ d }: { d: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  )
}

function Proximamente({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 8 }}>{title}</h1>
      <p style={{ fontSize: 13, color: MUTE, marginBottom: 24, maxWidth: 420 }}>{body}</p>
      <div style={{ background: 'white', border: '1px dashed #ECE9E4', borderRadius: 16, padding: 40, textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: MUTE }}>Muy pronto podrás gestionar esto desde aquí.</p>
      </div>
    </div>
  )
}

interface Note { id: string; title: string; content: string; color: string }

export default function Dashboard() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState('')
  const [tab, setTab] = useState('resumen')

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
          <div style={{ fontFamily: F, fontSize: 26, fontStyle: 'italic', fontWeight: 700, color: BLUE, marginBottom: 6 }}>mylov3</div>
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
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: BG, fontFamily: F, overflow: 'hidden' }}>
      <div style={{ height: 5, background: BLUE_DARK, flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>

      <aside style={{ width: 210, minWidth: 210, background: '#fcf9f6', borderRight: '1px solid #ECE9E4', padding: '14px 12px', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 8px 8px' }}>
          <span style={{ fontFamily: F, fontSize: 20, fontWeight: 700, fontStyle: 'italic', color: '#4A3323' }}>mylov3</span>
        </div>

        {NAV_TOP.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} style={{
            display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left', padding: '5px 10px', borderRadius: 8, border: 'none',
            background: tab === n.id ? '#F4EFE8' : 'transparent', color: '#8b5f3e',
            fontWeight: tab === n.id ? 600 : 400, fontSize: 12, cursor: 'pointer', marginBottom: 0
          }}>
            <SideIcon d={n.icon} />{n.label}
          </button>
        ))}

        <div style={{ height: 1, background: '#ECE9E4', margin: '7px 10px' }} />

        <span style={{ fontSize: 10, fontWeight: 600, color: '#8b5f3e', textTransform: 'uppercase', letterSpacing: 0.5, padding: '2px 10px 4px' }}>Consejos de expertos</span>

        {NAV_SECONDARY.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} style={{
            display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left', padding: '5px 10px', borderRadius: 8, border: 'none',
            background: tab === n.id ? '#F4EFE8' : 'transparent', color: '#8b5f3e',
            fontWeight: tab === n.id ? 600 : 400, fontSize: 12, cursor: 'pointer', marginBottom: 0
          }}>
            <SideIcon d={n.icon} />{n.label}
          </button>
        ))}

        <div style={{ marginTop: 'auto' }}>
          {NAV_BOTTOM.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', padding: '7px 10px', borderRadius: 9, border: 'none',
              background: tab === n.id ? '#F4EFE8' : 'transparent', color: '#8b5f3e',
              fontWeight: tab === n.id ? 600 : 400, fontSize: 12.5, cursor: 'pointer', marginBottom: 1
            }}>
              <SideIcon d={n.icon} />{n.label}
            </button>
          ))}
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ borderBottom: '1px solid #ECE9E4', padding: '10px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, background: 'white', flexShrink: 0 }}>
          <span style={{ fontFamily: F, fontSize: 19, fontWeight: 600, color: INK, flexShrink: 0 }}>Vuestra boda</span>
          <div style={{ border: '1px solid #ECE9E4', borderRadius: 10, padding: '8px 14px', fontSize: 12, color: MUTE, display: 'flex', alignItems: 'center', gap: 8, flex: 1, maxWidth: 420 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
            Buscar productos, marcas, parejas, proveedores...
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.6"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6"/></svg>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.6"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>
            <div style={{ position: 'relative' }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.6"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/></svg>
              <span style={{ position: 'absolute', top: -6, right: -6, background: '#c0594f', color: 'white', fontSize: 9, width: 15, height: 15, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
            </div>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.6"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#F4EFE7', border: `1px solid ${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: BLUE_DARK, fontFamily: F }}>LM</div>
          </div>
        </header>

        <main style={{ flex: 1, minWidth: 0, padding: '12px 32px', overflow: 'hidden' }}>
          {tab === 'resumen' && <Resumen tasks={tasks} guests={guests} budget={budget} vendors={vendors} weddingInfo={weddingInfo} weddingDate={weddingDate} setTab={setTab} />}
          {tab === 'tareas' && <Tareas tasks={tasks} setTasks={setTasks} />}
          {tab === 'presupuesto' && <Presupuesto budget={budget} setBudget={setBudget} guestCount={guests.length} />}
          {tab === 'invitados' && <Invitados guests={guests} setGuests={setGuests} />}
          {tab === 'mesas' && <Mesas tables={tables} setTables={setTables} guests={guests} setGuests={setGuests} />}
          {tab === 'cronograma' && <Cronograma milestones={milestones} setMilestones={setMilestones} weddingDate={weddingDate} setWeddingDate={setWeddingDate} />}
          {tab === 'proveedores' && <Proveedores vendors={vendors} setVendors={setVendors} />}
          {tab === 'web-boda' && <WebBoda info={weddingInfo} setInfo={setWeddingInfo} />}
          {tab === 'notas' && <Notas notes={notes} setNotes={setNotes} />}
          {tab === 'invitaciones' && <Invitaciones />}
          {tab === 'regalos' && <Proximamente title="Regalos" body="Crea vuestra lista de regalos y compartidla con los invitados." />}
          {tab === 'mensajes' && <Proximamente title="Mensajes a invitados" body="Enviad recordatorios y novedades a todos vuestros invitados desde un solo sitio." />}
          {tab === 'consejos' && <Proximamente title="Consejos de expertos" body="Ideas y consejos de wedding planners para cada etapa de la organización." />}
          {tab === 'lunas-miel' && <Proximamente title="Lunas de miel" body="Inspiración y ofertas para vuestro viaje de luna de miel." />}
          {tab === 'bodas-destino' && <Proximamente title="Bodas de destino" body="Todo lo que necesitáis para organizar una boda fuera de casa." />}

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

          {tab === 'ajustes' && (
            <div>
              <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Ajustes</h1>
              <p style={{ fontSize: 13, color: MUTE, marginBottom: 24 }}>Modo demo — los datos se reinician al recargar.</p>
              <button onClick={() => setAuthed(false)} style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 12, padding: '11px 22px', fontSize: 13, color: INK, cursor: 'pointer' }}>
                Cerrar sesión
              </button>
            </div>
          )}
        </main>
      </div>
      </div>
    </div>
  )
}
