import Link from 'next/link'

const F = "'Cormorant Garamond',serif"
const BLUE = '#6E8FC9'
const BLUE_DARK = '#3D5A80'
const INK = '#2C3E5C'
const MUTE = '#7A93B5'

const NAV_ITEMS = ['Resumen','Tareas','Presupuesto','Invitados','Mesas']

export default function DashPreview() {
  return (
    <section style={{padding:'80px 48px',background:'#F7F9FC'}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>

        <div style={{textAlign:'center',marginBottom:48}}>
          <h2 style={{fontFamily:F,fontSize:36,fontWeight:500,color:INK,marginBottom:12}}>
            Vuestro organizador, siempre a mano
          </h2>
          <p style={{fontSize:14,color:MUTE,lineHeight:1.8}}>
            Acceded desde cualquier dispositivo y en cualquier momento.
          </p>
        </div>

        <div style={{border:'1px solid #E5ECF5',borderRadius:20,overflow:'hidden',boxShadow:'0 20px 60px rgba(60,80,120,0.1)',background:'white'}}>
          <div style={{display:'grid',gridTemplateColumns:'180px 1fr'}}>

            <div style={{background:'#FAFBFD',borderRight:'1px solid #EEF2F7',padding:'24px 16px'}}>
              <div style={{fontFamily:F,fontSize:18,fontStyle:'italic',color:BLUE,marginBottom:24}}>vowed</div>
              {NAV_ITEMS.map((s,i) => (
                <div key={s} style={{
                  fontSize:12,padding:'8px 10px',borderRadius:8,marginBottom:2,
                  background:i===0?'#EAF1FA':'transparent',
                  color:i===0?BLUE_DARK:MUTE,
                  fontWeight:i===0?500:400
                }}>{s}</div>
              ))}
            </div>

            <div style={{padding:'28px 32px'}}>
              <h3 style={{fontFamily:F,fontSize:22,fontWeight:500,color:INK,marginBottom:4}}>Bienvenidos de nuevo ♡</h3>
              <p style={{fontSize:12,color:MUTE,marginBottom:24}}>Resumen de vuestra planificación</p>

              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:24}}>
                {[
                  {l:'Presupuesto',v:'6.300 €',s:'8.700 € restantes',bc:'#ECE9E4'},
                  {l:'Tareas',v:'2/5',s:'3 pendientes',bc:'#F3D9D9'},
                  {l:'Invitados',v:'3',s:'1 por confirmar',bc:'#EFE0C2'},
                  {l:'Mesas',v:'2',s:'creadas',bc:'#EFE0C2'},
                ].map(c => (
                  <div key={c.l} style={{border:`1px solid ${c.bc}`,borderRadius:12,padding:14}}>
                    <p style={{fontSize:11,color:MUTE,marginBottom:6}}>{c.l}</p>
                    <p style={{fontFamily:F,fontSize:20,fontWeight:600,color:INK,marginBottom:2}}>{c.v}</p>
                    <p style={{fontSize:10,color:MUTE}}>{c.s}</p>
                  </div>
                ))}
              </div>

              <div style={{border:'1px solid #EEF2F7',borderRadius:12,padding:16}}>
                <p style={{fontSize:12,color:MUTE,marginBottom:10}}>Acciones rápidas</p>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {['Gestionar presupuesto','Ver tareas','Gestionar invitados'].map(a => (
                    <span key={a} style={{border:'1px solid #EEF2F7',borderRadius:8,padding:'7px 12px',fontSize:11,color:INK}}>{a}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div style={{textAlign:'center',marginTop:36}}>
          <Link href="/dashboard" style={{background:BLUE,color:'white',borderRadius:999,padding:'14px 36px',fontSize:13,fontWeight:500}}>
            Probar gratis ahora
          </Link>
        </div>

      </div>
    </section>
  )
}
