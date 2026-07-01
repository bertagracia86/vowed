'use client'

import Link from 'next/link'

const F = "'Cormorant Garamond',serif"
const BLUE = '#6E8FC9'
const INK = '#2C2A26'
const MUTE = '#8A8580'
const BG = '#FDFCFA'

const FEATURES = [
  { n: '01', t: 'Listas de tareas', d: 'Checklists ordenados y adaptados a vuestra fecha.' },
  { n: '02', t: 'Control de presupuesto', d: 'Cada gasto bajo control. Sin sorpresas al final.' },
  { n: '03', t: 'Gestión de invitados', d: 'RSVPs, menús y confirmaciones en un solo lugar.' },
  { n: '04', t: 'Plano de mesas', d: 'Arrastra y coloca a cada invitado fácilmente.' },
  { n: '05', t: 'Cronograma', d: 'Cuenta atrás e hitos para no olvidar nada.' },
  { n: '06', t: 'Web de boda', d: 'Una página bonita para vuestros invitados.' },
]

const TICKER = ['Tareas','Presupuesto','Invitados','Mesas','Cronograma','Proveedores','Web de boda','Notas','Inspiración']

export default function Home() {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main style={{ background: BG, fontFamily: "'Inter',sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');
        *{box-sizing:border-box}
        .reveal{opacity:0;transform:translateY(36px);transition:opacity 0.8s ease,transform 0.8s ease}
        .reveal.in{opacity:1;transform:translateY(0)}
        .reveal-l{opacity:0;transform:translateX(-36px);transition:opacity 0.8s ease,transform 0.8s ease}
        .reveal-l.in{opacity:1;transform:translateX(0)}
        .reveal-r{opacity:0;transform:translateX(36px);transition:opacity 0.8s ease,transform 0.8s ease}
        .reveal-r.in{opacity:1;transform:translateX(0)}
        .feat-cell{background:${BG};padding:40px 32px;transition:background 0.25s;cursor:default}
        .feat-cell:hover{background:white}
        .feat-n{font-family:${F};font-size:52px;font-weight:300;color:rgba(110,143,201,0.15);line-height:1;margin-bottom:18px;transition:color 0.3s}
        .feat-cell:hover .feat-n{color:rgba(110,143,201,0.35)}
        .split-img img{transition:transform 0.6s ease}
        .split-img:hover img{transform:scale(1.03)}
        .btn-main{background:${BLUE};color:white;border:none;border-radius:999px;padding:16px 36px;font-size:14px;font-weight:500;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s;box-shadow:0 4px 20px rgba(110,143,201,0.25)}
        .btn-main:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(110,143,201,0.35)}
        .btn-ghost{background:transparent;border:1px solid rgba(44,42,38,0.12);color:${INK};border-radius:999px;padding:15px 28px;font-size:14px;cursor:pointer;transition:border-color 0.2s}
        .btn-ghost:hover{border-color:${BLUE};color:${BLUE}}
        .pc-btn-solid{background:${BLUE};color:white;border:none;width:100%;padding:14px;border-radius:999px;font-size:13px;font-weight:500;cursor:pointer;transition:opacity 0.2s}
        .pc-btn-solid:hover{opacity:0.85}
        .pc-btn-outline{background:transparent;color:${BLUE};border:1px solid rgba(110,143,201,0.35);width:100%;padding:14px;border-radius:999px;font-size:13px;cursor:pointer;transition:background 0.2s}
        .pc-btn-outline:hover{background:rgba(110,143,201,0.06)}
        .nav-link{cursor:pointer;transition:color 0.2s;color:${MUTE};font-size:13px}
        .nav-link:hover{color:${INK}}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;font-size:11px;color:${BLUE};letter-spacing:0.12em;text-transform:uppercase;margin-bottom:36px}
        .hero-badge::before{content:'';width:20px;height:1px;background:${BLUE}}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .ticker-track{display:flex;gap:40px;animation:ticker 30s linear infinite;width:max-content}
        @keyframes heroIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .hero-anim-1{animation:heroIn 0.9s 0.1s both}
        .hero-anim-2{animation:heroIn 0.9s 0.2s both}
        .hero-anim-3{animation:heroIn 0.9s 0.3s both}
        .hero-anim-4{animation:heroIn 0.9s 0.4s both}
        .hero-anim-5{animation:heroIn 0.9s 0.5s both}
        @keyframes imgIn{from{opacity:0}to{opacity:0.92}}
        .hero-img{animation:imgIn 1.2s 0.3s both}
        @keyframes cardIn{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
        .hero-card-anim{animation:cardIn 0.9s 0.9s both}
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 56px', background: 'rgba(253,252,250,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(44,42,38,0.05)' }}>
        <div style={{ fontFamily: F, fontSize: 22, fontStyle: 'italic', fontWeight: 500, color: BLUE, cursor: 'pointer' }} onClick={() => scrollTo('hero')}>vowed</div>
        <div style={{ display: 'flex', gap: 36 }}>
          {['funciones', 'precios', 'inspiracion', 'sobre-nosotros'].map((id, i) => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>
              {['Funciones', 'Precios', 'Inspiración', 'Sobre nosotros'][i]}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/dashboard" style={{ fontSize: 13, color: MUTE }}>Acceder</Link>
          <Link href="/dashboard" style={{ background: BLUE, color: 'white', borderRadius: 999, padding: '10px 24px', fontSize: 13, fontWeight: 500 }}>Empezar gratis</Link>
        </div>
      </nav>

      <section id="hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 56px' }}>
          <div className="hero-badge hero-anim-1">Organizador de bodas</div>
          <h1 className="hero-anim-2" style={{ fontFamily: F, fontSize: 'clamp(44px,5.5vw,78px)', fontWeight: 300, lineHeight: 1.06, letterSpacing: '-0.02em', color: INK }}>
            Sed vuestro propio<br />
            <em style={{ fontStyle: 'italic', color: BLUE }}>wedding planner</em>
          </h1>
          <div className="hero-anim-3" style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '28px 0' }}>
            <div style={{ width: 40, height: 1, background: '#DCE7F4' }} />
            <span style={{ color: BLUE, fontSize: 14 }}>♡</span>
            <div style={{ width: 40, height: 1, background: '#DCE7F4' }} />
          </div>
          <p className="hero-anim-4" style={{ fontSize: 14, color: MUTE, lineHeight: 1.9, maxWidth: 360, marginBottom: 40 }}>
            Planificad toda vuestra boda con calma y con estilo. Herramientas bonitas, todo en un solo lugar.
          </p>
          <div className="hero-anim-5" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link href="/dashboard" className="btn-main">Empezar a planificar</Link>
            <Link href="/dashboard" className="btn-ghost">Ver demo ♡</Link>
          </div>
        </div>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img className="hero-img" src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div className="hero-card-anim" style={{ position: 'absolute', bottom: 48, left: -20, background: 'white', borderRadius: 20, padding: '24px 28px', boxShadow: '0 20px 60px rgba(44,42,38,0.12)', width: 260 }}>
            <p style={{ fontFamily: F, fontSize: 16, color: INK, marginBottom: 14 }}>Vuestro día, a vuestra manera</p>
            {['Listas de tareas inteligentes', 'Control de presupuesto', 'Gestión de invitados', 'Plano de mesas', 'Cronograma y avisos'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', fontSize: 12, color: MUTE }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: BLUE, flexShrink: 0, display: 'inline-block' }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(44,42,38,0.05)', borderBottom: '1px solid rgba(44,42,38,0.05)', padding: '15px 0', background: 'white' }}>
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} style={{ fontSize: 11, color: i % 2 === 0 ? '#B0AAA3' : BLUE, whiteSpace: 'nowrap', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {i % 2 === 0 ? t : '♡'}
            </span>
          ))}
        </div>
      </div>

      <div id="funciones" style={{ maxWidth: 1080, margin: '0 auto', padding: '100px 48px', scrollMarginTop: 70 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 0 }}>
          <div className="reveal-l">
            <p style={{ fontSize: 11, color: BLUE, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 18 }}>Funciones</p>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(30px,4vw,52px)', fontWeight: 300, color: INK, lineHeight: 1.15, marginBottom: 14 }}>Todas las herramientas<br />que necesitáis</h2>
          </div>
          <p className="reveal-r" style={{ fontSize: 14, color: MUTE, lineHeight: 1.85, maxWidth: 340, marginBottom: 4 }}>Sin hojas de cálculo. Sin apps separadas. Sin estrés.</p>
        </div>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(44,42,38,0.07)', borderRadius: 4, overflow: 'hidden', marginTop: 56 }}>
          {FEATURES.map(f => (
            <div key={f.n} className="feat-cell">
              <div className="feat-n">{f.n}</div>
              <p style={{ fontFamily: F, fontSize: 20, color: INK, marginBottom: 8 }}>{f.t}</p>
              <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.75 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'white', borderTop: '1px solid rgba(44,42,38,0.05)', borderBottom: '1px solid rgba(44,42,38,0.05)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '100px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div className="reveal-l">
            <p style={{ fontSize: 11, color: BLUE, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 18 }}>Para vosotros</p>
            <h3 style={{ fontFamily: F, fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: INK, lineHeight: 1.2, marginBottom: 16 }}>Diseñado para quien no sabe por dónde empezar</h3>
            <p style={{ fontSize: 14, color: MUTE, lineHeight: 1.85, marginBottom: 32 }}>No hace falta tener nada decidido. Entráis, exploráis y vais completando a vuestro ritmo. Sin presión.</p>
            <Link href="/dashboard" className="btn-main">Empezar ahora →</Link>
          </div>
          <div className="split-img reveal-r" style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '5/4' }}>
            <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      <div style={{ background: BG, borderBottom: '1px solid rgba(44,42,38,0.05)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '100px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div className="split-img reveal-l" style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '5/4' }}>
            <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="reveal-r">
            <p style={{ fontSize: 11, color: BLUE, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 18 }}>Proveedores</p>
            <h3 style={{ fontFamily: F, fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 300, color: INK, lineHeight: 1.2, marginBottom: 16 }}>Vuestro equipo soñado, todo en un lugar</h3>
            <p style={{ fontSize: 14, color: MUTE, lineHeight: 1.85 }}>Guardad fotógrafos, catering, floristas y todos vuestros proveedores. Con estado del contrato y notas.</p>
          </div>
        </div>
      </div>

      <div id="precios" style={{ background: '#F5F7FA', borderTop: '1px solid rgba(110,143,201,0.1)', scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '100px 48px' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 0 }}>
            <p style={{ fontSize: 11, color: BLUE, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 18 }}>Precios</p>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(30px,4vw,52px)', fontWeight: 300, color: INK, lineHeight: 1.15, marginBottom: 14 }}>Sencillo y honesto</h2>
            <p style={{ fontSize: 14, color: MUTE, lineHeight: 1.8, maxWidth: 440, margin: '0 auto' }}>Sin suscripciones, sin sorpresas. Elegid lo que necesitáis.</p>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: 'rgba(44,42,38,0.07)', marginTop: 56, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ background: 'white', padding: '52px 44px' }}>
              <p style={{ fontSize: 11, color: '#B0AAA3', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 28 }}>Acceso completo</p>
              <p style={{ fontFamily: F, fontSize: 64, fontWeight: 300, lineHeight: 1, color: BLUE, marginBottom: 6 }}>24,99 €</p>
              <p style={{ fontSize: 12, color: '#B0AAA3', letterSpacing: '0.06em', marginBottom: 28 }}>PAGO ÚNICO · ACCESO DE POR VIDA</p>
              <div style={{ height: 1, background: 'rgba(44,42,38,0.07)', marginBottom: 28 }} />
              <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.8, marginBottom: 28 }}>Todos los módulos incluidos. Sin límites. Actualizaciones gratuitas para siempre.</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
                {['Tareas, presupuesto e invitados', 'Plano de mesas interactivo', 'Cronograma y cuenta atrás', 'Gestión de proveedores', 'Web de boda personalizada', 'Notas e inspiración'].map(i => (
                  <li key={i} style={{ fontSize: 13, color: 'rgba(44,42,38,0.6)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: BLUE, flexShrink: 0, display: 'inline-block' }} />{i}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="pc-btn-solid" style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: 999, fontSize: 13, fontWeight: 500 }}>Empezar ahora</Link>
            </div>
            <div style={{ background: BG, padding: '52px 44px' }}>
              <p style={{ fontSize: 11, color: '#B0AAA3', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 28 }}>Plantillas de invitación</p>
              <p style={{ fontFamily: F, fontSize: 64, fontWeight: 300, lineHeight: 1, color: INK, marginBottom: 6 }}>10 €</p>
              <p style={{ fontSize: 12, color: '#B0AAA3', letterSpacing: '0.06em', marginBottom: 28 }}>POR PLANTILLA · PAGO ÚNICO</p>
              <div style={{ height: 1, background: 'rgba(44,42,38,0.07)', marginBottom: 28 }} />
              <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.8, marginBottom: 28 }}>Diseños digitales exclusivos, listos para personalizar y descargar al instante.</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
                {['Diseños elegantes y únicos', 'Personalización completa', 'Formato digital e imprimible', 'Descarga inmediata'].map(i => (
                  <li key={i} style={{ fontSize: 13, color: 'rgba(44,42,38,0.6)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: BLUE, flexShrink: 0, display: 'inline-block' }} />{i}
                  </li>
                ))}
              </ul>
              <button className="pc-btn-outline" style={{ display: 'block', width: '100%', padding: '14px', borderRadius: 999, fontSize: 13 }}>Ver plantillas</button>
            </div>
          </div>
        </div>
      </div>

      <div id="inspiracion" style={{ background: 'white', borderTop: '1px solid rgba(44,42,38,0.05)', scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '100px 48px' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 11, color: BLUE, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 18 }}>Inspiración</p>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(30px,4vw,52px)', fontWeight: 300, color: INK, lineHeight: 1.15 }}>Ideas para que vuestra<br />boda sea única</h2>
          </div>
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {[
              'https://images.unsplash.com/photo-1546032996-6098e9b04e0a?w=500&q=80',
              'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&q=80',
              'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=500&q=80',
              'https://images.unsplash.com/photo-1622037022824-0c71d511ec02?w=500&q=80',
              'https://images.unsplash.com/photo-1612630440053-cdc4458c79fd?w=500&q=80',
              'https://images.unsplash.com/photo-1595407753234-0882f1e76e26?w=500&q=80',
            ].map((src, i) => (
              <div key={i} className="split-img" style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '4/3' }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="sobre-nosotros" style={{ background: BG, borderTop: '1px solid rgba(44,42,38,0.05)', scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '100px 48px', textAlign: 'center' }}>
          <div className="reveal">
            <p style={{ fontSize: 11, color: BLUE, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 18 }}>Sobre nosotros</p>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(30px,4vw,44px)', fontWeight: 300, color: INK, lineHeight: 1.2, marginBottom: 24 }}>Hecho con ♡</h2>
            <p style={{ fontSize: 14, color: MUTE, lineHeight: 1.9, marginBottom: 16 }}>Vowed nació de la idea de que planificar una boda debería ser una experiencia bonita, no una fuente de estrés.</p>
            <p style={{ fontSize: 14, color: MUTE, lineHeight: 1.9 }}>Somos un equipo pequeño apasionado por el diseño y por hacer las cosas bien. Creemos que cada pareja merece herramientas elegantes para organizar el día más importante de su vida.</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '120px 48px', textAlign: 'center', background: 'white', borderTop: '1px solid rgba(44,42,38,0.05)' }}>
        <p className="reveal" style={{ fontFamily: F, fontSize: 80, fontWeight: 300, color: 'rgba(110,143,201,0.1)', lineHeight: 0.6, marginBottom: 32 }}>"</p>
        <p className="reveal" style={{ fontFamily: F, fontSize: 'clamp(26px,3.5vw,48px)', fontWeight: 300, fontStyle: 'italic', color: INK, lineHeight: 1.35, maxWidth: 680, margin: '0 auto 20px' }}>
          Vuestra historia de amor es única.<br />Vuestra boda también debería serlo.
        </p>
        <p className="reveal" style={{ fontSize: 12, color: '#B0AAA3', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 44 }}>Hecho con ♡ para parejas que merecen algo mejor</p>
        <Link href="/dashboard" className="btn-main reveal">Empezar a planificar →</Link>
      </div>

      <footer style={{ borderTop: '1px solid rgba(44,42,38,0.06)', padding: '28px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: BG }}>
        <div style={{ fontFamily: F, fontSize: 18, fontStyle: 'italic', color: BLUE }}>vowed</div>
        <p style={{ fontSize: 12, color: '#B0AAA3' }}>Hecho con ♡ para parejas que quieren disfrutar del proceso</p>
        <p style={{ fontSize: 11, color: '#D0CCC6' }}>2025</p>
      </footer>

      <script dangerouslySetInnerHTML={{ __html: `
        const io = new IntersectionObserver(entries => {
          entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in') })
        }, {threshold:0.1})
        document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => io.observe(el))
      `}} />
    </main>
  )
}
