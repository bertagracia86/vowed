'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const BLUE = '#cbecff'
const BLUE_DARK = '#8ec5f7'
const BLUE_LIGHT = '#f0f9ff'
const INK = '#1a3a52'
const F = "'Cormorant Garamond', serif"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [activeFeatureDot, setActiveFeatureDot] = useState(0)
  const [activeMobileDot, setActiveMobileDot] = useState(0)

  useEffect(() => {
    const s1 = document.createElement('script')
    s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
    s1.onload = () => {
      const s2 = document.createElement('script')
      s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'
      s2.onload = () => {
        const { gsap, ScrollTrigger } = window as any
        gsap.registerPlugin(ScrollTrigger)

        gsap.to('.banner', { yPercent: -120, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero-sec', start: 'top top', end: '15% top', scrub: true } })
        gsap.to('.hero-content', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.hero-sec', start: 'top top', end: 'bottom top', scrub: true } })
        gsap.to('.hero-bg-video', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: '.hero-sec', start: 'top top', end: 'bottom top', scrub: true } })
        gsap.fromTo('.dash-wrap', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.dash-wrap', start: 'top 85%' } })
        gsap.fromTo('.feat-grid', { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.feat-grid', start: 'top 85%', toggleActions: 'play none none none' } })

        // Update active dot based on which deep-item is in view
        ;(gsap.utils.toArray('.deep-item') as HTMLElement[]).forEach((el: any, i: number) => {
          gsap.fromTo(el, { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 55%',
              end: 'bottom 45%',
              toggleActions: 'play none none none',
              onEnter: () => setActiveFeatureDot(i),
              onEnterBack: () => setActiveFeatureDot(i),
            }
          })
        })

        // Update active dot for the mobile showcase based on which mobile-step is in view
        ;(gsap.utils.toArray('.mobile-step') as HTMLElement[]).forEach((el: any, i: number) => {
          gsap.fromTo(el, { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 55%',
              end: 'bottom 45%',
              toggleActions: 'play none none none',
              onEnter: () => setActiveMobileDot(i),
              onEnterBack: () => setActiveMobileDot(i),
            }
          })
        })

        gsap.utils.toArray('.sec-reveal').forEach((el: any) => {
          gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
        })
        ScrollTrigger.refresh()
      }
      document.head.appendChild(s2)
    }
    document.head.appendChild(s1)
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const features = [
    { title: 'Invitados', sub: 'Gestiona confirmaciones, menús y mesas.', img: '/invitados.png', badge: '♡ Confirmar asistencia' },
    { title: 'Web de boda', sub: 'Una página bonita y gratis para vuestros invitados.', img: '/web-de-boda.png', badge: '✦ veronicaymarcos.com' },
    { title: 'Proveedores', sub: 'Encuentra y gestiona a tu equipo soñado.', img: '/proveedores.png', badge: '⭐⭐⭐⭐⭐ Estudio Luz' },
    { title: 'Invitaciones', sub: 'Diseños únicos para personalizar y descargar.', img: '/invitaciones.png', badge: '✎ Personalizar diseño' },
    { title: 'Presupuesto', sub: 'Controla cada gasto y mantente al día.', img: '/presupuesto.png', badge: '🔔 Recordatorio de pago' },
    { title: 'Detalles', sub: 'Cada detalle de vuestra boda, organizado y a mano.', img: '/detalles.png', badge: '✦ Todo bajo control' },
  ]

  const deepFeatures = [
    { icon: '€', title: 'Calculadora de presupuesto', body: 'Controla los gastos de la boda con una asignación inteligente de categorías. Supervisa los pagos a proveedores, los depósitos y los costes finales con alertas presupuestarias en tiempo real.', tag: 'REGISTRA CADA GASTO' },
    { icon: '♡', title: 'Gestor de invitados', body: 'Gestiona las confirmaciones de asistencia, controla los requisitos dietéticos, gestiona los acompañantes y exporta la lista completa de invitados para las invitaciones y las tarjetas de mesa.', tag: 'SEGUIMIENTO DE RSVP INTEGRADO' },
    { icon: '⊞', title: 'Plano de asientos', body: 'Crea la distribución de las mesas de tu boda fácilmente con la función de arrastrar y soltar. Diseña la distribución de la recepción con mesas redondas, rectangulares y mesas principales.', tag: 'ARRASTRAR Y SOLTAR VISUALMENTE' },
    { icon: '☑', title: 'Lista de verificación', body: 'No te pierdas ninguna fecha límite para tu boda gracias a las tareas sugeridas. Los elementos de la lista se vinculan con tus proveedores y categorías de presupuesto para una planificación completa.', tag: 'TODO ORGANIZADO Y A TIEMPO' },
    { icon: '◎', title: 'Gestión de proveedores', body: 'Mantén todos los contactos, contratos y calendarios de pagos de los proveedores de tu boda en un solo lugar. Controla los depósitos y los pagos finales de cada proveedor.', tag: 'TODOS LOS VENDEDORES ORGANIZADOS' },
    { icon: '📅', title: 'Cronograma de pagos', body: 'Visualiza los próximos pagos y fechas de vencimiento de tu boda. Recibe alertas sobre depósitos, cuotas y pagos finales para que nunca te pierdas una fecha límite.', tag: 'NUNCA TE PIERDAS UN PAGO' },
  ]

  return (
    <main style={{ fontFamily: F, overflowX: 'hidden', background: '#f7fbff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #e8f7ff; padding: 5px; }
        main { border-radius: 24px; overflow: hidden; }
        .nav-a { font-size: 14px; color: ${INK}; text-decoration: none; opacity: 0.7; transition: opacity 0.2s; font-family: ${F}; }
        .nav-a:hover { opacity: 1; }
        .btn-light { background: rgba(255,255,255,0.92); color: ${INK}; border: none; border-radius: 999px; padding: 14px 36px; font-size: 16px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; box-shadow: 0 2px 12px rgba(0,0,0,0.08); font-family: ${F}; }
        .btn-light:hover { background: white; transform: translateY(-1px); }
        .btn-blue { background: ${BLUE_DARK}; color: white; border: none; border-radius: 999px; padding: 14px 36px; font-size: 16px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; box-shadow: 0 4px 20px rgba(142,197,247,0.35); font-family: ${F}; }
        .btn-blue:hover { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(142,197,247,0.55); }
        .btn-blue-sm { background: ${BLUE_DARK}; color: white; border: none; border-radius: 999px; padding: 10px 24px; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; font-family: ${F}; }
        .btn-blue-sm:hover { opacity: 0.9; transform: translateY(-1px); }
        .feat-card { padding: 32px 28px; background: white; transition: background 0.2s; cursor: pointer; display: flex; flex-direction: column; }
        .feat-card:hover { background: #fafeff; }
        .feat-card-title { font-family: ${F}; font-size: 18px; font-weight: 500; color: ${INK}; display: flex; align-items: center; gap: 6px; margin-bottom: 6px; }
        .feat-card-sub { font-family: ${F}; font-size: 14px; color: #7a9ab5; line-height: 1.5; min-height: 44px; }
        .feat-badge { display: inline-flex; align-items: center; gap: 6px; background: white; border: 1px solid #eee; border-radius: 999px; padding: 7px 16px; font-size: 12px; font-weight: 500; color: ${INK}; position: absolute; bottom: 14px; left: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); white-space: nowrap; font-family: ${F}; }
        .feat-grid { will-change: transform, opacity; }
        .deep-nav-btn { background: none; border: none; cursor: pointer; text-align: left; padding: 10px 0; display: flex; align-items: center; gap: 12px; width: 100%; transition: all 0.25s; }
        .deep-nav-btn:hover span { color: ${INK} !important; }
        .deep-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; transition: all 0.35s ease; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .floating { animation: float 6s ease-in-out infinite; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker { display: flex; gap: 48px; animation: ticker 24s linear infinite; width: max-content; align-items: center; }
        .scroll-btn { width: 48px; height: 48px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.6); background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white; font-size: 18px; transition: all 0.2s; }
        .scroll-btn:hover { background: rgba(255,255,255,0.1); }
        .review-card { background: ${BLUE_LIGHT}; border: 1px solid ${BLUE}; border-radius: 28px; padding: 32px; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300, background: scrollY > 20 ? 'rgba(255,255,255,0.98)' : 'white', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '0 48px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.3s', backdropFilter: 'blur(12px)' }}>
        <Link href="/"><img src="/logo.png" alt="mylov3" style={{ height: 26, display: 'block', filter: 'brightness(0) saturate(100%) invert(62%) sepia(40%) saturate(400%) hue-rotate(180deg) brightness(1.1)' }} /></Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <span style={{ fontSize: 14, color: INK, opacity: 0.6, fontFamily: F }}>¿Ya tienes cuenta?</span>
          <a href="#" className="nav-a" style={{ textDecoration: 'underline', opacity: 0.8 }}>Inicia sesión</a>
          <Link href="/dashboard" className="btn-blue-sm">¡Empezamos!</Link>
        </div>
      </nav>

      {/* BANNER — fino */}
      <div className="banner" style={{ position: 'fixed', top: 68, left: 0, right: 0, zIndex: 200, background: BLUE_DARK, padding: '7px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, willChange: 'transform, opacity' }}>
        <span style={{ background: 'rgba(255,255,255,0.25)', color: 'white', fontSize: 11, fontWeight: 600, borderRadius: 6, padding: '1px 8px', fontFamily: F }}>Nuevo</span>
        <span style={{ fontSize: 13, color: 'white', fontWeight: 500, fontFamily: F }}>Planifica tu boda.</span>
        <a href="#" style={{ fontSize: 13, color: 'white', fontWeight: 600, textDecoration: 'underline', fontFamily: F }}>Pruébalo</a>
      </div>

      {/* HERO */}
      <section className="hero-sec" style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 104 }}>
        <video className="hero-bg-video" autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '115%', objectFit: 'cover', marginTop: '-7%', filter: 'brightness(0.72)' }}>
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.22) 100%)' }} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 860, margin: '0 auto' }}>
          <h1 style={{ fontFamily: F, fontSize: 'clamp(2.2rem,5vw,4.5rem)', fontWeight: 600, color: 'white', lineHeight: 1.05, marginBottom: 28, letterSpacing: '-0.02em' }}>
            La planificación de<br />la boda comienza aquí.
          </h1>
          <p style={{ fontFamily: F, fontSize: 'clamp(15px,1.8vw,19px)', color: 'rgba(255,255,255,0.88)', maxWidth: 520, margin: '0 auto 44px', lineHeight: 1.75 }}>
            Desde la finca y el catering hasta la web de boda y los invitados — mylov3 está con vosotros en cada paso del camino.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard" className="btn-light">¡Empezamos!</Link>
            <Link href="/dashboard" className="btn-blue">Ver demo</Link>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
          <button className="scroll-btn" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>↓</button>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ overflow: 'hidden', borderTop: `1px solid ${BLUE}`, borderBottom: `1px solid ${BLUE}`, padding: '18px 0', background: 'white' }}>
        <div className="ticker">
          {['Invitados','·','Presupuesto','·','Mesas','·','Cronograma','·','Proveedores','·','Web de boda','·','Notas','·','Inspiración','·','Invitados','·','Presupuesto','·','Mesas','·','Cronograma','·','Proveedores','·','Web de boda','·','Notas','·','Inspiración','·'].map((t, i) => (
            <span key={i} style={{ fontFamily: F, fontSize: 13, color: t === '·' ? '#b8dff0' : '#aac4d8', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* FEATURES GRID */}
      <section style={{ background: 'white' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr' }}>
          <div style={{ padding: '64px 40px', borderRight: `1px solid ${BLUE}`, position: 'sticky', top: 68, height: 'fit-content' }}>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(1.8rem,2.5vw,2.4rem)', fontWeight: 600, color: INK, lineHeight: 1.2, marginBottom: 16 }}>
              Todo lo que necesitáis para planificar la boda que queréis
            </h2>
            <p style={{ fontFamily: F, fontSize: 15, color: '#7a9ab5', lineHeight: 1.7 }}>Para todos los días del camino</p>
          </div>
          <div className="feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridAutoRows: '1fr' }}>
            {features.map((f, i) => (
              <div key={f.title} className="feat-card" style={{ borderRight: (i + 1) % 3 === 0 ? 'none' : `1px solid ${BLUE}`, borderBottom: i < 3 ? `1px solid ${BLUE}` : 'none' }}>
                <div className="feat-card-title">{f.title} <span style={{ color: BLUE_DARK }}>→</span></div>
                <p className="feat-card-sub">{f.sub}</p>
                <div style={{ position: 'relative', marginTop: 16, flex: 1 }}>
                  <img src={f.img} alt={f.title} style={{ width: '100%', height: '100%', minHeight: 200, objectFit: 'cover', borderRadius: 18, display: 'block' }} />
                  <div className="feat-badge">{f.badge}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE SHOWCASE — left phone mockup scrolls, right sticky with 6 subapartados en negrita */}
      <section style={{ background: 'white', borderTop: `1px solid ${BLUE}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: '1fr 220px', gap: 80, alignItems: 'start' }}>

          {/* LEFT — scrolls, phone mockup per feature */}
          <div>
            {features.map((f, i) => (
              <div key={f.title} className="mobile-step" id={`mobile-${i}`} style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
                <div style={{ width: 240, borderRadius: 36, border: `10px solid ${INK}`, background: INK, boxShadow: '0 30px 80px rgba(26,58,82,0.25)' }}>
                  <div style={{ background: 'white', borderRadius: 26, overflow: 'hidden' }}>
                    <img src={f.img} alt={f.title} style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — sticky, 6 subapartados en negrita según scroll */}
          <div style={{ position: 'sticky', top: '35vh', alignSelf: 'start' }}>
            <div style={{ position: 'relative', paddingLeft: 22, borderLeft: `2px solid ${BLUE}` }}>
              <div style={{
                position: 'absolute',
                left: -2,
                top: `${(activeMobileDot / features.length) * 100}%`,
                width: 2,
                height: `${(1 / features.length) * 100}%`,
                background: BLUE_DARK,
                borderRadius: 2,
                transition: 'top 0.45s cubic-bezier(.16,1,.3,1)',
              }} />
              {features.map((f, i) => (
                <button
                  key={i}
                  className="deep-nav-btn"
                  onClick={() => document.getElementById(`mobile-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                >
                  <div className="deep-dot" style={{
                    background: activeMobileDot === i ? BLUE_DARK : BLUE,
                    transform: activeMobileDot === i ? 'scale(1.7)' : 'scale(1)',
                  }} />
                  <span style={{
                    fontFamily: F,
                    fontSize: activeMobileDot === i ? 14 : 12,
                    fontWeight: activeMobileDot === i ? 600 : 400,
                    color: activeMobileDot === i ? INK : '#aac4d8',
                    transition: 'all 0.3s',
                  }}>{f.title}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* DEEP FEATURES — left scrolls, right sticky */}
      <section style={{ background: '#fafcff', borderTop: `1px solid ${BLUE}`, borderBottom: `1px solid ${BLUE}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: '1fr 220px', gap: 80, alignItems: 'start' }}>

          {/* LEFT — scrolls normally */}
          <div>
            {deepFeatures.map((f, i) => (
              <div key={f.title} className="deep-item" id={`deep-${i}`} style={{ padding: '80px 0', borderBottom: i < deepFeatures.length - 1 ? `1px solid ${BLUE}` : 'none' }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 24 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: F, fontSize: 'clamp(1.6rem,2.5vw,2.2rem)', fontWeight: 600, color: INK, lineHeight: 1.2, marginBottom: 16 }}>{f.title}</h3>
                <p style={{ fontFamily: F, fontSize: 16, color: '#5a7a9a', lineHeight: 1.85, marginBottom: 28 }}>{f.body}</p>
                <span style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: BLUE_DARK, letterSpacing: '0.14em' }}>{f.tag}</span>
              </div>
            ))}
          </div>

          {/* RIGHT — sticky, stays fixed while left scrolls */}
          <div style={{ position: 'sticky', top: '35vh', alignSelf: 'start' }}>
            <div style={{ position: 'relative', paddingLeft: 22, borderLeft: `2px solid ${BLUE}` }}>
              {/* progress bar */}
              <div style={{
                position: 'absolute',
                left: -2,
                top: `${(activeFeatureDot / deepFeatures.length) * 100}%`,
                width: 2,
                height: `${(1 / deepFeatures.length) * 100}%`,
                background: BLUE_DARK,
                borderRadius: 2,
                transition: 'top 0.45s cubic-bezier(.16,1,.3,1)',
              }} />
              {deepFeatures.map((f, i) => (
                <button
                  key={i}
                  className="deep-nav-btn"
                  onClick={() => document.getElementById(`deep-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                >
                  <div className="deep-dot" style={{
                    background: activeFeatureDot === i ? BLUE_DARK : BLUE,
                    transform: activeFeatureDot === i ? 'scale(1.7)' : 'scale(1)',
                  }} />
                  <span style={{
                    fontFamily: F,
                    fontSize: activeFeatureDot === i ? 14 : 12,
                    fontWeight: activeFeatureDot === i ? 600 : 400,
                    color: activeFeatureDot === i ? INK : '#aac4d8',
                    transition: 'all 0.3s',
                  }}>{f.title}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* DASHBOARD DEMO */}
      <section style={{ padding: '80px 40px 120px', background: BLUE_LIGHT }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ fontFamily: F, display: 'inline-block', fontSize: 12, color: BLUE_DARK, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>Demo en vivo</span>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400, color: INK, lineHeight: 1.1 }}>Así es vuestro dashboard</h2>
          </div>
          <div className="dash-wrap floating" style={{ background: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 40px 120px rgba(142,197,247,0.12)', border: `1px solid ${BLUE}` }}>
            <div style={{ background: BLUE_LIGHT, borderBottom: `1px solid ${BLUE}`, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
              </div>
              <div style={{ flex: 1, background: BLUE, borderRadius: 8, padding: '4px 12px', fontSize: 11, color: '#7ab8d0', textAlign: 'center', fontFamily: F }}>mylov3.app/dashboard</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', minHeight: 400 }}>
              <div style={{ background: BLUE_LIGHT, borderRight: `1px solid ${BLUE}`, padding: '20px 12px' }}>
                <img src="/logo.png" alt="" style={{ height: 18, marginBottom: 28, marginLeft: 8, filter: 'brightness(0) saturate(100%) invert(62%) sepia(40%) saturate(400%) hue-rotate(180deg) brightness(1.1)' }} />
                {[{icon:'⊞',l:'Resumen',a:true},{icon:'☑',l:'Tareas'},{icon:'€',l:'Presupuesto'},{icon:'♡',l:'Invitados'},{icon:'◉',l:'Mesas'},{icon:'📅',l:'Cronograma'}].map(n => (
                  <div key={n.l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 12, marginBottom: 2, background: n.a ? BLUE : 'transparent', cursor: 'pointer' }}>
                    <span style={{ fontSize: 13, color: n.a ? BLUE_DARK : '#aac4d8' }}>{n.icon}</span>
                    <span style={{ fontFamily: F, fontSize: 13, color: n.a ? INK : '#aac4d8', fontWeight: n.a ? 600 : 400 }}>{n.l}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: 20, background: 'white' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16 }}>
                  {[{l:'Presupuesto',v:'17.300 €',s:'3.500 € restantes'},{l:'Tareas',v:'2/7',s:'5 pendientes'},{l:'Invitados',v:'48',s:'32 confirmados'},{l:'Días',v:'127',s:'para el gran día'}].map(c => (
                    <div key={c.l} style={{ background: BLUE_LIGHT, border: `1px solid ${BLUE}`, borderRadius: 16, padding: '12px 14px' }}>
                      <p style={{ fontFamily: F, fontSize: 10, color: '#7ab8d0', marginBottom: 6 }}>{c.l}</p>
                      <p style={{ fontFamily: F, fontSize: 18, fontWeight: 600, color: INK, marginBottom: 2 }}>{c.v}</p>
                      <p style={{ fontFamily: F, fontSize: 10, color: BLUE_DARK }}>{c.s}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div style={{ background: BLUE_LIGHT, border: `1px solid ${BLUE}`, borderRadius: 16, padding: 14 }}>
                    <p style={{ fontFamily: F, fontSize: 11, color: '#7ab8d0', marginBottom: 12 }}>Próximas tareas</p>
                    {[{t:'Reservar la finca',done:true},{t:'Contratar fotógrafo',done:true},{t:'Enviar invitaciones',done:false},{t:'Elegir el menú',done:false},{t:'Prueba del vestido',done:false}].map(t => (
                      <div key={t.t} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 14, height: 14, borderRadius: 5, flexShrink: 0, background: t.done ? BLUE_DARK : 'transparent', border: t.done ? 'none' : `1px solid ${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {t.done && <span style={{ fontSize: 8, color: 'white' }}>✓</span>}
                        </div>
                        <span style={{ fontFamily: F, fontSize: 12, color: t.done ? '#aac4d8' : INK, textDecoration: t.done ? 'line-through' : 'none' }}>{t.t}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: BLUE_LIGHT, border: `1px solid ${BLUE}`, borderRadius: 16, padding: 14 }}>
                    <p style={{ fontFamily: F, fontSize: 11, color: '#7ab8d0', marginBottom: 12 }}>Presupuesto</p>
                    {[{cat:'Catering',est:8000,paid:3000},{cat:'Finca',est:5000,paid:500},{cat:'Fotografía',est:2800,paid:2800},{cat:'Flores',est:1500,paid:0}].map(b => (
                      <div key={b.cat} style={{ marginBottom: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontFamily: F, fontSize: 12, color: INK }}>{b.cat}</span>
                          <span style={{ fontFamily: F, fontSize: 10, color: '#7ab8d0' }}>{b.paid.toLocaleString('es-ES')} / {b.est.toLocaleString('es-ES')} €</span>
                        </div>
                        <div style={{ height: 4, background: BLUE, borderRadius: 999 }}>
                          <div style={{ height: '100%', width: `${Math.round(b.paid/b.est*100)}%`, background: BLUE_DARK, borderRadius: 999 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/dashboard" className="btn-blue" style={{ fontSize: 15, padding: '14px 40px' }}>Abrir mi dashboard →</Link>
          </div>
        </div>
      </section>

      {/* PARALLAX QUOTE */}
      <section style={{ position: 'relative', height: '55vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1800&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '130%', objectFit: 'cover', marginTop: '-15%', filter: 'brightness(0.55)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(225,246,255,0.1)' }} />
        <div className="sec-reveal" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 40px' }}>
          <p style={{ fontFamily: F, fontSize: 'clamp(2rem,5vw,4.5rem)', fontWeight: 400, fontStyle: 'italic', color: 'white', lineHeight: 1.2, marginBottom: 32, textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}>
            "El día más bonito<br />empieza con el mejor plan"
          </p>
          <Link href="/dashboard" className="btn-blue">Empezar ahora</Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '120px 40px', background: 'white' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400, color: INK, lineHeight: 1.1, marginBottom: 12 }}>Parejas que ya lo vivieron</h2>
            <p style={{ fontFamily: F, fontSize: 15, color: '#7ab8d0' }}>+2.400 bodas planificadas con mylov3</p>
          </div>
          <div className="sec-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { q: 'Hizo que todo fuera tan fácil. Pudimos disfrutar cada momento sin preocupaciones.', n: 'María & Lucas', d: 'Abril 2024' },
              { q: 'La mejor herramienta para planificar nuestra boda. No podemos imaginar haberlo hecho sin mylov3.', n: 'Ana & Diego', d: 'Junio 2024' },
              { q: 'Todo en un solo lugar, hermoso y completísimo. Lo recomendamos a todas las parejas.', n: 'Sofía & Tomás', d: 'Mayo 2024' },
            ].map(r => (
              <div key={r.n} className="review-card">
                <div style={{ display: 'flex', gap: 3, marginBottom: 18 }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: BLUE_DARK, fontSize: 16 }}>★</span>)}
                </div>
                <p style={{ fontFamily: F, fontSize: 15, color: '#4a7a9a', lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>"{r.q}"</p>
                <p style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: INK }}>{r.n}</p>
                <p style={{ fontFamily: F, fontSize: 12, color: '#7ab8d0' }}>{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '120px 40px', background: BLUE_LIGHT, textAlign: 'center' }}>
        <div className="sec-reveal" style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontSize: 36, color: BLUE_DARK, marginBottom: 24 }}>♡</div>
          <h2 style={{ fontFamily: F, fontSize: 'clamp(2.5rem,5vw,5rem)', fontWeight: 400, color: INK, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 20 }}>
            Vuestra historia de amor merece el mejor comienzo
          </h2>
          <p style={{ fontFamily: F, fontSize: 16, color: '#7a9ab5', marginBottom: 48, lineHeight: 1.8 }}>Gratis para siempre. Sin tarjeta de crédito.</p>
          <Link href="/dashboard" className="btn-blue">Empezar a planificar gratis</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${BLUE}`, padding: '32px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white' }}>
        <img src="/logo.png" alt="mylov3" style={{ height: 22, display: 'block', filter: 'brightness(0) saturate(100%) invert(62%) sepia(40%) saturate(400%) hue-rotate(180deg) brightness(1.1)' }} />
        <p style={{ fontFamily: F, fontSize: 13, color: '#7ab8d0' }}>Hecho con ♡ para parejas que quieren disfrutar del proceso</p>
        <p style={{ fontFamily: F, fontSize: 12, color: '#a0d4e8' }}>2025</p>
      </footer>
    </main>
  )
}
