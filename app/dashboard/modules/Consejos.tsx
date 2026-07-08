import { F, BLUE, INK, MUTE } from '@/lib/constants'

const ARTICLES = [
  { tag: 'Presupuesto', title: 'Cómo repartir el presupuesto de la boda sin sorpresas', img: '/presupuesto.png' },
  { tag: 'Invitados', title: '5 claves para elaborar la lista de invitados sin discusiones', img: '/invitados.png' },
  { tag: 'Proveedores', title: 'Preguntas imprescindibles antes de contratar un espacio', img: '/proveedores.png' },
  { tag: 'Papelería', title: 'Cuándo enviar las invitaciones (calendario paso a paso)', img: '/invitaciones.png' },
  { tag: 'Estilo', title: 'Tendencias de decoración para bodas de temporada', img: '/detalles.png' },
  { tag: 'Web de boda', title: 'Qué incluir en vuestra web para facilitar el RSVP', img: '/web-de-boda.png' },
]

export default function Consejos() {
  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Consejos de expertos</h1>
      <p style={{ fontSize: 12, color: MUTE, marginBottom: 24 }}>Ideas y consejos de wedding planners para cada etapa de la organización.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {ARTICLES.map(a => (
          <div key={a.title} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #ECE9E4', background: 'white', cursor: 'pointer' }}>
            <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
              <img src={a.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '14px 16px' }}>
              <span style={{ fontSize: 9.5, fontWeight: 700, color: '#8b5f3e', letterSpacing: 0.5, textTransform: 'uppercase' }}>{a.tag}</span>
              <p style={{ fontFamily: F, fontSize: 15, color: INK, lineHeight: 1.3, marginTop: 6 }}>{a.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
