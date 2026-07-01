'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const F = "'Cormorant Garamond',serif"
const BLUE = '#8ec5f7'
const INK = '#2C2A26'
const MUTE = '#8A8580'
const BG = '#FAFAF8'

export default function Home() {
  const heroImgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroImgRef.current) {
        heroImgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`
      }
      document.querySelectorAll<HTMLElement>('.par-bg').forEach(el => {
        const rect = el.parentElement!.getBoundingClientRect()
        el.style.transform = `translateY(${-rect.top * 0.25}px)`
      })
      document.querySelectorAll<HTMLElement>('.reveal, .reveal-l, .reveal-r, .reveal-scale').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
          el.classList.add('in')
        }
      })
      const nav = document.getElementById('main-nav')
      if (nav) nav.style.background = window.scrollY > 60
        ? 'rgba(250,250,248,0.96)' : 'transparent'
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main style={{ background: BG, fontFamily: "'Inter',sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');
        *{box-sizing:border-box}
        .reveal{opacity:0;transform:translateY(40px);transition:opacity 0.9s cubic-bezier(.16,1,.3,1),transform 0.9s cubic-bezier(.16,1,.3,1)}
        .reveal.in{opacity:1;transform:translateY(0)}
        .reveal-l{opacity:0;transform:translateX(-40px);transition:opacity 0.9s cubic-bezier(.16,1,.3,1),transform 0.9s cubic-bezier(.16,1,.3,1)}
        .reveal-l.in{opacity:1;transform:translateX(0)}
        .reveal-r{opacity:0;transform:translateX(40px);transition:opacity 0.9s cubic-bezier(.16,1,.3,1),transform 0.9s cubic-bezier(.16,1,.3,1)}
        .reveal-r.in{opacity:1;transform:translateX(0)}
        .reveal-scale{opacity:0;transform:scale(0.95);transition:opacity 0.9s cubic-bezier(.16,1,.3,1),transform 0.9s cubic-bezier(.16,1,.3,1)}
        .reveal-scale.in{opacity:1;transform:scale(1)}
        @keyframes heroUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        .h1{animation:heroUp 1s 0.1s both}
        .h2{animation:heroUp 1s 0.3s both}
        .h3{animation:heroUp 1s 0.5s both}
        .h4{animation:heroUp 1s 0.65s both}
        .h5{animation:heroUp 1s 0.8s both}
        @keyframes imgBlob{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}
        .hero-blob-anim{animation:imgBlob 1.2s 0.4s both}
        .feat-card{background:white;border:1px solid rgba(44,42,38,0.07);border-radius:20px;padding:28px 24px;transition:transform 0.3s,box-shadow 0.3s}
        .feat-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(142,197,247,0.15)}
        .btn-pill{background:#8ec5f7;color:white;border:none;border-radius:999px;padding:14px 32px;font-size:13px;font-weight:500;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 4px 18px rgba(142,197,247,0.35);display:inline-block;text-decoration:none}
        .btn-pill:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(142,197,247,0.5)}
        .nav-link{font-size:13px;color:#8A8580;cursor:pointer;transition:color 0.2s}
        .nav-link:hover{color:#2C2A26}
        @keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .ticker-track{display:flex;gap:32px;animation:tick 30s linear infinite;width:max-content}
        .split-img img{transition:transform 0.7s cubic-bezier(.16,1,.3,1)}
        .split-img:hover img{transform:scale(1.04)}
        .gal-item img{transition:transform 0.7s cubic-bezier(.16,1,.3,1)}
        .gal-item:hover img{transform:scale(1.05)}
        .pc-card{background:white;border:1px solid rgba(44,42,38,0.08);border-radius:20px;padding:48px 40px;transition:transform 0.3s}
        .pc-card:hover{transform:translateY(-3px)}
        .pc-btn-s{background:#8ec5f7;color:white;border:none;width:100%;padding:14px;border-radius:999px;font-size:13px;font-weight:500;cursor:pointer;transition:opacity 0.2s}
        .pc-btn-s:hover{opacity:0.85}
        .pc-btn-o{background:transparent;color:#8ec5f7;border:1px solid rgba(142,197,247,0.45);width:100%;padding:14px;border-radius:999px;font-size:13px;cursor:pointer;transition:background 0.2s}
        .pc-btn-o:hover{background:rgba(142,197,247,0.08)}
        .par-section{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;min-height:65vh}
        .par-bg{position:absolute;inset:0;will-change:transform}
        .par-bg img{width:100%;height:130%;object-fit:cover;display:block}
        .par-overlay{position:absolute;inset:0}
      `}</style>

      {/* NAV */}
      <nav id="main-nav" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 56px', height: 60, transition: 'background 0.4s', backdropFilter: 'blur(16px)' }}>
        <Link href="/">
          <img src="/logo.png" alt="mylov3" style={{ height: 28, display: 'block' }} />
        </Link>
        <div style={{ display: 'flex', gap: 36 }}>
          {['Funciones', 'Precios', 'Inspiración', 'Sobre nosotros'].map(l => (
            <span key={l} className="nav-link">{l}</span>
          ))}
        </div>
        <Link href="/dashboard" className="btn-pill" style={{ padding: '9px 22px', fontSize: 13 }}>Empezar gratis ♡</Link>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '130px 48px 80px', background: BG, position: 'relative' }}>
        <p className="h1" style={{ fontSize: 11, color: BLUE, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 24 }}>Organizador de bodas</p>
        <h1 className="h2" style={{ fontFamily: F, fontSize: 'clamp(52px,8vw,100px)', fontWeight: 300, lineHeight: 1.02, letterSpacing: '-0.025em', color: INK, marginBottom: 0 }}>PLANIFICAD</h1>
        <h1 className="h3" style={{ fontFamily: F, fontSize: 'clamp(52px,8vw,100px)', fontWeight: 300, lineHeight: 1.02, letterSpacing: '-0.025em', fontStyle: 'italic', color: BLUE, marginBottom: 0 }}>vuestra boda</h1>

        <div className="hero-blob-anim" style={{ margin: '32px auto', position: 'relative', zIndex: 2 }}>
          <div ref={heroImgRef} style={{ willChange: 'transform' }}>
            <div style={{ width: 'clamp(320px,55vw,640px)', height: 'clamp(240px,36vw,440px)', borderRadius: '60% 40% 55% 45% / 45% 55% 45% 55%', overflow: 'hidden', boxShadow: '0 32px 80px rgba(142,197,247,0.15)', margin: '0 auto' }}>
              <img src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80" alt="boda" style={{ width: '100%', height: '120%', objectFit: 'cover', marginTop: '-10%' }} />
            </div>
          </div>
        </div>

        <p className="h4" style={{ fontSize: 15, color: MUTE, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.9 }}>
          Herramientas bonitas para planificar el día más importante de vuestra vida. Todo en un solo lugar.
        </p>
        <div className="h5" style={{ display: 'flex', gap: 14, justifyContent: 'center', alignItems: 'center' }}>
          <Link href="/dashboard" className="btn-pill">Empezar a planificar</Link>
          <Link href="/dashboard" style={{ fontSize: 14, color: MUTE, borderBottom: '1px solid rgba(138,133,128,0.3)', paddingBottom: 2 }}>Ver demo ♡</Link>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(44,42,38,0.06)', borderBottom: '1px solid rgba(44,42,38,0.06)', padding: '14px 0', background: 'white' }}>
        <div className="ticker-track">
          {['Tareas','Presupuesto','Invitados','Mesas','Cronograma','Proveedores','Web de boda','Notas','Inspiración','Tareas','Presupuesto','Invitados','Mesas','Cronograma','Proveedores','Web de boda','Notas','Inspiración'].map((t, i) => (
            <span key={i} style={{ fontSize: 11, color: i % 2 === 1 ? BLUE : '#C0BAB2', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              {i % 2 === 1 ? '♡' : t}
            </span>
          ))}
        </div>
      </div>

      {/* FUNCIONES GRID */}
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '100px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56 }}>
          <div className="reveal-l">
            <p style={{ fontSize: 11, color: BLUE, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16 }}>Funciones</p>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(32px,4vw,54px)', fontWeight: 300, color: INK, lineHeight: 1.12 }}>Todo lo que necesitáis<br />para el gran día</h2>
          </div>
          <p className="reveal-r" style={{ fontSize: 14, color: MUTE, lineHeight: 1.85, maxWidth: 300, marginBottom: 4 }}>Sin hojas de cálculo.<br />Sin apps separadas. Sin estrés.</p>
        </div>
        <div className="reveal-scale" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {[
            { n: '01', t: 'Listas de tareas', d: 'Checklists ordenados y adaptados a vuestra fecha.' },
            { n: '02', t: 'Control de presupuesto', d: 'Cada gasto bajo control. Sin sorpresas.' },
            { n: '03', t: 'Gestión de invitados', d: 'RSVPs, menús y confirmaciones juntos.' },
            { n: '04', t: 'Plano de mesas', d: 'Arrastra y coloca a cada invitado.' },
            { n: '05', t: 'Cronograma', d: 'Cuenta atrás e hitos importantes.' },
            { n: '06', t: 'Web de boda', d: 'Una página para vuestros invitados.' },
          ].map(f => (
            <div key={f.n} className="feat-card">
              <p style={{ fontFamily: F, fontSize: 44, fontWeight: 300, color: 'rgba(142,197,247,0.25)', lineHeight: 1, marginBottom: 18 }}>{f.n}</p>
              <p style={{ fontFamily: F, fontSize: 19, color: INK, marginBottom: 8 }}>{f.t}</p>
              <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.75 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SPLIT 1 */}
      <div style={{ background: 'white', borderTop: '1px solid rgba(44,42,38,0.05)', borderBottom: '1px solid rgba(44,42,38,0.05)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '100px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div className="reveal-l">
            <p style={{ fontSize: 11, color: BLUE, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 18 }}>Para vosotros</p>
            <h3 style={{ fontFamily: F, fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: INK, lineHeight: 1.2, marginBottom: 20 }}>Diseñado para quien no sabe por dónde empezar</h3>
            <p style={{ fontSize: 14, color: MUTE, lineHeight: 1.85, marginBottom: 36 }}>Entráis, exploráis y vais completando a vuestro ritmo. Sin presión, sin curva de aprendizaje.</p>
            <Link href="/dashboard" className="btn-pill">Empezar ahora →</Link>
          </div>
          <div className="split-img reveal-r" style={{ borderRadius: '20px 60px 20px 60px', overflow: 'hidden', aspectRatio: '5/4' }}>
            <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      {/* PARALLAX 1 */}
      <div className="par-section">
        <div className="par-bg">
          <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80" alt="" />
        </div>
        <div className="par-overlay" style={{ background: 'rgba(250,250,248,0.6)' }} />
        <div className="reveal" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 48px' }}>
          <p style={{ fontFamily: F, fontSize: 'clamp(32px,5vw,72px)', fontWeight: 300, fontStyle: 'italic', color: INK, lineHeight: 1.15, marginBottom: 20 }}>Cada detalle,<br />cuidado con amor</p>
          <p style={{ fontSize: 14, color: MUTE, maxWidth: 400, margin: '0 auto' }}>Desde el primer invitado hasta el último baile. Lo tenéis todo aquí.</p>
        </div>
      </div>

      {/* SPLIT 2 */}
      <div style={{ background: BG }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '100px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div className="split-img reveal-l" style={{ borderRadius: '60px 20px 60px 20px', overflow: 'hidden', aspectRatio: '5/4' }}>
            <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="reveal-r">
            <p style={{ fontSize: 11, color: BLUE, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 18 }}>Proveedores</p>
            <h3 style={{ fontFamily: F, fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: INK, lineHeight: 1.2, marginBottom: 20 }}>Vuestro equipo soñado, todo controlado</h3>
            <p style={{ fontSize: 14, color: MUTE, lineHeight: 1.85 }}>Fotógrafo, catering, florista, DJ. Estado del contrato y presupuesto asignado a cada uno.</p>
          </div>
        </div>
      </div>

      {/* GALERÍA ASIMÉTRICA */}
      <div style={{ padding: '100px 48px', background: 'white' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 11, color: BLUE, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16 }}>Inspiración</p>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(30px,4vw,52px)', fontWeight: 300, color: INK, lineHeight: 1.12 }}>Ideas para que vuestra<br />boda sea única</h2>
          </div>
          <div className="reveal-scale" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '280px 280px', gap: 8 }}>
            <div className="gal-item" style={{ gridRow: '1/3', borderRadius: 20, overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1546032996-6098e9b04e0a?w=700&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="gal-item" style={{ borderRadius: 20, overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=500&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="gal-item" style={{ borderRadius: 20, overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1622037022824-0c71d511ec02?w=500&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="gal-item" style={{ borderRadius: 20, overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1612630440053-cdc4458c79fd?w=500&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="gal-item" style={{ borderRadius: 20, overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1595407753234-0882f1e76e26?w=500&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>

      {/* PARALLAX 2 */}
      <div className="par-section">
        <div className="par-bg">
          <img src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&q=80" alt="" />
        </div>
        <div className="par-overlay" style={{ background: 'rgba(250,250,248,0.62)' }} />
        <div className="reveal" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 48px', maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontFamily: F, fontSize: 'clamp(28px,4.5vw,64px)', fontWeight: 300, fontStyle: 'italic', color: INK, lineHeight: 1.2, marginBottom: 36 }}>
            Vuestra historia de amor es única.<br />Vuestra boda también debería serlo.
          </p>
          <Link href="/dashboard" className="btn-pill">Empezar a planificar →</Link>
        </div>
      </div>

      {/* PRECIOS */}
      <div style={{ background: '#F5F7FA', borderTop: '1px solid rgba(142,197,247,0.12)', padding: '100px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 11, color: BLUE, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16 }}>Precios</p>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(30px,4vw,52px)', fontWeight: 300, color: INK, lineHeight: 1.12, marginBottom: 14 }}>Sencillo y honesto</h2>
            <p style={{ fontSize: 14, color: MUTE, maxWidth: 400, margin: '0 auto' }}>Sin suscripciones, sin sorpresas. Elegid lo que necesitáis.</p>
          </div>
          <div className="reveal-scale" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div className="pc-card">
              <p style={{ fontSize: 11, color: '#B0AAA3', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>Acceso completo</p>
              <p style={{ fontFamily: F, fontSize: 62, fontWeight: 300, color: BLUE, lineHeight: 1, marginBottom: 6 }}>24,99 €</p>
              <p style={{ fontSize: 12, color: '#B0AAA3', letterSpacing: '0.06em', marginBottom: 24 }}>PAGO ÚNICO · ACCESO DE POR VIDA</p>
              <div style={{ height: 1, background: 'rgba(44,42,38,0.07)', marginBottom: 24 }} />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                {['Tareas, presupuesto e invitados', 'Plano de mesas interactivo', 'Cronograma y cuenta atrás', 'Gestión de proveedores', 'Web de boda personalizada', 'Notas e inspiración'].map(i => (
                  <li key={i} style={{ fontSize: 13, color: 'rgba(44,42,38,0.6)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: BLUE, flexShrink: 0, display: 'inline-block' }} />{i}
                  </li>
                ))}
              </ul>
              <button className="pc-btn-s">Empezar ahora</button>
            </div>
            <div className="pc-card">
              <p style={{ fontSize: 11, color: '#B0AAA3', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>Plantillas de invitación</p>
              <p style={{ fontFamily: F, fontSize: 62, fontWeight: 300, color: INK, lineHeight: 1, marginBottom: 6 }}>10 €</p>
              <p style={{ fontSize: 12, color: '#B0AAA3', letterSpacing: '0.06em', marginBottom: 24 }}>POR PLANTILLA · PAGO ÚNICO</p>
              <div style={{ height: 1, background: 'rgba(44,42,38,0.07)', marginBottom: 24 }} />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                {['Diseños elegantes y únicos', 'Personalización completa', 'Formato digital e imprimible', 'Descarga inmediata'].map(i => (
                  <li key={i} style={{ fontSize: 13, color: 'rgba(44,42,38,0.6)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: BLUE, flexShrink: 0, display: 'inline-block' }} />{i}
                  </li>
                ))}
              </ul>
              <button className="pc-btn-o">Ver plantillas</button>
            </div>
          </div>
        </div>
      </div>

      {/* QUOTE FINAL */}
      <div style={{ padding: '120px 48px', textAlign: 'center', background: BG }}>
        <p className="reveal" style={{ fontFamily: F, fontSize: 'clamp(26px,4vw,52px)', fontWeight: 300, fontStyle: 'italic', color: INK, lineHeight: 1.3, maxWidth: 680, margin: '0 auto 36px' }}>
          Hecho con ♡ para parejas que merecen algo mejor
        </p>
        <Link href="/dashboard" className="btn-pill reveal">Empezar a planificar →</Link>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(44,42,38,0.06)', padding: '28px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white' }}>
        <img src="/logo.png" alt="mylov3" style={{ height: 24, display: 'block' }} />
        <p style={{ fontSize: 12, color: '#B0AAA3' }}>Hecho con ♡ para parejas que quieren disfrutar del proceso</p>
        <p style={{ fontSize: 11, color: '#D0CCC6' }}>2025</p>
      </footer>
    </main>
  )
}
