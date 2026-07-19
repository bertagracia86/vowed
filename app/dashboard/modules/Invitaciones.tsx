'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE, TEXT_PRIMARY, TEXT_SECONDARY } from '@/lib/constants'
import { WeddingInfo } from '@/lib/types'
import { supabase } from '@/lib/supabase'

interface Props { weddingInfo: WeddingInfo; userId?: string | null; readOnly?: boolean }

const STYLES = [
  { label: 'Elegante', tag: 'Elegante', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&q=80' },
  { label: 'Minimalista', tag: 'Minimalista', img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=200&q=80' },
  { label: 'Floral', tag: 'Floral', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=200&q=80' },
  { label: 'Tipografía', tag: 'Tipografía', img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=200&q=80' },
  { label: 'Monograma', tag: 'Monograma', img: 'https://images.unsplash.com/photo-1587271339471-30fd1b56c2c4?w=200&q=80' },
  { label: 'Rústico', tag: 'Rústico', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200&q=80' },
  { label: 'Verde botánico', tag: 'Verde botánico', img: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=200&q=80' },
  { label: 'Vintage', tag: 'Vintage', img: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab?w=200&q=80' },
  { label: 'Whimsical', tag: 'Whimsical', img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=200&q=80' },
]

const TEMPLATES = [
  { name: 'Jardín de olivos', price: '12 €', style: 'Rústico', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80', colors: ['#898a76', '#C9BCA8', '#5f6050'] },
  { name: 'Lino y oro', price: '14 €', style: 'Elegante', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80', colors: ['#B08B4F', '#E7DDD2', '#3A3A3A'] },
  { name: 'Acuarela floral', price: '12 €', style: 'Floral', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80', colors: ['#B08BC4', '#8FA88F', '#E7DDD2'] },
  { name: 'Minimal clásica', price: '10 €', style: 'Minimalista', img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&q=80', colors: ['#2B2A26', '#FAF9F7', '#898a76'] },
  { name: 'Serif clásico', price: '11 €', style: 'Tipografía', img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&q=80', colors: ['#2B2A26', '#AAA396', '#FAF9F7'] },
  { name: 'Iniciales doradas', price: '13 €', style: 'Monograma', img: 'https://images.unsplash.com/photo-1587271339471-30fd1b56c2c4?w=400&q=80', colors: ['#B08B4F', '#2B2A26', '#E7DDD2'] },
  { name: 'Hojas de eucalipto', price: '12 €', style: 'Verde botánico', img: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=400&q=80', colors: ['#7FA88F', '#E7DDD2', '#5f6050'] },
  { name: 'Papel envejecido', price: '13 €', style: 'Vintage', img: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab?w=400&q=80', colors: ['#B08B4F', '#7C6858', '#E7DDD2'] },
  { name: 'Trazos sueltos', price: '11 €', style: 'Whimsical', img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80', colors: ['#C0594F', '#AAA396', '#FAF9F7'] },
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
  { label: 'Fundas', img: '/cat-fundas-detail.png', real: true },
  { label: 'Complementos de papel', img: '/cat-complementos.png', real: true },
  { label: 'Tarjetas de mesa', img: '/cat-tarjetasmesa.png', real: true },
  { label: 'Números de mesa', img: '/cat-numerosmesa.png', real: true },
  { label: 'Menús', img: '/cat-menus.png', real: true },
  { label: 'Programas', img: '/cat-programas.png', real: true },
  { label: 'Servilletas', img: '/cat-servilletas.png', real: true },
  { label: 'Carteles', img: '/cat-carteles.png', real: true },
  { label: 'Pegatinas', img: '/cat-fundas.png', real: true },
  { label: 'Tarjetas de agradecimiento', img: '/cat-agradecimiento.png', real: true },
  { label: 'Agradecimientos al instante', img: '/cat-agradecimiento-instant.png', real: true },
  { label: 'Save the dates digitales', img: '/cat-savethedate-digital.png', real: true },
  { label: 'Invitaciones despedida', img: '/cat-despedida.png', real: true },
  { label: 'Subir tu diseño', img: '/cat-subir-diseno.png', real: true },
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
        <p style={{ fontFamily: F, fontSize: 18, color: TEXT_PRIMARY, marginBottom: 12 }}>Orden de la ceremonia</p>
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
              <input value={item.desc} onChange={e => update(item.id, 'desc', e.target.value)} placeholder="Detalle opcional (quién lee, quién canta...)" style={{ width: '100%', border: '1px solid #F5EFE0', borderRadius: 8, padding: '6px 10px', fontSize: 12, outline: 'none', color: TEXT_SECONDARY }} />
            </div>
          ))}
        </div>
        <button onClick={addItem} style={{ border: '1px solid #898a76', background: 'white', borderRadius: 999, padding: '9px 18px', fontSize: 12, cursor: 'pointer', marginBottom: 28 }}>+ Añadir momento</button>

        <p style={{ fontFamily: F, fontSize: 18, color: TEXT_PRIMARY, marginBottom: 12 }}>Cortejo nupcial</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div>
            <p style={{ fontSize: 11, color: TEXT_SECONDARY, marginBottom: 4 }}>PADRINO</p>
            <input value={padrino} onChange={e => setPadrino(e.target.value)} placeholder="Nombre" style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 10, padding: '9px 12px', fontSize: 13, outline: 'none' }} />
          </div>
          <div>
            <p style={{ fontSize: 11, color: TEXT_SECONDARY, marginBottom: 4 }}>MADRINA</p>
            <input value={madrina} onChange={e => setMadrina(e.target.value)} placeholder="Nombre" style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 10, padding: '9px 12px', fontSize: 13, outline: 'none' }} />
          </div>
          <div>
            <p style={{ fontSize: 11, color: TEXT_SECONDARY, marginBottom: 4 }}>TESTIGOS</p>
            <input value={testigos} onChange={e => setTestigos(e.target.value)} placeholder="Nombres separados por coma" style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 10, padding: '9px 12px', fontSize: 13, outline: 'none' }} />
          </div>
          <div>
            <p style={{ fontSize: 11, color: TEXT_SECONDARY, marginBottom: 4 }}>DAMAS Y CABALLEROS DE HONOR</p>
            <input value={damas} onChange={e => setDamas(e.target.value)} placeholder="Nombres separados por coma" style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 10, padding: '9px 12px', fontSize: 13, outline: 'none' }} />
          </div>
        </div>
      </div>

      {/* PREVIEW IMPRIMIBLE */}
      <div style={{ alignSelf: 'flex-start', position: 'sticky', top: 0 }}>
        <p style={{ fontSize: 11, color: TEXT_SECONDARY, marginBottom: 10 }}>Vista previa</p>
        <div id="program-preview" style={{ border: '1px solid #ECE9E4', borderRadius: 16, padding: '36px 30px', background: 'white', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
          <p style={{ fontFamily: F, fontSize: 12, color: TEXT_SECONDARY, textAlign: 'center', letterSpacing: '0.01em', marginBottom: 6 }}>PROGRAMA DE LA CEREMONIA</p>
          <h2 style={{ fontFamily: F, fontSize: 28, color: TEXT_PRIMARY, textAlign: 'center', marginBottom: 4, fontStyle: 'italic' }}>
            {weddingInfo.partner1 || 'Vosotros'} &amp; {weddingInfo.partner2 || 'dos'}
          </h2>
          <p style={{ fontSize: 12, color: TEXT_SECONDARY, textAlign: 'center', marginBottom: 22 }}>
            {weddingInfo.date ? new Date(weddingInfo.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Fecha por confirmar'}
            {weddingInfo.venue ? ` · ${weddingInfo.venue}` : ''}
          </p>
          <div style={{ height: 1, background: '#ECE9E4', margin: '0 0 20px' }} />
          {items.map(item => (
            <div key={item.id} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                {item.time && <span style={{ fontFamily: F, fontSize: 12, color: '#898a76', minWidth: 40 }}>{item.time}</span>}
                <span style={{ fontFamily: F, fontSize: 15, color: TEXT_PRIMARY }}>{item.title}</span>
              </div>
              {item.desc && <p style={{ fontSize: 11, color: TEXT_SECONDARY, marginLeft: item.time ? 50 : 0, marginTop: 2 }}>{item.desc}</p>}
            </div>
          ))}
          {(padrino || madrina || testigos || damas) && (
            <>
              <div style={{ height: 1, background: '#ECE9E4', margin: '20px 0' }} />
              <p style={{ fontFamily: F, fontSize: 12, color: TEXT_SECONDARY, textAlign: 'center', letterSpacing: '0.01em', marginBottom: 10 }}>CORTEJO NUPCIAL</p>
              {padrino && <p style={{ fontSize: 12, color: TEXT_PRIMARY, textAlign: 'center', marginBottom: 4 }}>Padrino: {padrino}</p>}
              {madrina && <p style={{ fontSize: 12, color: TEXT_PRIMARY, textAlign: 'center', marginBottom: 4 }}>Madrina: {madrina}</p>}
              {testigos && <p style={{ fontSize: 12, color: TEXT_PRIMARY, textAlign: 'center', marginBottom: 4 }}>Testigos: {testigos}</p>}
              {damas && <p style={{ fontSize: 12, color: TEXT_PRIMARY, textAlign: 'center' }}>Honor: {damas}</p>}
            </>
          )}
        </div>
        <button onClick={() => window.print()} style={{ width: '100%', marginTop: 14, background: '#898a76', color: 'white', border: 'none', borderRadius: 999, padding: '11px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          Imprimir / Descargar PDF
        </button>
      </div>
    </div>
  )
}

const CARD = '#FFFDFB'
const BROWN = '#898a76'
const BEIGE = '#E7DDD2'
const SUBTEXT = '#7C6858'

const SIZES = [
  { label: 'Petite', dims: '4.7 x 6.6 cm', extra: 0 },
  { label: 'Classic', dims: '12.7 x 17.8 cm', extra: 0.4 },
  { label: 'Grande', dims: '14 x 21.6 cm', extra: 0.9 },
]

const PAPERS = [
  { label: 'Estándar', desc: 'Papel mate 300g', extra: 0, thickness: 3 },
  { label: 'Grueso premium', desc: 'Papel texturado 400g', extra: 0.6, thickness: 5 },
  { label: 'Ultra grueso', desc: 'Doble capa 700g', extra: 1.3, thickness: 8 },
]

const SHAPES = [
  { label: 'Rectangular', radius: 4 },
  { label: 'Esquinas redondeadas', radius: 18 },
  { label: 'Arco', radius: '50% 50% 4px 4px' },
]

interface Template { name: string; price: string; style: string; img: string }

function InvitationConfigurator({ template, weddingInfo, userId, readOnly, onBack }: { template: Template; weddingInfo: WeddingInfo; userId?: string | null; readOnly?: boolean; onBack: () => void }) {
  const [size, setSize] = useState(SIZES[1])
  const [paper, setPaper] = useState(PAPERS[0])
  const [shape, setShape] = useState(SHAPES[0])
  const [quantity, setQuantity] = useState(50)
  const [title, setTitle] = useState(`${weddingInfo.partner1 || 'Vosotros'} & ${weddingInfo.partner2 || 'dos'}`)
  const [subtitle, setSubtitle] = useState(weddingInfo.date ? new Date(weddingInfo.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Fecha por confirmar')
  const [venueText, setVenueText] = useState(weddingInfo.venue || '')
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [orderName, setOrderName] = useState('')
  const [orderAddress, setOrderAddress] = useState('')
  const [orderNotes, setOrderNotes] = useState('')
  const [orderSent, setOrderSent] = useState(false)

  const basePrice = parseFloat(template.price) || 10
  const unitPrice = basePrice + size.extra + paper.extra
  const total = unitPrice * quantity

  async function submitOrder() {
    if (readOnly || !userId) { setOrderSent(true); return }
    await supabase.from('vowed_print_orders').insert({
      id: Date.now().toString(), user_id: userId, template: template.name, size: size.label, paper: paper.label,
      shape: shape.label, quantity, price_total: Math.round(total * 100) / 100,
      shipping_name: orderName, shipping_address: orderAddress, notes: orderNotes,
    })
    setOrderSent(true)
  }

  return (
    <div style={{ marginBottom: 32 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: SUBTEXT, fontSize: 12, cursor: 'pointer', marginBottom: 16, padding: 0 }}>‹ Volver a las invitaciones</button>

      {readOnly && (
        <div style={{ background: '#FBF0D9', border: '1px solid #EFDFB0', borderRadius: 10, padding: '8px 14px', fontSize: 12, color: '#8a6d1f', marginBottom: 16 }}>
          Estás en modo demo: podéis explorar todo, pero el pedido no se guarda.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 28 }}>
        {/* PREVIEW */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: '#F4EFE8', borderRadius: 18, padding: 40 }}>
          <div id="invitation-preview" style={{
            width: 320, background: 'white', borderRadius: typeof shape.radius === 'string' ? shape.radius : shape.radius,
            boxShadow: `0 ${paper.thickness * 2}px ${paper.thickness * 4}px rgba(0,0,0,0.18)`,
            border: `${paper.thickness / 2}px solid white`, outline: '1px solid #ECE9E4',
            padding: '48px 30px', textAlign: 'center', position: 'relative'
          }}>
            <div style={{ aspectRatio: '4/3', borderRadius: 8, overflow: 'hidden', marginBottom: 20 }}>
              <img src={template.img} alt={template.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <p style={{ fontFamily: F, fontSize: 22, color: TEXT_PRIMARY, fontStyle: 'italic', marginBottom: 8 }}>{title}</p>
            <p style={{ fontSize: 12, color: TEXT_SECONDARY, marginBottom: 4 }}>{subtitle}</p>
            {venueText && <p style={{ fontSize: 12, color: TEXT_SECONDARY }}>{venueText}</p>}
          </div>
        </div>

        {/* OPTIONS */}
        <div>
          <p style={{ fontFamily: F, fontSize: 20, color: TEXT_PRIMARY, marginBottom: 2 }}>{template.name}</p>
          <p style={{ fontSize: 12, color: SUBTEXT, marginBottom: 20 }}>{template.style} · desde {basePrice.toFixed(2)} €/ud</p>

          <p style={{ fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 8 }}>Texto</p>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nombres" style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none', marginBottom: 8, fontFamily: F }} />
          <input value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Fecha" style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none', marginBottom: 8 }} />
          <input value={venueText} onChange={e => setVenueText(e.target.value)} placeholder="Lugar" style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none', marginBottom: 20 }} />

          <p style={{ fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 8 }}>Tamaño</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {SIZES.map(s => (
              <button key={s.label} onClick={() => setSize(s)} style={{
                flex: 1, border: `1.5px solid ${size.label === s.label ? BROWN : BEIGE}`, background: size.label === s.label ? '#F4EFE8' : 'white',
                borderRadius: 10, padding: '8px 6px', cursor: 'pointer', textAlign: 'center'
              }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY }}>{s.label}</p>
                <p style={{ fontSize: 9.5, color: SUBTEXT }}>{s.dims}</p>
              </button>
            ))}
          </div>

          <p style={{ fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 8 }}>Grosor del papel</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {PAPERS.map(p => (
              <button key={p.label} onClick={() => setPaper(p)} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                border: `1.5px solid ${paper.label === p.label ? BROWN : BEIGE}`, background: paper.label === p.label ? '#F4EFE8' : 'white',
                borderRadius: 10, padding: '9px 14px', cursor: 'pointer', textAlign: 'left'
              }}>
                <span>
                  <p style={{ fontSize: 12.5, fontWeight: 600, color: TEXT_PRIMARY }}>{p.label}</p>
                  <p style={{ fontSize: 10.5, color: SUBTEXT }}>{p.desc}</p>
                </span>
                {p.extra > 0 && <span style={{ fontSize: 11, color: SUBTEXT }}>+{p.extra.toFixed(2)} €</span>}
              </button>
            ))}
          </div>

          <p style={{ fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 8 }}>Forma</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {SHAPES.map(s => (
              <button key={s.label} onClick={() => setShape(s)} style={{
                flex: 1, border: `1.5px solid ${shape.label === s.label ? BROWN : BEIGE}`, background: shape.label === s.label ? '#F4EFE8' : 'white',
                borderRadius: 10, padding: '8px 6px', cursor: 'pointer', fontSize: 11, color: TEXT_PRIMARY
              }}>{s.label}</button>
            ))}
          </div>

          <p style={{ fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 8 }}>Cantidad</p>
          <input type="number" min={10} step={10} value={quantity} onChange={e => setQuantity(Math.max(10, Number(e.target.value) || 10))}
            style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none', marginBottom: 20 }} />

          <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: SUBTEXT, marginBottom: 4 }}>
              <span>{unitPrice.toFixed(2)} € × {quantity} unidades</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F, fontSize: 20, color: TEXT_PRIMARY }}>
              <span>Total</span><span>{total.toFixed(2)} €</span>
            </div>
          </div>

          <button onClick={() => window.print()} style={{ width: '100%', border: `1px solid ${BROWN}`, background: 'white', color: BROWN, borderRadius: 999, padding: '11px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 10 }}>
            Imprimir / Descargar PDF
          </button>

          {orderSent ? (
            <div style={{ background: '#EAF1E9', border: '1px solid #CFE0CD', borderRadius: 10, padding: '12px 14px', fontSize: 12.5, color: '#3d6b3a', textAlign: 'center' }}>
              ¡Pedido recibido! Os contactaremos para confirmar la producción y el envío.
            </div>
          ) : showOrderForm ? (
            <div style={{ border: `1px solid ${BEIGE}`, borderRadius: 12, padding: 14 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 8 }}>Datos de envío</p>
              <input value={orderName} onChange={e => setOrderName(e.target.value)} placeholder="Nombre completo" style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none', marginBottom: 8 }} />
              <input value={orderAddress} onChange={e => setOrderAddress(e.target.value)} placeholder="Dirección de envío" style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none', marginBottom: 8 }} />
              <textarea value={orderNotes} onChange={e => setOrderNotes(e.target.value)} placeholder="Notas (opcional)" rows={2} style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none', marginBottom: 10, fontFamily: F, resize: 'vertical' }} />
              <button onClick={submitOrder} disabled={!orderName.trim() || !orderAddress.trim()} style={{
                width: '100%', background: BROWN, color: 'white', border: 'none', borderRadius: 999, padding: '10px 0', fontSize: 13, fontWeight: 600,
                cursor: orderName.trim() && orderAddress.trim() ? 'pointer' : 'default', opacity: orderName.trim() && orderAddress.trim() ? 1 : 0.5
              }}>
                Confirmar solicitud de pedido
              </button>
            </div>
          ) : (
            <button onClick={() => setShowOrderForm(true)} style={{ width: '100%', background: BROWN, color: 'white', border: 'none', borderRadius: 999, padding: '11px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Solicitar impresión y envío
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Invitaciones({ weddingInfo, userId, readOnly }: Props) {
  const [cat, setCat] = useState('Programas')
  const [selectedTemplate, setSelectedTemplate] = useState<typeof TEMPLATES[number] | null>(null)
  const [styleFilter, setStyleFilter] = useState<string | null>(null)

  const visibleTemplates = styleFilter ? TEMPLATES.filter(t => t.style === styleFilter) : TEMPLATES

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: TEXT_PRIMARY, marginBottom: 4 }}>Invitaciones y papelería</h1>
      <p style={{ fontSize: 12, color: SUBTEXT, marginBottom: 20 }}>Preciosas invitaciones y papelería que marcan el tono de vuestro gran día.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 14, marginBottom: 32 }}>
        {CATEGORIES.map(c => (
          <div key={c.label} onClick={() => { setCat(c.label); setSelectedTemplate(null); setStyleFilter(null) }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <div style={{
              position: 'relative', width: '100%', aspectRatio: c.real ? '5/6' : '1', borderRadius: 14, overflow: 'visible',
              border: cat === c.label ? `2px solid ${BROWN}` : `1px solid ${BEIGE}`, transition: 'border-color 0.15s'
            }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 14, overflow: 'hidden' }}>
                <img src={c.img} alt={c.label} style={{ width: '100%', height: '100%', objectFit: c.real ? 'contain' : 'cover', filter: c.real ? 'none' : 'sepia(0.55) saturate(1.4) brightness(0.92) contrast(1.05)', transform: ['Fundas', 'Tarjetas de mesa', 'Servilletas', 'Agradecimientos al instante', 'Save the dates'].includes(c.label) ? 'scale(1.12)' : undefined }} />
                {!c.real && <div style={{ position: 'absolute', inset: 0, background: cat === c.label ? 'rgba(139,94,60,0.15)' : 'rgba(139,94,60,0.28)', transition: 'background 0.15s' }} />}
              </div>
              {c.label === 'Agradecimientos al instante' && (
                <div style={{
                  position: 'absolute', top: -10, right: -10, width: 40, height: 40, borderRadius: '50%',
                  background: BROWN, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textAlign: 'center', fontSize: 8, fontWeight: 700, lineHeight: 1.1, boxShadow: '0 2px 6px rgba(0,0,0,0.2)', zIndex: 2
                }}>¡NUEVO!</div>
              )}
            </div>
            <span style={{ fontSize: 10.5, color: cat === c.label ? BROWN : SUBTEXT, textAlign: 'center', lineHeight: 1.25, fontWeight: cat === c.label ? 600 : 500 }}>{c.label}</span>
          </div>
        ))}
      </div>

      {cat === 'Programas' ? (
        <ProgramaCeremonia weddingInfo={weddingInfo} />
      ) : selectedTemplate ? (
        <InvitationConfigurator template={selectedTemplate} weddingInfo={weddingInfo} userId={userId} readOnly={readOnly} onBack={() => setSelectedTemplate(null)} />
      ) : cat === 'Invitaciones' ? (
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontFamily: F, fontSize: 30, color: TEXT_PRIMARY, textAlign: 'center', marginBottom: 24 }}>Invitaciones de boda</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
            {STYLES.map(s => (
              <div key={s.label} onClick={() => setStyleFilter(styleFilter === s.tag ? null : s.tag)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', width: 78 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', border: styleFilter === s.tag ? `2px solid ${BROWN}` : `1px solid ${BEIGE}` }}>
                  <img src={s.img} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: 11, color: styleFilter === s.tag ? BROWN : SUBTEXT, fontWeight: styleFilter === s.tag ? 600 : 500, textAlign: 'center' }}>{s.label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
            <p style={{ fontSize: 12, color: SUBTEXT }}>{visibleTemplates.length} diseños{styleFilter ? ` · estilo ${styleFilter}` : ''}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Ordenar: Destacados', 'Color', 'Forma', 'Foil', 'Orientación'].map(f => (
                <span key={f} style={{ border: `1px solid ${BEIGE}`, borderRadius: 999, padding: '6px 14px', fontSize: 11.5, color: TEXT_SECONDARY, whiteSpace: 'nowrap' }}>{f}</span>
              ))}
              {styleFilter && (
                <span onClick={() => setStyleFilter(null)} style={{ border: `1px solid ${BROWN}`, borderRadius: 999, padding: '6px 14px', fontSize: 11.5, color: BROWN, cursor: 'pointer', whiteSpace: 'nowrap' }}>Quitar filtro ×</span>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {visibleTemplates.map(t => (
              <div key={t.name} style={{ border: `1px solid ${BEIGE}`, borderRadius: 14, overflow: 'hidden', background: CARD, cursor: 'pointer' }} onClick={() => setSelectedTemplate(t)}>
                <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
                  <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <p style={{ fontFamily: F, fontSize: 15, color: TEXT_PRIMARY, marginBottom: 6 }}>{t.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {t.colors.map(c => (
                        <span key={c} style={{ width: 14, height: 14, borderRadius: '50%', background: c, border: '1px solid rgba(0,0,0,0.08)', display: 'inline-block' }} />
                      ))}
                    </div>
                    <span style={{ fontSize: 12.5, color: TEXT_PRIMARY }}>desde {t.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 32 }}>
          {TEMPLATES.map(t => (
            <div key={t.name} style={{ border: `1px solid ${BEIGE}`, borderRadius: 18, overflow: 'hidden', background: CARD }}>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setSelectedTemplate(t)}>
                <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontFamily: F, fontSize: 16, color: TEXT_PRIMARY, marginBottom: 2 }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: SUBTEXT }}>{t.style}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: F, fontSize: 18, color: TEXT_PRIMARY, marginBottom: 6 }}>desde {t.price}</p>
                  <button onClick={() => setSelectedTemplate(t)} style={{ background: BROWN, color: 'white', border: 'none', borderRadius: 999, padding: '8px 18px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Personalizar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ background: 'linear-gradient(135deg, #F4EFE8, #EFE6F5)', border: `1px solid ${BEIGE}`, borderRadius: 16, padding: '24px 28px', display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr', gap: 20, alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: F, fontSize: 17, color: TEXT_PRIMARY, marginBottom: 6 }}>¿Necesitáis ayuda para elegir?</p>
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
              <p style={{ fontSize: 12.5, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 2 }}>{f.title}</p>
              <p style={{ fontSize: 11, color: SUBTEXT, lineHeight: 1.4 }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
