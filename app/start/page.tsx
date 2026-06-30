'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const F = "'Cormorant Garamond',serif"
const BLUE = '#6E8FC9'
const INK = '#2C3E5C'
const MUTE = '#7A93B5'

const QUESTIONS = [
  {
    key: 'venue',
    q: '¿Tenéis ya el espacio decidido?',
    opts: [
      { v: 'no', l: 'Aún no', tasks: [
        { title: 'Buscar y visitar al menos 3 espacios', why: 'Comparar antes de decidir os ahorra arrepentimientos.' },
        { title: 'Comparar precios y disponibilidad', why: 'Las mejores fechas se agotan con mucha antelación.' },
        { title: 'Reservar el espacio elegido', why: 'Sin esto, nada más puede avanzar de verdad.' },
      ]},
      { v: 'yes', l: 'Sí, ya lo tenemos', tasks: [
        { title: 'Firmar el contrato definitivo del espacio', why: 'Aseguraos de tener todo por escrito.' },
      ]},
    ],
  },
  {
    key: 'date',
    q: '¿Tenéis fecha?',
    opts: [
      { v: 'no', l: 'Todavía no', tasks: [
        { title: 'Elegir la fecha definitiva con el espacio', why: 'La fecha condiciona casi todas las demás decisiones.' },
      ]},
      { v: 'yes', l: 'Sí, ya la tenemos', tasks: [
        { title: 'Confirmar la fecha por escrito con todos los proveedores', why: 'Evita malentendidos más adelante.' },
      ]},
    ],
  },
  {
    key: 'guests',
    q: '¿Tenéis lista de invitados?',
    opts: [
      { v: 'no', l: 'Empezamos de cero', tasks: [
        { title: 'Hacer una primera lista de invitados cercanos', why: 'No tiene que ser perfecta, solo un punto de partida.' },
      ]},
      { v: 'yes', l: 'Ya tenemos algo', tasks: [
        { title: 'Completar la lista de invitados', why: 'Revisadla juntos para no olvidar a nadie.' },
        { title: 'Conseguir direcciones para las invitaciones', why: 'Mejor recopilarlas con tiempo, no a última hora.' },
      ]},
    ],
  },
  {
    key: 'budget',
    q: '¿Habéis definido presupuesto?',
    opts: [
      { v: 'no', l: 'No, aún no', tasks: [
        { title: 'Definir el presupuesto total disponible', why: 'Esto os ayuda a decidir todo lo demás con calma.' },
      ]},
      { v: 'yes', l: 'Sí, lo tenemos claro', tasks: [
        { title: 'Repartir el presupuesto por categorías', why: 'Así sabréis cuánto dedicar a cada cosa.' },
      ]},
    ],
  },
]

export default function StartQuiz() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [collected, setCollected] = useState<{ title: string; why: string }[]>([])
  const [phase, setPhase] = useState<'quiz' | 'saving' | 'welcome'>('quiz')
  const [allNo, setAllNo] = useState(true)

  function answer(opt: { v: string; l: string; tasks: { title: string; why: string }[] }) {
    const newTasks = [...collected, ...opt.tasks]
    setCollected(newTasks)
    if (opt.v !== 'no') setAllNo(false)

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      finish(newTasks)
    }
  }

  async function finish(allTasks: { title: string; why: string }[]) {
    setPhase('saving')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user && allTasks.length > 0) {
      const rows = allTasks.map(t => ({ user_id: user.id, title: t.title, done: false }))
      await supabase.from('tasks').insert(rows)
    }
    setTimeout(() => setPhase('welcome'), 900)
  }

  const current = QUESTIONS[step]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{background:'white',fontFamily:"'Inter',sans-serif"}}>
      <div style={{fontFamily:F,fontSize:18,fontStyle:'italic',color:BLUE,position:'absolute',top:32,left:40}}>vowed</div>

      {phase === 'quiz' && (
        <div style={{width:'100%',maxWidth:440}} className="text-center">
          <div className="flex items-center justify-center gap-2 mb-10">
            {QUESTIONS.map((_, i) => (
              <div key={i} style={{
                width: i === step ? 22 : 8, height: 8, borderRadius: 999,
                background: i <= step ? BLUE : '#EEF2F7',
                transition: 'all .3s ease'
              }}/>
            ))}
          </div>

          <p style={{fontSize:11,color:MUTE,marginBottom:10,letterSpacing:'0.04em'}}>
            PREGUNTA {step + 1} DE {QUESTIONS.length}
          </p>
          <h1 style={{fontFamily:F,fontSize:28,fontWeight:300,fontStyle:'italic',color:INK,marginBottom:32}}>
            {current.q}
          </h1>
          <div className="flex flex-col gap-3">
            {current.opts.map(opt => (
              <button
                key={opt.v}
                onClick={() => answer(opt)}
                style={{
                  width:'100%',border:'1px solid #DCE7F4',borderRadius:16,
                  padding:'18px 24px',fontSize:14,color:INK,background:'white',
                  cursor:'pointer',transition:'all .15s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.background = '#F3F7FC' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#DCE7F4'; e.currentTarget.style.background = 'white' }}
              >
                {opt.l}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'saving' && (
        <div className="text-center">
          <h1 style={{fontFamily:F,fontSize:26,fontWeight:300,fontStyle:'italic',color:INK}}>
            Preparando vuestro plan...
          </h1>
        </div>
      )}

      {phase === 'welcome' && (
        <div style={{width:'100%',maxWidth:480}} className="text-center">
          <div style={{fontSize:30,marginBottom:18}}>♡</div>
          <h1 style={{fontFamily:F,fontSize:30,fontWeight:300,fontStyle:'italic',color:INK,lineHeight:1.3,marginBottom:16}}>
            {allNo ? 'No os preocupéis, vamos paso a paso.' : 'Ya tenéis un buen punto de partida.'}
          </h1>
          <p style={{fontSize:13,color:MUTE,lineHeight:1.9,marginBottom:32,maxWidth:380,marginLeft:'auto',marginRight:'auto'}}>
            {allNo
              ? 'No hace falta tenerlo todo decidido. Os hemos preparado las primeras tareas, en orden, con una pequeña explicación de por qué importa cada una. Id marcándolas a vuestro ritmo.'
              : 'Hemos añadido algunas tareas para completar lo que ya tenéis. El resto lo iréis construyendo vosotros, sin prisa.'}
          </p>

          <div style={{border:'1px solid #EEF2F7',borderRadius:18,padding:'20px 24px',textAlign:'left',marginBottom:32}}>
            <p style={{fontSize:11,color:MUTE,marginBottom:12,letterSpacing:'0.04em'}}>VUESTRAS PRIMERAS TAREAS</p>
            {collected.slice(0,4).map((t,i) => (
              <div key={i} style={{padding: i > 0 ? '10px 0 0' : '0', borderTop: i > 0 ? '1px solid #F0F3F8' : 'none', marginTop: i > 0 ? 10 : 0}}>
                <p style={{fontSize:13,color:INK,marginBottom:2}}>{t.title}</p>
                <p style={{fontSize:11,color:MUTE,lineHeight:1.6}}>{t.why}</p>
              </div>
            ))}
            {collected.length > 4 && (
              <p style={{fontSize:11,color:BLUE,marginTop:10}}>+ {collected.length - 4} más en vuestro panel</p>
            )}
          </div>

          <button
            onClick={() => router.push('/dashboard')}
            style={{background:BLUE,color:'white',border:'none',borderRadius:999,padding:'15px 36px',fontSize:14,fontWeight:500,cursor:'pointer'}}
          >
            Entrar a vuestro panel
          </button>
        </div>
      )}
    </div>
  )
}
