'use client'
import Link from 'next/link'
import { ArrowRight, Clock, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const BLUE = '#8ec5f7'
const DARK = '#2d5a8e'

function ShaderCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const vert = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0, 1); }
    `
    const frag = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_res;

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = noise(i);
        float b = noise(i + vec2(1,0));
        float c = noise(i + vec2(0,1));
        float d = noise(i + vec2(1,1));
        return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
      }

      float fbm(vec2 p) {
        float v = 0.0; float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * smoothNoise(p);
          p *= 2.0; a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_res;
        uv.y = 1.0 - uv.y;

        float t = u_time * 0.14;
        vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(1.7, 9.2) + t * 0.8));
        vec2 r = vec2(fbm(uv + 2.0 * q + vec2(1.7,9.2) + t * 0.5),
                      fbm(uv + 2.0 * q + vec2(8.3,2.8) + t * 0.3));
        float f = fbm(uv + 2.8 * r);

        vec3 colA = vec3(1.0, 1.0, 1.0);
        vec3 colB = vec3(0.93, 0.97, 1.0);
        vec3 colC = vec3(0.97, 0.99, 1.0);
        vec3 colD = vec3(0.90, 0.95, 1.0);

        vec3 col = mix(colA, colB, clamp(f * f * 3.5, 0.0, 1.0));
        col = mix(col, colC, clamp(length(q) * 0.7, 0.0, 1.0));
        col = mix(col, colD, clamp(length(r.x) * 0.5, 0.0, 1.0));

        float grain = (noise(uv * u_res * 0.5 + u_time * 100.0) - 0.5) * 0.018;
        col += grain;

        gl_FragColor = vec4(col, 1.0);
      }
    `

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes = gl.getUniformLocation(prog, 'u_res')

    let raf: number
    const start = performance.now()

    function resize() {
      canvas!.width = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
    }
    resize()
    window.addEventListener('resize', resize)

    function render() {
      const t = (performance.now() - start) / 1000
      gl!.uniform1f(uTime, t)
      gl!.uniform2f(uRes, canvas!.width, canvas!.height)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1, pointerEvents:'none' }} />
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('es-ES', {
      timeZone: 'Europe/Madrid', hour:'2-digit', minute:'2-digit', hour12:false,
    }))
    tick()
    const iv = setInterval(tick, 1000)
    return () => clearInterval(iv)
  }, [])

  return (
    <main style={{ fontFamily:"'Inter',sans-serif", overflowX:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#8ec5f7;padding:5px;}
        main{border-radius:20px;overflow:hidden;}

        .roll-wrap{display:flex;flex-direction:column;overflow:hidden;height:20px;}
        .roll-inner{display:flex;flex-direction:column;transition:transform 0.5s cubic-bezier(0.25,0.1,0.25,1);}
        .btn-group:hover .roll-inner{transform:translateY(-50%);}

        .arrow-c{width:28px;height:28px;border-radius:50%;background:white;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform 0.5s cubic-bezier(0.25,0.1,0.25,1);}
        .btn-group:hover .arrow-c{transform:rotate(-45deg);}

        .btn-pill-dark{background:${DARK};color:white;border:none;border-radius:999px;padding:8px 8px 8px 20px;font-size:13px;font-weight:500;cursor:pointer;display:inline-flex;align-items:center;gap:8px;text-decoration:none;}
        .btn-pill-blue{background:${BLUE};color:white;border:none;border-radius:999px;padding:10px 10px 10px 24px;font-size:14px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:8px;text-decoration:none;}
        .btn-outline-dark{background:transparent;color:${DARK};border:2px solid ${DARK};border-radius:999px;padding:10px 24px;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none;transition:all 0.2s;}
        .btn-outline-dark:hover{background:${DARK};color:white;}

        .nav-a{font-size:14px;color:${DARK};text-decoration:none;transition:color 0.3s;}
        .nav-a:hover{color:#8ec5f7;}

        .card-wrap{border-radius:20px;overflow:hidden;position:relative;cursor:pointer;}
        .card-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.5s cubic-bezier(0.16,1,.3,1);}
        .card-wrap:hover img{transform:scale(1.05);}

        .expand-btn{position:absolute;bottom:14px;left:14px;height:36px;border-radius:999px;overflow:hidden;display:flex;align-items:center;width:36px;transition:width 0.3s ease;}
        .card-wrap:hover .expand-btn{width:152px;}
        .expand-text{font-size:13px;font-weight:500;white-space:nowrap;padding-left:14px;opacity:0;transition:opacity 0.15s ease 0.1s;}
        .card-wrap:hover .expand-text{opacity:1;}

        .mobile-sheet{transform:translateY(100%);transition:transform 0.5s cubic-bezier(0.32,0.72,0,1);}
        .mobile-sheet.open{transform:translateY(0);}
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column', background:'#EEF6FF', overflow:'hidden' }}>
        <ShaderCanvas />

        {/* NAV */}
        <div style={{ position:'relative', zIndex:20, padding:'10px 10px 0' }}>
          <nav style={{ background:'white', borderRadius:999, padding:'5px', display:'flex', alignItems:'center', justifyContent:'space-between', maxWidth:1440, margin:'0 auto', paddingLeft:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:32 }}>
              <Link href="/"><img src="/logo.png" alt="mylov3" style={{ height:26, display:'block' }} /></Link>
              <div style={{ display:'flex', gap:24 }}>
                {['Funciones','Precios','Inspiración','Sobre nosotros'].map(l => (
                  <a key={l} href="#" className="nav-a">{l}</a>
                ))}
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:16 }}>
              <span style={{ fontSize:13, color:'#6b7280' }}>Gratis para siempre ♡</span>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <Clock size={14} color="#6b7280" />
                <span style={{ fontSize:13, color:'#6b7280' }}>{time} en Madrid</span>
              </div>
              <Link href="/dashboard" className="btn-pill-dark btn-group">
                <div className="roll-wrap">
                  <div className="roll-inner">
                    <span>Empezar gratis</span>
                    <span>Empezar gratis</span>
                  </div>
                </div>
                <div className="arrow-c"><ArrowRight size={13} color={DARK} /></div>
              </Link>
              <button onClick={() => setMenuOpen(v => !v)} style={{ background:BLUE, color:'white', border:'none', borderRadius:999, padding:'8px 16px', fontSize:13, fontWeight:500, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
                {menuOpen ? <X size={14} /> : <Menu size={14} />}
                {menuOpen ? 'Cerrar' : 'Menú'}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile sheet */}
        {menuOpen && (
          <div style={{ position:'fixed', inset:0, zIndex:50, background:'rgba(45,90,142,0.5)' }} onClick={() => setMenuOpen(false)}>
            <div className={`mobile-sheet${menuOpen ? ' open' : ''}`} style={{ position:'absolute', bottom:12, left:12, right:12, background:'white', borderRadius:20, padding:'32px 28px' }} onClick={e => e.stopPropagation()}>
              <div style={{ fontSize:12, color:'#6b7280', marginBottom:28, display:'flex', alignItems:'center', gap:6 }}>
                <Clock size={13} />{time} en Madrid
              </div>
              {['Funciones','Precios','Inspiración','Sobre nosotros'].map(l => (
                <p key={l} style={{ fontSize:28, fontWeight:500, color:DARK, marginBottom:16, cursor:'pointer' }}>{l}</p>
              ))}
              <Link href="/dashboard" className="btn-pill-blue btn-group" style={{ marginTop:24 }}>
                <div className="roll-wrap" style={{ height:22 }}>
                  <div className="roll-inner"><span>Empezar gratis</span><span>Empezar gratis</span></div>
                </div>
                <div className="arrow-c"><ArrowRight size={14} color={BLUE} /></div>
              </Link>
            </div>
          </div>
        )}

        {/* Hero content */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'flex-end', position:'relative', zIndex:20 }}>
          <div style={{ maxWidth:1440, margin:'0 auto', width:'100%', padding:'0 48px 80px' }}>
            <p style={{ fontSize:13, color:DARK, letterSpacing:'0.05em', marginBottom:32, opacity:0.7 }}>mylov3 — Organizador de bodas</p>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2.5rem,7vw,4.8rem)', fontWeight:500, lineHeight:1.08, letterSpacing:'-0.03em', color:DARK, marginBottom:48 }}>
              Planificad la boda<br />
              de vuestros sueños,<br />
              sin perder ni un detalle.
            </h1>
            <div style={{ display:'flex', gap:20, alignItems:'center', flexWrap:'wrap' }}>
              <Link href="/dashboard" className="btn-pill-blue btn-group">
                <div className="roll-wrap" style={{ height:22 }}>
                  <div className="roll-inner"><span>Empezar a planificar</span><span>Empezar a planificar</span></div>
                </div>
                <div className="arrow-c" style={{ width:32, height:32 }}><ArrowRight size={15} color={BLUE} /></div>
              </Link>
              <div style={{ background:'white', borderRadius:8, boxShadow:'0 2px 8px rgba(45,90,142,0.1)', padding:'8px 14px', display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:18, color:BLUE }}>♡</span>
                <span style={{ fontSize:13, fontWeight:500, color:DARK }}>+2.400 parejas</span>
                <span style={{ fontSize:10, background:BLUE, color:'white', borderRadius:4, padding:'2px 8px', fontWeight:600 }}>GRATIS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ background:'white', padding:'80px 0 96px' }}>
        <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 48px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28 }}>
            <div style={{ width:28, height:28, borderRadius:'50%', background:BLUE, color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, flexShrink:0 }}>1</div>
            <span style={{ fontSize:12, fontWeight:500, border:'1px solid #e5e7eb', borderRadius:999, padding:'4px 16px', color:DARK }}>Sobre mylov3</span>
          </div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.5rem,4vw,3.2rem)', fontWeight:500, lineHeight:1.12, letterSpacing:'-0.02em', color:DARK, marginBottom:64 }}>
            Herramientas bonitas para organizar<br />cada detalle de vuestro gran día.
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'26% 1fr 48%', gap:24, alignItems:'end' }}>
            <div style={{ borderRadius:20, overflow:'hidden', aspectRatio:'438/346' }}>
              <img src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&q=80" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            </div>
            <div style={{ paddingLeft:20, paddingBottom:8 }}>
              <p style={{ fontSize:16, lineHeight:1.65, color:DARK, fontWeight:500, marginBottom:36 }}>
                Desde la lista de invitados<br />hasta el plano de mesas.<br />Desde el presupuesto<br />hasta la web de boda.<br />Todo en un solo lugar.
              </p>
              <Link href="/dashboard" className="btn-pill-blue btn-group">
                <div className="roll-wrap" style={{ height:22 }}>
                  <div className="roll-inner"><span>Empezar gratis</span><span>Empezar gratis</span></div>
                </div>
                <div className="arrow-c"><ArrowRight size={14} color={BLUE} /></div>
              </Link>
            </div>
            <div style={{ borderRadius:20, overflow:'hidden', aspectRatio:'3/2' }}>
              <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80" alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ background:'#F0F6FF', padding:'80px 0 112px' }}>
        <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 48px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28 }}>
            <div style={{ width:28, height:28, borderRadius:'50%', background:BLUE, color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, flexShrink:0 }}>2</div>
            <span style={{ fontSize:12, fontWeight:500, border:'1px solid #d1d5db', borderRadius:999, padding:'4px 16px', color:DARK }}>Funciones principales</span>
          </div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(1.75rem,7vw,4.2rem)', fontWeight:500, lineHeight:1.08, letterSpacing:'-0.03em', color:DARK, marginBottom:48 }}>Todo en un lugar</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
            <div>
              <div className="card-wrap" style={{ aspectRatio:'329/246' }}>
                <img src="https://images.unsplash.com/photo-1605985687770-2e2e82c9b5f1?w=900&q=80" alt="" />
                <div className="expand-btn" style={{ background:'white' }}>
                  <span className="expand-text" style={{ color:DARK }}>Ver función</span>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:'white', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginLeft:'auto' }}>
                    <ArrowRight size={13} color={DARK} />
                  </div>
                </div>
              </div>
              <p style={{ fontSize:13, color:'#6b7280', marginTop:16, lineHeight:1.6 }}>Gestiona tu lista de invitados, RSVPs, menús y organiza las mesas con drag & drop</p>
              <p style={{ fontSize:14, fontWeight:600, color:DARK, marginTop:4 }}>Invitados & Mesas</p>
            </div>
            <div>
              <div className="card-wrap" style={{ aspectRatio:'1/1' }}>
                <img src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=900&q=80" alt="" />
                <div className="expand-btn" style={{ background:DARK }}>
                  <span className="expand-text" style={{ color:'white' }}>Explorar función</span>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:BLUE, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginLeft:'auto' }}>
                    <ArrowRight size={13} color="white" />
                  </div>
                </div>
              </div>
              <p style={{ fontSize:13, color:'#6b7280', marginTop:16, lineHeight:1.6 }}>Controla cada partida del presupuesto, pagos realizados y cuenta atrás hasta el gran día</p>
              <p style={{ fontSize:14, fontWeight:600, color:DARK, marginTop:4 }}>Presupuesto & Cronograma</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'white', borderTop:'1px solid rgba(142,197,247,0.2)', padding:'36px 48px' }}>
        <div style={{ maxWidth:1440, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <img src="/logo.png" alt="mylov3" style={{ height:24, display:'block' }} />
          <p style={{ fontSize:12, color:'#B0AAA3' }}>Hecho con ♡ para parejas que quieren disfrutar del proceso</p>
          <p style={{ fontSize:11, color:'#aac8e8' }}>2025</p>
        </div>
      </footer>
    </main>
  )
}
