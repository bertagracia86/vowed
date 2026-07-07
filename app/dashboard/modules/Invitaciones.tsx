import { F, BLUE, INK, MUTE } from '@/lib/constants'

const TEMPLATES = [
  { name: 'Jardín de olivos', price: '12 €', style: 'Bohemio', img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80' },
  { name: 'Lino y oro', price: '14 €', style: 'Elegante', img: 'https://images.unsplash.com/photo-1622037022824-0c71d511ec02?w=400&q=80' },
  { name: 'Acuarela floral', price: '12 €', style: 'Romántico', img: 'https://images.unsplash.com/photo-1612630440053-cdc4458c79fd?w=400&q=80' },
  { name: 'Minimal clásica', price: '10 €', style: 'Minimalista', img: 'https://images.unsplash.com/photo-1595407753234-0882f1e76e26?w=400&q=80' },
]

export default function Invitaciones() {
  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Invitaciones</h1>
      <p style={{ fontSize: 12, color: MUTE, marginBottom: 24 }}>Plantillas listas para personalizar. Pago único, descarga digital.</p>

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
    </div>
  )
}
