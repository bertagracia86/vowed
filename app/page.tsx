'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const BLUE = '#8ec5f7'
const INK = '#1e3a5f'

function FluidCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const gl = c.getContext('webgl'); if (!gl) return
    const vert = `attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}`
    const frag = `
      precision highp float;
      uniform float t;uniform vec2 r;
      float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float sn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1)),f.x),f.y);}
      float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<6;i++){v+=a*sn(p);p*=2.;a*=.5;}return v;}
      void main(){
        vec2 uv=gl_FragCoord.xy/r;uv.y=1.-uv.y;
        float s=t*.08;
        vec2 q=vec2(fbm(uv*1.8+s),fbm(uv*1.8+vec2(1.7,9.2)+s*.9));
        vec2 rr=vec2(fbm(uv*1.4+2.*q+vec2(1.7,9.2)+s*.5),fbm(uv*1.4+2.*q+vec2(8.3,2.8)+s*.3));
        float f=fbm(uv*1.2+2.8*rr);
        vec3 a=vec3(.96,.98,1.),b=vec3(.88,.94,.99),cc=vec3(.72,.86,.97),d=vec3(1.,1.,1.);
        vec3 col=mix(a,b,clamp(f*2.,0.,1.));
        col=mix(col,cc,clamp(f*f*3.,0.,1.));
        col=mix(col,d,clamp(length(q)*.4,0.,1.));
        float g=(h(uv*r*.5+t*99.)-.5)*.012;
        gl_FragColor=vec4(col+g,1.);
      }`
    function mk(type:number,src:string){const s=gl!.createShader(type)!;gl!.shaderSource(s,src);gl!.compileShader(s);return s}
    const pg=gl.createProgram()!
    gl.attachShader(pg,mk(gl.VERTEX_SHADER,vert));gl.attachShader(pg,mk(gl.FRAGMENT_SHADER,frag));gl.linkProgram(pg);gl.useProgram(pg)
    const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf)
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW)
    const loc=gl.getAttribLocation(pg,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0)
    const uT=gl.getUniformLocation(pg,'t'),uR=gl.getUniformLocation(pg,'r')
    let raf:number;const s0=performance.now()
    function resize(){c!.width=c!.offsetWidth;c!.height=c!.offsetHeight;gl!.viewport(0,0,c!.width,c!.height)}
    resize();window.addEventListener('resize',resize)
    function draw(){const tt=(performance.now()-s0)/1000;gl!.uniform1f(uT,tt);gl!.uniform2f(uR,c!.width,c!.height);gl!.drawArrays(gl!.TRIANGLE_STRIP,0,4);raf=requestAnimationFrame(draw)}
    draw()
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)}
  },[])
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}/>
}

function DashboardMockup() {
  const tasks = [
    {t:'Reservar la finca',done:true},
    {t:'Contratar fotógrafo',done:true},
    {t:'Enviar invitaciones',done:false},
    {t:'Elegir el menú',done:false},
    {t:'Prueba del vestido',done:false},
  ]
  const budget = [
    {cat:'Catering',est:8000,paid:3000},
    {cat:'Finca',est:5000,paid:500},
    {cat:'Fotografía',est:2800,paid:2800},
    {cat:'Flores',est:1500,paid:0},
  ]
  return (
    <div style={{background:'white',borderRadius:20,overflow:'hidden',boxShadow:'0 40px 120px rgba(45,74,107,0.15)',border:'1px solid rgba(142,197,247,0.2)'}}>
      {/* Topbar */}
      <div style={{background:'#f8fbff',borderBottom:'1px solid rgba(142,197,247,0.15)',padding:'12px 20px',display:'flex',alignItems:'center',gap:12}}>
        <div style={{display:'flex',gap:6}}>
          {['#ff5f57','#febc2e','#28c840'].map(c=><div key={c} style={{width:10,height:10,borderRadius:'50%',background:c}}/>)}
        </div>
        <div style={{flex:1,background:'rgba(142,197,247,0.1)',borderRadius:6,padding:'4px 12px',fontSize:11,color:'#8aabca',textAlign:'center'}}>mylov3.app/dashboard</div>
      </div>
      {/* Dashboard layout */}
      <div style={{display:'grid',gridTemplateColumns:'180px 1fr',minHeight:420}}>
        {/* Sidebar */}
        <div style={{background:'#f4f8fd',borderRight:'1px solid rgba(142,197,247,0.15)',padding:'20px 12px'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:28,padding:'0 8px'}}>
            <img src="/logo.png" alt="" style={{height:18}}/>
          </div>
          {[
            {icon:'⊞',l:'Resumen',a:true},
            {icon:'☑',l:'Tareas'},
            {icon:'€',l:'Presupuesto'},
            {icon:'♡',l:'Invitados'},
            {icon:'◉',l:'Mesas'},
            {icon:'📅',l:'Cronograma'},
          ].map(n=>(
            <div key={n.l} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 10px',borderRadius:8,marginBottom:2,background:n.a?'rgba(142,197,247,0.15)':'transparent',cursor:'pointer'}}>
              <span style={{fontSize:13,color:n.a?BLUE:'#aac4d8'}}>{n.icon}</span>
              <span style={{fontSize:12,color:n.a?INK:'#aac4d8',fontWeight:n.a?600:400}}>{n.l}</span>
            </div>
          ))}
        </div>
        {/* Main */}
        <div style={{padding:20,background:'white'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:16}}>
            {[
              {l:'Presupuesto',v:'17.300 €',s:'3.500 € restantes'},
              {l:'Tareas',v:'2/7',s:'5 pendientes'},
              {l:'Invitados',v:'48',s:'32 confirmados'},
              {l:'Días',v:'127',s:'para el gran día'},
            ].map(c=>(
              <div key={c.l} style={{background:'#f4f8fd',border:'1px solid rgba(142,197,247,0.2)',borderRadius:12,padding:'12px 14px'}}>
                <p style={{fontSize:10,color:'#8aabca',marginBottom:6}}>{c.l}</p>
                <p style={{fontSize:18,fontWeight:600,color:INK,marginBottom:2}}>{c.v}</p>
                <p style={{fontSize:10,color:BLUE}}>{c.s}</p>
              </div>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            <div style={{background:'#f4f8fd',border:'1px solid rgba(142,197,247,0.15)',borderRadius:12,padding:14}}>
              <p style={{fontSize:11,color:'#8aabca',marginBottom:12}}>Próximas tareas</p>
              {tasks.map(t=>(
                <div key={t.t} style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                  <div style={{width:14,height:14,borderRadius:4,flexShrink:0,background:t.done?BLUE:'transparent',border:t.done?'none':`1px solid rgba(142,197,247,0.4)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {t.done&&<span style={{fontSize:8,color:'white'}}>✓</span>}
                  </div>
                  <span style={{fontSize:11,color:t.done?'#aac4d8':INK,textDecoration:t.done?'line-through':'none'}}>{t.t}</span>
                </div>
              ))}
            </div>
            <div style={{background:'#f4f8fd',border:'1px solid rgba(142,197,247,0.15)',borderRadius:12,padding:14}}>
              <p style={{fontSize:11,color:'#8aabca',marginBottom:12}}>Presupuesto</p>
              {budget.map(b=>(
                <div key={b.cat} style={{marginBottom:10}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                    <span style={{fontSize:11,color:INK}}>{b.cat}</span>
                    <span style={{fontSize:10,color:'#8aabca'}}>{b.paid.toLocaleString('es-ES')} / {b.est.toLocaleString('es-ES')} €</span>
                  </div>
                  <div style={{height:3,background:'rgba(142,197,247,0.15)',borderRadius:2}}>
                    <div style={{height:'100%',width:`${Math.round(b.paid/b.est*100)}%`,background:BLUE,borderRadius:2}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const s1 = document.createElement('script')
    s1.src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
    s1.onload=()=>{
      const s2=document.createElement('script')
      s2.src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'
      s2.onload=()=>{
        const {gsap,ScrollTrigger}=window as any
        gsap.registerPlugin(ScrollTrigger)
        gsap.to('.hero-title',{yPercent:-20,ease:'none',scrollTrigger:{trigger:'.hero-sec',start:'top top',end:'bottom top',scrub:true}})
        gsap.to('.hero-sub',{yPercent:-12,ease:'none',scrollTrigger:{trigger:'.hero-sec',start:'top top',end:'bottom top',scrub:true}})
        gsap.fromTo('.dash-wrap',{y:80,opacity:0},{y:0,opacity:1,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:'.dash-wrap',start:'top 85%'}})
        gsap.fromTo('.feat-c',{y:50,opacity:0},{y:0,opacity:1,duration:0.8,stagger:0.12,ease:'power3.out',scrollTrigger:{trigger:'.feats',start:'top 80%'}})
        gsap.utils.toArray('.sec-reveal').forEach((el:any)=>{
          gsap.fromTo(el,{y:40,opacity:0},{y:0,opacity:1,duration:0.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%'}})
        })
        ScrollTrigger.refresh()
      }
      document.head.appendChild(s2)
    }
    document.head.appendChild(s1)
    const onScroll=()=>setScrollY(window.scrollY)
    window.addEventListener('scroll',onScroll,{passive:true})
    return()=>window.removeEventListener('scroll',onScroll)
  },[])

  const scrolled = scrollY > 60
  const navBg = scrolled ? 'rgba(255,255,255,0.97)' : 'transparent'
  const navBorder = scrolled ? '1px solid rgba(142,197,247,0.2)' : '1px solid transparent'
  const navColor = scrolled ? INK : INK

  return (
    <main style={{fontFamily:"'Inter',sans-serif",overflowX:'hidden',background:'#f0f7ff'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#8ec5f7;padding:5px;}
        main{border-radius:20px;overflow:hidden;}

        .nav-a{font-size:13px;text-decoration:none;transition:opacity 0.2s;opacity:0.6;color:${INK};}
        .nav-a:hover{opacity:1;}

        .cta-btn{background:${BLUE};color:white;border:none;border-radius:999px;padding:10px 22px;font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-block;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 4px 20px rgba(142,197,247,0.4);}
        .cta-btn:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(142,197,247,0.6);}

        .cta-btn-lg{background:${BLUE};color:white;border:none;border-radius:999px;padding:16px 40px;font-size:15px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-block;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 4px 20px rgba(142,197,247,0.4);}
        .cta-btn-lg:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(142,197,247,0.6);}

        .cta-ghost{background:transparent;color:${INK};border:1px solid rgba(30,58,95,0.2);border-radius:999px;padding:16px 40px;font-size:15px;font-weight:500;cursor:pointer;text-decoration:none;display:inline-block;transition:all 0.2s;}
        .cta-ghost:hover{border-color:${BLUE};color:${BLUE};}

        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .ticker{display:flex;gap:48px;animation:ticker 24s linear infinite;width:max-content;align-items:center;}

        .feat-c{background:white;border:1px solid rgba(142,197,247,0.2);border-radius:20px;padding:32px;transition:background 0.3s,border 0.3s,transform 0.3s,box-shadow 0.3s;}
        .feat-c:hover{border-color:rgba(142,197,247,0.5);transform:translateY(-4px);box-shadow:0 16px 48px rgba(142,197,247,0.15);}

        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        .floating{animation:float 6s ease-in-out infinite;}

        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .live-dot{width:7px;height:7px;border-radius:50%;background:#4ade80;animation:pulse 2s ease-in-out infinite;flex-shrink:0;}
      `}</style>

      {/* NAV */}
      <nav style={{position:'fixed',top:17,left:17,right:17,zIndex:200,backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',background:navBg,border:navBorder,borderRadius:16,padding:'14px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',transition:'all 0.4s'}}>
        <Link href="/"><img src="/logo.png" alt="mylov3" style={{height:24,display:'block'}}/></Link>
        <div style={{display:'flex',gap:32}}>
          {['Funciones','Precios','Inspiración'].map(l=>(
            <a key={l} href="#" className="nav-a">{l}</a>
          ))}
        </div>
        <Link href="/dashboard" className="cta-btn">Empezar gratis →</Link>
      </nav>

      {/* HERO */}
      <section className="hero-sec" style={{position:'relative',minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',overflow:'hidden',background:'#eef6ff'}}>
        <FluidCanvas/>
        <div style={{position:'relative',zIndex:10,textAlign:'center',padding:'0 24px',maxWidth:1000,margin:'0 auto'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(142,197,247,0.15)',border:'1px solid rgba(142,197,247,0.3)',borderRadius:999,padding:'6px 16px',marginBottom:40}}>
            <div className="live-dot"/>
            <span style={{fontSize:12,color:INK,fontWeight:500,opacity:0.7}}>+2.400 parejas ya lo usan · Gratis</span>
          </div>
          <h1 className="hero-title" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(3.5rem,9vw,7rem)',fontWeight:400,lineHeight:1.0,color:INK,marginBottom:32,letterSpacing:'-0.03em'}}>
            El lugar donde<br/><em style={{color:BLUE}}>vuestra boda</em><br/>cobra vida
          </h1>
          <p className="hero-sub" style={{fontSize:17,color:'#5a7a9a',maxWidth:480,margin:'0 auto 48px',lineHeight:1.8}}>
            Todo lo que necesitáis para planificar el día más importante de vuestra vida. Bonito, simple y gratis.
          </p>
          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/dashboard" className="cta-btn-lg">Empezar a planificar</Link>
            <a href="#demo" className="cta-ghost">Ver la demo ↓</a>
          </div>
        </div>
        <div style={{position:'absolute',bottom:32,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:8,opacity:0.3}}>
          <span style={{fontSize:11,color:INK,letterSpacing:'0.12em',textTransform:'uppercase'}}>Scroll</span>
          <div style={{width:1,height:40,background:INK}}/>
        </div>
      </section>

      {/* TICKER */}
      <div style={{overflow:'hidden',borderTop:'1px solid rgba(142,197,247,0.2)',borderBottom:'1px solid rgba(142,197,247,0.2)',padding:'18px 0',background:'white'}}>
        <div className="ticker">
          {['Invitados','·','Presupuesto','·','Mesas','·','Cronograma','·','Proveedores','·','Web de boda','·','Notas','·','Inspiración','·','Invitados','·','Presupuesto','·','Mesas','·','Cronograma','·','Proveedores','·','Web de boda','·','Notas','·','Inspiración','·'].map((t,i)=>(
            <span key={i} style={{fontSize:12,color:t==='·'?'rgba(142,197,247,0.4)':'#aac4d8',letterSpacing:'0.1em',textTransform:'uppercase',whiteSpace:'nowrap',flexShrink:0}}>{t}</span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section style={{padding:'120px 40px',background:'#f7fbff'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div className="sec-reveal" style={{marginBottom:72,display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,alignItems:'end'}}>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(2rem,4vw,3.5rem)',fontWeight:400,color:INK,lineHeight:1.1,letterSpacing:'-0.02em'}}>
              Todo en un<br/>solo lugar
            </h2>
            <p style={{fontSize:15,color:'#7a9ab5',lineHeight:1.85,paddingBottom:4}}>
              Sin hojas de cálculo. Sin apps separadas. Sin estrés. Cada herramienta diseñada para que disfrutéis del proceso.
            </p>
          </div>
          <div className="feats" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
            {[
              {icon:'♡',t:'Invitados',d:'RSVPs, menús y asignación de mesas. Todo junto.'},
              {icon:'€',t:'Presupuesto',d:'Controla cada gasto y recibe alertas antes de pasarte.'},
              {icon:'⊞',t:'Mesas',d:'Arrastra y suelta. El plano más sencillo que existe.'},
              {icon:'📅',t:'Cronograma',d:'Cuenta atrás e hitos. Nunca os olvidaréis de nada.'},
              {icon:'◎',t:'Proveedores',d:'Fotógrafo, catering, DJ. Estado y presupuesto de cada uno.'},
              {icon:'✦',t:'Web de boda',d:'Una página bonita para vuestros invitados. Gratis.'},
            ].map(f=>(
              <div key={f.t} className="feat-c">
                <div style={{fontSize:24,marginBottom:20,color:BLUE}}>{f.icon}</div>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:INK,marginBottom:10,fontWeight:400}}>{f.t}</p>
                <p style={{fontSize:13,color:'#7a9ab5',lineHeight:1.75}}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD DEMO */}
      <section id="demo" style={{padding:'60px 40px 120px',background:'#eef6ff'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div className="sec-reveal" style={{textAlign:'center',marginBottom:64}}>
            <span style={{display:'inline-block',fontSize:11,color:BLUE,letterSpacing:'0.16em',textTransform:'uppercase',marginBottom:16,fontWeight:600}}>Demo en vivo</span>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(2rem,4vw,3.5rem)',fontWeight:400,color:INK,lineHeight:1.1,letterSpacing:'-0.02em'}}>
              Así es vuestro dashboard
            </h2>
          </div>
          <div className="dash-wrap floating">
            <DashboardMockup/>
          </div>
          <div style={{textAlign:'center',marginTop:48}}>
            <Link href="/dashboard" className="cta-btn-lg">Abrir mi dashboard →</Link>
          </div>
        </div>
      </section>

      {/* PARALLAX IMAGE */}
      <section style={{position:'relative',height:'60vh',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img src="https://images.unsplash.com/photo-1605985687770-2e2e82c9b5f1?w=1800&q=80" alt="" style={{position:'absolute',inset:0,width:'100%',height:'130%',objectFit:'cover',marginTop:'-15%',filter:'brightness(0.6)'}}/>
        <div style={{position:'absolute',inset:0,background:'rgba(238,246,255,0.3)'}}/>
        <div className="sec-reveal" style={{position:'relative',zIndex:2,textAlign:'center',padding:'0 40px'}}>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(2rem,5vw,4.5rem)',fontWeight:400,fontStyle:'italic',color:'white',lineHeight:1.2,marginBottom:32,textShadow:'0 2px 20px rgba(0,0,0,0.2)'}}>
            "El día más bonito<br/>empieza con el mejor plan"
          </p>
          <Link href="/dashboard" className="cta-btn-lg">Empezar ahora</Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{padding:'120px 40px',background:'white'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div className="sec-reveal" style={{textAlign:'center',marginBottom:72}}>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(2rem,4vw,3.5rem)',fontWeight:400,color:INK,lineHeight:1.1,letterSpacing:'-0.02em',marginBottom:16}}>
              Parejas que ya lo vivieron
            </h2>
            <p style={{fontSize:14,color:'#8aabca'}}>+2.400 bodas planificadas con mylov3</p>
          </div>
          <div className="sec-reveal" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
            {[
              {q:'Hizo que todo fuera tan fácil. Pudimos disfrutar cada momento sin preocupaciones.',n:'María & Lucas',d:'Abril 2024'},
              {q:'La mejor herramienta para planificar nuestra boda. No podemos imaginar haberlo hecho sin mylov3.',n:'Ana & Diego',d:'Junio 2024'},
              {q:'Todo en un solo lugar, hermoso y completísimo. Lo recomendamos a todas las parejas.',n:'Sofía & Tomás',d:'Mayo 2024'},
            ].map(r=>(
              <div key={r.n} style={{background:'#f4f8fd',border:'1px solid rgba(142,197,247,0.2)',borderRadius:20,padding:28}}>
                <div style={{display:'flex',gap:3,marginBottom:18}}>
                  {[...Array(5)].map((_,i)=><span key={i} style={{color:BLUE,fontSize:14}}>★</span>)}
                </div>
                <p style={{fontSize:14,color:'#5a7a9a',lineHeight:1.8,marginBottom:24,fontStyle:'italic'}}>"{r.q}"</p>
                <div>
                  <p style={{fontSize:13,fontWeight:600,color:INK}}>{r.n}</p>
                  <p style={{fontSize:11,color:'#8aabca'}}>{r.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{padding:'120px 40px',background:'#eef6ff',textAlign:'center'}}>
        <div className="sec-reveal" style={{maxWidth:700,margin:'0 auto'}}>
          <div style={{fontSize:32,color:BLUE,marginBottom:24}}>♡</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(2.5rem,5vw,5rem)',fontWeight:400,color:INK,lineHeight:1.05,letterSpacing:'-0.03em',marginBottom:20}}>
            Vuestra historia de amor merece el mejor comienzo
          </h2>
          <p style={{fontSize:15,color:'#7a9ab5',marginBottom:48,lineHeight:1.8}}>Gratis para siempre. Sin tarjeta de crédito.</p>
          <Link href="/dashboard" className="cta-btn-lg">Empezar a planificar gratis</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid rgba(142,197,247,0.2)',padding:'32px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'white'}}>
        <img src="/logo.png" alt="mylov3" style={{height:22,display:'block'}}/>
        <p style={{fontSize:12,color:'#aac4d8'}}>Hecho con ♡ para parejas que quieren disfrutar del proceso</p>
        <p style={{fontSize:11,color:'#bbcfe0'}}>2025</p>
      </footer>
    </main>
  )
}
