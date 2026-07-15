'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { F, BLUE, BLUE_DARK, INK, TEXT_PRIMARY } from '@/lib/constants'

const BLUE_LIGHT = '#efe9e3'
const NEUTRAL = '#faf9f7'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const s1 = document.createElement('script')
    s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
    s1.onload = () => {
      const s2 = document.createElement('script')
      s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'
      s2.onload = () => {
        const { gsap, ScrollTrigger } = window as any
        gsap.registerPlugin(ScrollTrigger)

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

  return (
    <main style={{ fontFamily: F, background: NEUTRAL }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: ${NEUTRAL}; padding: 0; margin: 0; }
        .nav-a { font-size: 14px; color: ${INK}; text-decoration: none; opacity: 0.7; transition: opacity 0.2s; font-family: ${F}; }
        .nav-a:hover { opacity: 1; }
        .footer-a { display: block; font-family: ${F}; font-size: 14px; color: #6b5a4a; text-decoration: none; margin-bottom: 14px; transition: color 0.2s; }
        .footer-a:hover { color: white; }
        .btn-light { background: rgba(255,255,255,0.92); color: ${INK}; border: none; border-radius: 999px; padding: 14px 36px; font-size: 16px; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; font-family: ${F}; }
        .btn-light:hover { background: white; transform: translateY(-1px); }
        .btn-blue { background: ${BLUE_DARK}; color: white; border: none; border-radius: 999px; padding: 14px 36px; font-size: 16px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; font-family: ${F}; }
        .btn-blue:hover { transform: translateY(-1px); }
        .btn-blue-sm { background: ${BLUE_DARK}; color: white; border: none; border-radius: 999px; padding: 10px 24px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; transition: all 0.2s; font-family: ${F}; }
        .btn-blue-sm:hover { opacity: 0.9; transform: translateY(-1px); }
        .feat-card { padding: 32px 28px; background: white; transition: background 0.2s; cursor: pointer; display: flex; flex-direction: column; }
        .feat-card:hover { background: #faf8f2; }
        .feat-card-title { font-family: ${F}; font-size: 18px; font-weight: 500; color: ${INK}; display: flex; align-items: center; gap: 6px; margin-bottom: 6px; }
        .feat-card-sub { font-family: ${F}; font-size: 14px; color: #8a7358; line-height: 1.5; min-height: 44px; }
        .feat-badge { display: inline-flex; align-items: center; gap: 6px; background: white; border: 1px solid #eee; border-radius: 4px; padding: 7px 16px; font-size: 12px; font-weight: 500; color: ${INK}; position: absolute; bottom: 14px; left: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); white-space: nowrap; font-family: ${F}; }
        .feat-grid { will-change: transform, opacity; }
        .deep-nav-btn { background: none; border: none; cursor: pointer; text-align: left; padding: 10px 0; display: flex; align-items: center; gap: 12px; width: 100%; transition: all 0.25s; }
        .deep-nav-btn:hover span { color: ${INK} !important; }
        .deep-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; transition: all 0.35s ease; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .floating { animation: float 6s ease-in-out infinite; }
        .scroll-btn { width: 48px; height: 48px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.6); background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white; font-size: 18px; transition: all 0.2s; }
        .scroll-btn:hover { background: rgba(255,255,255,0.1); }
        .review-card { background: ${BLUE_LIGHT}; border: 1px solid ${BLUE}; border-radius: 28px; padding: 32px; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300, background: NEUTRAL, borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '0 48px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(12px)' }}>
        <Link href="/" style={{ fontFamily: F, fontSize: 26, fontStyle: 'italic', fontWeight: 700, color: '#898a76', textDecoration: 'none' }}>mylov3</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {[{ l: 'Inicio', a: true }, { l: 'Nosotros' }, { l: 'Servicios' }, { l: 'Precios' }, { l: 'Inspiración' }, { l: 'Contacto' }].map(n => (
            <a key={n.l} href="#" style={{ fontFamily: F, fontSize: 11, letterSpacing: '0.01em', textTransform: 'uppercase', textDecoration: 'none', color: n.a ? BLUE_DARK : INK, opacity: n.a ? 1 : 0.65, fontWeight: n.a ? 600 : 500 }}>{n.l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Link href="/dashboard" style={{ fontFamily: F, fontSize: 11, letterSpacing: '0.01em', textTransform: 'uppercase', color: INK, textDecoration: 'none' }}>Iniciar sesión</Link>
          <Link href="/start" style={{ fontFamily: F, fontSize: 11, letterSpacing: '0.01em', textTransform: 'uppercase', color: BLUE_DARK, border: `1px solid ${BLUE_DARK}`, borderRadius: 999, padding: '10px 22px', textDecoration: 'none' }}>Empezar</Link>
        </div>
      </nav>

      {/* HERO — flat-lay de sobre y flores */}
      <section className="hero-sec" style={{ position: 'relative', minHeight: '82vh', overflow: 'hidden', paddingTop: 68, background: NEUTRAL, display: 'flex', alignItems: 'center' }}>
        <img src="/banner-envelope.png" alt="" style={{ position: 'absolute', top: 68, left: 0, right: 0, bottom: 0, width: '100%', height: 'calc(100% - 68px)', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', top: 68, left: 0, bottom: 0, width: '52%', background: 'linear-gradient(90deg, rgba(250,249,247,0.85) 0%, rgba(250,249,247,0.55) 55%, rgba(250,249,247,0) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 64px 0 84px', width: '100%' }}>
          <div style={{ maxWidth: 480 }}>
            <span style={{ fontFamily: F, fontSize: 12, letterSpacing: '0.01em', textTransform: 'uppercase', color: BLUE_DARK, fontWeight: 600 }}>Planificamos. Vosotros celebráis.</span>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 500, lineHeight: 1.15, margin: '18px 0 22px' }}>
              <span style={{ color: '#5f6050' }}>Planifica tu boda,</span><br /><i style={{ color: '#898a76' }}>sé tu wedding planner</i>
            </h2>
            <p style={{ fontFamily: F, fontSize: 16, color: '#6b5a4a', lineHeight: 1.7, marginBottom: 32, maxWidth: 400 }}>
              Creamos celebraciones cuidadas e inolvidables, en los lugares más bonitos del mundo.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/start" style={{ fontFamily: F, fontSize: 12, letterSpacing: '0.01em', textTransform: 'uppercase', color: NEUTRAL, background: BLUE_DARK, borderRadius: 999, padding: '15px 30px', textDecoration: 'none', display: 'inline-block', fontWeight: 600 }}>
                ¡Empezamos!
              </Link>
              <Link href="/dashboard" style={{ fontFamily: F, fontSize: 12, letterSpacing: '0.01em', textTransform: 'uppercase', color: TEXT_PRIMARY, background: 'transparent', border: `1px solid ${INK}`, borderRadius: 999, padding: '14px 29px', textDecoration: 'none', display: 'inline-block' }}>
                Ver demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS */}
      <div style={{ padding: '20px 0', background: '#b7b9a2' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', textAlign: 'center' }}>
          {[
            { n: '1200+', l: 'Bodas planificadas', icon: <path d="M4 4h16v16H4zM4 9h16M8 2v4M16 2v4M9 14l2 2 4-4" /> },
            { n: '1500+', l: 'Lugares únicos', icon: <path d="M12 21s-7-6.3-7-11.5A7 7 0 0112 2a7 7 0 017 7.5C19 14.7 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" /> },
            { n: '25+', l: 'Años de experiencia', icon: <path d="M12 20.5s-8-4.9-8-11A5 5 0 0112 6.5 5 5 0 0120 9.5c0 6.1-8 11-8 11z" /> },
            { n: '16+', l: 'Destinos', icon: <><path d="M12 2C9 6 9 10 12 14c3-4 3-8 0-12z" /><path d="M12 14v8M8 22h8" /></> },
          ].map(s => (
            <div key={s.l} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
              <p style={{ fontFamily: F, fontSize: 20, color: 'white' }}>{s.n}</p>
              <p style={{ fontFamily: F, fontSize: 10.5, letterSpacing: '0.01em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SOBRE NOSOTROS + SERVICIOS + PORTFOLIO */}
      <section className="sec-reveal" style={{ background: NEUTRAL, padding: '100px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Fila 1: sobre nosotros + foto + servicios + foto */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 24, marginBottom: 90, alignItems: 'start' }}>
            <div>
              <span style={{ fontFamily: F, fontSize: 11, letterSpacing: '0.01em', textTransform: 'uppercase', color: '#8a7358' }}>Sobre nosotros</span>
              <h3 style={{ fontFamily: F, fontSize: 28, color: TEXT_PRIMARY, lineHeight: 1.2, margin: '14px 0 18px' }}>Tu visión, perfectamente diseñada</h3>
              <p style={{ fontFamily: F, fontSize: 14, color: '#6b5a4a', lineHeight: 1.7, marginBottom: 26 }}>
                Somos una herramienta de planificación de bodas pensada para parejas que quieren celebraciones a medida, con su propia historia y estilo.
              </p>
              <a href="#" style={{ fontFamily: F, fontSize: 11, letterSpacing: '0.01em', textTransform: 'uppercase', color: BLUE_DARK, border: `1px solid ${BLUE_DARK}`, borderRadius: 999, padding: '13px 22px', textDecoration: 'none', display: 'inline-block' }}>Conoce nuestra historia</a>
            </div>

            <div style={{ height: 340 }}>
              <img src="/showcase-1.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div>
              <span style={{ fontFamily: F, fontSize: 11, letterSpacing: '0.01em', textTransform: 'uppercase', color: '#8a7358' }}>Nuestros servicios</span>
              <h3 style={{ fontFamily: F, fontSize: 28, color: TEXT_PRIMARY, lineHeight: 1.2, margin: '14px 0 22px' }}>Experiencias a tu medida</h3>
              {['Planificación completa', 'Planificación parcial', 'Bodas en cualquier destino', 'Diseño y estilismo'].map(s => (
                <a key={s} href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderTop: `1px solid ${BLUE}`, fontFamily: F, fontSize: 14, color: TEXT_PRIMARY, textDecoration: 'none' }}>
                  {s} <span style={{ color: BLUE_DARK }}>→</span>
                </a>
              ))}
            </div>

            <div style={{ height: 340 }}>
              <img src="/showcase-2.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Fila 2: bodas destacadas + 4 fotos */}
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40, alignItems: 'center' }}>
            <div>
              <span style={{ fontFamily: F, fontSize: 11, letterSpacing: '0.01em', textTransform: 'uppercase', color: '#8a7358' }}>Bodas destacadas</span>
              <h3 style={{ fontFamily: F, fontSize: 26, color: TEXT_PRIMARY, lineHeight: 1.25, margin: '14px 0 22px' }}>Historias de amor que tuvimos el honor de acompañar</h3>
              <a href="#" style={{ fontFamily: F, fontSize: 11, letterSpacing: '0.01em', textTransform: 'uppercase', color: BLUE_DARK, border: `1px solid ${BLUE_DARK}`, borderRadius: 999, padding: '13px 22px', textDecoration: 'none', display: 'inline-block' }}>Ver portfolio</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
              {['/showcase-3.png', '/invitados.png', '/detalles.png', '/presupuesto.png'].map(src => (
                <div key={src} style={{ height: 260 }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* TESTIMONIO */}
      <section style={{ background: NEUTRAL, borderTop: `1px solid ${BLUE}`, padding: '32px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span style={{ fontFamily: F, fontSize: 48, color: BLUE_DARK, lineHeight: 1 }}>&ldquo;</span>
            <p style={{ fontFamily: F, fontSize: 17, color: TEXT_PRIMARY, lineHeight: 1.5 }}>
              Cada detalle fue tal y como lo imaginamos.<br />Nuestra boda fue sencillamente mágica.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderLeft: `1px solid ${BLUE}`, paddingLeft: 24 }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src="/invitados.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <p style={{ fontFamily: F, fontSize: 13, letterSpacing: '0.01em', textTransform: 'uppercase', color: TEXT_PRIMARY, fontWeight: 600 }}>María &amp; Lucas</p>
                <p style={{ fontFamily: F, fontSize: 13, color: '#8a7358' }}>Costa Amalfitana, Italia</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ width: 38, height: 38, border: `1px solid ${BLUE_DARK}`, background: 'transparent', color: BLUE_DARK, cursor: 'pointer' }}>←</button>
              <button style={{ width: 38, height: 38, border: `1px solid ${BLUE_DARK}`, background: 'transparent', color: BLUE_DARK, cursor: 'pointer' }}>→</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: BLUE_DARK }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 64px 40px', display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1.3fr', gap: 40 }}>
          <div>
            <div style={{ fontFamily: F, fontSize: 26, fontStyle: 'italic', fontWeight: 700, color: 'white', marginBottom: 14 }}>mylov3</div>
            <p style={{ fontFamily: F, fontSize: 12, letterSpacing: '0.01em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 20 }}>Planificación y diseño de bodas de lujo en el mundo</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { name: 'Instagram', icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/></svg>
                ) },
                { name: 'Pinterest', icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M9 20c.5-2 1.5-6 1.5-6M12 12a3 3 0 103-3"/></svg>
                ) },
                { name: 'Facebook', icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                ) },
              ].map(s => (
                <a key={s.name} href="#" aria-label={s.name} style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none' }}>{s.icon}</a>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontFamily: F, fontSize: 12, letterSpacing: '0.01em', textTransform: 'uppercase', fontWeight: 600, color: 'white', marginBottom: 18 }}>Enlaces rápidos</p>
            {['Sobre nosotros', 'Servicios', 'Portfolio', 'Experiencia', 'Blog', 'Contacto'].map(l => (
              <a key={l} href="#" className="footer-a" style={{ color: 'rgba(255,255,255,0.8)' }}>{l}</a>
            ))}
          </div>

          <div>
            <p style={{ fontFamily: F, fontSize: 12, letterSpacing: '0.01em', textTransform: 'uppercase', fontWeight: 600, color: 'white', marginBottom: 18 }}>Destinos</p>
            {['Italia', 'Francia', 'Grecia', 'España', 'Portugal', 'Todos los destinos'].map(l => (
              <a key={l} href="#" className="footer-a" style={{ color: 'rgba(255,255,255,0.8)' }}>{l}</a>
            ))}
          </div>

          <div>
            <p style={{ fontFamily: F, fontSize: 12, letterSpacing: '0.01em', textTransform: 'uppercase', fontWeight: 600, color: 'white', marginBottom: 18 }}>Creemos algo precioso juntos</p>
            <p style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 22 }}>Cuéntanos sobre vuestra celebración</p>
            <Link href="/start" style={{ fontFamily: F, fontSize: 11, letterSpacing: '0.01em', textTransform: 'uppercase', color: 'white', border: '1px solid rgba(255,255,255,0.6)', borderRadius: 999, padding: '13px 26px', textDecoration: 'none', display: 'inline-block' }}>Empezar ahora</Link>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', padding: '20px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>© 2026 mylov3. Todos los derechos reservados.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" className="footer-a" style={{ marginBottom: 0, color: 'rgba(255,255,255,0.8)' }}>Política de privacidad</a>
            <a href="#" className="footer-a" style={{ marginBottom: 0, color: 'rgba(255,255,255,0.8)' }}>Términos y condiciones</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
