import Link from 'next/link'

const F = "'Cormorant Garamond',serif"
const BLUE = '#6E8FC9'
const INK = '#2C3E5C'
const MUTE = '#7A93B5'

const FEATURES = [
  { t: 'Listas de tareas', d: 'Checklists inteligentes adaptados a vuestra fecha.' },
  { t: 'Control de presupuesto', d: 'Cada gasto bajo control, sin sorpresas.' },
  { t: 'Gestión de invitados', d: 'RSVPs, menús y mesas en un solo lugar.' },
  { t: 'Plano de mesas', d: 'Distribuid a vuestros invitados fácilmente.' },
  { t: 'Cronograma', d: 'Cuenta atrás e hitos importantes.' },
  { t: 'Proveedores', d: 'Guardad y gestionad a vuestro equipo.' },
]

export default function Home() {
  return (
    <main style={{ background: '#F9F8F6', fontFamily: "'Inter',sans-serif", minHeight: '100vh' }}>

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', background: '#F9F8F6' }}>
        <div style={{ fontFamily: F, fontSize: 22, fontStyle: 'italic', fontWeight: 700, color: INK }}>vowed</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 13, color: INK }}>
          <span>Funciones</span>
          <span>Precios</span>
          <span>Sobre nosotros</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/dashboard" style={{ fontSize: 13, color: INK }}>Acceder</Link>
          <Link href="/dashboard" style={{ background: BLUE, color: 'white', borderRadius: 999, padding: '10px 22px', fontSize: 13, fontWeight: 500 }}>Empezar gratis</Link>
        </div>
      </nav>

      <section style={{ textAlign: 'center', padding: '60px 24px 40px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', border: '1px solid #E5ECF5', borderRadius: 999, padding: '7px 18px', marginBottom: 32 }}>
          <span style={{ color: BLUE, fontSize: 13 }}>✦</span>
          <span style={{ fontSize: 12, color: INK }}>Ahora, un organizador de bodas completo</span>
        </div>

        <h1 style={{ fontFamily: F, fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 500, color: INK, lineHeight: 1.18, marginBottom: 24 }}>
          Organizador de Boda Gratuito —<br />
          <span style={{ color: BLUE, fontStyle: 'italic' }}>Presupuesto, Invitados & Mesas</span>
        </h1>

        <p style={{ fontSize: 15, color: MUTE, maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.85 }}>
          Planificad toda vuestra boda con calma. Listas de tareas, control de presupuesto, gestión de invitados, mesas, cronograma y proveedores — todo en un solo lugar, sin necesidad de registro.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <Link href="/dashboard" style={{ background: BLUE, color: 'white', borderRadius: 999, padding: '16px 36px', fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            Empezar a planificar gratis <span>→</span>
          </Link>
          <Link href="/dashboard" style={{ background: 'white', border: '1px solid #E5ECF5', color: INK, borderRadius: 999, padding: '15px 32px', fontSize: 14 }}>
            Ver demo
          </Link>
        </div>
      </section>

      <section style={{ padding: '0 48px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ border: '1px solid #E5ECF5', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 60px rgba(60,80,120,0.08)' }}>
          <img src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1400&q=80" alt="Boda" style={{ width: '100%', height: 400, objectFit: 'cover', display: 'block' }} />
        </div>
      </section>

      <section style={{ background: '#F0F3F8', padding: '16px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          {['Sin registro obligatorio', 'Todo en un solo lugar', 'Completamente gratis', 'Planificad a vuestro ritmo'].map(t => (
            <div key={t} style={{ fontSize: 12, color: INK, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: BLUE }}>♡</span>{t}
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 48px', background: 'white' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: F, fontSize: 36, fontWeight: 500, color: INK, lineHeight: 1.3, marginBottom: 12 }}>
              Todas las herramientas que necesitáis,<br />
              todo en un <em style={{ color: BLUE, fontWeight: 400 }}>lugar precioso</em> ♡
            </h2>
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

      <section style={{ padding: '60px 48px 80px', textAlign: 'center', background: '#F9F8F6' }}>
        <p style={{ fontFamily: F, fontSize: 26, color: INK, lineHeight: 1.5, marginBottom: 6 }}>Vuestra historia de amor es única.</p>
        <p style={{ fontFamily: F, fontSize: 26, fontStyle: 'italic', color: BLUE, lineHeight: 1.5 }}>Vuestra boda también debería serlo.</p>
        <span style={{ color: BLUE, fontSize: 14, display: 'inline-block', marginTop: 10 }}>♡</span>
      </section>

      <footer style={{ padding: '28px 48px', borderTop: '1px solid #EEF2F7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white' }}>
        <div style={{ fontFamily: F, fontSize: 20, fontStyle: 'italic', fontWeight: 700, color: INK }}>vowed</div>
        <p style={{ fontSize: 12, color: MUTE }}>Hecho con ♡ para parejas que quieren disfrutar del proceso</p>
        <p style={{ fontSize: 11, color: MUTE }}>2025</p>
      </footer>
    </main>
  )
}
