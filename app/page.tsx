'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const F = "'Cormorant Garamond',serif"
const BLUE = '#8ec5f7'
const INK = '#1a1a2e'
const MUTE = '#6b7280'

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.reveal, .reveal-l, .reveal-r, .reveal-scale').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('in')
    })
    const handleScroll = () => {
      document.querySelectorAll<HTMLElement>('.reveal, .reveal-l, .reveal-r, .reveal-scale').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.88) el.classList.add('in')
      })
      const nav = document.getElementById('main-nav')
      if (nav) nav.style.background = window.scrollY > 40 ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0)'
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    { id: 'invitados', label: 'Invitados', desc: 'Gestiona quién viene y organiza las mesas.', img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&q=80' },
    { id: 'presupuesto', label: 'Presupuesto', desc: 'Controla cada gasto y mantente al día.', img: 'https://images.unsplash.com/photo-1546032996-6098e9b04e0a?w=800&q=80' },
    { id: 'proveedores', label: 'Proveedores', desc: 'Encuentra y gestiona a tu equipo soñado.', img: 'https://images.unsplash.com/photo-1622037022824-0c71d511ec02?w=800&q=80' },
    { id: 'tareas', label: 'Tareas', desc: 'Crea tu lista y no olvides nada.', img: 'https://images.unsplash.com/photo-1612630440053-cdc4458c79fd?w=800&q=80' },
    { id: 'cronograma', label: 'Cronograma', desc: 'Planifica cada momento de vuestra boda.', img: 'https://images.unsplash.com/photo-1595407753234-0882f1e76e26?w=800&q=80' },
    { id: 'web', label: 'Web de boda', desc: 'Una página bonita para vuestros invitados.', img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80' },
  ]

  const deepDives = [
    {
      tag: 'Invitados',
      title: 'Gestiona tu lista de invitados',
      sub: 'Decide con quién celebrarlo y nosotros hacemos el resto — desde recopilar contactos hasta gestionar los RSVPs.',
      cta: 'Empezar',
      img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=900&q=80',
    },
    {
      tag: 'Presupuesto',
      title: 'Controla cada euro de tu boda',
      sub: 'Sin sorpresas. Añade partidas, registra pagos y ve en tiempo real cuánto lleváis gastado.',
      cta: 'Ver el presupuesto',
      img: 'https://images.unsplash.com/photo-1546032996-6098e9b04e0a?w=900&q=80',
    },
    {
      tag: 'Proveedores',
      title: 'Encuentra tu equipo soñado',
      sub: 'Fotógrafo, catering, flores, DJ. Estado del contrato y presupuesto asignado a cada uno.',
      cta: 'Buscar proveedores',
      img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80',
    },
    {
      tag: 'Web de boda',
      title: 'La forma más bonita de tener a tus invitados informados',
      sub: 'Crea vuestra página personalizada en segundos. Fecha, lugar, historia y más.',
      cta: 'Crear mi web',
      img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=80',
    },
  ]

  return (
    <main style={{ background: '#fff', fontFamily: "'Inter',sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#8ec5f7;padding:12px;}
        main{border-radius:24px;overflow:hidden;}
        .reveal{opacity:0;transform:translateY(32px);transition:opacity 0.8s cubic-bezier(.16,1,.3,1),transform 0.8s cubic-bezier(.16,1,.3,1)}
        .reveal.in{opacity:1;transform:translateY(0)}
        .reveal-l{opacity:0;transform:translateX(-32px);transition:opacity 0.8s cubic-bezier(.16,1,.3,1),transform 0.8s cubic-bezier(.16,1,.3,1)}
        .reveal-l.in{opacity:1;transform:translateX(0)}
        .reveal-r{opacity:0;transform:translateX(32px);transition:opacity 0.8s cubic-bezier(.16,1,.3,1),transform 0.8s cubic-bezier(.16,1,.3,1)}
        .reveal-r.in{opacity:1;transform:translateX(0)}
        .reveal-scale{opacity:0;transform:scale(0.97);transition:opacity 0.8s cubic-bezier(.16,1,.3,1),transform 0.8s cubic-bezier(.16,1,.3,1)}
        .reveal-scale.in{opacity:1;transform:scale(1)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .a1{animation:fadeUp 0.9s 0.05s both}
        .a2{animation:fadeUp 0.9s 0.2s both}
        .a3{animation:fadeUp 0.9s 0.35s both}
        .btn-blue{background:#8ec5f7;color:white;border:none;border-radius:999px;padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer;display:inline-block;text-decoration:none;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 4px 18px rgba(142,197,247,0.4)}
        .btn-blue:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(142,197,247,0.55)}
        .btn-white{background:white;color:#1a1a2e;border:none;border-radius:999px;padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer;display:inline-block;text-decoration:none;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 4px 18px rgba(0,0,0,0.12)}
        .btn-white:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,0.18)}
        .btn-dark{background:#1a1a2e;color:white;border:none;border-radius:999px;padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer;display:inline-block;text-decoration:none;transition:opacity 0.2s}
        .btn-dark:hover{opacity:0.85}
        .btn-outline{background:transparent;color:#1a1a2e;border:2px solid #1a1a2e;border-radius:999px;padding:12px 28px;font-size:14px;font-weight:600;cursor:pointer;display:inline-block;text-decoration:none;transition:all 0.2s}
        .btn-outline:hover{background:#1a1a2e;color:white}
        .btn-outline-blue{background:transparent;color:#8ec5f7;border:2px solid #8ec5f7;border-radius:999px;padding:12px 28px;font-size:14px;font-weight:600;cursor:pointer;display:inline-block;text-decoration:none;transition:all 0.2s}
        .btn-outline-blue:hover{background:#8ec5f7;color:white}
        .nav-link{font-size:13px;color:#6b7280;cursor:pointer;transition:color 0.2s;text-decoration:none;white-space:nowrap}
        .nav-link:hover{color:#1a1a2e}
        .feat-tab{background:none;border:none;border-bottom:2px solid transparent;padding:12px 0;font-size:14px;font-weight:500;color:#6b7280;cursor:pointer;transition:all 0.2s;white-space:nowrap}
        .feat-tab.active{color:#8ec5f7;border-bottom-color:#8ec5f7}
        .diff-card{background:#F8FBFF;border:1px solid rgba(142,197,247,0.2);border-radius:20px;padding:28px 24px;min-width:260px}
        .review-card{background:#F8FBFF;border:1px solid rgba(142,197,247,0.2);border-radius:20px;padding:28px 24px}
        @keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .ticker-track{display:flex;gap:28px;animation:tick 30s linear infinite;width:max-content;align-items:center}
        .vendor-pill{display:inline-block;background:#F8FBFF;border:1px solid rgba(142,197,247,0.25);border-radius:999px;padding:10px 20px;font-size:13px;color:#1a1a2e;text-decoration:none;transition:all 0.2s;cursor:pointer}
        .vendor-pill:hover{background:#8ec5f7;color:white;border-color:#8ec5f7}
      `}</style>

      {/* NAV */}
      <nav id="main-nav" style={{ position: 'sticky', top: 0, zIndex: 200, transition: 'background 0.3s', backdropFilter: 'blur(16px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', height: 64, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <Link href="/"><img src="/logo.png" alt="mylov3" style={{ height: 26, display: 'block' }} /></Link>
          <div style={{ display: 'flex', gap: 32 }}>
            {['Web de boda','Proveedores','Presupuesto','Invitados','Cronograma','Mesas'].map(l => (
              <a key={l} href="#" className="nav-link">{l}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="#" style={{ fontSize: 13, color: MUTE, textDecoration: 'none' }}>Iniciar sesión</a>
            <Link href="/dashboard" className="btn-blue" style={{ padding: '9px 20px', fontSize: 13 }}>Empezar gratis</Link>
          </div>
        </div>
      </nav>

      {/* HERO — full bleed photo */}
      <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 48px' }}>
        <img src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1800&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,30,50,0.42)' }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="a1" style={{ fontFamily: F, fontSize: 'clamp(48px,7vw,96px)', fontWeight: 600, color: 'white', lineHeight: 1.0, marginBottom: 24, maxWidth: 800 }}>
            La planificación de vuestra boda empieza aquí
          </h1>
          <p className="a2" style={{ fontSize: 18, color: 'rgba(255,255,255,0.88)', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.75 }}>
            Desde la finca y el catering hasta vuestra web de boda y los invitados — mylov3 está con vosotros en cada paso del camino.
          </p>
          <div className="a3" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard" className="btn-white">¡Empezamos!</Link>
            <Link href="/dashboard" className="btn-dark">Ver demo</Link>
          </div>
        </div>
      </section>

      {/* FEATURES TABS */}
      <section style={{ background: 'white', padding: '80px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 className="reveal" style={{ fontFamily: F, fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: INK, textAlign: 'center', marginBottom: 8 }}>Todo lo que necesitáis para planificar vuestra boda</h2>
          <p className="reveal" style={{ fontSize: 14, color: MUTE, textAlign: 'center', marginBottom: 40 }}>Para todos los días del camino</p>

          {/* Tabs */}
          <div className="reveal" style={{ display: 'flex', gap: 32, borderBottom: '1px solid #eee', marginBottom: 40, overflowX: 'auto' }}>
            {features.map((f, i) => (
              <button key={f.id} className={`feat-tab${activeFeature === i ? ' active' : ''}`} onClick={() => setActiveFeature(i)}>{f.label}</button>
            ))}
          </div>

          {/* Active feature */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div className="reveal-l">
              <span style={{ display: 'inline-block', background: 'rgba(142,197,247,0.15)', color: '#5aacf0', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 999, padding: '5px 14px', marginBottom: 20 }}>{features[activeFeature].label}</span>
              <h3 style={{ fontFamily: F, fontSize: 'clamp(28px,3vw,42px)', fontWeight: 400, color: INK, marginBottom: 16, lineHeight: 1.2 }}>{features[activeFeature].desc}</h3>
              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <Link href="/dashboard" className="btn-blue" style={{ fontSize: 14, padding: '12px 24px' }}>Empezar</Link>
                <Link href="/dashboard" className="btn-outline-blue" style={{ fontSize: 14, padding: '12px 24px' }}>Saber más</Link>
              </div>
            </div>
            <div className="reveal-r" style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3' }}>
              <img src={features[activeFeature].img} alt={features[activeFeature].label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.4s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(142,197,247,0.15)', borderBottom: '1px solid rgba(142,197,247,0.15)', padding: '14px 0', background: '#F8FBFF' }}>
        <div className="ticker-track">
          {['Tareas','♡','Presupuesto','♡','Invitados','♡','Mesas','♡','Cronograma','♡','Proveedores','♡','Web de boda','♡','Notas','♡','Inspiración','♡','Tareas','♡','Presupuesto','♡','Invitados','♡','Mesas','♡','Cronograma','♡','Proveedores','♡','Web de boda','♡','Notas','♡','Inspiración','♡'].map((t, i) => (
            <span key={i} style={{ fontSize: 11, color: t === '♡' ? BLUE : '#C0BAB2', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* DEEP DIVES — alternating */}
      {deepDives.map((d, i) => (
        <section key={d.tag} style={{ background: i % 2 === 0 ? 'white' : '#F8FBFF', padding: '100px 64px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap: 80, alignItems: 'center' }}>
            {i % 2 === 0 ? (
              <>
                <div className="reveal-l">
                  <span style={{ display: 'inline-block', background: 'rgba(142,197,247,0.15)', color: '#5aacf0', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 999, padding: '5px 14px', marginBottom: 20 }}>{d.tag}</span>
                  <h2 style={{ fontFamily: F, fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 400, color: INK, lineHeight: 1.15, marginBottom: 20 }}>{d.title}</h2>
                  <p style={{ fontSize: 15, color: MUTE, lineHeight: 1.8, marginBottom: 36 }}>{d.sub}</p>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <Link href="/dashboard" className="btn-blue" style={{ fontSize: 14, padding: '12px 24px' }}>{d.cta}</Link>
                    <Link href="/dashboard" className="btn-outline" style={{ fontSize: 14, padding: '12px 24px' }}>Saber más</Link>
                  </div>
                </div>
                <div className="reveal-r" style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '5/4', boxShadow: '0 24px 60px rgba(0,0,0,0.08)' }}>
                  <img src={d.img} alt={d.tag} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </>
            ) : (
              <>
                <div className="reveal-l" style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '5/4', boxShadow: '0 24px 60px rgba(0,0,0,0.08)' }}>
                  <img src={d.img} alt={d.tag} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="reveal-r">
                  <span style={{ display: 'inline-block', background: 'rgba(142,197,247,0.15)', color: '#5aacf0', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 999, padding: '5px 14px', marginBottom: 20 }}>{d.tag}</span>
                  <h2 style={{ fontFamily: F, fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 400, color: INK, lineHeight: 1.15, marginBottom: 20 }}>{d.title}</h2>
                  <p style={{ fontSize: 15, color: MUTE, lineHeight: 1.8, marginBottom: 36 }}>{d.sub}</p>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <Link href="/dashboard" className="btn-blue" style={{ fontSize: 14, padding: '12px 24px' }}>{d.cta}</Link>
                    <Link href="/dashboard" className="btn-outline" style={{ fontSize: 14, padding: '12px 24px' }}>Saber más</Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      ))}

      {/* LO QUE NOS HACE DIFERENTES */}
      <section style={{ background: 'white', padding: '100px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 className="reveal" style={{ fontFamily: F, fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: INK, textAlign: 'center', marginBottom: 56 }}>Lo que nos hace diferentes</h2>
          <div className="reveal-scale" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { icon: '♡', t: 'Todo en un lugar', d: 'Tareas, presupuesto, invitados, mesas, cronograma y más. Sin apps separadas.' },
              { icon: '✦', t: 'Sin estrés', d: 'Diseñado para que disfrutéis del proceso, no solo del resultado.' },
              { icon: '⊞', t: 'Plano de mesas interactivo', d: 'Arrastra y suelta a tus invitados en las mesas. Visual y sencillo.' },
              { icon: '📅', t: 'Cuenta atrás en tiempo real', d: 'Sabréis en todo momento cuántos días quedan para el gran día.' },
              { icon: '€', t: 'Presupuesto detallado', d: 'Controla cada partida, lo pagado y lo que queda. Sin sorpresas.' },
              { icon: '🌐', t: 'Web de boda gratis', d: 'Una página bonita y personalizada para que vuestros invitados estén informados.' },
            ].map(f => (
              <div key={f.t} className="diff-card">
                <div style={{ fontSize: 28, color: BLUE, marginBottom: 16 }}>{f.icon}</div>
                <p style={{ fontFamily: F, fontSize: 18, color: INK, marginBottom: 10, fontWeight: 500 }}>{f.t}</p>
                <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.75 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: '#F8FBFF', padding: '100px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 56, textAlign: 'center' }}>
            <span style={{ display: 'inline-block', background: 'rgba(142,197,247,0.15)', color: '#5aacf0', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 999, padding: '5px 14px', marginBottom: 20 }}>Parejas que ya vivieron su día</span>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: INK }}>Historias reales, momentos inolvidables</h2>
          </div>
          <div className="reveal-scale" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { q: 'mylov3 hizo que todo fuera tan fácil y organizado. Pudimos disfrutar cada momento sin preocupaciones.', n: 'María & Lucas', d: 'Se casaron en Abril 2024', img: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=100&q=80' },
              { q: 'La mejor herramienta para planificar nuestra boda. ¡No podemos imaginar haberlo hecho sin mylov3!', n: 'Ana & Diego', d: 'Se casaron en Junio 2024', img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=100&q=80' },
              { q: 'Todo en un solo lugar, hermoso, práctico y super completo. Lo recomendamos a todas las parejas.', n: 'Sofía & Tomás', d: 'Se casaron en Mayo 2024', img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=100&q=80' },
            ].map(r => (
              <div key={r.n} className="review-card">
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: BLUE, fontSize: 15 }}>★</span>)}
                </div>
                <p style={{ fontSize: 14, color: INK, lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>"{r.q}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
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
      </section>

      {/* PROVEEDORES CATEGORÍAS */}
      <section style={{ background: 'white', padding: '100px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 className="reveal" style={{ fontFamily: F, fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 400, color: INK, marginBottom: 36 }}>Explora proveedores por categoría</h2>
          <div className="reveal-scale" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {['Fincas y espacios','Fotógrafos','Videógrafos','Catering','Música y DJ','Flores','Pasteles','Vestidos','Transporte','Belleza y maquillaje','Wedding planners','Extras'].map(v => (
              <a key={v} href="#" className="vendor-pill">{v}</a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <div style={{ margin: '0 0 0', position: 'relative', minHeight: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.72)' }} />
        <div className="reveal" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '60px 48px' }}>
          <div style={{ color: BLUE, marginBottom: 12, fontSize: 22 }}>♡</div>
          <h2 style={{ fontFamily: F, fontSize: 'clamp(28px,4vw,52px)', fontWeight: 400, color: INK, lineHeight: 1.15, marginBottom: 8 }}>Tu historia de amor merece</h2>
          <h2 style={{ fontFamily: F, fontSize: 'clamp(28px,4vw,52px)', fontWeight: 400, fontStyle: 'italic', color: BLUE, lineHeight: 1.15, marginBottom: 36 }}>el mejor comienzo</h2>
          <Link href="/dashboard" className="btn-blue" style={{ fontSize: 15, padding: '15px 40px' }}>Empieza a planificar gratis</Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: 'white', borderTop: '1px solid rgba(0,0,0,0.06)', padding: '48px 64px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
            <div>
              <img src="/logo.png" alt="mylov3" style={{ height: 28, display: 'block', marginBottom: 16 }} />
              <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.75, maxWidth: 240 }}>La forma más bonita de planificar el día más importante de vuestra vida.</p>
            </div>
            {[
              { t: 'Funciones', links: ['Invitados','Presupuesto','Mesas','Cronograma','Web de boda','Tareas'] },
              { t: 'Empresa', links: ['Sobre nosotros','Blog','Prensa','Trabaja con nosotros'] },
              { t: 'Ayuda', links: ['FAQs','Contacto','Privacidad','Términos'] },
            ].map(col => (
              <div key={col.t}>
                <p style={{ fontSize: 12, fontWeight: 600, color: INK, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>{col.t}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map(l => <a key={l} href="#" style={{ fontSize: 13, color: MUTE, textDecoration: 'none', transition: 'color 0.2s' }}>{l}</a>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 12, color: '#B0AAA3' }}>© 2025 mylov3. Hecho con ♡ para parejas que quieren disfrutar del proceso.</p>
            <p style={{ fontSize: 11, color: '#D0CCC6' }}>Para todos los días del camino</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
