import Link from 'next/link'

const F = "'Cormorant Garamond',serif"
const BLUE = '#6E8FC9'
const INK = '#2C3E5C'
const MUTE = '#7A93B5'

export default function Hero() {
  return (
    <section style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',minHeight:520,background:'#FBF8F4'}}>

      <div style={{padding:'64px 56px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'white',border:'1px solid #E5ECF5',borderRadius:999,padding:'8px 20px',marginBottom:28,width:'fit-content'}}>
          <span style={{color:BLUE,fontSize:13}}>✦</span>
          <span style={{fontSize:12,color:INK}}>Ahora, un organizador de bodas completo</span>
        </div>

        <h1 style={{fontFamily:F,fontSize:48,fontWeight:500,color:INK,lineHeight:1.15,marginBottom:8}}>
          Sed vuestro propio
        </h1>
        <h1 style={{fontFamily:F,fontSize:52,fontStyle:'italic',fontWeight:400,color:BLUE,lineHeight:1.15,marginBottom:12}}>
          wedding planner
        </h1>

        <div style={{display:'flex',alignItems:'center',gap:10,margin:'12px 0 20px'}}>
          <div style={{width:36,height:1,background:'#DCE7F4'}}/>
          <span style={{color:BLUE,fontSize:13}}>♡</span>
          <div style={{width:36,height:1,background:'#DCE7F4'}}/>
        </div>

        <p style={{fontSize:14,color:MUTE,lineHeight:1.85,marginBottom:32,maxWidth:360}}>
          Planificad una boda que sea muy vosotros. Herramientas bonitas, planificación inteligente e inspiración, todo en un solo lugar.
        </p>

        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <Link href="/dashboard" style={{background:BLUE,color:'white',borderRadius:999,padding:'14px 30px',fontSize:13,fontWeight:500}}>
            Empezar a planificar
          </Link>
          <Link href="/dashboard" style={{border:'1.5px solid #DCE7F4',color:BLUE,borderRadius:999,padding:'13px 26px',fontSize:13,fontWeight:500}}>
            Ver demo ♡
          </Link>
        </div>
      </div>

      <div style={{position:'relative',overflow:'hidden'}}>
        <img
          src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80"
          alt="boda"
          style={{width:'100%',height:'100%',objectFit:'cover',position:'absolute',inset:0}}
        />
        <div style={{
          position:'absolute',top:32,right:32,width:240,
          background:'white',borderRadius:18,padding:'22px',
          boxShadow:'0 16px 40px rgba(60,80,120,0.15)'
        }}>
          <p style={{fontFamily:F,fontSize:17,fontWeight:500,color:INK,marginBottom:10}}>Vuestro día, a vuestra manera</p>
          <div style={{height:1,background:'#EEF2F7',marginBottom:10}}/>
          {['Listas inteligentes','Control de presupuesto','Gestión de invitados','Tablero de inspiración','Cronograma y avisos'].map(item => (
            <div key={item} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 0',fontSize:12,color:INK}}>
              <span style={{width:14,height:14,border:`1.3px solid ${BLUE}`,borderRadius:4,display:'inline-flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:BLUE,fontSize:10}}>✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
