'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const BLUE = '#5bb8e8'
const BLUE_LIGHT = '#e1f6ff'
const INK = '#1a3a52'

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
        gsap.to('.banner', { yPercent: -120, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero-sec', start: 'top top', end: '15% top', scrub: true } })
        gsap.to('.hero-content', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.hero-sec', start: 'top top', end: 'bottom top', scrub: true } })
        gsap.to('.hero-bg-video', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: '.hero-sec', start: 'top top', end: 'bottom top', scrub: true } })
        gsap.fromTo('.dash-wrap', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.dash-wrap', start: 'top 85%' } })
        gsap.fromTo('.feat-c', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.feats', start: 'top 80%' } })
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
    <main style={{ fontFamily: "'Inter',sans-serif", overflowX: 'hidden', background: '#f7fbff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#e1f6ff;padding:5px;}
        main{border-radius:20px;overflow:hidden;}
        .nav-a{font-size:14px;color:${INK};text-decoration:none;opacity:0.7;transition:opacity 0.2s;}
        .nav-a:hover{opacity:1;}
        .btn-light{background:rgba(255,255,255,0.92);color:${INK};border:none;border-radius:999px;padding:14px 36px;font-size:15px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-block;transition:all 0.2s;box-shadow:0 2px 12px rgba(0,0,0,0.1);}
        .btn-light:hover{background:white;transform:translateY(-1px);box-shadow:0 4px 20px rgba(0,0,0,0.15);}
        .btn-blue{background:${BLUE};color:white;border:none;border-radius:999px;padding:14px 36px;font-size:15px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-block;transition:all 0.2s;box-shadow:0 4px 20px rgba(91,184,232,0.4);}
        .btn-blue:hover{transform:translateY(-1px);box-shadow:0 8px 32px rgba(91,184,232,0.6);}
        .btn-blue-sm{background:${BLUE};color:white;border:none;border-radius:999px;padding:10px 24px;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-block;transition:all 0.2s;}
        .btn-blue-sm:hover{opacity:0.9;transform:translateY(-1px);}
        .feat-c{background:white;border:1px solid rgba(91,184,232,0.2);border-radius:20px;padding:32px;transition:all 0.3s;}
        .feat-c:hover{border-color:rgba(91,184,232,0.4);transform:translateY(-4px);box-shadow:0 16px 48px rgba(91,184,232,0.1);}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .floating{animation:float 6s ease-in-out infinite;}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .ticker{display:flex;gap:48px;animation:ticker 24s linear infinite;width:max-content;align-items:center;}
        .scroll-btn{width:44px;height:44px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.6);background:transparent;display:flex;align-items:center;justify-content:center;cursor:pointer;color:white;font-size:18px;transition:all 0.2s;}
        .scroll-btn:hover{background:rgba(255,255,255,0.1);}
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300, background: scrollY > 20 ? 'rgba(255,255,255,0.98)' : 'white', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '0 48px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.3s', backdropFilter: 'blur(12px)' }}>
        <Link href="/"><img src="/logo.png" alt="mylov3" style={{ height: 26, display: 'block' }} /></Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <span style={{ fontSize: 14, color: INK, opacity: 0.6 }}>¿Ya tienes cuenta?</span>
          <a href="#" className="nav-a" style={{ textDecoration: 'underline', opacity: 0.8 }}>Inicia sesión</a>
          <Link href="/dashboard" className="btn-blue-sm">¡Empezamos!</Link>
        </div>
      </nav>

      {/* BANNER */}
      <div className="banner" style={{ position: 'fixed', top: 68, left: 0, right: 0, zIndex: 200, background: BLUE, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, willChange: 'transform, opacity' }}>
        <span style={{ background: 'rgba(255,255,255,0.25)', color: 'white', fontSize: 11, fontWeight: 700, borderRadius: 4, padding: '2px 8px', letterSpacing: '0.04em' }}>Nuevo</span>
        <span style={{ fontSize: 13, color: 'white', fontWeight: 500 }}>Planifica tu boda.</span>
        <a href="#" style={{ fontSize: 13, color: 'white', fontWeight: 700, textDecoration: 'underline' }}>Pruébalo</a>
      </div>

      {/* HERO */}
      <section className="hero-sec" style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 112 }}>
        <video className="hero-bg-video" autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '115%', objectFit: 'cover', marginTop: '-7%', filter: 'brightness(0.48)' }}>
          <source src="https://assets.mixkit.co/videos/11891/11891-720.mp4" type="video/mp4" />
          <img src="https://images.unsplash.com/photo-1605985687770-2e2e82c9b5f1?w=1800&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)' }} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 860, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.2rem,5vw,4.5rem)', fontWeight: 600, color: 'white', lineHeight: 1.05, marginBottom: 28, letterSpacing: '-0.02em' }}>
            La planificación de<br />la boda comienza aquí.
          </h1>
          <p style={{ fontSize: 'clamp(14px,1.8vw,18px)', color: 'rgba(255,255,255,0.85)', maxWidth: 520, margin: '0 auto 44px', lineHeight: 1.75 }}>
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
      <div style={{ overflow: 'hidden', borderTop: `1px solid ${BLUE_LIGHT}`, borderBottom: `1px solid ${BLUE_LIGHT}`, padding: '18px 0', background: 'white' }}>
        <div className="ticker">
          {['Invitados','·','Presupuesto','·','Mesas','·','Cronograma','·','Proveedores','·','Web de boda','·','Notas','·','Inspiración','·','Invitados','·','Presupuesto','·','Mesas','·','Cronograma','·','Proveedores','·','Web de boda','·','Notas','·','Inspiración','·'].map((t, i) => (
            <span key={i} style={{ fontSize: 12, color: t === '·' ? '#b8dff0' : '#aac4d8', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section style={{ padding: '120px 40px', background: '#f7fbff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-reveal" style={{ marginBottom: 72, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'end' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400, color: INK, lineHeight: 1.1, letterSpacing: '-0.02em' }}>Todo en un<br />solo lugar</h2>
            <p style={{ fontSize: 15, color: '#7a9ab5', lineHeight: 1.85, paddingBottom: 4 }}>Sin hojas de cálculo. Sin apps separadas. Sin estrés. Cada herramienta diseñada para que disfrutéis del proceso.</p>
          </div>
          <div className="feats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {[
              { icon: '♡', t: 'Invitados', d: 'RSVPs, menús y asignación de mesas. Todo junto.' },
              { icon: '€', t: 'Presupuesto', d: 'Controla cada gasto y recibe alertas antes de pasarte.' },
              { icon: '⊞', t: 'Mesas', d: 'Arrastra y suelta. El plano más sencillo que existe.' },
              { icon: '📅', t: 'Cronograma', d: 'Cuenta atrás e hitos. Nunca os olvidaréis de nada.' },
              { icon: '◎', t: 'Proveedores', d: 'Fotógrafo, catering, DJ. Estado y presupuesto de cada uno.' },
              { icon: '✦', t: 'Web de boda', d: 'Una página bonita para vuestros invitados. Gratis.' },
            ].map(f => (
              <div key={f.t} className="feat-c">
                <div style={{ fontSize: 24, marginBottom: 20, color: BLUE }}>{f.icon}</div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: INK, marginBottom: 10, fontWeight: 400 }}>{f.t}</p>
                <p style={{ fontSize: 13, color: '#7a9ab5', lineHeight: 1.75 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD DEMO */}
      <section style={{ padding: '60px 40px 120px', background: BLUE_LIGHT }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ display: 'inline-block', fontSize: 11, color: BLUE, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>Demo en vivo</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400, color: INK, lineHeight: 1.1 }}>Así es vuestro dashboard</h2>
          </div>
          <div className="dash-wrap floating" style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 40px 120px rgba(91,184,232,0.12)', border: `1px solid ${BLUE_LIGHT}` }}>
            <div style={{ background: BLUE_LIGHT, borderBottom: `1px solid rgba(91,184,232,0.15)`, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
              </div>
              <div style={{ flex: 1, background: 'rgba(91,184,232,0.1)', borderRadius: 6, padding: '4px 12px', fontSize: 11, color: '#7ab8d0', textAlign: 'center' }}>mylov3.app/dashboard</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', minHeight: 400 }}>
              <div style={{ background: BLUE_LIGHT, borderRight: `1px solid rgba(91,184,232,0.15)`, padding: '20px 12px' }}>
                <img src="/logo.png" alt="" style={{ height: 18, marginBottom: 28, marginLeft: 8 }} />
                {[{icon:'⊞',l:'Resumen',a:true},{icon:'☑',l:'Tareas'},{icon:'€',l:'Presupuesto'},{icon:'♡',l:'Invitados'},{icon:'◉',l:'Mesas'},{icon:'📅',l:'Cronograma'}].map(n => (
                  <div key={n.l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, marginBottom: 2, background: n.a ? 'rgba(91,184,232,0.15)' : 'transparent', cursor: 'pointer' }}>
                    <span style={{ fontSize: 13, color: n.a ? BLUE : '#aac4d8' }}>{n.icon}</span>
                    <span style={{ fontSize: 12, color: n.a ? INK : '#aac4d8', fontWeight: n.a ? 600 : 400 }}>{n.l}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: 20, background: 'white' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16 }}>
                  {[{l:'Presupuesto',v:'17.300 €',s:'3.500 € restantes'},{l:'Tareas',v:'2/7',s:'5 pendientes'},{l:'Invitados',v:'48',s:'32 confirmados'},{l:'Días',v:'127',s:'para el gran día'}].map(c => (
                    <div key={c.l} style={{ background: BLUE_LIGHT, border: `1px solid rgba(91,184,232,0.2)`, borderRadius: 12, padding: '12px 14px' }}>
                      <p style={{ fontSize: 10, color: '#7ab8d0', marginBottom: 6 }}>{c.l}</p>
                      <p style={{ fontSize: 18, fontWeight: 600, color: INK, marginBottom: 2 }}>{c.v}</p>
                      <p style={{ fontSize: 10, color: BLUE }}>{c.s}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div style={{ background: BLUE_LIGHT, border: `1px solid rgba(91,184,232,0.15)`, borderRadius: 12, padding: 14 }}>
                    <p style={{ fontSize: 11, color: '#7ab8d0', marginBottom: 12 }}>Próximas tareas</p>
                    {[{t:'Reservar la finca',done:true},{t:'Contratar fotógrafo',done:true},{t:'Enviar invitaciones',done:false},{t:'Elegir el menú',done:false},{t:'Prueba del vestido',done:false}].map(t => (
                      <div key={t.t} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 14, height: 14, borderRadius: 4, flexShrink: 0, background: t.done ? BLUE : 'transparent', border: t.done ? 'none' : `1px solid rgba(91,184,232,0.4)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {t.done && <span style={{ fontSize: 8, color: 'white' }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 11, color: t.done ? '#aac4d8' : INK, textDecoration: t.done ? 'line-through' : 'none' }}>{t.t}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: BLUE_LIGHT, border: `1px solid rgba(91,184,232,0.15)`, borderRadius: 12, padding: 14 }}>
                    <p style={{ fontSize: 11, color: '#7ab8d0', marginBottom: 12 }}>Presupuesto</p>
                    {[{cat:'Catering',est:8000,paid:3000},{cat:'Finca',est:5000,paid:500},{cat:'Fotografía',est:2800,paid:2800},{cat:'Flores',est:1500,paid:0}].map(b => (
                      <div key={b.cat} style={{ marginBottom: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 11, color: INK }}>{b.cat}</span>
                          <span style={{ fontSize: 10, color: '#7ab8d0' }}>{b.paid.toLocaleString('es-ES')} / {b.est.toLocaleString('es-ES')} €</span>
                        </div>
                        <div style={{ height: 3, background: 'rgba(91,184,232,0.15)', borderRadius: 2 }}>
                          <div style={{ height: '100%', width: `${Math.round(b.paid/b.est*100)}%`, background: BLUE, borderRadius: 2 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/dashboard" className="btn-blue-sm" style={{ fontSize: 15, padding: '14px 40px' }}>Abrir mi dashboard →</Link>
          </div>
        </div>
      </section>

      {/* PARALLAX QUOTE */}
      <section style={{ position: 'relative', height: '55vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1800&q=80" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '130%', objectFit: 'cover', marginTop: '-15%', filter: 'brightness(0.55)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(225,246,255,0.1)' }} />
        <div className="sec-reveal" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 40px' }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,5vw,4.5rem)', fontWeight: 400, fontStyle: 'italic', color: 'white', lineHeight: 1.2, marginBottom: 32, textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}>
            "El día más bonito<br />empieza con el mejor plan"
          </p>
          <Link href="/dashboard" className="btn-blue">Empezar ahora</Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '120px 40px', background: 'white' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400, color: INK, lineHeight: 1.1, marginBottom: 12 }}>Parejas que ya lo vivieron</h2>
            <p style={{ fontSize: 14, color: '#7ab8d0' }}>+2.400 bodas planificadas con mylov3</p>
          </div>
          <div className="sec-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {[
              { q: 'Hizo que todo fuera tan fácil. Pudimos disfrutar cada momento sin preocupaciones.', n: 'María & Lucas', d: 'Abril 2024' },
              { q: 'La mejor herramienta para planificar nuestra boda. No podemos imaginar haberlo hecho sin mylov3.', n: 'Ana & Diego', d: 'Junio 2024' },
              { q: 'Todo en un solo lugar, hermoso y completísimo. Lo recomendamos a todas las parejas.', n: 'Sofía & Tomás', d: 'Mayo 2024' },
            ].map(r => (
              <div key={r.n} style={{ background: BLUE_LIGHT, border: `1px solid rgba(91,184,232,0.2)`, borderRadius: 20, padding: 28 }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 18 }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: BLUE, fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ fontSize: 14, color: '#4a7a9a', lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>"{r.q}"</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: INK }}>{r.n}</p>
                <p style={{ fontSize: 11, color: '#7ab8d0' }}>{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '120px 40px', background: BLUE_LIGHT, textAlign: 'center' }}>
        <div className="sec-reveal" style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontSize: 32, color: BLUE, marginBottom: 24 }}>♡</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,5vw,5rem)', fontWeight: 400, color: INK, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 20 }}>
            Vuestra historia de amor merece el mejor comienzo
          </h2>
          <p style={{ fontSize: 15, color: '#7a9ab5', marginBottom: 48, lineHeight: 1.8 }}>Gratis para siempre. Sin tarjeta de crédito.</p>
          <Link href="/dashboard" className="btn-blue">Empezar a planificar gratis</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${BLUE_LIGHT}`, padding: '32px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white' }}>
        <img src="/logo.png" alt="mylov3" style={{ height: 22, display: 'block' }} />
        <p style={{ fontSize: 12, color: '#7ab8d0' }}>Hecho con ♡ para parejas que quieren disfrutar del proceso</p>
        <p style={{ fontSize: 11, color: '#a0d4e8' }}>2025</p>
      </footer>
    </main>
  )
}
