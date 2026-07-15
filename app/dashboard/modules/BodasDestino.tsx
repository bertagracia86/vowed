import { F, BLUE, INK, MUTE, TEXT_PRIMARY, TEXT_SECONDARY } from '@/lib/constants'

const DESTINOS = [
  { name: 'Costa Amalfitana, Italia', desc: 'Bodas frente al mar con encanto mediterráneo.', img: '/showcase-2.png' },
  { name: 'Provenza, Francia', desc: 'Campos de lavanda y fincas de piedra centenaria.', img: '/showcase-1.png' },
  { name: 'Algarve, Portugal', desc: 'Acantilados dorados y atardeceres inolvidables.', img: '/showcase-3.png' },
]

export default function BodasDestino() {
  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: TEXT_PRIMARY, marginBottom: 4 }}>Bodas de destino</h1>
      <p style={{ fontSize: 12, color: TEXT_SECONDARY, marginBottom: 24 }}>Todo lo que necesitáis para organizar una boda fuera de casa.</p>

      <div style={{ background: 'linear-gradient(135deg, #F4EFE8, #EFE6F5)', border: `1.5px solid ${BLUE}`, borderRadius: 16, padding: '24px 28px', marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div>
          <p style={{ fontFamily: F, fontSize: 20, color: TEXT_PRIMARY, marginBottom: 6 }}>¿Buscáis wedding planner en destino?</p>
          <p style={{ fontSize: 12, color: TEXT_SECONDARY }}>Os conectamos con profesionales locales especializados en bodas internacionales.</p>
        </div>
        <button style={{ background: '#898a76', color: 'white', border: 'none', borderRadius: 999, padding: '12px 22px', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Solicitar ayuda
        </button>
      </div>

      <p style={{ fontFamily: F, fontSize: 18, color: TEXT_PRIMARY, marginBottom: 12 }}>Destinos populares</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {DESTINOS.map(d => (
          <div key={d.name} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #ECE9E4', background: 'white', cursor: 'pointer' }}>
            <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <img src={d.img} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '14px 16px' }}>
              <p style={{ fontFamily: F, fontSize: 16, color: TEXT_PRIMARY, marginBottom: 4 }}>{d.name}</p>
              <p style={{ fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.5 }}>{d.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
