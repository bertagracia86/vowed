'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE } from '@/lib/constants'

interface Gift { id: string; name: string; price: number; img: string; reserved: boolean }

const CATALOG: Gift[] = [
  { id: '1', name: 'Vajilla de porcelana (12 piezas)', price: 180, img: 'https://images.unsplash.com/photo-1578749556568-bc2c481b1069?w=400&q=80', reserved: false },
  { id: '2', name: 'Set de copas de cristal', price: 65, img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80', reserved: true },
  { id: '3', name: 'Cafetera espresso', price: 220, img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80', reserved: false },
  { id: '4', name: 'Ropa de cama de lino', price: 95, img: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&q=80', reserved: false },
  { id: '5', name: 'Batidora de cocina', price: 140, img: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80', reserved: false },
  { id: '6', name: 'Aportación luna de miel', price: 50, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80', reserved: false },
]

export default function Regalos() {
  const [gifts] = useState(CATALOG)
  const reserved = gifts.filter(g => g.reserved).length

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Lista de regalos</h1>
      <p style={{ fontSize: 12, color: MUTE, marginBottom: 20 }}>{reserved}/{gifts.length} reservados por vuestros invitados</p>

      <div style={{ background: 'linear-gradient(135deg, #F4EFE8, #EFE6F5)', border: `1.5px solid ${BLUE}`, borderRadius: 16, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <p style={{ fontFamily: F, fontSize: 17, color: INK, marginBottom: 4 }}>Compartid vuestra lista</p>
          <p style={{ fontSize: 11.5, color: MUTE }}>Enviad el enlace a vuestros invitados para que reserven un regalo.</p>
        </div>
        <button style={{ background: '#8b5f3e', color: 'white', border: 'none', borderRadius: 999, padding: '10px 20px', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Copiar enlace
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {gifts.map(g => (
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
