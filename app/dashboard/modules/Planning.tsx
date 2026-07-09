'use client'
import { useState } from 'react'
import { F, INK, MUTE } from '@/lib/constants'
import { Task, Milestone } from '@/lib/types'
import { TASK_PHASES } from '@/lib/defaults'

interface Props { tasks: Task[]; setTasks: (t: Task[]) => void; milestones: Milestone[]; setMilestones: (m: Milestone[]) => void; weddingDate: string; setTab: (t: string) => void }

const CARD = '#FFFDFB'
const BROWN = '#898a76'
const BEIGE = '#E7DDD2'
const SUBTEXT = '#7C6858'

const TABS = ['Checklist', 'Calendario', 'Hitos', 'Recordatorios']
const FILTERS = ['Todas', 'Pendientes', 'Completadas'] as const

const MONTH_NAMES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

function daysUntil(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now()
  return Math.ceil(diff / 86400000)
}

export default function Planning({ tasks, setTasks, milestones, setMilestones, weddingDate, setTab }: Props) {
  const [tab, setTab2] = useState(TABS[0])
  const [filter, setFilter] = useState<typeof FILTERS[number]>('Todas')
  const [sortAlpha, setSortAlpha] = useState(false)
  const [monthOffset, setMonthOffset] = useState(0)
  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')

  function addMilestone() {
    if (!newTitle.trim() || !newDate) return
    setMilestones([...milestones, { id: Date.now().toString(), title: newTitle, date: newDate, done: false }])
    setNewTitle(''); setNewDate('')
  }

  function toggleMilestone(id: string) {
    setMilestones(milestones.map(m => m.id === id ? { ...m, done: !m.done } : m))
  }

  function removeMilestone(id: string) {
    setMilestones(milestones.filter(m => m.id !== id))
  }

  const done = tasks.filter(t => t.done).length
  const pct = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0
  const r = 44, circ = 2 * Math.PI * r
  const offset = circ - (circ * pct) / 100

  function toggle(id: string) {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const filteredByPhase = TASK_PHASES.map(phase => {
    let items = tasks.filter(t => t.phase === phase)
    if (filter === 'Pendientes') items = items.filter(t => !t.done)
    if (filter === 'Completadas') items = items.filter(t => t.done)
    if (sortAlpha) items = [...items].sort((a, b) => a.title.localeCompare(b.title))
    return { phase, items }
  }).filter(g => g.items.length > 0)

  const upcomingMilestones = [...milestones].filter(m => !m.done).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3)

  // Mini calendar
  const base = weddingDate ? new Date(weddingDate) : new Date()
  const viewDate = new Date(base.getFullYear(), base.getMonth() + monthOffset, 1)
  const year = viewDate.getFullYear(), month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const startWeekday = (firstDay.getDay() + 6) % 7 // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [...Array(startWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  const milestoneDays = new Set(milestones.filter(m => { const d = new Date(m.date); return d.getFullYear() === year && d.getMonth() === month }).map(m => new Date(m.date).getDate()))
  const weddingDay = weddingDate && new Date(weddingDate).getFullYear() === year && new Date(weddingDate).getMonth() === month ? new Date(weddingDate).getDate() : null

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 16 }}>Planning</h1>

      <div style={{ display: 'flex', gap: 20, borderBottom: `1px solid ${BEIGE}`, marginBottom: 22, overflowX: 'auto' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab2(t)} style={{
            background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', padding: '0 0 10px', fontSize: 13, fontFamily: F,
            color: tab === t ? INK : SUBTEXT, fontWeight: tab === t ? 600 : 400, borderBottom: tab === t ? `2px solid ${BROWN}` : '2px solid transparent'
          }}>{t}</button>
        ))}
      </div>

      {tab === 'Hitos' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              <input value={newTitle} onChange={e => setNewTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && addMilestone()} placeholder="Hito (ej: Enviar invitaciones)" style={{ flex: 1, border: `1px solid ${BEIGE}`, borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
              <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} style={{ border: `1px solid ${BEIGE}`, borderRadius: 12, padding: '11px 14px', fontSize: 13, outline: 'none' }} />
              <button onClick={addMilestone} style={{ background: BROWN, color: 'white', border: 'none', borderRadius: 12, padding: '11px 22px', fontSize: 13, cursor: 'pointer' }}>Añadir</button>
            </div>
            {[...milestones].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).length === 0 ? (
              <p style={{ fontSize: 13, color: SUBTEXT, textAlign: 'center', padding: '30px 0' }}>Sin hitos todavía.</p>
            ) : [...milestones].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(m => {
              const isPast = new Date(m.date) < new Date()
              return (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 12, marginBottom: 8 }}>
                  <span onClick={() => toggleMilestone(m.id)} style={{ width: 18, height: 18, borderRadius: 6, flexShrink: 0, border: m.done ? 'none' : `1.5px solid ${BEIGE}`, background: m.done ? BROWN : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    {m.done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, color: m.done ? SUBTEXT : INK, textDecoration: m.done ? 'line-through' : 'none' }}>{m.title}</p>
                    <p style={{ fontSize: 11, color: isPast && !m.done ? '#C0594F' : SUBTEXT }}>
                      {new Date(m.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                      {isPast && !m.done ? ' · Vencido' : ''}
                    </p>
                  </div>
                  <button onClick={() => removeMilestone(m.id)} style={{ background: 'none', border: 'none', color: '#C9BCA8', cursor: 'pointer', fontSize: 16 }}>×</button>
                </div>
              )
            })}
          </div>
          <div style={{ background: 'linear-gradient(135deg, #F1E7D0, #F8F3E8)', borderRadius: 16, padding: '24px', alignSelf: 'flex-start' }}>
            <p style={{ fontSize: 12, color: SUBTEXT, marginBottom: 6 }}>Fecha de la boda</p>
            <p style={{ fontFamily: F, fontSize: 20, color: INK }}>{weddingDate ? new Date(weddingDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Por confirmar'}</p>
            <p style={{ fontSize: 11, color: SUBTEXT, marginTop: 8 }}>Editad la fecha desde Ajustes → Detalles de la boda.</p>
          </div>
        </div>
      )}

      {tab !== 'Checklist' && tab !== 'Hitos' && (
        <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: '40px 24px', textAlign: 'center' }}>
          <p style={{ fontFamily: F, fontSize: 18, color: INK, marginBottom: 6 }}>{tab}</p>
          <p style={{ fontSize: 12, color: SUBTEXT }}>Muy pronto podréis gestionar esto desde aquí.</p>
        </div>
      )}

      {tab === 'Checklist' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
          <div>
            {/* PROGRESO */}
            <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: '24px 28px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 24 }}>
              <svg width="100" height="100" viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
                <circle cx="50" cy="50" r={r} fill="none" stroke={BEIGE} strokeWidth="9" />
                <circle cx="50" cy="50" r={r} fill="none" stroke={BROWN} strokeWidth="9" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset .6s' }} />
                <text x="50" y="56" textAnchor="middle" fontSize="20" fontFamily={F} fill={INK}>{pct}%</text>
              </svg>
              <div>
                <p style={{ fontFamily: F, fontSize: 19, color: INK, marginBottom: 4 }}>Progreso de la planificación</p>
                <p style={{ fontSize: 12, color: SUBTEXT }}>{pct >= 100 ? '¡Lo tenéis todo listo!' : pct >= 50 ? '¡Vais muy bien! Seguid así.' : 'Cada tarea completada os acerca más al gran día.'}</p>
              </div>
            </div>

            {/* FILTROS */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {FILTERS.map(f => {
                  const count = f === 'Todas' ? tasks.length : f === 'Pendientes' ? tasks.filter(t => !t.done).length : tasks.filter(t => t.done).length
                  return (
                    <button key={f} onClick={() => setFilter(f)} style={{
                      border: filter === f ? 'none' : `1px solid ${BEIGE}`, background: filter === f ? BROWN : 'white', color: filter === f ? 'white' : INK,
                      borderRadius: 999, padding: '7px 14px', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                    }}>
                      {f}
                      <span style={{ background: filter === f ? 'rgba(255,255,255,0.25)' : BEIGE, borderRadius: 999, padding: '1px 7px', fontSize: 10.5 }}>{count}</span>
                    </button>
                  )
                })}
              </div>
              <button onClick={() => setSortAlpha(s => !s)} style={{ border: `1px solid ${BEIGE}`, background: 'white', borderRadius: 999, padding: '7px 14px', fontSize: 12, color: INK, cursor: 'pointer' }}>
                Ordenar: {sortAlpha ? 'Alfabético' : 'Por fase'}
              </button>
            </div>

            {filteredByPhase.length === 0 ? (
              <p style={{ fontSize: 13, color: SUBTEXT, textAlign: 'center', padding: '30px 0' }}>Sin tareas en este filtro.</p>
            ) : filteredByPhase.map(group => (
              <div key={group.phase} style={{ marginBottom: 18 }}>
                <p style={{ fontFamily: F, fontSize: 14, color: INK, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {group.phase}
                  <span style={{ fontSize: 11, color: SUBTEXT }}>({group.items.length})</span>
                </p>
                <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 14, overflow: 'hidden' }}>
                  {group.items.map((t, i) => (
                    <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i < group.items.length - 1 ? `1px solid ${BEIGE}` : 'none' }}>
                      <span onClick={() => toggle(t.id)} style={{ width: 18, height: 18, borderRadius: 6, flexShrink: 0, border: t.done ? 'none' : `1.5px solid ${BEIGE}`, background: t.done ? BROWN : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        {t.done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                      </span>
                      <span style={{ flex: 1, fontSize: 13, color: t.done ? SUBTEXT : INK, textDecoration: t.done ? 'line-through' : 'none' }}>{t.title}</span>
                      {!t.done && <span style={{ fontSize: 10, background: BEIGE, color: BROWN, borderRadius: 999, padding: '2px 9px' }}>{group.phase}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignSelf: 'flex-start' }}>
            <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <p style={{ fontFamily: F, fontSize: 15, color: INK }}>{MONTH_NAMES[month]} {year}</p>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => setMonthOffset(m => m - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: SUBTEXT, fontSize: 13, padding: 4 }}>‹</button>
                  <button onClick={() => setMonthOffset(m => m + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: SUBTEXT, fontSize: 13, padding: 4 }}>›</button>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
                {WEEKDAYS.map(w => <span key={w} style={{ fontSize: 9.5, color: SUBTEXT, textAlign: 'center' }}>{w}</span>)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                {cells.map((d, i) => (
                  <div key={i} style={{
                    aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: 10.5,
                    color: d === weddingDay ? 'white' : INK, background: d === weddingDay ? BROWN : milestoneDays.has(d || -1) ? BEIGE : 'transparent'
                  }}>
                    {d || ''}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 12, fontSize: 10, color: SUBTEXT }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: BROWN, display: 'inline-block' }} />Boda</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: BEIGE, display: 'inline-block' }} />Hito</span>
              </div>
            </div>

            <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <p style={{ fontFamily: F, fontSize: 15, color: INK }}>Próximos hitos</p>
                <span onClick={() => setTab2('Hitos')} style={{ fontSize: 11, color: BROWN, cursor: 'pointer', textDecoration: 'underline' }}>Ver todos</span>
              </div>
              {upcomingMilestones.length === 0 ? (
                <p style={{ fontSize: 12, color: SUBTEXT }}>Sin hitos pendientes.</p>
              ) : upcomingMilestones.map(m => {
                const days = daysUntil(m.date)
                return (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${BEIGE}` }}>
                    <div>
                      <p style={{ fontSize: 12.5, color: INK }}>{m.title}</p>
                      <p style={{ fontSize: 10.5, color: SUBTEXT }}>{new Date(m.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <span style={{ fontSize: 10.5, color: BROWN, background: BEIGE, borderRadius: 999, padding: '3px 9px', whiteSpace: 'nowrap' }}>
                      {days >= 0 ? `${days} días` : 'Vencido'}
                    </span>
                  </div>
                )
              })}
            </div>

            <div style={{ background: 'linear-gradient(135deg, #F4EFE8, #EFE6F5)', border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
              <p style={{ fontFamily: F, fontSize: 15, color: INK, marginBottom: 6 }}>¿Necesitáis ayuda?</p>
              <p style={{ fontSize: 11.5, color: SUBTEXT, marginBottom: 12, lineHeight: 1.5 }}>Consultad nuestros consejos de expertos para manteneros al día en cada etapa.</p>
              <button onClick={() => setTab('consejos')} style={{ background: BROWN, color: 'white', border: 'none', borderRadius: 999, padding: '9px 18px', fontSize: 12, cursor: 'pointer' }}>
                Ver consejos
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
