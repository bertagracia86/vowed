'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE } from '@/lib/constants'
import { WeddingInfo } from '@/lib/types'

interface Props { weddingInfo: WeddingInfo }

const TEMPLATES = [
  { name: 'Jardín de olivos', price: '12 €', style: 'Bohemio', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80' },
  { name: 'Lino y oro', price: '14 €', style: 'Elegante', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80' },
  { name: 'Acuarela floral', price: '12 €', style: 'Romántico', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80' },
  { name: 'Minimal clásica', price: '10 €', style: 'Minimalista', img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&q=80' },
]

const IMG_TABLE = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&q=70'
const IMG_PAPER = 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&q=70'
const IMG_BOWS = 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=300&q=70'
const IMG_HANDS = 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=300&q=70'
const IMG_COUPLE = 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300&q=70'
const IMG_BOUQUET = 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=300&q=70'

const CATEGORIES = [
  { label: 'Save the dates', img: '/cat-save-the-dates.png', real: true },
  { label: 'Invitaciones', img: '/cat-invitaciones.png', real: true },
  { label: 'Fundas', img: IMG_PAPER, real: false },
  { label: 'Complementos de papel', img: '/cat-complementos.png', real: true },
  { label: 'Tarjetas de mesa', img: IMG_TABLE, real: false },
  { label: 'Números de mesa', img: IMG_TABLE, real: false },
  { label: 'Menús', img: IMG_TABLE, real: false },
  { label: 'Programas', img: IMG_HANDS, real: false },
  { label: 'Servilletas', img: IMG_TABLE, real: false },
  { label: 'Carteles', img: IMG_COUPLE, real: false },
  { label: 'Pegatinas', img: IMG_BOWS, real: false },
  { label: 'Tarjetas de agradecimiento', img: IMG_HANDS, real: false },
  { label: 'Agradecimientos al instante', img: IMG_HANDS, real: false },
  { label: 'Save the dates digitales', img: IMG_COUPLE, real: false },
  { label: 'Invitaciones despedida', img: IMG_BOUQUET, real: false },
  { label: 'Subir tu diseño', img: IMG_PAPER, real: false },
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
              position: 'relative', width: '100%', aspectRatio: '1', borderRadius: 14, overflow: 'hidden',
              border: cat === c.label ? `2px solid ${BROWN}` : `1px solid ${BEIGE}`, transition: 'border-color 0.15s'
            }}>
              <img src={c.img} alt={c.label} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: c.real ? 'none' : 'sepia(0.55) saturate(1.4) brightness(0.92) contrast(1.05)' }} />
              {!c.real && <div style={{ position: 'absolute', inset: 0, background: cat === c.label ? 'rgba(139,94,60,0.15)' : 'rgba(139,94,60,0.28)', transition: 'background 0.15s' }} />}
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
