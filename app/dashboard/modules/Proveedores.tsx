'use client'
import { useState, useRef } from 'react'
import { F, BLUE, INK, MUTE, TEXT_PRIMARY, TEXT_SECONDARY, GREEN, GREEN_LIGHT } from '@/lib/constants'
import { Vendor } from '@/lib/types'

interface Props { vendors: Vendor[]; setVendors: (v: Vendor[]) => void }

const CATEGORIES = ['Fotografía', 'Vídeo', 'Catering', 'Finca', 'Música/DJ', 'Flores', 'Vestido', 'Pastel', 'Transporte', 'Otro']
const STATUS_COLORS: Record<string, string> = { Buscando: '#EFE0C2', Contactado: '#E3DCC9', Contratado: 'GREEN_LIGHT' }
const STATUS_TEXT: Record<string, string> = { Buscando: '#B8862F', Contactado: '#5C4A3D', Contratado: 'GREEN' }

const TABS = ['Explorar proveedores', 'Bandeja', 'Contratados', 'Favoritos', 'Presupuesto', 'Asesor de espacios', 'Bodas de destino']

const EXPLORE_CATS = [
  { label: 'Espacios', icon: 'M3 21h18M5 21V9l7-6 7 6v12M9 21v-6h6v6', cat: 'Finca' },
  { label: 'Fotografía', icon: 'M4 8h3l2-3h6l2 3h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1zM12 17a4 4 0 100-8 4 4 0 000 8z', cat: 'Fotografía' },
  { label: 'Belleza', icon: 'M12 2v6M12 22c3-3 5-6 5-10a5 5 0 00-10 0c0 4 2 7 5 10z', cat: 'Otro' },
  { label: 'Música y DJ', icon: 'M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z', cat: 'Música/DJ' },
  { label: 'Floristería', icon: 'M12 2a4 4 0 014 4c0 2-2 4-4 6-2-2-4-4-4-6a4 4 0 014-4zM12 12v10', cat: 'Flores' },
  { label: 'Catering', icon: 'M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3', cat: 'Catering' },
  { label: 'Planners', icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11', cat: 'Otro' },
  { label: 'Tartas y dulces', icon: 'M20 21v-8a8 8 0 00-16 0v8M4 21h16M12 3v3', cat: 'Pastel' },
  { label: 'Vídeo', icon: 'M23 7l-7 5 7 5V7zM1 5h15v14H1z', cat: 'Vídeo' },
  { label: 'Barra libre', icon: 'M5 3h14l-2 9a5 5 0 01-10 0L5 3zM12 15v6M8 21h8', cat: 'Otro' },
]

export default function Proveedores({ vendors, setVendors }: Props) {
  const [newName, setNewName] = useState('')
  const [newCat, setNewCat] = useState('Fotografía')
  const [newContact, setNewContact] = useState('')
  const [newBudget, setNewBudget] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [tab, setTab] = useState(TABS[0])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [aiQuery, setAiQuery] = useState('')
  const formRef = useRef<HTMLDivElement | null>(null)

  function goToForm(cat?: string, name?: string) {
    if (cat) setNewCat(cat)
    if (name) setNewName(name)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function toggleFavorite(name: string) {
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })
  }

  function add() {
    if (!newName.trim()) return
    setVendors([...vendors, { id: Date.now().toString(), name: newName, category: newCat, contact: newContact, status: 'Buscando', budget: Number(newBudget) || 0, notes: '' }])
    setNewName(''); setNewContact(''); setNewBudget('')
  }

  function update(id: string, field: keyof Vendor, value: string | number) {
    setVendors(vendors.map(v => v.id === id ? { ...v, [field]: value } : v))
  }

  function remove(id: string) {
    setVendors(vendors.filter(v => v.id !== id))
  }

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: TEXT_PRIMARY, marginBottom: 4 }}>Espacio y proveedores</h1>
      <p style={{ fontSize: 12, color: TEXT_SECONDARY, marginBottom: 16 }}>
        {vendors.filter(v => v.status === 'Contratado').length} contratados · {vendors.filter(v => v.status === 'Buscando').length} buscando
      </p>

      {/* TABS */}
      <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #ECE9E4', marginBottom: 20, overflowX: 'auto' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            padding: '0 0 10px', fontSize: 13, fontFamily: F,
            color: tab === t ? INK : MUTE, fontWeight: tab === t ? 600 : 500,
            borderBottom: tab === t ? '2px solid #898a76' : '2px solid transparent'
          }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Explorar proveedores' && (
        <>
          {/* CATEGORIAS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            {EXPLORE_CATS.map(c => (
              <div key={c.label} onClick={() => goToForm(c.cat)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', flexShrink: 0 }}>
                <div style={{ width: 46, height: 46, borderRadius: '50%', background: newCat === c.cat ? '#F4E7D8' : '#F4EFE8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#898a76" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg>
                </div>
                <span style={{ fontSize: 10.5, color: TEXT_SECONDARY, whiteSpace: 'nowrap' }}>{c.label}</span>
              </div>
            ))}
          </div>

          {/* DOS TARJETAS */}
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
            <div style={{ background: '#F7F4EF', borderRadius: 16, padding: '36px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontFamily: F, fontSize: 20, color: TEXT_PRIMARY, marginBottom: 6 }}>Explorad espacios en</p>
              <p style={{ fontFamily: F, fontSize: 20, color: TEXT_PRIMARY, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'underline', cursor: 'pointer' }}>
                {vendors.find(v => v.category === 'Finca')?.contact || 'vuestra ciudad'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
              </p>
              <button onClick={() => goToForm('Finca')} style={{ background: '#898a76', color: 'white', border: 'none', borderRadius: 999, padding: '12px 28px', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 12 }}>Ver espacios</button>
              <p onClick={() => goToForm('Finca')} style={{ fontSize: 11, color: TEXT_SECONDARY, textDecoration: 'underline', cursor: 'pointer' }}>¿Ya tenéis espacio? Añadidlo aquí</p>
            </div>

            <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', background: 'white', border: '1px solid #ECE9E4', borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: TEXT_SECONDARY, zIndex: 2 }}>o</span>

            <div style={{ background: 'linear-gradient(135deg, #F4EFE8, #EFE6F5)', border: `1.5px solid ${BLUE}`, borderRadius: 16, padding: '28px 24px' }}>
              <p style={{ fontFamily: F, fontSize: 20, color: TEXT_PRIMARY, textAlign: 'center', marginBottom: 6 }}>Encontrad vuestro espacio en segundos</p>
              <p style={{ fontSize: 11.5, color: TEXT_SECONDARY, textAlign: 'center', marginBottom: 16 }}>Contadnos qué buscáis y os lo emparejamos con el espacio perfecto.</p>
              <div style={{ display: 'flex', gap: 8, background: 'white', border: '1px solid #ECE9E4', borderRadius: 999, padding: '10px 8px 10px 16px', alignItems: 'center', marginBottom: 12 }}>
                <input
                  value={aiQuery} onChange={e => setAiQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && aiQuery.trim() && goToForm('Finca', aiQuery)}
                  placeholder="Un espacio con jardín en Madrid para 100 invitados..."
                  style={{ flex: 1, fontSize: 12, color: TEXT_PRIMARY, border: 'none', outline: 'none', background: 'transparent', fontFamily: F }}
                />
                <span onClick={() => aiQuery.trim() && goToForm('Finca', aiQuery)} style={{ width: 30, height: 30, borderRadius: '50%', background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['¿Presupuesto realista para 150 invitados?', 'Espacios con ceremonia al aire libre'].map(q => (
                  <span key={q} onClick={() => setAiQuery(q)} style={{ border: '1px solid #ECE9E4', background: 'white', borderRadius: 999, padding: '6px 12px', fontSize: 10.5, color: TEXT_SECONDARY, cursor: 'pointer' }}>{q}</span>
                ))}
              </div>
            </div>
          </div>

          {/* GALERIA */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <p style={{ fontFamily: F, fontSize: 18, color: TEXT_PRIMARY }}>Los espacios más populares</p>
            <button onClick={() => goToForm('Finca')} style={{ background: '#898a76', color: 'white', border: 'none', borderRadius: 999, padding: '8px 18px', fontSize: 11.5, fontWeight: 600, cursor: 'pointer' }}>Ver todos</button>
          </div>
          <div style={{ display: 'flex', gap: 14, overflowX: 'auto', marginBottom: 32, paddingBottom: 4 }}>
            {[
              { img: '/showcase-1.png', name: 'Jardines del Rey', loc: 'Madrid', price: '7.500 €' },
              { img: '/showcase-2.png', name: 'The Sanctuary', loc: 'Sitges', price: '15.000 €' },
              { img: '/showcase-3.png', name: 'Finca Brooklyn', loc: 'Girona', price: '20.000 €' },
              { img: '/detalles.png', name: 'Sound River', loc: 'Valencia', price: '8.200 €' },
            ].map(v => (
              <div key={v.name} onClick={() => goToForm('Finca', v.name)} style={{ width: 220, flexShrink: 0, cursor: 'pointer' }}>
                <div style={{ position: 'relative', height: 150, borderRadius: 12, overflow: 'hidden', marginBottom: 8 }}>
                  <img src={v.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span onClick={e => { e.stopPropagation(); toggleFavorite(v.name) }} style={{ position: 'absolute', top: 8, right: 8, width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill={favorites.has(v.name) ? '#C0594F' : 'none'} stroke={favorites.has(v.name) ? '#C0594F' : INK} strokeWidth="1.8"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" /></svg>
                  </span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 2 }}>{v.name}</p>
                <p style={{ fontSize: 11, color: TEXT_SECONDARY, marginBottom: 2 }}>{v.loc}</p>
                <p style={{ fontSize: 11, color: TEXT_SECONDARY }}>Desde {v.price}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* VUESTROS PROVEEDORES — gestion existente */}
      <p ref={formRef} style={{ fontFamily: F, fontSize: 18, color: TEXT_PRIMARY, marginBottom: 12, scrollMarginTop: 20 }}>Vuestros proveedores</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Nombre del proveedor" style={{ flex: 1, minWidth: 160, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
        <select value={newCat} onChange={e => setNewCat(e.target.value)} style={{ border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 14px', fontSize: 13, outline: 'none', background: 'white' }}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <input value={newContact} onChange={e => setNewContact(e.target.value)} placeholder="Contacto" style={{ width: 160, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
        <input value={newBudget} onChange={e => setNewBudget(e.target.value)} type="number" placeholder="Presupuesto €" style={{ width: 130, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
        <button onClick={add} style={{ background: BLUE, color: 'white', border: 'none', borderRadius: 12, padding: '11px 22px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Añadir</button>
      </div>

      {vendors.length === 0 ? (
        <p style={{ fontSize: 13, color: TEXT_SECONDARY, textAlign: 'center', padding: '40px 0' }}>Sin proveedores todavía.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {vendors.map(v => (
            <div key={v.id} style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', gap: 14, cursor: 'pointer' }} onClick={() => setExpanded(expanded === v.id ? null : v.id)}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: TEXT_PRIMARY }}>{v.name}</p>
                  <p style={{ fontSize: 11, color: TEXT_SECONDARY }}>{v.category} · {v.contact}</p>
                </div>
                <span style={{ background: STATUS_COLORS[v.status], color: STATUS_TEXT[v.status], fontSize: 11, borderRadius: 999, padding: '4px 12px', fontWeight: 500 }}>{v.status}</span>
                <span style={{ fontFamily: F, fontSize: 15, color: TEXT_PRIMARY }}>{v.budget.toLocaleString('es-ES')} €</span>
                <button onClick={e => { e.stopPropagation(); remove(v.id) }} style={{ background: 'none', border: 'none', color: '#C9BCA8', cursor: 'pointer', fontSize: 18 }}>×</button>
              </div>

              {expanded === v.id && (
                <div style={{ padding: '0 18px 16px', borderTop: '1px solid #F5EFE0', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ marginTop: 12 }}>
                    <p style={{ fontSize: 10, color: TEXT_SECONDARY, marginBottom: 4 }}>ESTADO</p>
                    <select value={v.status} onChange={e => update(v.id, 'status', e.target.value)} style={{ border: '1px solid #F5EFE0', borderRadius: 8, padding: '7px 10px', fontSize: 12, outline: 'none', background: 'white' }}>
                      <option>Buscando</option><option>Contactado</option><option>Contratado</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, marginTop: 12 }}>
                    <p style={{ fontSize: 10, color: TEXT_SECONDARY, marginBottom: 4 }}>NOTAS</p>
                    <input value={v.notes} onChange={e => update(v.id, 'notes', e.target.value)} placeholder="Añadir notas..." style={{ width: '100%', border: '1px solid #F5EFE0', borderRadius: 8, padding: '7px 10px', fontSize: 12, outline: 'none' }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
