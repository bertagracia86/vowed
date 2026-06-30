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
      { v: 'no', l: 'Aún no', tasks: ['Buscar y visitar al menos 3 espacios', 'Comparar precios y disponibilidad', 'Reservar el espacio elegido'] },
      { v: 'yes', l: 'Sí, ya lo tenemos', tasks: ['Firmar el contrato definitivo del espacio'] },
    ],
  },
  {
    key: 'date',
    q: '¿Tenéis fecha?',
    opts: [
      { v: 'no', l: 'Todavía no', tasks: ['Elegir la fecha definitiva con el espacio'] },
      { v: 'yes', l: 'Sí, ya la tenemos', tasks: ['Confirmar la fecha por escrito con todos los proveedores'] },
    ],
  },
  {
    key: 'guests',
    q: '¿Tenéis lista de invitados?',
    opts: [
      { v: 'no', l: 'Empezamos de cero', tasks: ['Hacer una primera lista de invitados cercanos'] },
      { v: 'yes', l: 'Ya tenemos algo', tasks: ['Completar la lista de invitados', 'Conseguir direcciones para las invitaciones'] },
    ],
  },
  {
    key: 'budget',
    q: '¿Habéis definido presupuesto?',
    opts: [
      { v: 'no', l: 'No, aún no', tasks: ['Definir el presupuesto total disponible'] },
      { v: 'yes', l: 'Sí, lo tenemos claro', tasks: ['Repartir el presupuesto por categorías'] },
    ],
  },
]

export default function StartQuiz() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [collected, setCollected] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  function answer(opt: { v: string; l: string; tasks: string[] }) {
    const newTasks = [...collected, ...opt.tasks]
    setCollected(newTasks)
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      finish(newTasks)
    }
  }

  async function finish(allTasks: string[]) {
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user && allTasks.length > 0) {
      const rows = allTasks.map(title => ({ user_id: user.id, title, done: false }))
      await supabase.from('tasks').insert(rows)
    }
    router.push('/dashboard')
  }

  const current = QUESTIONS[step]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{background:'white',fontFamily:"'Inter',sans-serif"}}>
      <div style={{fontFamily:F,fontSize:18,fontStyle:'italic',color:BLUE,position:'absolute',top:32,left:40}}>vowed</div>

      <div style={{width:'100%',maxWidth:420}} className="text-center">
        <div className="flex items-center justify-center gap-2 mb-10">
          {QUESTIONS.map((_, i) => (
            <div key={i} style={{
              width: i === step ? 22 : 8, height: 8, borderRadius: 999,
              background: i <= step ? BLUE : '#EEF2F7',
              transition: 'all .3s ease'
            }}/>
          ))}
        </div>

        {saving ? (
          <div>
            <h1 style={{fontFamily:F,fontSize:26,fontWeight:300,fontStyle:'italic',color:INK,marginBottom:10}}>
              Creando vuestras primeras tareas...
            </h1>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
