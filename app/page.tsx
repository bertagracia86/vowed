import Link from 'next/link'

const F = "'Cormorant Garamond',serif"
const BLUE = '#6E8FC9'
const INK = '#2C3E5C'
const MUTE = '#7A93B5'

const FEATURES = [
  { t: 'Checklist inteligente', d: 'Tareas ordenadas y adaptadas a vuestra fecha.' },
  { t: 'Control de presupuesto', d: 'Cada gasto bajo control, sin sorpresas.' },
  { t: 'Gestión de invitados', d: 'RSVPs, menús y mesas en un solo lugar.' },
  { t: 'Plano de mesas', d: 'Distribuid a vuestros invitados fácilmente.' },
  { t: 'Cronograma', d: 'Cuenta atrás e hitos importantes.' },
  { t: 'Proveedores', d: 'Guardad y gestionad a vuestro equipo.' },
]

export default function Home() {
  return (
    <main style={{ background: 'white', fontFamily: "'Inter',sans-serif" }}>

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 56px', background: 'white' }}>
        <div style={{ fontFamily: F, fontSize: 26, fontStyle: 'italic', fontWeight: 700, color: BLUE }}>vowed</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36, fontSize: 13, color: INK }}>
          <span style={{ cursor: 'pointer' }}>Funciones</span>
          <span style={{ cursor: 'pointer' }}>Precios</span>
          <span style={{ cursor: 'pointer' }}>Inspiración</span>
          <span style={{ cursor: 'pointer' }}>Sobre nosotros</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/dashboard" style={{ fontSize: 13, color: INK }}>Acceder</Link>
          <Link href="/dashboard" style={{ background: BLUE, color: 'white', borderRadius: 999, padding: '11px 26px', fontSize: 13, fontWeight: 500 }}>
            Empezar gratis
          </Link>
        </div>
      </nav>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', minHeight: 540, background: '#FBF8F4' }}>
        <div style={{ padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', border: '1px solid #E5ECF5', borderRadius: 999, padding: '8px 20px', marginBottom: 28, width: 'fit-content' }}>
            <span style={{ color: BLUE, fontSize: 13 }}>✦</span>
            <span style={{ fontSize: 12, color: INK }}>Ahora, un organizador de bodas completo</span>
          </div>
          <h1 style={{ fontFamily: F, fontSize: 50, fontWeight: 500, color: INK, lineHeight: 1.12, marginBottom: 4 }}>Sed vuestro propio</h1>
          <h1 style={{ fontFamily: F, fontSize: 54, fontStyle: 'italic', fontWeight: 400, color: BLUE, lineHeight: 1.12, marginBottom: 12 }}>wedding planner</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '10px 0 18px' }}>
            <div style={{ width: 36, height: 1, background: '#DCE7F4' }} />
            <span style={{ color: BLUE }}>♡</span>
            <div style={{ width: 36, height: 1, background: '#DCE7F4' }} />
          </div>
          <p style={{ fontSize: 14, color: MUTE, lineHeight: 1.85, marginBottom: 32, maxWidth: 360 }}>
            Planificad una boda que sea muy vosotros. Herramientas bonitas, planificación inteligente e inspiración, todo en un solo lugar.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/dashboard" style={{ background: BLUE, color: 'white', borderRadius: 999, padding: '14px 30px', fontSize: 13, fontWeight: 500 }}>
              Empezar a planificar
            </Link>
            <Link href="/dashboard" style={{ border: '1.5px solid #DCE7F4', color: BLUE, borderRadius: 999, padding: '13px 26px', fontSize: 13, fontWeight: 500 }}>
              Ver demo ♡
            </Link>
          </div>
        </div>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80" alt="boda" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
          <div style={{ position: 'absolute', top: 32, right: 32, width: 240, background: 'white', borderRadius: 18, padding: '22px', boxShadow: '0 16px 40px rgba(60,80,120,0.15)' }}>
            <p style={{ fontFamily: F, fontSize: 17, fontWeight: 500, color: INK, marginBottom: 10 }}>Vuestro día, a vuestra manera</p>
            <div style={{ height: 1, background: '#EEF2F7', marginBottom: 10 }} />
            {['Listas inteligentes', 'Control de presupuesto', 'Gestión de invitados', 'Tablero de inspiración', 'Cronograma y avisos'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', fontSize: 12, color: INK }}>
                <span style={{ width: 14, height: 14, border: `1.3px solid ${BLUE}`, borderRadius: 4, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: BLUE, fontSize: 9 }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#F4F7FB', padding: '18px 56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          {['Sin registro obligatorio', 'Todo en un solo lugar', 'Completamente gratis', 'Planificad a vuestro ritmo'].map(t => (
            <div key={t} style={{ fontSize: 12, color: INK, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: BLUE }}>♡</span>{t}
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 56px', background: 'white' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: F, fontSize: 36, fontWeight: 500, color: INK, lineHeight: 1.3, marginBottom: 12 }}>
              Todas las herramientas que necesitáis,<br />
              todo en un <em style={{ color: BLUE, fontWeight: 400 }}>lugar precioso</em> ♡
            </h2>
            <p style={{ fontSize: 14, color: MUTE, maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
              Sin hojas de cálculo complicadas ni apps separadas.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {FEATURES.map(f => (
              <div key={f.t} style={{ border: '1px solid #EEF2F7', borderRadius: 16, padding: '24px 26px' }}>
                <h3 style={{ fontFamily: F, fontSize: 19, fontWeight: 500, color: INK, marginBottom: 8 }}>{f.t}</h3>
                <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.75 }}>{f.d}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/dashboard" style={{ background: BLUE, color: 'white', borderRadius: 999, padding: '14px 36px', fontSize: 13, fontWeight: 500 }}>
              Probar ahora gratis
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 56px 80px', textAlign: 'center', background: '#FBF8F4' }}>
        <p style={{ fontFamily: F, fontSize: 26, color: INK, lineHeight: 1.5, marginBottom: 6 }}>Vuestra historia de amor es única.</p>
        <p style={{ fontFamily: F, fontSize: 26, fontStyle: 'italic', color: BLUE, lineHeight: 1.5 }}>Vuestra boda también debería serlo.</p>
        <span style={{ color: BLUE, fontSize: 14, display: 'inline-block', marginTop: 10 }}>♡</span>
      </section>

      <footer style={{ padding: '28px 56px', borderTop: '1px solid #EEF2F7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: F, fontSize: 20, fontStyle: 'italic', fontWeight: 700, color: BLUE }}>vowed</div>
        <p style={{ fontSize: 12, color: MUTE }}>Hecho con ♡ para parejas que quieren disfrutar del proceso</p>
        <p style={{ fontSize: 11, color: MUTE }}>2025</p>
      </footer>
    </main>
  )
}
