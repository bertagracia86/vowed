'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE } from '@/lib/constants'
import { WeddingInfo } from '@/lib/types'

interface Props { weddingInfo: WeddingInfo }

const TEMPLATES = [
  { name: 'Jardín de olivos', price: '12 €', style: 'Bohemio', img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80' },
  { name: 'Lino y oro', price: '14 €', style: 'Elegante', img: 'https://images.unsplash.com/photo-1622037022824-0c71d511ec02?w=400&q=80' },
  { name: 'Acuarela floral', price: '12 €', style: 'Romántico', img: 'https://images.unsplash.com/photo-1612630440053-cdc4458c79fd?w=400&q=80' },
  { name: 'Minimal clásica', price: '10 €', style: 'Minimalista', img: 'https://images.unsplash.com/photo-1595407753234-0882f1e76e26?w=400&q=80' },
]

const CATEGORIES = [
  { label: 'Save the dates', icon: 'M8 3v4M16 3v4M3 10h18M5 5h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z' },
  { label: 'Invitaciones', icon: 'M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6' },
  { label: 'Fundas', icon: 'M4 4h16v16H4zM4 10h16' },
  { label: 'Complementos de papel', icon: 'M12 2C8 2 5 5.5 5 9.5 5 15 12 22 12 22s7-7 7-12.5C19 5.5 16 2 12 2z' },
  { label: 'Tarjetas de mesa', icon: 'M3 3h18v18H3zM3 9h18M9 21V9' },
  { label: 'Números de mesa', icon: 'M4 7V4h16v3M9 20h6M12 4v16' },
  { label: 'Menús', icon: 'M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z' },
  { label: 'Programas', icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' },
  { label: 'Servilletas', icon: 'M4 4h16v16H4zM4 4l16 16' },
  { label: 'Carteles', icon: 'M3 21v-4l13-13 4 4-13 13H3zM14 4l4 4' },
  { label: 'Pegatinas', icon: 'M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2zM9 21h6M10 18h4' },
  { label: 'Tarjetas de agradecimiento', icon: 'M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z' },
  { label: 'Agradecimientos al instante', icon: 'M13 2L3 14h7v8l10-12h-7V2z' },
  { label: 'Save the dates digitales', icon: 'M23 7l-7 5 7 5V7zM1 5h15v14H1z' },
  { label: 'Invitaciones despedida', icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' },
  { label: 'Subir tu diseño', icon: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12' },
]

interface ProgramItem { id: string; time: string; title: string; desc: string }

const DEFAULT_PROGRAM: ProgramItem[] = [
  { id: '1', time: '17:00', title: 'Entrada de los invitados', desc: 'Música de bienvenida en el jardín' },
  { id: '2', time: '17:30', title: 'Entrada de la novia', desc: '' },
  { id: '3', time: '17:35', title: 'Lectura', desc: 'A cargo de Ana Martínez' },
  { id: '4', time: '17:45', title: 'Intercambio de votos y anillos', desc: '' },
  { id: '5', time: '18:00', title: 'Primer beso y salida', desc: '' },
  { id: '6', time: '18:15', title: 'Cóctel de bienvenida', desc: '' },
]

function ProgramaCeremonia({ weddingInfo }: Props) {
  const [items, setItems] = useState<ProgramItem[]>(DEFAULT_PROGRAM)
  const [padrino, setPadrino] = useState('')
  const [madrina, setMadrina] = useState('')
  const [testigos, setTestigos] = useState('')
  const [damas, setDamas] = useState('')

  function update(id: string, field: keyof ProgramItem, value: string) {
    setItems(items.map(it => it.id === id ? { ...it, [field]: value } : it))
  }

  function addItem() {
    setItems([...items, { id: Date.now().toString(), time: '', title: 'Nuevo momento', desc: '' }])
  }

  function removeItem(id: string) {
    setItems(items.filter(it => it.id !== id))
  }

  function move(id: string, dir: -1 | 1) {
    const i = items.findIndex(it => it.id === id)
    const j = i + dir
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    setItems(next)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
      {/* EDITOR */}
      <div>
        <p style={{ fontFamily: F, fontSize: 18, color: INK, marginBottom: 12 }}>Orden de la ceremonia</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {items.map((item, i) => (
            <div key={item.id} style={{ border: '1px solid #ECE9E4', borderRadius: 14, padding: '12px 14px', background: 'white' }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'center' }}>
                <input value={item.time} onChange={e => update(item.id, 'time', e.target.value)} placeholder="Hora" style={{ width: 70, border: '1px solid #E3DCC9', borderRadius: 8, padding: '7px 10px', fontSize: 12, outline: 'none' }} />
                <input value={item.title} onChange={e => update(item.id, 'title', e.target.value)} placeholder="Momento (ej: Entrada de la novia)" style={{ flex: 1, border: '1px solid #E3DCC9', borderRadius: 8, padding: '7px 10px', fontSize: 13, outline: 'none', fontFamily: F }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <button onClick={() => move(item.id, -1)} disabled={i === 0} style={{ background: 'none', border: 'none', cursor: i === 0 ? 'default' : 'pointer', color: i === 0 ? '#E3DCC9' : MUTE, fontSize: 11, lineHeight: 1 }}>▲</button>
                  <button onClick={() => move(item.id, 1)} disabled={i === items.length - 1} style={{ background: 'none', border: 'none', cursor: i === items.length - 1 ? 'default' : 'pointer', color: i === items.length - 1 ? '#E3DCC9' : MUTE, fontSize: 11, lineHeight: 1 }}>▼</button>
                </div>
                <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#C9BCA8', cursor: 'pointer', fontSize: 16 }}>×</button>
              </div>
              <input value={item.desc} onChange={e => update(item.id, 'desc', e.target.value)} placeholder="Detalle opcional (quién lee, quién canta...)" style={{ width: '100%', border: '1px solid #F5EFE0', borderRadius: 8, padding: '6px 10px', fontSize: 12, outline: 'none', color: MUTE }} />
            </div>
          ))}
        </div>
        <button onClick={addItem} style={{ border: '1px solid #241c17', background: 'white', borderRadius: 999, padding: '9px 18px', fontSize: 12, cursor: 'pointer', marginBottom: 28 }}>+ Añadir momento</button>

        <p style={{ fontFamily: F, fontSize: 18, color: INK, marginBottom: 12 }}>Cortejo nupcial</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div>
            <p style={{ fontSize: 11, color: MUTE, marginBottom: 4 }}>PADRINO</p>
            <input value={padrino} onChange={e => setPadrino(e.target.value)} placeholder="Nombre" style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 10, padding: '9px 12px', fontSize: 13, outline: 'none' }} />
          </div>
          <div>
            <p style={{ fontSize: 11, color: MUTE, marginBottom: 4 }}>MADRINA</p>
            <input value={madrina} onChange={e => setMadrina(e.target.value)} placeholder="Nombre" style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 10, padding: '9px 12px', fontSize: 13, outline: 'none' }} />
          </div>
          <div>
            <p style={{ fontSize: 11, color: MUTE, marginBottom: 4 }}>TESTIGOS</p>
            <input value={testigos} onChange={e => setTestigos(e.target.value)} placeholder="Nombres separados por coma" style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 10, padding: '9px 12px', fontSize: 13, outline: 'none' }} />
          </div>
          <div>
            <p style={{ fontSize: 11, color: MUTE, marginBottom: 4 }}>DAMAS Y CABALLEROS DE HONOR</p>
            <input value={damas} onChange={e => setDamas(e.target.value)} placeholder="Nombres separados por coma" style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 10, padding: '9px 12px', fontSize: 13, outline: 'none' }} />
          </div>
        </div>
      </div>

      {/* PREVIEW IMPRIMIBLE */}
      <div style={{ alignSelf: 'flex-start', position: 'sticky', top: 0 }}>
        <p style={{ fontSize: 11, color: MUTE, marginBottom: 10 }}>Vista previa</p>
        <div id="program-preview" style={{ border: '1px solid #ECE9E4', borderRadius: 16, padding: '36px 30px', background: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
          <p style={{ fontFamily: F, fontSize: 12, color: MUTE, textAlign: 'center', letterSpacing: '0.1em', marginBottom: 6 }}>PROGRAMA DE LA CEREMONIA</p>
          <h2 style={{ fontFamily: F, fontSize: 28, color: INK, textAlign: 'center', marginBottom: 4, fontStyle: 'italic' }}>
            {weddingInfo.partner1 || 'Vosotros'} &amp; {weddingInfo.partner2 || 'dos'}
          </h2>
          <p style={{ fontSize: 12, color: MUTE, textAlign: 'center', marginBottom: 22 }}>
            {weddingInfo.date ? new Date(weddingInfo.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Fecha por confirmar'}
            {weddingInfo.venue ? ` · ${weddingInfo.venue}` : ''}
          </p>
          <div style={{ height: 1, background: '#ECE9E4', margin: '0 0 20px' }} />
          {items.map(item => (
            <div key={item.id} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                {item.time && <span style={{ fontFamily: F, fontSize: 12, color: '#8b5f3e', minWidth: 40 }}>{item.time}</span>}
                <span style={{ fontFamily: F, fontSize: 15, color: INK }}>{item.title}</span>
              </div>
              {item.desc && <p style={{ fontSize: 11, color: MUTE, marginLeft: item.time ? 50 : 0, marginTop: 2 }}>{item.desc}</p>}
            </div>
          ))}
          {(padrino || madrina || testigos || damas) && (
            <>
              <div style={{ height: 1, background: '#ECE9E4', margin: '20px 0' }} />
              <p style={{ fontFamily: F, fontSize: 12, color: MUTE, textAlign: 'center', letterSpacing: '0.08em', marginBottom: 10 }}>CORTEJO NUPCIAL</p>
              {padrino && <p style={{ fontSize: 12, color: INK, textAlign: 'center', marginBottom: 4 }}>Padrino: {padrino}</p>}
              {madrina && <p style={{ fontSize: 12, color: INK, textAlign: 'center', marginBottom: 4 }}>Madrina: {madrina}</p>}
              {testigos && <p style={{ fontSize: 12, color: INK, textAlign: 'center', marginBottom: 4 }}>Testigos: {testigos}</p>}
              {damas && <p style={{ fontSize: 12, color: INK, textAlign: 'center' }}>Honor: {damas}</p>}
            </>
          )}
        </div>
        <button onClick={() => window.print()} style={{ width: '100%', marginTop: 14, background: '#241c17', color: 'white', border: 'none', borderRadius: 999, padding: '11px 0', fontSize: 13, cursor: 'pointer' }}>
          Imprimir / Descargar PDF
        </button>
      </div>
    </div>
  )
}

const CARD = '#FFFDFB'
const BROWN = '#8B5E3C'
const BEIGE = '#E7DDD2'
const SUBTEXT = '#7C6858'

export default function Invitaciones({ weddingInfo }: Props) {
  const [cat, setCat] = useState('Programas')

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Invitaciones y papelería</h1>
      <p style={{ fontSize: 12, color: SUBTEXT, marginBottom: 20 }}>Preciosas invitaciones y papelería que marcan el tono de vuestro gran día.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 14, marginBottom: 32 }}>
        {CATEGORIES.map(c => (
          <div key={c.label} onClick={() => setCat(c.label)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <div style={{
              width: '100%', aspectRatio: '1', borderRadius: 14, border: cat === c.label ? `1.5px solid ${BROWN}` : `1px solid ${BEIGE}`,
              background: cat === c.label ? '#F4E7D8' : CARD, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s, border-color 0.15s'
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={BROWN} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg>
            </div>
            <span style={{ fontSize: 10.5, color: cat === c.label ? BROWN : SUBTEXT, textAlign: 'center', lineHeight: 1.25, fontWeight: cat === c.label ? 600 : 400 }}>{c.label}</span>
          </div>
        ))}
      </div>

      {cat === 'Programas' ? (
        <ProgramaCeremonia weddingInfo={weddingInfo} />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 32 }}>
          {TEMPLATES.map(t => (
            <div key={t.name} style={{ border: `1px solid ${BEIGE}`, borderRadius: 18, overflow: 'hidden', background: CARD }}>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontFamily: F, fontSize: 16, color: INK, marginBottom: 2 }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: SUBTEXT }}>{t.style}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: F, fontSize: 18, color: INK, marginBottom: 6 }}>{t.price}</p>
                  <button style={{ background: BROWN, color: 'white', border: 'none', borderRadius: 999, padding: '8px 18px', fontSize: 12, cursor: 'pointer' }}>Comprar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ background: 'linear-gradient(135deg, #F4EFE8, #EFE6F5)', border: `1px solid ${BEIGE}`, borderRadius: 16, padding: '24px 28px', display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr', gap: 20, alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: F, fontSize: 17, color: INK, marginBottom: 6 }}>¿Necesitáis ayuda para elegir?</p>
          <p style={{ fontSize: 11.5, color: SUBTEXT, marginBottom: 12, lineHeight: 1.5 }}>Nuestro asistente puede ayudaros a encontrar el estilo, el texto y el papel perfectos.</p>
          <button style={{ border: `1px solid ${BROWN}`, background: 'white', color: BROWN, borderRadius: 999, padding: '8px 16px', fontSize: 12, cursor: 'pointer' }}>Preguntar al asistente</button>
        </div>
        {[
          { icon: 'M20 12v10H4V12M2 7h20v5H2zM12 22V7', title: 'Muestras gratis', desc: 'Pedid muestras para verlas y sentirlas antes de decidir.' },
          { icon: 'M12 2l3 7h7l-5.5 4.5 2 7.5L12 17l-6.5 4 2-7.5L2 9h7z', title: 'Calidad premium', desc: 'Papeles e impresión preciosos que os van a encantar.' },
          { icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2', title: 'Entrega rápida', desc: 'Recibid vuestras invitaciones rápido y sin complicaciones.' },
        ].map(f => (
          <div key={f.title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BROWN} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d={f.icon} /></svg>
            <div>
              <p style={{ fontSize: 12.5, fontWeight: 600, color: INK, marginBottom: 2 }}>{f.title}</p>
              <p style={{ fontSize: 11, color: SUBTEXT, lineHeight: 1.4 }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
