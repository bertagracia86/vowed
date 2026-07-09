'use client'
import { useState } from 'react'
import { F, INK } from '@/lib/constants'

interface Props { weddingDate: string; guestCount: number }

const CARD = '#FFFDFB'
const BROWN = '#8B5E3C'
const BEIGE = '#E7DDD2'
const SUBTEXT = '#7C6858'

interface TimelineEvent { id: string; time: string; title: string; subtitle: string; location: string; duration: string; category: string; icon: string }

const TABS = ['Día de la boda', 'Cena de ensayo', 'Fiesta de bienvenida', 'Brunch de despedida']

const ICONS: Record<string, string> = {
  Ceremonia: 'M12 2C8 2 5 5.5 5 9.5 5 15 12 22 12 22s7-7 7-12.5C19 5.5 16 2 12 2zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  Recepción: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM9 22V12h6v10',
  Foto: 'M4 8h3l2-3h6l2 3h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1zM12 17a4 4 0 100-8 4 4 0 000 8z',
  Comida: 'M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3',
  Música: 'M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z',
  Traslado: 'M5 17h14M5 17a2 2 0 100 4 2 2 0 000-4zM19 17a2 2 0 100 4 2 2 0 000-4zM5 17V7a2 2 0 012-2h6l4 5h2a2 2 0 012 2v5',
}

const DEFAULT_EVENTS: TimelineEvent[] = [
  { id: '1', time: '12:00', title: 'Preparación', subtitle: 'Novia y damas de honor', location: 'Suite nupcial', duration: '2h 30m', category: 'Foto', icon: ICONS.Foto },
  { id: '2', time: '14:30', title: 'Primeras fotos', subtitle: 'Novia y novio', location: 'Jardín', duration: '30m', category: 'Foto', icon: ICONS.Foto },
  { id: '3', time: '15:00', title: 'Ceremonia', subtitle: 'Intercambio de votos', location: 'Jardín', duration: '30m', category: 'Ceremonia', icon: ICONS.Ceremonia },
  { id: '4', time: '15:30', title: 'Cóctel', subtitle: 'Copas y aperitivos', location: 'Patio', duration: '1h', category: 'Recepción', icon: ICONS.Recepción },
  { id: '5', time: '16:30', title: 'Entrada al banquete', subtitle: 'Gran entrada', location: 'Salón', duration: '15m', category: 'Recepción', icon: ICONS.Recepción },
  { id: '6', time: '16:45', title: 'Cena', subtitle: 'Primer plato', location: 'Salón', duration: '1h 15m', category: 'Comida', icon: ICONS.Comida },
  { id: '7', time: '18:15', title: 'Discursos', subtitle: 'Familia y amigos', location: 'Salón', duration: '45m', category: 'Recepción', icon: ICONS.Recepción },
  { id: '8', time: '19:00', title: 'Primer baile', subtitle: 'Novia y novio', location: 'Pista de baile', duration: '15m', category: 'Música', icon: ICONS.Música },
  { id: '9', time: '19:15', title: 'Fiesta', subtitle: '¡A celebrar!', location: 'Pista de baile', duration: '3h', category: 'Música', icon: ICONS.Música },
  { id: '10', time: '22:15', title: 'Salida', subtitle: 'Salida con bengalas', location: 'Entrada principal', duration: '15m', category: 'Traslado', icon: ICONS.Traslado },
]

export default function Timeline({ weddingDate, guestCount }: Props) {
  const [tab, setTab] = useState(TABS[0])
  const [events, setEvents] = useState<TimelineEvent[]>(DEFAULT_EVENTS)
  const [editing, setEditing] = useState<string | null>(null)

  function move(id: string, dir: -1 | 1) {
    const i = events.findIndex(e => e.id === id)
    const j = i + dir
    if (j < 0 || j >= events.length) return
    const next = [...events]
    ;[next[i], next[j]] = [next[j], next[i]]
    setEvents(next)
  }

  function update(id: string, field: keyof TimelineEvent, value: string) {
    setEvents(events.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  function remove(id: string) {
    setEvents(events.filter(e => e.id !== id))
  }

  function addEvent() {
    const id = Date.now().toString()
    setEvents([...events, { id, time: '', title: 'Nuevo evento', subtitle: '', location: '', duration: '', category: 'Recepción', icon: ICONS.Recepción }])
    setEditing(id)
  }

  const categoryCounts = events.reduce<Record<string, number>>((acc, e) => { acc[e.category] = (acc[e.category] || 0) + 1; return acc }, {})
  const total = events.length
  const pct = total > 0 ? 100 : 0

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Timeline</h1>
      <p style={{ fontSize: 12, color: SUBTEXT, marginBottom: 20 }}>Planificad cada momento y afrontad vuestro gran día con confianza.</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, borderBottom: `1px solid ${BEIGE}`, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 20, overflowX: 'auto' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', padding: '0 0 10px', fontSize: 13, fontFamily: F,
              color: tab === t ? INK : SUBTEXT, fontWeight: tab === t ? 600 : 400, borderBottom: tab === t ? `2px solid ${BROWN}` : '2px solid transparent'
            }}>{t}</button>
          ))}
        </div>
        <button onClick={addEvent} style={{ background: BROWN, color: 'white', border: 'none', borderRadius: 999, padding: '9px 18px', fontSize: 12, cursor: 'pointer', marginBottom: 8 }}>+ Añadir evento</button>
      </div>

      {tab !== 'Día de la boda' ? (
        <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: '40px 24px', textAlign: 'center' }}>
          <p style={{ fontFamily: F, fontSize: 17, color: INK, marginBottom: 6 }}>{tab}</p>
          <p style={{ fontSize: 12, color: SUBTEXT }}>Muy pronto podréis planificar este evento desde aquí.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
              <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 14, padding: '14px 18px' }}>
                <p style={{ fontSize: 11, color: SUBTEXT, marginBottom: 6 }}>Fecha</p>
                <p style={{ fontFamily: F, fontSize: 15, color: INK }}>{weddingDate ? new Date(weddingDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Por confirmar'}</p>
              </div>
              <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 14, padding: '14px 18px' }}>
                <p style={{ fontSize: 11, color: SUBTEXT, marginBottom: 6 }}>Inicio</p>
                <p style={{ fontFamily: F, fontSize: 15, color: INK }}>{events[0]?.time || '—'}</p>
              </div>
              <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 14, padding: '14px 18px' }}>
                <p style={{ fontSize: 11, color: SUBTEXT, marginBottom: 6 }}>Invitados</p>
                <p style={{ fontFamily: F, fontSize: 15, color: INK }}>{guestCount}</p>
              </div>
              <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 14, padding: '14px 18px' }}>
                <p style={{ fontSize: 11, color: SUBTEXT, marginBottom: 6 }}>Eventos</p>
                <p style={{ fontFamily: F, fontSize: 15, color: INK }}>{total}</p>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 19, top: 8, bottom: 8, width: 2, background: BEIGE }} />
              {events.map((ev, i) => (
                <div key={ev.id} style={{ display: 'flex', gap: 16, marginBottom: 14, position: 'relative' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: BEIGE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BROWN} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={ev.icon} /></svg>
                  </div>
                  <div style={{ flex: 1, background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 14, padding: '12px 16px' }}>
                    {editing === ev.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <input value={ev.time} onChange={e => update(ev.id, 'time', e.target.value)} placeholder="Hora" style={{ width: 70, border: `1px solid ${BEIGE}`, borderRadius: 8, padding: '6px 10px', fontSize: 12, outline: 'none' }} />
                          <input value={ev.title} onChange={e => update(ev.id, 'title', e.target.value)} placeholder="Título" style={{ flex: 1, border: `1px solid ${BEIGE}`, borderRadius: 8, padding: '6px 10px', fontSize: 13, outline: 'none', fontFamily: F }} />
                          <input value={ev.duration} onChange={e => update(ev.id, 'duration', e.target.value)} placeholder="Duración" style={{ width: 70, border: `1px solid ${BEIGE}`, borderRadius: 8, padding: '6px 10px', fontSize: 12, outline: 'none' }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <input value={ev.subtitle} onChange={e => update(ev.id, 'subtitle', e.target.value)} placeholder="Detalle" style={{ flex: 1, border: `1px solid ${BEIGE}`, borderRadius: 8, padding: '6px 10px', fontSize: 12, outline: 'none' }} />
                          <input value={ev.location} onChange={e => update(ev.id, 'location', e.target.value)} placeholder="Ubicación" style={{ flex: 1, border: `1px solid ${BEIGE}`, borderRadius: 8, padding: '6px 10px', fontSize: 12, outline: 'none' }} />
                        </div>
                        <button onClick={() => setEditing(null)} style={{ alignSelf: 'flex-end', background: BROWN, color: 'white', border: 'none', borderRadius: 999, padding: '6px 14px', fontSize: 11.5, cursor: 'pointer' }}>Listo</button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                          <span style={{ fontFamily: F, fontSize: 14, color: BROWN, minWidth: 46, flexShrink: 0 }}>{ev.time}</span>
                          <div style={{ minWidth: 0 }}>
                            <p style={{ fontSize: 13.5, fontWeight: 600, color: INK }}>{ev.title}</p>
                            <p style={{ fontSize: 11, color: SUBTEXT }}>{ev.subtitle}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
                          {ev.location && <span style={{ fontSize: 11, color: SUBTEXT }}>{ev.location}</span>}
                          <span style={{ fontSize: 11, color: SUBTEXT }}>{ev.duration}</span>
                          <div style={{ display: 'flex', gap: 2 }}>
                            <button onClick={() => move(ev.id, -1)} disabled={i === 0} style={{ background: 'none', border: 'none', cursor: i === 0 ? 'default' : 'pointer', color: i === 0 ? BEIGE : SUBTEXT, fontSize: 10 }}>▲</button>
                            <button onClick={() => move(ev.id, 1)} disabled={i === events.length - 1} style={{ background: 'none', border: 'none', cursor: i === events.length - 1 ? 'default' : 'pointer', color: i === events.length - 1 ? BEIGE : SUBTEXT, fontSize: 10 }}>▼</button>
                          </div>
                          <button onClick={() => setEditing(ev.id)} style={{ background: 'none', border: 'none', color: SUBTEXT, cursor: 'pointer', fontSize: 12 }}>✎</button>
                          <button onClick={() => remove(ev.id)} style={{ background: 'none', border: 'none', color: '#C9BCA8', cursor: 'pointer', fontSize: 15 }}>×</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignSelf: 'flex-start' }}>
            <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
              <p style={{ fontFamily: F, fontSize: 15, color: INK, marginBottom: 12 }}>Progreso del timeline</p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <svg width="110" height="110" viewBox="0 0 110 110">
                  <circle cx="55" cy="55" r="42" fill="none" stroke={BEIGE} strokeWidth="10" />
                  <circle cx="55" cy="55" r="42" fill="none" stroke={BROWN} strokeWidth="10" strokeDasharray={2 * Math.PI * 42} strokeDashoffset={2 * Math.PI * 42 * (1 - pct / 100)} strokeLinecap="round" transform="rotate(-90 55 55)" />
                  <text x="55" y="52" textAnchor="middle" fontSize="18" fontFamily={F} fill={INK}>{pct}%</text>
                  <text x="55" y="68" textAnchor="middle" fontSize="8.5" fill={SUBTEXT}>Planificado</text>
                </svg>
              </div>
              <p style={{ fontSize: 11.5, color: SUBTEXT, textAlign: 'center', marginTop: 6 }}>{total} eventos programados</p>
            </div>

            <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
              <p style={{ fontFamily: F, fontSize: 15, color: INK, marginBottom: 12 }}>Acciones rápidas</p>
              {[
                { label: 'Duplicar timeline', desc: 'Copiad este horario para otro evento' },
                { label: 'Reordenar eventos', desc: 'Usad las flechas para cambiar el orden' },
              ].map(a => (
                <div key={a.label} style={{ padding: '8px 0', borderBottom: `1px solid ${BEIGE}` }}>
                  <p style={{ fontSize: 12.5, color: INK, marginBottom: 2 }}>{a.label}</p>
                  <p style={{ fontSize: 10.5, color: SUBTEXT }}>{a.desc}</p>
                </div>
              ))}
              <button onClick={addEvent} style={{ marginTop: 10, width: '100%', background: BROWN, color: 'white', border: 'none', borderRadius: 999, padding: '9px 0', fontSize: 12, cursor: 'pointer' }}>+ Añadir evento</button>
            </div>

            <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <p style={{ fontFamily: F, fontSize: 15, color: INK }}>Categorías</p>
              </div>
              {Object.entries(categoryCounts).map(([cat, count]) => (
                <div key={cat} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0' }}>
                  <span style={{ fontSize: 12, color: INK }}>{cat}</span>
                  <span style={{ fontSize: 11.5, color: SUBTEXT }}>{count}</span>
                </div>
              ))}
            </div>

            <div style={{ background: 'linear-gradient(135deg, #F4EFE8, #EFE6F5)', border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
              <p style={{ fontFamily: F, fontSize: 15, color: INK, marginBottom: 6 }}>¿Necesitáis ayuda?</p>
              <p style={{ fontSize: 11.5, color: SUBTEXT, marginBottom: 12, lineHeight: 1.5 }}>Consultad nuestras recomendaciones para perfeccionar vuestro horario.</p>
              <button style={{ background: BROWN, color: 'white', border: 'none', borderRadius: 999, padding: '9px 18px', fontSize: 12, cursor: 'pointer' }}>Ver sugerencias</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
