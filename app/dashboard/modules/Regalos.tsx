'use client'
import { useState, useRef, useEffect } from 'react'
import { F, BLUE, INK, MUTE, TEXT_PRIMARY, TEXT_SECONDARY, GREEN, GREEN_LIGHT } from '@/lib/constants'
import { WeddingInfo } from '@/lib/types'
import { supabase } from '@/lib/supabase'

interface Gift { id: string; name: string; price: number; img: string; reserved: boolean; store: string; url: string; category: string }
interface Props { weddingInfo: WeddingInfo; userId?: string | null; readOnly?: boolean }

const CATALOG: Gift[] = [
  { id: '1', name: 'Vajilla de porcelana (12 piezas)', price: 180, img: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=400&q=80', reserved: false, store: 'El Corte Inglés', url: 'https://www.elcorteingles.es/hogar/menaje-mesa/vajillas/', category: 'Mesa' },
  { id: '2', name: 'Set de copas de cristal', price: 65, img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80', reserved: true, store: 'Zara Home', url: 'https://www.zarahome.com/es/mesa/copas-y-vasos', category: 'Mesa' },
  { id: '3', name: 'Cafetera espresso', price: 220, img: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80', reserved: false, store: 'Amazon', url: 'https://www.amazon.es/s?k=cafetera+espresso', category: 'Cocina' },
  { id: '4', name: 'Ropa de cama de lino', price: 95, img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80', reserved: false, store: 'Zara Home', url: 'https://www.zarahome.com/es/dormitorio/ropa-de-cama', category: 'Baño' },
  { id: '5', name: 'Batidora de cocina', price: 140, img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&q=80', reserved: false, store: 'Amazon', url: 'https://www.amazon.es/s?k=batidora+de+cocina', category: 'Cocina' },
  { id: '6', name: 'Aportación luna de miel', price: 50, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80', reserved: false, store: 'Bodas.net', url: 'https://www.bodas.net/lista-de-bodas', category: 'Experiencias' },
]

const TABS = ['Añadir regalos', 'Gestionar lista', 'Checklist', 'Seguimiento']

const CATEGORIES = [
  { label: 'Cocina', icon: 'M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3', store: 'Amazon Cocina', url: 'https://www.amazon.es/cocina-y-hogar/b?node=667048031' },
  { label: 'Mesa', icon: 'M3 3h18v6H3zM3 15h18v6H3zM3 9v6M21 9v6', store: 'Zara Home', url: 'https://www.zarahome.com/es/mesa' },
  { label: 'Baño', icon: 'M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4zM4 12V6a2 2 0 012-2h1v3M20 12v-2a2 2 0 00-2-2', store: 'El Corte Inglés', url: 'https://www.elcorteingles.es/hogar/bano/' },
  { label: 'Muebles', icon: 'M3 9h18v6H5a2 2 0 01-2-2V9zM3 9V7a2 2 0 012-2h14a2 2 0 012 2v2M5 15v3M19 15v3', store: 'IKEA', url: 'https://www.ikea.com/es/es/' },
  { label: 'Hogar', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM9 22V12h6v10', store: 'Maisons du Monde', url: 'https://www.maisonsdumonde.com/ES/es' },
  { label: 'Fin de semana', icon: 'M4 21h16M6 21V10l6-6 6 6v11M10 21v-6h4v6', store: 'Booking.com', url: 'https://www.booking.com' },
  { label: 'Experiencias', icon: 'M12 2C8 2 5 5.5 5 9.5 5 15 12 22 12 22s7-7 7-12.5C19 5.5 16 2 12 2zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z', store: 'Wonderbox', url: 'https://www.wonderbox.es' },
  { label: 'Fondos en efectivo', icon: 'M20 12a8 8 0 11-16 0 8 8 0 0116 0zM12 8v8M9 10c0-1.2 1.2-2 3-2s3 .8 3 2-1.2 1.6-3 2-3 .8-3 2 1.2 2 3 2 3-.8 3-2', store: 'Bodas.net', url: 'https://www.bodas.net/lista-de-bodas' },
]

const CHECKLIST_ITEMS = [
  { id: 'c1', title: 'Elegir dónde crear vuestra lista de regalos', desc: 'Amazon, El Corte Inglés, Zara Home o Bodas.net son las opciones más habituales en España.' },
  { id: 'c2', title: 'Añadir entre 15 y 20 regalos', desc: 'Incluid variedad de precios para que todos los invitados encuentren algo a su medida.' },
  { id: 'c3', title: 'Incluir un fondo en efectivo', desc: 'Para la luna de miel o para la casa, siempre es una opción muy solicitada.' },
  { id: 'c4', title: 'Compartir el enlace con los invitados', desc: 'Añadidlo a las invitaciones o enviadlo directamente por WhatsApp o email.' },
  { id: 'c5', title: 'Revisar la lista dos meses antes', desc: 'Actualizad lo que ya tengáis reservado por otras vías.' },
  { id: 'c6', title: 'Preparar los agradecimientos', desc: 'Id anotando quién os regala qué para agilizar las tarjetas de agradecimiento.' },
]

export default function Regalos({ weddingInfo, userId, readOnly }: Props) {
  const [tab, setTab] = useState(TABS[0])
  const [gifts, setGifts] = useState(CATALOG)
  const [added, setAdded] = useState<Set<string>>(new Set(gifts.filter(g => g.reserved).map(g => g.id)))
  const [thanked, setThanked] = useState<Set<string>>(new Set())
  const [activeCat, setActiveCat] = useState<string | null>(null)
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [checked, setChecked] = useState<Set<string>>(new Set(['c1']))
  const photoInputRef = useRef<HTMLInputElement | null>(null)
  const reserved = gifts.filter(g => g.reserved).length

  useEffect(() => {
    if (!userId) return
    supabase.from('vowed_gift_status').select('gift_id, reserved, thanked').eq('user_id', userId).then(({ data }) => {
      if (!data) return
      setAdded(prev => { const next = new Set(prev); data.forEach((r: any) => { if (r.reserved) next.add(r.gift_id) }); return next })
      setThanked(new Set(data.filter((r: any) => r.thanked).map((r: any) => r.gift_id)))
    })
  }, [userId])

  const filteredGifts = activeCat ? gifts.filter(g => g.category === activeCat || CATEGORIES.find(c => c.label === activeCat)?.label === g.category) : gifts

  function persistGiftStatus(id: string, patch: { reserved?: boolean; thanked?: boolean }) {
    if (!userId || readOnly) return
    supabase.from('vowed_gift_status').upsert({ gift_id: id, user_id: userId, ...patch })
  }

  function toggleAdded(id: string) {
    if (readOnly) return
    setAdded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      persistGiftStatus(id, { reserved: next.has(id) })
      return next
    })
  }

  function toggleThanked(id: string) {
    if (readOnly) return
    setThanked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      persistGiftStatus(id, { thanked: next.has(id) })
      return next
    })
  }

  function toggleChecked(id: string) {
    setChecked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setCoverPhoto(String(reader.result))
    reader.readAsDataURL(file)
  }

  function copyLink() {
    const slug = `${(weddingInfo.partner1 || 'vosotros').toLowerCase()}y${(weddingInfo.partner2 || 'dos').toLowerCase()}`.replace(/\s/g, '')
    const url = `https://mylov3.com/r/${slug}`
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const selectedGifts = gifts.filter(g => added.has(g.id))
  const checklistPct = Math.round((checked.size / CHECKLIST_ITEMS.length) * 100)

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: TEXT_PRIMARY, marginBottom: 4 }}>Lista de regalos</h1>

      {readOnly && (
        <div style={{ background: '#FBF0D9', border: '1px solid #EFDFB0', borderRadius: 10, padding: '8px 14px', fontSize: 12, color: '#8a6d1f', marginBottom: 16 }}>
          Estás en modo demo: podéis explorar todo, pero los cambios no se guardan.
        </div>
      )}
      <p style={{ fontSize: 12, color: TEXT_SECONDARY, marginBottom: 16 }}>{reserved}/{gifts.length} reservados por vuestros invitados</p>

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

      {tab === 'Añadir regalos' && (
        <>
          {/* CATEGORIAS estilo proveedores, cada una con su tienda real */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            {CATEGORIES.map(c => (
              <div key={c.label} onClick={() => setActiveCat(activeCat === c.label ? null : c.label)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', flexShrink: 0 }}>
                <div style={{ width: 46, height: 46, borderRadius: '50%', border: '1.3px solid #898a76', background: activeCat === c.label ? '#F4E7D8' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#898a76" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg>
                </div>
                <span style={{ fontSize: 10.5, color: activeCat === c.label ? '#898a76' : MUTE, whiteSpace: 'nowrap', fontWeight: activeCat === c.label ? 600 : 500 }}>{c.label}</span>
              </div>
            ))}
          </div>
          {activeCat && (
            <p style={{ fontSize: 11.5, color: TEXT_SECONDARY, marginBottom: 20 }}>
              Explorad {activeCat.toLowerCase()} en{' '}
              <a href={CATEGORIES.find(c => c.label === activeCat)?.url} target="_blank" rel="noopener noreferrer" style={{ color: '#898a76', fontWeight: 600, textDecoration: 'underline' }}>
                {CATEGORIES.find(c => c.label === activeCat)?.store} ↗
              </a>
            </p>
          )}
          {!activeCat && <div style={{ marginBottom: 18 }} />}

          {/* PORTADA */}
          <div style={{ border: '1.5px dashed #DDD8D0', borderRadius: 16, padding: coverPhoto ? 0 : '40px 24px', textAlign: 'center', marginBottom: 28, background: '#FBF9F5', overflow: 'hidden', position: 'relative' }}>
            {coverPhoto && <img src={coverPhoto} alt="" style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />}
            <div style={{ padding: coverPhoto ? '20px 24px' : 0, position: coverPhoto ? 'absolute' : 'static', bottom: 0, left: 0, right: 0, background: coverPhoto ? 'linear-gradient(transparent, rgba(0,0,0,0.55))' : 'transparent' }}>
              <p style={{ fontFamily: F, fontSize: 24, color: coverPhoto ? 'white' : INK, marginBottom: 6 }}>
                {weddingInfo.partner1 || 'Vosotros'} &amp; {weddingInfo.partner2 || 'dos'}
              </p>
              <p style={{ fontSize: 12, color: coverPhoto ? 'rgba(255,255,255,0.85)' : MUTE, marginBottom: 16 }}>{weddingInfo.date ? new Date(weddingInfo.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Fecha por confirmar'}</p>
              <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
              <button onClick={() => photoInputRef.current?.click()} style={{ border: '1px solid #ECE9E4', background: 'white', borderRadius: 999, padding: '8px 18px', fontSize: 11.5, color: TEXT_PRIMARY, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7l2-3h4l2 3" /></svg>
                {coverPhoto ? 'Cambiar foto' : 'Subir foto'}
              </button>
            </div>
          </div>

          {/* INSTANT REGISTRY */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
            <p style={{ fontFamily: F, fontSize: 18, color: TEXT_PRIMARY }}>Lista instantánea</p>
            <p style={{ fontSize: 11, color: TEXT_SECONDARY }}>Con un clic añadid nuestras selecciones más populares.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 12 }}>
            {filteredGifts.length === 0 ? (
              <p style={{ fontSize: 13, color: TEXT_SECONDARY, textAlign: 'center', padding: '30px 0', gridColumn: '1/-1' }}>Sin regalos en esta categoría todavía.</p>
            ) : filteredGifts.map(g => (
              <div key={g.id} style={{ border: '1px solid #ECE9E4', borderRadius: 16, overflow: 'hidden', background: 'white' }}>
                <div onClick={() => toggleAdded(g.id)} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer' }}>
                  <img src={g.img} alt={g.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute', top: 8, left: 8, width: 22, height: 22, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: added.has(g.id) ? '#898a76' : 'rgba(255,255,255,0.9)', border: added.has(g.id) ? 'none' : '1px solid #DDD8D0'
                  }}>
                    {added.has(g.id) && <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </span>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: TEXT_PRIMARY, marginBottom: 4 }}>{g.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ fontFamily: F, fontSize: 16, color: TEXT_PRIMARY }}>{g.price} €</p>
                    <a href={g.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 10.5, color: '#898a76', textDecoration: 'underline' }}>
                      Ver en {g.store} ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 10.5, color: TEXT_SECONDARY, marginBottom: 28 }}>{added.size} de {gifts.length} seleccionados para vuestra lista</p>
        </>
      )}

      {tab === 'Gestionar lista' && (
        <>
          <div style={{ background: 'linear-gradient(135deg, #F4EFE8, #EFE6F5)', border: `1.5px solid ${BLUE}`, borderRadius: 16, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <p style={{ fontFamily: F, fontSize: 17, color: TEXT_PRIMARY, marginBottom: 4 }}>Compartid vuestra lista</p>
              <p style={{ fontSize: 11.5, color: TEXT_SECONDARY }}>Enviad el enlace a vuestros invitados para que reserven un regalo.</p>
            </div>
            <button onClick={copyLink} style={{ background: copied ? GREEN : '#898a76', color: 'white', border: 'none', borderRadius: 999, padding: '10px 20px', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {copied ? '¡Copiado!' : 'Copiar enlace'}
            </button>
          </div>

          <p style={{ fontFamily: F, fontSize: 18, color: TEXT_PRIMARY, marginBottom: 12 }}>Vuestra lista</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {selectedGifts.length === 0 ? (
              <p style={{ fontSize: 13, color: TEXT_SECONDARY, textAlign: 'center', padding: '30px 0', gridColumn: '1/-1' }}>
                Aún no habéis añadido regalos. Id a &quot;Añadir regalos&quot; para empezar.
              </p>
            ) : selectedGifts.map(g => (
              <div key={g.id} style={{ border: '1px solid #ECE9E4', borderRadius: 16, overflow: 'hidden', background: 'white' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img src={g.img} alt={g.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {g.reserved && (
                    <span style={{ position: 'absolute', top: 8, left: 8, background: GREEN_LIGHT, color: GREEN, fontSize: 10, fontWeight: 600, borderRadius: 999, padding: '3px 10px' }}>
                      Reservado
                    </span>
                  )}
                  <button onClick={() => toggleAdded(g.id)} style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', color: '#C0594F', fontSize: 14 }}>×</button>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: TEXT_PRIMARY, marginBottom: 4 }}>{g.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ fontFamily: F, fontSize: 16, color: TEXT_PRIMARY }}>{g.price} €</p>
                    <a href={g.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10.5, color: '#898a76', textDecoration: 'underline' }}>{g.store} ↗</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'Checklist' && (
        <>
          <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14, padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1, height: 8, borderRadius: 999, background: '#F1EADA', overflow: 'hidden' }}>
              <div style={{ width: `${checklistPct}%`, height: '100%', background: BLUE, borderRadius: 999, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: 13, fontFamily: F, color: TEXT_PRIMARY, flexShrink: 0 }}>{checklistPct}%</span>
          </div>
          <div style={{ border: '1px solid #F5EFE0', borderRadius: 16, overflow: 'hidden' }}>
            {CHECKLIST_ITEMS.map((item, i) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 18px', borderBottom: i < CHECKLIST_ITEMS.length - 1 ? '1px solid #F5EFE0' : 'none' }}>
                <span
                  onClick={() => toggleChecked(item.id)}
                  style={{ width: 18, height: 18, borderRadius: 6, flexShrink: 0, marginTop: 2, border: checked.has(item.id) ? 'none' : '1.5px solid #E3DCC9', background: checked.has(item.id) ? BLUE : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                >
                  {checked.has(item.id) && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </span>
                <div>
                  <p style={{ fontSize: 13, color: checked.has(item.id) ? '#C9BCA8' : INK, textDecoration: checked.has(item.id) ? 'line-through' : 'none', marginBottom: 2 }}>{item.title}</p>
                  <p style={{ fontSize: 11.5, color: TEXT_SECONDARY, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'Seguimiento' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
            <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14, padding: '14px 18px', textAlign: 'center' }}>
              <p style={{ fontFamily: F, fontSize: 22, color: TEXT_PRIMARY }}>{selectedGifts.length}</p>
              <p style={{ fontSize: 11, color: TEXT_SECONDARY }}>En vuestra lista</p>
            </div>
            <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14, padding: '14px 18px', textAlign: 'center' }}>
              <p style={{ fontFamily: F, fontSize: 22, color: GREEN }}>{reserved}</p>
              <p style={{ fontSize: 11, color: TEXT_SECONDARY }}>Reservados</p>
            </div>
            <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14, padding: '14px 18px', textAlign: 'center' }}>
              <p style={{ fontFamily: F, fontSize: 22, color: '#B8862F' }}>{thanked.size}</p>
              <p style={{ fontSize: 11, color: TEXT_SECONDARY }}>Agradecimientos enviados</p>
            </div>
          </div>

          {selectedGifts.length === 0 ? (
            <p style={{ fontSize: 13, color: TEXT_SECONDARY, textAlign: 'center', padding: '30px 0' }}>Añadid regalos a vuestra lista para hacer seguimiento aquí.</p>
          ) : (
            <div style={{ border: '1px solid #F5EFE0', borderRadius: 16, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr auto', padding: '10px 18px', background: '#FBF9F5', borderBottom: '1px solid #F5EFE0' }}>
                {['REGALO', 'PRECIO', 'ESTADO', 'AGRADECIMIENTO'].map(h => (
                  <span key={h} style={{ fontSize: 10, color: TEXT_SECONDARY, letterSpacing: '0.01em' }}>{h}</span>
                ))}
              </div>
              {selectedGifts.map((g, i) => (
                <div key={g.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr auto', alignItems: 'center', padding: '12px 18px', borderBottom: i < selectedGifts.length - 1 ? '1px solid #F5EFE0' : 'none' }}>
                  <span style={{ fontSize: 13, color: TEXT_PRIMARY }}>{g.name}</span>
                  <span style={{ fontSize: 12, color: TEXT_SECONDARY }}>{g.price} €</span>
                  <span style={{ fontSize: 11, color: g.reserved ? GREEN : '#B8862F' }}>{g.reserved ? 'Reservado' : 'Pendiente'}</span>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: TEXT_PRIMARY, cursor: 'pointer' }}>
                    <input type="checkbox" checked={thanked.has(g.id)} onChange={() => toggleThanked(g.id)} disabled={!g.reserved} />
                    Enviado
                  </label>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
