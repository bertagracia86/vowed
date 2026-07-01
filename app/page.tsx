'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const F = "'Cormorant Garamond',serif"
const BLUE = '#8ec5f7'
const INK = '#1a1a2e'
const MUTE = '#6b7280'
const BG = '#FFFFFF'

export default function Home() {
  const heroImgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.reveal, .reveal-l, .reveal-r, .reveal-scale').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.88) el.classList.add('in')
    })
    const handleScroll = () => {
      document.querySelectorAll<HTMLElement>('.reveal, .reveal-l, .reveal-r, .reveal-scale').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.88) el.classList.add('in')
      })
      const nav = document.getElementById('main-nav')
      if (nav) nav.style.background = window.scrollY > 40 ? 'rgba(255,255,255,0.97)' : 'transparent'
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main style={{ background: BG, fontFamily: "'Inter',sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#8ec5f7;padding:12px;}
        main{border-radius:24px;overflow:hidden;}
        .reveal{opacity:0;transform:translateY(36px);transition:opacity 0.85s cubic-bezier(.16,1,.3,1),transform 0.85s cubic-bezier(.16,1,.3,1)}
        .reveal.in{opacity:1;transform:translateY(0)}
        .reveal-l{opacity:0;transform:translateX(-36px);transition:opacity 0.85s cubic-bezier(.16,1,.3,1),transform 0.85s cubic-bezier(.16,1,.3,1)}
        .reveal-l.in{opacity:1;transform:translateX(0)}
        .reveal-r{opacity:0;transform:translateX(36px);transition:opacity 0.85s cubic-bezier(.16,1,.3,1),transform 0.85s cubic-bezier(.16,1,.3,1)}
        .reveal-r.in{opacity:1;transform:translateX(0)}
        .reveal-scale{opacity:0;transform:scale(0.96);transition:opacity 0.85s cubic-bezier(.16,1,.3,1),transform 0.85s cubic-bezier(.16,1,.3,1)}
        .reveal-scale.in{opacity:1;transform:scale(1)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        .a1{animation:fadeUp 0.9s 0.1s both}
        .a2{animation:fadeUp 0.9s 0.25s both}
        .a3{animation:fadeUp 0.9s 0.4s both}
        .btn-blue{background:#8ec5f7;color:white;border:none;border-radius:999px;padding:13px 28px;font-size:13px;font-weight:500;cursor:pointer;display:inline-block;text-decoration:none;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 4px 18px rgba(142,197,247,0.4)}
        .btn-blue:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(142,197,247,0.55)}
        .btn-dark{background:#1a1a2e;color:white;border:none;border-radius:999px;padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer;display:inline-block;text-decoration:none;transition:opacity 0.2s}
        .btn-dark:hover{opacity:0.85}
        .nav-link{font-size:13px;color:#6b7280;cursor:pointer;transition:color 0.2s;text-decoration:none}
        .nav-link:hover{color:#1a1a2e}
        .feat-img-card{border-radius:16px;overflow:hidden;position:relative;cursor:pointer}
        .feat-img-card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s cubic-bezier(.16,1,.3,1)}
        .feat-img-card:hover img{transform:scale(1.05)}
        .feat-img-card .card-label{position:absolute;bottom:0;left:0;right:0;padding:20px 18px 16px;background:linear-gradient(to top,rgba(0,0,0,0.55),transparent)}
        .pill-tag{display:inline-block;background:rgba(142,197,247,0.15);color:#5aacf0;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;border-radius:999px;padding:5px 14px}
        .review-card{background:#F8FBFF;border:1px solid rgba(142,197,247,0.2);border-radius:20px;padding:28px 24px}
        @keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .ticker-track{display:flex;gap:28px;animation:tick 28s linear infinite;width:max-content;align-items:center}
      `}</style>

      {/* NAV */}
      <nav id="main-nav" style={{ position: 'sticky', top: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', height: 64, transition: 'background 0.3s', backdropFilter: 'blur(16px)' }}>
        <Link href="/"><img src="/logo.png" alt="mylov3" style={{ height: 26, display: 'block' }} /></Link>
        <div style={{ display: 'flex', gap: 36 }}>
          {['Funciones', 'Precios', 'Inspiración', 'Sobre nosotros'].map(l => (
            <a key={l} href="#" className="nav-link">{l}</a>
          ))}
        </div>
        <Link href="/dashboard" className="btn-blue" style={{ padding: '10px 24px', fontSize: 13 }}>Empezar gratis</Link>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: 'calc(100vh - 64px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', padding: '60px 64px 80px', background: '#fff' }}>
        <div>
          <h1 className="a1" style={{ fontFamily: F, fontSize: 'clamp(48px,5.5vw,78px)', fontWeight: 600, lineHeight: 1.05, color: INK, marginBottom: 20 }}>
            La planificación de vuestra boda empieza aquí
          </h1>
          <p className="a2" style={{ fontSize: 16, color: MUTE, lineHeight: 1.85, maxWidth: 420, marginBottom: 40 }}>
            Desde la finca y el catering hasta la web de boda y los invitados — mylov3 está con vosotros en cada paso del camino.
          </p>
          <div className="a3" style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard" className="btn-blue" style={{ fontSize: 15, padding: '14px 32px', fontWeight: 600 }}>¡Empezamos!</Link>
            <Link href="/dashboard" className="btn-dark">Ver demo</Link>
          </div>
        </div>

        <div className="reveal-r" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div ref={heroImgRef} style={{ position: 'relative' }}>
            <div style={{ width: 'clamp(320px,42vw,520px)', height: 'clamp(320px,42vw,520px)', borderRadius: '50%', border: `10px solid ${BLUE}`, overflow: 'hidden', boxShadow: '0 32px 80px rgba(142,197,247,0.25)' }}>
              <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80" alt="boda" style={{ width: '100%', height: '110%', objectFit: 'cover', marginTop: '-5%' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 32, left: -24, background: 'white', borderRadius: 16, padding: '14px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 24 }}>♡</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: INK }}>+2.400 parejas</p>
                <p style={{ fontSize: 11, color: MUTE }}>ya planificaron su boda</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ICON ROW */}
      <div style={{ background: 'white', borderTop: '1px solid rgba(142,197,247,0.15)', borderBottom: '1px solid rgba(142,197,247,0.15)' }}>
        <div className="reveal-scale" style={{ maxWidth: 900, margin: '0 auto', padding: '56px 48px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, textAlign: 'center' }}>
          {[
            { icon: '☑', t: 'Organiza', d: 'Gestiona invitados, tareas, presupuesto y más.' },
            { icon: '📅', t: 'Planifica', d: 'Crea tu línea de tiempo y no olvides nada.' },
            { icon: '♡', t: 'Comparte', d: 'Colabora con tu pareja, familia o wedding planner.' },
            { icon: '✦', t: 'Disfruta', d: 'Menos estrés, más momentos inolvidables.' },
          ].map(f => (
            <div key={f.t} style={{ padding: '24px 16px' }}>
              <div style={{ fontSize: 28, marginBottom: 14, color: BLUE }}>{f.icon}</div>
              <p style={{ fontFamily: F, fontSize: 18, color: INK, marginBottom: 8 }}>{f.t}</p>
              <p style={{ fontSize: 12, color: MUTE, lineHeight: 1.7 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES GRID */}
      <div id="funciones" style={{ background: '#F8FBFF', padding: '100px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'center' }}>
          <div className="reveal-l">
            <span className="pill-tag" style={{ marginBottom: 20, display: 'inline-block' }}>Todo bajo control</span>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(36px,4vw,54px)', fontWeight: 400, color: INK, lineHeight: 1.1, marginBottom: 12 }}>Gestiona cada detalle</h2>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(36px,4vw,54px)', fontWeight: 400, fontStyle: 'italic', color: BLUE, lineHeight: 1.1, marginBottom: 24 }}>con facilidad</h2>
            <p style={{ fontSize: 14, color: MUTE, lineHeight: 1.85, marginBottom: 36 }}>Herramientas intuitivas para que disfrutes del proceso y vivas el día más importante de tu vida sin preocupaciones.</p>
            <Link href="/dashboard" className="btn-blue">Descubre todas las funciones</Link>
          </div>
          <div className="reveal-r" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '180px 180px', gap: 10 }}>
            {[
              { label: 'Invitados', sub: 'Confirma asistencia y organiza mesas.', img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80' },
              { label: 'Presupuesto', sub: 'Controla gastos y mantente al día.', img: 'https://images.unsplash.com/photo-1546032996-6098e9b04e0a?w=400&q=80' },
              { label: 'Proveedores', sub: 'Encuentra y gestiona a tus proveedores.', img: 'https://images.unsplash.com/photo-1622037022824-0c71d511ec02?w=400&q=80' },
              { label: 'Tareas', sub: 'Crea tu lista y marca cada paso.', img: 'https://images.unsplash.com/photo-1612630440053-cdc4458c79fd?w=400&q=80' },
              { label: 'Cronograma', sub: 'Planifica cada momento de tu boda.', img: 'https://images.unsplash.com/photo-1595407753234-0882f1e76e26?w=400&q=80' },
              { label: 'Inspiración', sub: 'Guarda ideas y crea tu boda ideal.', img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80' },
            ].map(f => (
              <div key={f.label} className="feat-img-card">
                <img src={f.img} alt={f.label} />
                <div className="card-label">
                  <p style={{ fontFamily: F, fontSize: 15, color: 'white', fontWeight: 500, marginBottom: 2 }}>{f.label}</p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(142,197,247,0.15)', borderBottom: '1px solid rgba(142,197,247,0.15)', padding: '16px 0', background: 'white' }}>
        <div className="ticker-track">
          {['Tareas','♡','Presupuesto','♡','Invitados','♡','Mesas','♡','Cronograma','♡','Proveedores','♡','Web de boda','♡','Notas','♡','Inspiración','♡','Tareas','♡','Presupuesto','♡','Invitados','♡','Mesas','♡','Cronograma','♡','Proveedores','♡','Web de boda','♡','Notas','♡','Inspiración','♡'].map((t, i) => (
            <span key={i} style={{ fontSize: 11, color: t === '♡' ? BLUE : '#C0BAB2', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ background: 'white', padding: '100px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 56 }}>
            <span className="pill-tag" style={{ marginBottom: 20, display: 'inline-block' }}>Parejas que ya vivieron su día</span>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 400, color: INK, lineHeight: 1.1, marginBottom: 8 }}>Historias reales,</h2>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 400, fontStyle: 'italic', color: BLUE, lineHeight: 1.1 }}>momentos inolvidables</h2>
          </div>
          <div className="reveal-scale" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { q: 'mylov3 hizo que todo fuera tan fácil y organizado. Pudimos disfrutar cada momento.', n: 'María & Lucas', d: 'Se casaron en Abril 2024', img: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=100&q=80' },
              { q: 'La mejor herramienta para planificar nuestra boda. ¡No podemos imaginar haberlo hecho sin mylov3!', n: 'Ana & Diego', d: 'Se casaron en Junio 2024', img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=100&q=80' },
              { q: 'Todo en un solo lugar, hermoso, práctico y super completo.', n: 'Sofía & Tomás', d: 'Se casaron en Mayo 2024', img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=100&q=80' },
            ].map(r => (
              <div key={r.n} className="review-card">
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: BLUE, fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ fontSize: 14, color: INK, lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic' }}>"{r.q}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={r.img} alt={r.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: INK }}>{r.n}</p>
                    <p style={{ fontSize: 11, color: MUTE }}>{r.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div style={{ margin: '0 32px 32px', borderRadius: 20, overflow: 'hidden', position: 'relative', minHeight: 340, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)' }} />
        <div className="reveal" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '60px 48px' }}>
          <div style={{ color: BLUE, marginBottom: 16, fontSize: 20 }}>♡</div>
          <h2 style={{ fontFamily: F, fontSize: 'clamp(28px,4vw,52px)', fontWeight: 400, color: INK, lineHeight: 1.15, marginBottom: 8 }}>Tu historia de amor merece</h2>
          <h2 style={{ fontFamily: F, fontSize: 'clamp(28px,4vw,52px)', fontWeight: 400, fontStyle: 'italic', color: BLUE, lineHeight: 1.15, marginBottom: 36 }}>el mejor comienzo</h2>
          <Link href="/dashboard" className="btn-blue" style={{ fontSize: 14, padding: '14px 36px' }}>Empieza a planificar gratis</Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ padding: '28px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white' }}>
        <img src="/logo.png" alt="mylov3" style={{ height: 24, display: 'block' }} />
        <p style={{ fontSize: 12, color: '#B0AAA3' }}>Hecho con ♡ para parejas que quieren disfrutar del proceso</p>
        <p style={{ fontSize: 11, color: '#D0CCC6' }}>2025</p>
      </footer>
    </main>
  )
}
