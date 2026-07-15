'use client'
import { useState } from 'react'
import { F, TEXT_PRIMARY } from '@/lib/constants'
import { Task, Guest, BudgetItem } from '@/lib/types'

interface Props { tasks: Task[]; guests: Guest[]; budget: BudgetItem[] }

const CARD = '#FFFDFB'
const BROWN = '#898a76'
const BEIGE = '#E7DDD2'
const SUBTEXT = '#7C6858'

const PROMPTS = ['Ideas para proveedores', 'Consejos de presupuesto', 'Ayuda con el timeline', 'Inspiración de diseño', 'Experiencia de invitados']

const FAQ = [
  '¿Con cuánta antelación debo reservar el espacio?',
  '¿Cuál es un reparto de presupuesto realista?',
  '¿Cómo gestiono los RSVP de forma eficiente?',
  '¿Qué debo preguntar antes de contratar un proveedor?',
]

interface ChatMsg { id: string; role: 'user' | 'ai'; text: string; bullets?: string[] }

function answerFor(query: string, ctx: { tasksLeft: number; budgetLeft: number; guestsPending: number }): ChatMsg {
  const q = query.toLowerCase()
  if (q.includes('presupuesto') || q.includes('budget')) {
    return {
      id: Date.now().toString(), role: 'ai',
      text: `Según vuestros datos, os quedan ${ctx.budgetLeft.toLocaleString('es-ES')} € por gastar. Un reparto habitual es:`,
      bullets: ['40-45% espacio y catering', '10-12% fotografía y vídeo', '8-10% vestuario', '8-10% flores y decoración', '10% imprevistos'],
    }
  }
  if (q.includes('invitad') || q.includes('rsvp')) {
    return {
      id: Date.now().toString(), role: 'ai',
      text: `Tenéis ${ctx.guestsPending} invitados sin responder todavía. Algunas ideas:`,
      bullets: ['Enviad un recordatorio 3 semanas antes de la fecha límite', 'Facilitad el RSVP online desde el móvil', 'Llamad personalmente a quien lleve mucho sin responder'],
    }
  }
  if (q.includes('proveedor') || q.includes('vendor')) {
    return {
      id: Date.now().toString(), role: 'ai',
      text: 'Antes de contratar un proveedor, preguntad siempre:',
      bullets: ['¿Tenéis disponibilidad para nuestra fecha?', '¿Qué incluye exactamente el presupuesto?', '¿Cuál es la política de cancelación?', '¿Podemos ver referencias de bodas similares?'],
    }
  }
  if (q.includes('timeline') || q.includes('horario')) {
    return {
      id: Date.now().toString(), role: 'ai',
      text: 'Para un timeline de boda equilibrado, calculad:',
      bullets: ['1-2h para preparativos y fotos previas', '30 min para la ceremonia', '1h de cóctel', '3-4h para banquete y fiesta'],
    }
  }
  return {
    id: Date.now().toString(), role: 'ai',
    text: `Os quedan ${ctx.tasksLeft} tareas pendientes en el checklist. Os recomiendo priorizar las de la fase actual y repartir el resto entre vuestro equipo de colaboradores.`,
  }
}

export default function AiPlanner({ tasks, guests, budget }: Props) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: '0', role: 'user', text: '¿Qué ideas tenéis para una boda en jardín en otoño?' },
    {
      id: '1', role: 'ai', text: 'Aquí tenéis algunas ideas para una boda de otoño al aire libre:',
      bullets: ['Paleta de colores cálidos: burdeos, terracota y mostaza', 'Zonas chill-out con mantas y braseros', 'Menú de temporada con sabores de otoño', 'Instalaciones colgantes de follaje y flores secas'],
    },
  ])
  const [input, setInput] = useState('')

  const tasksLeft = tasks.filter(t => !t.done).length
  const budgetLeft = Math.max(0, budget.reduce((a, b) => a + b.estimated, 0) - budget.reduce((a, b) => a + b.paid, 0))
  const guestsPending = guests.filter(g => g.rsvp === 'Pendiente').length

  function send(text: string) {
    if (!text.trim()) return
    const userMsg: ChatMsg = { id: Date.now().toString() + 'u', role: 'user', text }
    const aiMsg = answerFor(text, { tasksLeft, budgetLeft, guestsPending })
    setMessages(m => [...m, userMsg, aiMsg])
    setInput('')
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: TEXT_PRIMARY }}>Planificador con IA</h1>
        <span style={{ fontSize: 10, fontWeight: 700, color: BROWN, background: BEIGE, borderRadius: 999, padding: '2px 9px' }}>BETA</span>
      </div>
      <p style={{ fontSize: 12, color: SUBTEXT, marginBottom: 20 }}>Vuestro asistente personal de boda. Recibid recomendaciones personalizadas y ayuda experta.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { icon: 'M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z', title: 'Recomendaciones personalizadas', desc: 'Sugerencias a medida de proveedores, ideas y tareas según vuestra boda.' },
          { icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11', title: 'Ayuda inteligente en la planificación', desc: 'Preguntad, pedid consejo y afinad vuestros planes con IA.' },
          { icon: 'M12 2C8 2 5 5.5 5 9.5c0 1 .3 2 .8 3H8v2h1v2h6v-2h1v-2h2.2c.5-1 .8-2 .8-3C19 5.5 16 2 12 2z', title: 'Inspiración e ideas', desc: 'Descubrid tendencias, temáticas e ideas creativas para vuestro gran día.' },
        ].map(c => (
          <div key={c.title} style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#F4E7D8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BROWN} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg>
            </div>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 4 }}>{c.title}</p>
            <p style={{ fontSize: 11.5, color: SUBTEXT, lineHeight: 1.5 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 22, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontFamily: F, fontSize: 18, color: TEXT_PRIMARY, marginBottom: 14 }}>¿En qué puedo ayudaros hoy?</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
            {PROMPTS.map(p => (
              <button key={p} onClick={() => send(p)} style={{ border: `1px solid ${BEIGE}`, background: 'white', borderRadius: 999, padding: '7px 14px', fontSize: 11.5, color: TEXT_PRIMARY, cursor: 'pointer' }}>{p}</button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 18 }}>
            {messages.map(m => m.role === 'user' ? (
              <div key={m.id} style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
                <div style={{ background: '#F4E7D8', borderRadius: '14px 14px 4px 14px', padding: '10px 16px' }}>
                  <p style={{ fontSize: 13, color: TEXT_PRIMARY }}>{m.text}</p>
                </div>
              </div>
            ) : (
              <div key={m.id} style={{ display: 'flex', gap: 10, maxWidth: '85%' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#F4E7D8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BROWN} strokeWidth="1.8"><path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" /></svg>
                </div>
                <div style={{ background: 'white', border: `1px solid ${BEIGE}`, borderRadius: '4px 14px 14px 14px', padding: '12px 16px' }}>
                  <p style={{ fontSize: 13, color: TEXT_PRIMARY, marginBottom: m.bullets ? 8 : 0 }}>{m.text}</p>
                  {m.bullets && (
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {m.bullets.map(b => <li key={b} style={{ fontSize: 12.5, color: TEXT_PRIMARY, marginBottom: 4 }}>{b}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${BEIGE}`, borderRadius: 999, padding: '10px 10px 10px 18px', marginTop: 'auto' }}>
            <input
              value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder="Preguntadme lo que queráis sobre vuestra boda..."
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, color: TEXT_PRIMARY, fontFamily: F }}
            />
            <span onClick={() => send(input)} style={{ width: 32, height: 32, borderRadius: '50%', background: BROWN, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
            </span>
          </div>
          <p style={{ fontSize: 10, color: SUBTEXT, textAlign: 'center', marginTop: 8 }}>Las respuestas de la IA pueden no ser siempre exactas. Revisad los detalles importantes.</p>
        </div>

        {/* SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignSelf: 'flex-start' }}>
          <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
            <p style={{ fontFamily: F, fontSize: 15, color: TEXT_PRIMARY, marginBottom: 12 }}>Resumen de la planificación</p>
            {[
              { label: 'Tareas pendientes', value: tasksLeft },
              { label: 'Restante presupuesto', value: `${budgetLeft.toLocaleString('es-ES')} €` },
              { label: 'RSVP pendientes', value: guestsPending },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${BEIGE}` }}>
                <span style={{ fontSize: 12, color: TEXT_PRIMARY }}>{row.label}</span>
                <span style={{ fontSize: 12, color: SUBTEXT }}>{row.value}</span>
              </div>
            ))}
          </div>

          <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
            <p style={{ fontFamily: F, fontSize: 15, color: TEXT_PRIMARY, marginBottom: 12 }}>Lo que otras parejas preguntan</p>
            {FAQ.map(f => (
              <div key={f} onClick={() => send(f)} style={{ padding: '7px 0', borderBottom: `1px solid ${BEIGE}`, cursor: 'pointer' }}>
                <p style={{ fontSize: 12, color: TEXT_PRIMARY }}>{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
