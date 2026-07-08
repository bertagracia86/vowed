import { F, BLUE, INK, MUTE } from '@/lib/constants'

const DESTINOS = [
  { name: 'Santorini, Grecia', price: 'Desde 1.400 €', img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=500&q=80' },
  { name: 'Maldivas', price: 'Desde 2.900 €', img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=500&q=80' },
  { name: 'Kioto, Japón', price: 'Desde 2.100 €', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80' },
  { name: 'Toscana, Italia', price: 'Desde 1.200 €', img: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=500&q=80' },
]

export default function LunasMiel() {
  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Lunas de miel</h1>
      <p style={{ fontSize: 12, color: MUTE, marginBottom: 24 }}>Inspiración y ofertas para vuestro viaje de luna de miel.</p>

      <div style={{ background: '#F7F4EF', borderRadius: 16, padding: '28px 24px', textAlign: 'center', marginBottom: 28 }}>
        <p style={{ fontFamily: F, fontSize: 20, color: INK, marginBottom: 8 }}>¿A dónde os apetece escaparos?</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', maxWidth: 480, margin: '0 auto' }}>
          <input placeholder="Playa, montaña, ciudad..." style={{ flex: 1, border: '1px solid #ECE9E4', borderRadius: 999, padding: '11px 18px', fontSize: 13, outline: 'none' }} />
          <button style={{ background: '#241c17', color: 'white', border: 'none', borderRadius: 999, padding: '11px 22px', fontSize: 13, cursor: 'pointer' }}>Buscar</button>
        </div>
      </div>

      <p style={{ fontFamily: F, fontSize: 18, color: INK, marginBottom: 12 }}>Destinos destacados</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {DESTINOS.map(d => (
          <div key={d.name} style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid #ECE9E4', background: 'white', cursor: 'pointer' }}>
            <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
              <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '12px 14px' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 2 }}>{d.name}</p>
              <p style={{ fontSize: 11, color: MUTE }}>{d.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
