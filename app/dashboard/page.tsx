'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const F = "'Cormorant Garamond',serif"

// The single linear path. Order = priority. No dates required up front.
const JOURNEY = [
  {
    id: 'venue',
    title: 'Encontrad vuestro sitio',
    sub: 'Casi todo lo demás depende de esto',
    body: 'La mayoría de parejas elige primero el lugar y deja que la fecha se acomode a su disponibilidad. No hace falta tener nada decidido todavía — solo empezad a mirar.',
    cta: 'Buscar espacios',
  },
  {
    id: 'date',
    title: 'Fijad la fecha',
    sub: 'En cuanto el espacio os confirme un hueco',
    body: 'La finca os dará varias fechas libres. Elegid la que mejor encaje con vuestra familia y amigos cercanos.',
    cta: 'Confirmar fecha',
  },
  {
    id: 'guests',
    title: 'Pensad a quién invitar',
    sub: 'Una primera lista, sin compromiso',
    body: 'No hace falta que sea definitiva. Apuntad nombres a medida que se os ocurran — siempre podréis añadir o quitar después.',
    cta: 'Empezar lista',
  },
  {
    id: 'catering',
    title: 'Catering y menú',
    sub: 'El segundo gasto más importante',
    body: 'Algunas fincas tienen catering propio obligatorio. Si la vuestra no, es el momento de buscar y pedir degustaciones.',
    cta: 'Ver catering',
  },
  {
    id: 'photo',
    title: 'Fotografía y vídeo',
    sub: 'Lo único que queda para siempre',
    body: 'Los buenos profesionales se reservan con mucha antelación. No lo dejéis para el final.',
    cta: 'Buscar fotógrafos',
  },
]

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUser(data.user)
      setLoading(false)
    })
  }, [router])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background:'white'}}>
        <div style={{fontFamily:F,fontSize:20,fontWeight:300,letterSpacing:'0.2em',textTransform:'uppercase',color:'#DDD'}}>Vowed</div>
      </div>
    )
  }

  const name1 = user?.user_metadata?.name1 || 'Vosotros'
  const name2 = user?.user_metadata?.name2 || 'tu pareja'

  const currentStepIndex = JOURNEY.findIndex(s => !completedSteps.includes(s.id))
  const currentStep = JOURNEY[currentStepIndex] || null
  const allDone = currentStepIndex === -1

  function completeCurrent() {
    if (currentStep) {
      setCompletedSteps(prev => [...prev, currentStep.id])
      setExpanded(false)
    }
  }

  return (
    <div className="min-h-screen" style={{background:'white',fontFamily:"'Inter',sans-serif"}}>

      {/* HEADER */}
      <header className="flex items-center justify-between px-10 py-7">
        <div style={{fontFamily:F,fontSize:18,fontWeight:300,letterSpacing:'0.18em',textTransform:'uppercase'}}>Vowed</div>
        <button onClick={handleLogout} style={{fontSize:12,color:'#CCC',background:'none',border:'none',cursor:'pointer'}}>
          Cerrar sesión
        </button>
      </header>

      <main className="flex flex-col items-center px-6" style={{paddingTop:'4vh'}}>

        {/* GREETING */}
        <p style={{fontSize:13,color:'#BBB',marginBottom:6,textAlign:'center'}}>
          {name1} & {name2}
        </p>
        <h1 style={{fontFamily:F,fontSize:26,fontWeight:300,fontStyle:'italic',color:'#1A1A1A',marginBottom:56,textAlign:'center'}}>
          Vuestra boda, paso a paso
        </h1>

        {!allDone && currentStep && (
          <div style={{width:'100%',maxWidth:480}}>

            {/* PROGRESS DOTS */}
            <div className="flex items-center justify-center gap-2 mb-10">
              {JOURNEY.map((s, i) => (
                <div key={s.id} style={{
                  width: completedSteps.includes(s.id) ? 8 : i === currentStepIndex ? 22 : 8,
                  height: 8, borderRadius: 999,
                  background: completedSteps.includes(s.id) ? '#1A1A1A' : i === currentStepIndex ? '#1A1A1A' : '#EEEEEE',
                  transition: 'all .3s ease'
                }}/>
              ))}
            </div>

            {/* MAIN STEP CARD — the signature element */}
            <div
              onClick={() => setExpanded(!expanded)}
              style={{
                background: '#FAFAFA',
                borderRadius: 32,
                padding: expanded ? '48px 44px' : '56px 44px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all .3s ease',
                border: '1px solid #F5F5F5'
              }}
            >
              <p style={{fontSize:11,letterSpacing:'0.12em',textTransform:'uppercase',color:'#BBB',marginBottom:14}}>
                Paso {currentStepIndex + 1} de {JOURNEY.length}
              </p>
              <h2 style={{fontFamily:F,fontSize:34,fontWeight:400,color:'#1A1A1A',marginBottom:10,lineHeight:1.2}}>
                {currentStep.title}
              </h2>
              <p style={{fontSize:13,color:'#999',marginBottom: expanded ? 24 : 0}}>
                {currentStep.sub}
              </p>

              {expanded && (
                <div style={{animation:'fadeIn .25s ease'}}>
                  <p style={{fontSize:14,color:'#555',lineHeight:1.8,marginBottom:32,maxWidth:380,marginLeft:'auto',marginRight:'auto'}}>
                    {currentStep.body}
                  </p>
                  <div className="flex flex-col gap-3 items-center">
                    <button
                      onClick={(e) => { e.stopPropagation(); completeCurrent() }}
                      style={{
                        background:'#1A1A1A',color:'white',border:'none',
                        borderRadius:999,padding:'15px 36px',fontSize:14,fontWeight:500,cursor:'pointer'
                      }}
                    >
                      {currentStep.cta}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); completeCurrent() }}
                      style={{background:'none',border:'none',fontSize:12,color:'#CCC',cursor:'pointer'}}
                    >
                      Ya está hecho, siguiente paso
                    </button>
                  </div>
                </div>
              )}
            </div>

            {!expanded && (
              <p style={{textAlign:'center',fontSize:12,color:'#DDD',marginTop:20}}>
                Toca para ver qué hacer
              </p>
            )}
          </div>
        )}

        {allDone && (
          <div style={{textAlign:'center',maxWidth:420}}>
            <h2 style={{fontFamily:F,fontSize:30,fontWeight:300,fontStyle:'italic',marginBottom:12}}>
              Lo esencial está hecho
            </h2>
            <p style={{fontSize:13,color:'#999',lineHeight:1.8}}>
              A partir de aquí podéis ir añadiendo flores, música, invitaciones y todo lo demás, a vuestro ritmo.
            </p>
          </div>
        )}

      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}
