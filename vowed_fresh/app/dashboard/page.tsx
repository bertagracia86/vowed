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
  { id: 'resumen', label: 'Resumen', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z' },
  { id: 'cronograma', label: 'Cronograma', icon: 'M8 3v4M16 3v4M3 10h18M5 5h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z' },
  { id: 'tareas', label: 'Tareas', icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' },
  { id: 'presupuesto', label: 'Presupuesto', icon: 'M12 3a9 9 0 100 18A9 9 0 0012 3zM12 8v8M9 10.5c0-1.5 1.5-2 3-2s3 .8 3 2-1 1.5-3 2-3 1-3 2.5 1.5 2 3 2 3-.6 3-2' },
  { id: 'invitados', label: 'Invitados', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
  { id: 'mesas', label: 'Mesas', icon: 'M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z' },
  { id: 'proveedores', label: 'Proveedores', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM9 22V12h6v10' },
  { id: 'web-boda', label: 'Web de boda', icon: 'M12 2a10 10 0 100 20A10 10 0 0012 2zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20' },
  { id: 'notas', label: 'Notas', icon: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18 2l4 4-10 10H8v-4L18 2z' },
  { id: 'invitaciones', label: 'Invitaciones', icon: 'M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6' },
]

const NAV_BOTTOM = [
  { id: 'precios', label: 'Precios', icon: 'M2 8h20v13H2zM2 8l10 7 10-7' },
  { id: 'ajustes', label: 'Ajustes', icon: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19 12a7 7 0 01-.1 1.2l2 1.6-2 3.4-2.4-.7a7 7 0 01-2 1.2l-.4 2.5H10l-.4-2.5a7 7 0 01-2-1.2l-2.4.7-2-3.4 2-1.6A7 7 0 015 12a7 7 0 01.1-1.2l-2-1.6 2-3.4 2.4.7a7 7 0 012-1.2L10 2.5h4l.4 2.5a7 7 0 012 1.2l2.4-.7 2 3.4-2 1.6A7 7 0 0119 12z' },
]

function SideIcon({ d }: { d: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: BG, fontFamily: "'Inter',sans-serif" }}>
        <form onSubmit={checkPw} style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 18, padding: '40px 36px', width: 320, textAlign: 'center' }}>
          <div style={{ fontFamily: F, fontSize: 26, fontStyle: 'italic', fontWeight: 700, color: BLUE, marginBottom: 6 }}>vowed</div>
          <p style={{ fontSize: 12, color: MUTE, marginBottom: 24 }}>Introduce la contraseña para entrar</p>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="••••" autoFocus
            style={{ width: '100%', border: '1px solid #DCE7F4', borderRadius: 12, padding: '12px 16px', fontSize: 14, outline: 'none', textAlign: 'center', marginBottom: 12 }} />
          {pwErr && <p style={{ fontSize: 12, color: '#C0594F', marginBottom: 12 }}>{pwErr}</p>}
          <button type="submit" style={{ width: '100%', background: BLUE, color: 'white', border: 'none', borderRadius: 12, padding: '12px 0', fontSize: 14, cursor: 'pointer' }}>Entrar</button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: BG, fontFamily: "'Inter',sans-serif" }}>

      <aside style={{ width: 220, background: 'white', borderRight: '1px solid #ECE9E4', padding: '20px 14px', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px 20px' }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: '#F4EFE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: BLUE, fontSize: 15 }}>♡</div>
          <span style={{ fontFamily: F, fontSize: 18, fontWeight: 700, fontStyle: 'italic', color: BLUE }}>vowed</span>
        </div>

        {NAV_TOP.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} style={{
            display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', padding: '9px 10px', borderRadius: 9, border: 'none',
            background: tab === n.id ? '#F4F2EE' : 'transparent', color: tab === n.id ? INK : MUTE,
            fontWeight: tab === n.id ? 600 : 400, fontSize: 13, cursor: 'pointer', marginBottom: 1
          }}>
            <SideIcon d={n.icon} />{n.label}
          </button>
        ))}

        <div style={{ marginTop: 'auto' }}>
          {NAV_BOTTOM.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', padding: '9px 10px', borderRadius: 9, border: 'none',
              background: tab === n.id ? '#F4F2EE' : 'transparent', color: tab === n.id ? INK : MUTE,
              fontWeight: tab === n.id ? 600 : 400, fontSize: 13, cursor: 'pointer', marginBottom: 1
            }}>
              <SideIcon d={n.icon} />{n.label}
            </button>
          ))}
        </div>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ borderBottom: '1px solid #ECE9E4', padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white' }}>
          <span style={{ fontFamily: F, fontSize: 17, fontWeight: 600, color: INK }}>Nuestra Boda</span>
          <div style={{ border: '1px solid #ECE9E4', borderRadius: 10, padding: '8px 14px', fontSize: 12, color: MUTE, display: 'flex', alignItems: 'center', gap: 8, width: 220 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
            Buscar...
          </div>
        </header>

        <main style={{ flex: 1, padding: '32px 36px', overflowY: 'auto' }}>
          {tab === 'resumen' && <Resumen tasks={tasks} guests={guests} budget={budget} vendors={vendors} weddingDate={weddingDate} setTab={setTab} />}
          {tab === 'tareas' && <Tareas tasks={tasks} setTasks={setTasks} />}
          {tab === 'presupuesto' && <Presupuesto budget={budget} setBudget={setBudget} guestCount={guests.length} />}
          {tab === 'invitados' && <Invitados guests={guests} setGuests={setGuests} />}
          {tab === 'mesas' && <Mesas tables={tables} setTables={setTables} guests={guests} setGuests={setGuests} />}
          {tab === 'cronograma' && <Cronograma milestones={milestones} setMilestones={setMilestones} weddingDate={weddingDate} setWeddingDate={setWeddingDate} />}
          {tab === 'proveedores' && <Proveedores vendors={vendors} setVendors={setVendors} />}
          {tab === 'web-boda' && <WebBoda info={weddingInfo} setInfo={setWeddingInfo} />}
          {tab === 'notas' && <Notas notes={notes} setNotes={setNotes} />}
          {tab === 'invitaciones' && <Invitaciones />}

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
  )
}
