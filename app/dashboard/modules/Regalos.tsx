'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE } from '@/lib/constants'
import { WeddingInfo } from '@/lib/types'

interface Gift { id: string; name: string; price: number; img: string; reserved: boolean }
interface Props { weddingInfo: WeddingInfo }

const CATALOG: Gift[] = [
  { id: '1', name: 'Vajilla de porcelana (12 piezas)', price: 180, img: 'https://placehold.co/400x300/F4EFE8/8b5f3e?font=playfair-display&text=Vajilla', reserved: false },
  { id: '2', name: 'Set de copas de cristal', price: 65, img: 'https://placehold.co/400x300/EFE6F5/8b5f3e?font=playfair-display&text=Copas', reserved: true },
  { id: '3', name: 'Cafetera espresso', price: 220, img: 'https://placehold.co/400x300/F1EADA/8b5f3e?font=playfair-display&text=Cafetera', reserved: false },
  { id: '4', name: 'Ropa de cama de lino', price: 95, img: 'https://placehold.co/400x300/F4E7D8/8b5f3e?font=playfair-display&text=Ropa+de+cama', reserved: false },
  { id: '5', name: 'Batidora de cocina', price: 140, img: 'https://placehold.co/400x300/F7F4EF/8b5f3e?font=playfair-display&text=Batidora', reserved: false },
  { id: '6', name: 'Aportación luna de miel', price: 50, img: 'https://placehold.co/400x300/EFE9E3/8b5f3e?font=playfair-display&text=Luna+de+miel', reserved: false },
]

const TABS = ['Añadir regalos', 'Gestionar lista', 'Checklist', 'Seguimiento']

const CATEGORIES = [
  { label: 'Cocina', icon: 'M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3' },
  { label: 'Mesa', icon: 'M3 3h18v6H3zM3 15h18v6H3zM3 9v6M21 9v6' },
  { label: 'Baño', icon: 'M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4zM4 12V6a2 2 0 012-2h1v3M20 12v-2a2 2 0 00-2-2' },
  { label: 'Muebles', icon: 'M3 9h18v6H5a2 2 0 01-2-2V9zM3 9V7a2 2 0 012-2h14a2 2 0 012 2v2M5 15v3M19 15v3' },
  { label: 'Hogar', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM9 22V12h6v10' },
  { label: 'Fin de semana', icon: 'M4 21h16M6 21V10l6-6 6 6v11M10 21v-6h4v6' },
  { label: 'Experiencias', icon: 'M12 2C8 2 5 5.5 5 9.5 5 15 12 22 12 22s7-7 7-12.5C19 5.5 16 2 12 2zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' },
  { label: 'Fondos en efectivo', icon: 'M20 12a8 8 0 11-16 0 8 8 0 0116 0zM12 8v8M9 10c0-1.2 1.2-2 3-2s3 .8 3 2-1.2 1.6-3 2-3 .8-3 2 1.2 2 3 2 3-.8 3-2' },
]

export default function Regalos({ weddingInfo }: Props) {
  const [tab, setTab] = useState(TABS[0])
  const [gifts, setGifts] = useState(CATALOG)
  const [added, setAdded] = useState<Set<string>>(new Set(gifts.filter(g => g.reserved).map(g => g.id)))
  const reserved = gifts.filter(g => g.reserved).length

  function toggleAdded(id: string) {
    setAdded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Lista de regalos</h1>
      <p style={{ fontSize: 12, color: MUTE, marginBottom: 16 }}>{reserved}/{gifts.length} reservados por vuestros invitados</p>

      <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #ECE9E4', marginBottom: 20, overflowX: 'auto' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            padding: '0 0 10px', fontSize: 13, fontFamily: F,
            color: tab === t ? INK : MUTE, fontWeight: tab === t ? 600 : 400,
            borderBottom: tab === t ? '2px solid #8b5f3e' : '2px solid transparent'
          }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Añadir regalos' && (
        <>
          {/* CATEGORIAS estilo proveedores */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
            {CATEGORIES.map(c => (
              <div key={c.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', flexShrink: 0 }}>
                <div style={{ width: 46, height: 46, borderRadius: '50%', border: '1.3px solid #8b5f3e', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#8b5f3e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg>
                </div>
                <span style={{ fontSize: 10.5, color: MUTE, whiteSpace: 'nowrap' }}>{c.label}</span>
              </div>
            ))}
          </div>

          {/* PORTADA */}
          <div style={{ border: '1.5px dashed #DDD8D0', borderRadius: 16, padding: '40px 24px', textAlign: 'center', marginBottom: 28, background: '#FBF9F5' }}>
            <p style={{ fontFamily: F, fontSize: 24, color: INK, marginBottom: 6 }}>
              {weddingInfo.partner1 || 'Vosotros'} &amp; {weddingInfo.partner2 || 'dos'}
            </p>
            <p style={{ fontSize: 12, color: MUTE, marginBottom: 16 }}>{weddingInfo.date ? new Date(weddingInfo.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Fecha por confirmar'}</p>
            <button style={{ border: '1px solid #ECE9E4', background: 'white', borderRadius: 999, padding: '8px 18px', fontSize: 11.5, color: INK, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7l2-3h4l2 3" /></svg>
              Subir foto
            </button>
          </div>

          {/* INSTANT REGISTRY */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
            <p style={{ fontFamily: F, fontSize: 18, color: INK }}>Lista instantánea</p>
            <p style={{ fontSize: 11, color: MUTE }}>Con un clic añadid nuestras selecciones más populares.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 12 }}>
            {gifts.map(g => (
              <div key={g.id} onClick={() => toggleAdded(g.id)} style={{ border: '1px solid #ECE9E4', borderRadius: 16, overflow: 'hidden', background: 'white', cursor: 'pointer' }}>
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img src={g.img} alt={g.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute', top: 8, left: 8, width: 22, height: 22, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: added.has(g.id) ? '#241c17' : 'rgba(255,255,255,0.9)', border: added.has(g.id) ? 'none' : '1px solid #DDD8D0'
                  }}>
                    {added.has(g.id) && <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </span>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: INK, marginBottom: 4 }}>{g.name}</p>
                  <p style={{ fontFamily: F, fontSize: 16, color: INK }}>{g.price} €</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 10.5, color: MUTE, marginBottom: 28 }}>{added.size} de {gifts.length} seleccionados para vuestra lista</p>
        </>
      )}

      {tab !== 'Añadir regalos' && (
        <div style={{ background: '#F7F4EF', borderRadius: 16, padding: '40px 24px', textAlign: 'center', marginBottom: 24 }}>
          <p style={{ fontFamily: F, fontSize: 18, color: INK, marginBottom: 6 }}>{tab}</p>
          <p style={{ fontSize: 12, color: MUTE }}>Muy pronto podréis gestionar esto desde aquí.</p>
        </div>
      )}

      <div style={{ background: 'linear-gradient(135deg, #F4EFE8, #EFE6F5)', border: `1.5px solid ${BLUE}`, borderRadius: 16, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <p style={{ fontFamily: F, fontSize: 17, color: INK, marginBottom: 4 }}>Compartid vuestra lista</p>
          <p style={{ fontSize: 11.5, color: MUTE }}>Enviad el enlace a vuestros invitados para que reserven un regalo.</p>
        </div>
        <button style={{ background: '#8b5f3e', color: 'white', border: 'none', borderRadius: 999, padding: '10px 20px', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Copiar enlace
        </button>
      </div>

      <p style={{ fontFamily: F, fontSize: 18, color: INK, marginBottom: 12 }}>Vuestra lista</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {gifts.filter(g => added.has(g.id)).length === 0 ? (
          <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '30px 0', gridColumn: '1/-1' }}>Aún no habéis añadido regalos.</p>
        ) : gifts.filter(g => added.has(g.id)).map(g => (
          <div key={g.id} style={{ border: '1px solid #ECE9E4', borderRadius: 16, overflow: 'hidden', background: 'white' }}>
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
              <img src={g.img} alt={g.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {g.reserved && (
                <span style={{ position: 'absolute', top: 8, left: 8, background: '#D9E8D9', color: '#3A6B3A', fontSize: 10, fontWeight: 600, borderRadius: 999, padding: '3px 10px' }}>
                  Reservado
                </span>
              )}
            </div>
            <div style={{ padding: '12px 14px' }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: INK, marginBottom: 4 }}>{g.name}</p>
              <p style={{ fontFamily: F, fontSize: 16, color: INK }}>{g.price} €</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
