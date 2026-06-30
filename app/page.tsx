import Link from 'next/link'

const F = "'Cormorant Garamond',serif"

export default function Home() {
  return (
    <main style={{background:'white',fontFamily:"'Inter',sans-serif"}}>

      <nav className="flex items-center justify-between px-10 py-7">
        <div style={{fontFamily:F,fontSize:18,fontWeight:300,letterSpacing:'0.18em',textTransform:'uppercase'}}>Vowed</div>
        <div className="flex items-center gap-6">
          <Link href="/login" style={{fontSize:13,color:'#999'}}>Acceder</Link>
          <Link href="/register" style={{background:'#1A1A1A',color:'white',borderRadius:999,padding:'10px 24px',fontSize:13,fontWeight:500}}>
            Empezar
          </Link>
        </div>
      </nav>

      <section className="flex flex-col items-center text-center px-6" style={{paddingTop:'10vh',paddingBottom:'10vh'}}>
        <p style={{fontSize:13,color:'#BBB',marginBottom:18,letterSpacing:'0.04em'}}>
          No tenéis ni idea de por dónde empezar. Está bien.
        </p>
        <h1 style={{fontFamily:F,fontSize:'clamp(40px,6vw,64px)',fontWeight:300,fontStyle:'italic',color:'#1A1A1A',lineHeight:1.15,maxWidth:680,marginBottom:28}}>
          Vuestra boda, un paso cada vez.
        </h1>
        <p style={{fontSize:15,color:'#999',maxWidth:440,lineHeight:1.8,marginBottom:40}}>
          Sin listas interminables ni decisiones a la vez. Vowed os dice exactamente qué hacer ahora, y nada más.
        </p>
        <Link href="/register" style={{background:'#1A1A1A',color:'white',borderRadius:999,padding:'16px 40px',fontSize:14,fontWeight:500}}>
          Empezar gratis
        </Link>
        <p style={{fontSize:11,color:'#DDD',marginTop:14}}>Sin tarjeta · Dos minutos</p>
      </section>

      {/* Visual: the "one step" concept demonstrated */}
      <section className="flex justify-center px-6" style={{paddingBottom:'10vh'}}>
        <div style={{
          background:'#FAFAFA', borderRadius:32, padding:'48px 44px',
          textAlign:'center', maxWidth:420, width:'100%', border:'1px solid #F5F5F5'
        }}>
          <p style={{fontSize:11,letterSpacing:'0.12em',textTransform:'uppercase',color:'#BBB',marginBottom:14}}>
            Paso 1 de 5
          </p>
          <h2 style={{fontFamily:F,fontSize:30,fontWeight:400,color:'#1A1A1A',marginBottom:10}}>
            Encontrad vuestro sitio
          </h2>
          <p style={{fontSize:13,color:'#999'}}>
            Casi todo lo demás depende de esto
          </p>
        </div>
      </section>

      <section style={{padding:'8vh 6vw',borderTop:'1px solid #F5F5F5'}}>
        <div className="grid grid-cols-3 gap-12" style={{maxWidth:1000,margin:'0 auto'}}>
          {[
            { t: 'Un paso, no una lista', d: 'Nunca veréis treinta tareas a la vez. Solo la siguiente, cuando toca.' },
            { t: 'Cero presión', d: 'No hace falta tener fecha, presupuesto ni invitados decididos para empezar.' },
            { t: 'Todo se guarda solo', d: 'Volved cuando queráis. Vuestro progreso os espera tal cual lo dejasteis.' },
          ].map(f => (
            <div key={f.t} className="text-center">
              <h3 style={{fontFamily:F,fontSize:20,fontWeight:400,marginBottom:10}}>{f.t}</h3>
              <p style={{fontSize:13,color:'#999',lineHeight:1.8}}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{padding:'32px 40px',borderTop:'1px solid #F5F5F5',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{fontFamily:F,fontSize:14,fontWeight:300,letterSpacing:'0.18em',textTransform:'uppercase'}}>Vowed</div>
        <div style={{fontSize:11,color:'#DDD'}}>2025</div>
      </footer>
    </main>
  )
}
