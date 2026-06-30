const F = "'Cormorant Garamond',serif"
const BLUE = '#6E8FC9'
const INK = '#2C3E5C'
const MUTE = '#7A93B5'

const FEATURES = [
  { t: 'Listas de tareas', d: 'Checklists inteligentes adaptados a vuestra fecha y estilo.' },
  { t: 'Control de presupuesto', d: 'Llevad la cuenta de cada gasto con facilidad y sin sorpresas.' },
  { t: 'Gestión de invitados', d: 'Confirmaciones, mesas y detalles de cada invitado.' },
  { t: 'Tablero de inspiración', d: 'Guardad y organizad todas vuestras ideas en un solo lugar.' },
  { t: 'Plano de mesas', d: 'Distribuid a vuestros invitados arrastrando y soltando.' },
  { t: 'Proveedores', d: 'Guardad vuestros favoritos y contactadlos cuando estéis listos.' },
]

export default function Features() {
  return (
    <section style={{padding:'80px 48px',background:'white'}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>

        <div style={{textAlign:'center',marginBottom:56}}>
          <h2 style={{fontFamily:F,fontSize:36,fontWeight:500,color:INK,lineHeight:1.3,marginBottom:12}}>
            Todas las herramientas que necesitáis,<br/>
            todo en un <em style={{color:BLUE,fontStyle:'italic',fontWeight:400}}>lugar precioso</em> ♡
          </h2>
          <p style={{fontSize:14,color:MUTE,maxWidth:480,margin:'0 auto',lineHeight:1.8}}>
            Sin hojas de cálculo complicadas ni apps separadas. Todo lo que necesitáis para planificar vuestra boda, en un solo sitio.
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
          {FEATURES.map(f => (
            <div key={f.t} style={{border:'1px solid #EEF2F7',borderRadius:16,padding:'24px 26px'}}>
              <h3 style={{fontFamily:F,fontSize:19,fontWeight:500,color:INK,marginBottom:8}}>{f.t}</h3>
              <p style={{fontSize:13,color:MUTE,lineHeight:1.75}}>{f.d}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
