import Link from 'next/link'

const F = "'Cormorant Garamond',serif"
const BLUE = '#6E8FC9'
const BLUE_DARK = '#3D5A80'
const INK = '#2C3E5C'
const MUTE = '#7A93B5'

const NAVLINKS = ['Funciones', 'Herramientas', 'Inspiración', 'Precios', 'Sobre nosotros']

const FEATURES = [
  { t: 'Listas de tareas', d: 'Checklists inteligentes adaptados a vuestra fecha.' },
  { t: 'Control de presupuesto', d: 'Llevad la cuenta de cada gasto con facilidad.' },
  { t: 'Gestión de invitados', d: 'Confirmaciones, mesas y detalles de cada uno.' },
  { t: 'Tablero de inspiración', d: 'Guardad y organizad todas vuestras ideas.' },
  { t: 'Cronograma', d: 'Ved vuestro gran día tomar forma.' },
  { t: 'Proveedores guardados', d: 'Todos vuestros favoritos en un solo lugar.' },
]

const SIDE_BENEFITS = ['Listas inteligentes', 'Control de presupuesto', 'Gestión de invitados', 'Tablero de inspiración', 'Cronograma y avisos']

const TRUST = [
  { t: 'Confiado por 10.000+ parejas' },
  { t: 'Todo en un solo lugar' },
  { t: 'Ahorrad tiempo y reducid el estrés' },
  { t: 'Planificad a vuestra manera' },
]

const INSPO_IMGS = [
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=300&q=80',
  'https://images.unsplash.com/photo-1546032996-6098e9b04e0a?w=300&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=80',
]

const Branch = ({ style }: { style?: React.CSSProperties }) => (
  <svg style={style} viewBox="0 0 60 90" width="40">
    <path d="M30 85 C 32 62 24 45 35 22 C 40 11 38 5 43 0" fill="none" stroke="#A8BEDD" strokeWidth="1.3"/>
    <ellipse cx="33" cy="42" rx="7" ry="3" fill="#B5CBE8" transform="rotate(30 33 42)"/>
    <ellipse cx="25" cy="60" rx="6.5" ry="3" fill="#B5CBE8" transform="rotate(-10 25 60)"/>
    <ellipse cx="38" cy="20" rx="6" ry="2.5" fill="#B5CBE8" transform="rotate(-15 38 20)"/>
  </svg>
)

export default function Home() {
  return (
    <main style={{background:'#FFFDFB',fontFamily:"'Inter',sans-serif"}}>

      <nav className="flex items-center justify-between px-14 py-6">
        <div style={{fontFamily:F,fontSize:26,fontStyle:'italic',fontWeight:400,color:BLUE}}>vowed</div>
        <div className="flex items-center gap-9">
          {NAVLINKS.map(l => <span key={l} style={{fontSize:13,color:INK}}>{l}</span>)}
        </div>
        <div className="flex items-center gap-5">
          <Link href="/login" style={{fontSize:13,color:INK}}>Acceder</Link>
          <Link href="/register" style={{background:BLUE,color:'white',borderRadius:999,padding:'12px 28px',fontSize:13,fontWeight:500}}>
            Empezar
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{position:'relative'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',minHeight:480,background:'#FBF8F4'}}>
          <div style={{padding:'56px 56px 56px 64px',display:'flex',flexDirection:'column',justifyContent:'center',position:'relative'}}>
            <Branch style={{position:'absolute',top:36,left:38,opacity:0.85}}/>
            <h1 style={{fontFamily:F,fontSize:44,fontWeight:500,color:INK,lineHeight:1.12,marginBottom:0}}>
              Sed vuestro propio
            </h1>
            <h1 style={{fontFamily:F,fontSize:48,fontStyle:'italic',fontWeight:400,color:BLUE,lineHeight:1.12,marginBottom:8}}>
              wedding planner
            </h1>
            <div style={{display:'flex',alignItems:'center',gap:10,margin:'10px 0 18px'}}>
              <div style={{width:34,height:1,background:'#DCE7F4'}}/>
              <span style={{color:BLUE,fontSize:13}}>♡</span>
              <div style={{width:34,height:1,background:'#DCE7F4'}}/>
            </div>
            <p style={{fontSize:14,color:MUTE,lineHeight:1.8,marginBottom:28,maxWidth:320}}>
              Planificad una boda que sea muy vosotros. Herramientas bonitas, planificación inteligente, e inspiración en un solo lugar.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/register" style={{background:BLUE,color:'white',borderRadius:999,padding:'13px 26px',fontSize:13,fontWeight:500}}>
                Empezar a planificar
              </Link>
              <Link href="/register" style={{border:`1.5px solid ${BLUE}`,color:BLUE,borderRadius:999,padding:'12px 22px',fontSize:13,fontWeight:500,display:'flex',alignItems:'center',gap:6}}>
                Haced el test <span>♡</span>
              </Link>
            </div>
          </div>

          <div style={{position:'relative',overflow:'hidden'}}>
            <img
              src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80"
              alt=""
              style={{width:'100%',height:'100%',objectFit:'cover',position:'absolute',inset:0}}
            />
            <div style={{
              position:'absolute', top:36, right:40, width:240,
              background:'white', borderRadius:18, padding:'24px 24px',
              boxShadow:'0 16px 40px rgba(60,80,120,0.18)'
            }}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                <span style={{fontFamily:F,fontSize:18,fontWeight:500,color:INK}}>Vuestro día, a vuestra manera</span>
                <span style={{color:BLUE,fontSize:15}}>♡</span>
              </div>
              <p style={{fontSize:11,color:MUTE,marginBottom:14,lineHeight:1.6}}>
                Estad organizados, inspirados y con el control en cada paso.
              </p>
              <div style={{height:1,background:'#EEF2F7',marginBottom:12}}/>
              {SIDE_BENEFITS.map(item => (
                <div key={item} style={{display:'flex',alignItems:'center',gap:9,padding:'6px 0',fontSize:12,color:INK}}>
                  <span style={{width:14,height:14,border:`1.3px solid ${BLUE}`,borderRadius:4,display:'inline-flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <span style={{width:6,height:4,borderLeft:`1.3px solid ${BLUE}`,borderBottom:`1.3px solid ${BLUE}`,transform:'rotate(-45deg) translateY(-1px)'}}/>
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section style={{background:'#F4F7FB',padding:'20px 56px'}}>
        <div className="flex items-center justify-center gap-14" style={{flexWrap:'wrap'}}>
          {TRUST.map(t => (
            <div key={t.t} style={{fontSize:12,color:INK,display:'flex',alignItems:'center',gap:8}}>
              <span style={{color:BLUE,fontSize:13}}>♡</span>{t.t}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES + MINI DASHBOARD */}
      <section style={{padding:'72px 56px',display:'grid',gridTemplateColumns:'1fr 1.05fr',gap:56}}>
        <div>
          <h2 style={{fontFamily:F,fontSize:32,fontWeight:500,color:INK,lineHeight:1.3,marginBottom:30}}>
            Todas las herramientas que necesitáis,<br/>todo en un <em style={{color:BLUE,fontStyle:'italic',fontWeight:400}}>lugar precioso</em> ♡
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {FEATURES.map(f => (
              <div key={f.t} style={{border:'1px solid #E5ECF5',borderRadius:14,padding:'18px 20px'}}>
                <div style={{fontSize:13,fontWeight:500,color:INK,marginBottom:5}}>{f.t}</div>
                <div style={{fontSize:11,color:MUTE,lineHeight:1.65}}>{f.d}</div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:24}}>
            <span style={{fontFamily:F,fontSize:18,fontStyle:'italic',color:INK}}>Planificad menos,</span>
            <span style={{fontFamily:F,fontSize:18,fontStyle:'italic',color:BLUE}}>disfrutad más</span>
            <span style={{color:BLUE}}>♡</span>
          </div>
          <Link href="/register" style={{background:BLUE,color:'white',borderRadius:999,padding:'14px 32px',fontSize:13,fontWeight:500,display:'inline-block'}}>
            Ver todas las funciones
          </Link>
        </div>

        {/* DASHBOARD PREVIEW CARD */}
        <div style={{border:'1px solid #E5ECF5',borderRadius:20,overflow:'hidden',boxShadow:'0 20px 50px rgba(60,80,120,0.1)'}}>
          <div style={{display:'grid',gridTemplateColumns:'110px 1fr 130px'}}>
            <div style={{background:'#FAFBFD',borderRight:'1px solid #EEF2F7',padding:'18px 14px'}}>
              <div style={{fontFamily:F,fontSize:15,fontStyle:'italic',color:BLUE,marginBottom:16}}>vowed</div>
              {['Resumen','Tareas','Presupuesto','Invitados','Cronograma','Inspiración','Proveedores'].map((s,i) => (
                <div key={s} style={{fontSize:9,padding:'6px 0',color:i===0?BLUE_DARK:MUTE,fontWeight:i===0?500:400}}>{s}</div>
              ))}
            </div>
            <div style={{padding:'18px 16px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <div>
                  <div style={{fontFamily:F,fontSize:15,fontWeight:500,color:INK}}>Hola, Alex ♡</div>
                  <div style={{fontSize:9,color:MUTE}}>Lo lleváis genial</div>
                </div>
              </div>
              <div style={{border:'1px solid #EEF2F7',borderRadius:10,padding:10,marginBottom:8,textAlign:'center'}}>
                <svg width="44" height="44" viewBox="0 0 50 50" style={{margin:'0 auto'}}>
                  <circle cx="25" cy="25" r="20" fill="none" stroke="#EEF2F7" strokeWidth="5"/>
                  <circle cx="25" cy="25" r="20" fill="none" stroke={BLUE} strokeWidth="5" strokeDasharray="126" strokeDashoffset="44" transform="rotate(-90 25 25)"/>
                </svg>
                <p style={{fontSize:8,color:MUTE,marginTop:4}}>65% completado</p>
              </div>
              <div style={{border:'1px solid #EEF2F7',borderRadius:10,padding:10}}>
                <p style={{fontSize:8,color:MUTE,marginBottom:4}}>Próximo</p>
                <p style={{fontSize:9,color:INK,margin:'2px 0'}}>· Reservar fotógrafo</p>
                <p style={{fontSize:9,color:INK,margin:'2px 0'}}>· Enviar invitaciones</p>
              </div>
            </div>
            <div style={{position:'relative'}}>
              <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=300&q=80" alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{padding:'56px 56px 90px',textAlign:'center',position:'relative'}}>
        <Branch style={{position:'absolute',bottom:10,left:40,opacity:0.55}}/>
        <Branch style={{position:'absolute',bottom:10,right:40,opacity:0.55,transform:'scaleX(-1)'}}/>
        <p style={{fontFamily:F,fontSize:26,color:INK,lineHeight:1.5,marginBottom:6}}>
          Vuestra historia de amor es única.
        </p>
        <p style={{fontFamily:F,fontSize:26,fontStyle:'italic',color:BLUE,lineHeight:1.5}}>
          Vuestra boda también debería serlo.
        </p>
        <span style={{color:BLUE,fontSize:14,display:'inline-block',marginTop:8}}>♡</span>
      </section>

      <footer style={{padding:'28px 56px',borderTop:'1px solid #EEF2F7',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{fontFamily:F,fontSize:19,fontStyle:'italic',color:BLUE}}>vowed</div>
        <div style={{fontSize:11,color:MUTE}}>2025</div>
      </footer>
    </main>
  )
}
