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
  { label: 'Invitaciones', icon: 'M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6' },
  { label: 'Save the dates', icon: 'M8 3v4M16 3v4M3 10h18M5 5h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z' },
  { label: 'Tarjetas de mesa', icon: 'M3 3h18v18H3zM3 9h18M9 21V9' },
  { label: 'Números de mesa', icon: 'M4 7V4h16v3M9 20h6M12 4v16' },
  { label: 'Menús', icon: 'M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z' },
  { label: 'Programas', icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' },
  { label: 'Agradecimientos', icon: 'M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z' },
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

export default function Invitaciones({ weddingInfo }: Props) {
  const [cat, setCat] = useState('Programas')

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Invitaciones y papelería</h1>
      <p style={{ fontSize: 12, color: MUTE, marginBottom: 20 }}>Plantillas listas para personalizar y el programa de vuestra ceremonia, editable al momento.</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
        {CATEGORIES.map(c => (
          <div key={c.label} onClick={() => setCat(c.label)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', flexShrink: 0 }}>
            <div style={{ width: 46, height: 46, borderRadius: '50%', border: '1.3px solid #8b5f3e', background: cat === c.label ? '#F4E7D8' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#8b5f3e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg>
            </div>
            <span style={{ fontSize: 10.5, color: cat === c.label ? '#8b5f3e' : MUTE, whiteSpace: 'nowrap', fontWeight: cat === c.label ? 600 : 400 }}>{c.label}</span>
          </div>
        ))}
      </div>

      {cat === 'Programas' ? (
        <ProgramaCeremonia weddingInfo={weddingInfo} />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {TEMPLATES.map(t => (
            <div key={t.name} style={{ border: '1px solid #F5EFE0', borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontFamily: F, fontSize: 16, color: INK, marginBottom: 2 }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: MUTE }}>{t.style}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: F, fontSize: 18, color: INK, marginBottom: 6 }}>{t.price}</p>
                  <button style={{ background: BLUE, color: 'white', border: 'none', borderRadius: 999, padding: '8px 18px', fontSize: 12, cursor: 'pointer' }}>Comprar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
