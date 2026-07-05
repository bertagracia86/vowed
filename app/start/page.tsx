'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const BLUE = '#cbecff'
const BLUE_DARK = '#8ec5f7'
const BLUE_LIGHT = '#f0f9ff'
const INK = '#1a3a52'
const F = "'Cormorant Garamond', serif"

const STEPS = ['Empezar', 'Vosotros', 'Vuestra boda']

const STAGES = [
  { icon: '💍', label: 'Aún no estamos prometidos' },
  { icon: '✨', label: 'Recién prometidos, explorando' },
  { icon: '📋', label: 'Planificando, sin finca reservada' },
  { icon: '🏛️', label: 'Planificando y con finca ya reservada' },
  { icon: '🎉', label: 'Casi listo, solo quedan los detalles' },
]

export default function Start() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [names, setNames] = useState('')
  const [weddingName, setWeddingName] = useState('')
  const [stage, setStage] = useState<string | null>(null)

  return (
    <main style={{ fontFamily: F, background: 'white' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');
        * { box-sizing: border-box; }
        .btn-blue { background: ${BLUE_DARK}; color: white; border-radius: 999px; padding: 14px 36px; font-size: 16px; font-weight: 500; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 20px rgba(142,197,247,0.35); font-family: ${F}; }
        .btn-blue:hover { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(142,197,247,0.55); }
        .start-input { width: 100%; padding: 16px 18px; border: 1px solid ${BLUE}; border-radius: 14px; font-family: ${F}; font-size: 16px; color: ${INK}; background: ${BLUE_LIGHT}; outline: none; transition: border-color 0.2s; }
        .start-input:focus { border-color: ${BLUE_DARK}; }
        .stage-btn { width: 100%; text-align: left; padding: 16px 18px; border-radius: 14px; background: white; cursor: pointer; display: flex; align-items: center; gap: 14px; font-family: ${F}; font-size: 16px; color: ${INK}; transition: all 0.2s; margin-bottom: 12px; }
        .stage-btn:hover { background: ${BLUE_LIGHT}; }
        @media (max-width: 860px) { .start-photo { display: none !important; } }
      `}</style>

      <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* LEFT — foto */}
        <div className="start-photo" style={{ position: 'relative', overflow: 'hidden' }}>
          <img src="/invitados.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,58,82,0.55) 0%, rgba(26,58,82,0.05) 50%)' }} />
          <div style={{ position: 'absolute', bottom: 48, left: 48, right: 48 }}>
            <p style={{ fontFamily: F, fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 600, fontStyle: 'italic', color: 'white', lineHeight: 1.2, marginBottom: 20 }}>
              Para el día en que todo empieza
            </p>
            <div style={{ fontFamily: F, fontSize: 22, fontStyle: 'italic', fontWeight: 700, color: 'white' }}>mylov3 ♡</div>
          </div>
        </div>

        {/* RIGHT — panel */}
        <div style={{ position: 'relative', padding: '56px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Link href="/" aria-label="Cerrar" style={{ position: 'absolute', top: 28, right: 32, width: 34, height: 34, borderRadius: '50%', border: `1px solid ${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: INK, textDecoration: 'none', fontSize: 16 }}>✕</Link>

          {/* stepper */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 48, maxWidth: 440 }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    border: `1.5px solid ${i <= step ? BLUE_DARK : BLUE}`,
                    background: i < step ? BLUE_DARK : 'white',
                    color: i < step ? 'white' : (i === step ? BLUE_DARK : '#aac4d8'),
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, fontFamily: F,
                  }}>{i + 1}</div>
                  <span style={{ fontSize: 13, fontFamily: F, color: i === step ? INK : '#aac4d8' }}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div style={{ flex: 1, height: 1, background: BLUE, margin: '0 10px' }} />}
              </div>
            ))}
          </div>

          <div style={{ maxWidth: 440 }}>
            {step === 0 && (
              <>
                <h1 style={{ fontFamily: F, fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 600, color: INK, lineHeight: 1.2, marginBottom: 16 }}>
                  Planifiquemos juntos la boda perfecta.
                </h1>
                <p style={{ fontFamily: F, fontSize: 16, color: '#7a9ab5', lineHeight: 1.6, marginBottom: 36 }}>
                  Unas cuantas preguntas rápidas para personalizar vuestro presupuesto, lista de tareas y herramientas de planificación.
                </p>

                <label style={{ display: 'block', fontFamily: F, fontSize: 14, fontWeight: 600, color: INK, marginBottom: 8 }}>Tu nombre (o nombres)</label>
                <input className="start-input" value={names} onChange={e => setNames(e.target.value)} placeholder="Sarah y James" style={{ marginBottom: 8 }} />
                <p style={{ fontFamily: F, fontSize: 12, color: '#aac4d8', marginBottom: 24 }}>Se usa para el saludo y las exportaciones de tu panel. Opcional.</p>

                <label style={{ display: 'block', fontFamily: F, fontSize: 14, fontWeight: 600, color: INK, marginBottom: 8 }}>¿Cómo deberíamos llamar a vuestra boda?</label>
                <input className="start-input" value={weddingName} onChange={e => setWeddingName(e.target.value)} placeholder="Nuestro gran día" style={{ marginBottom: 8 }} />
                <p style={{ fontFamily: F, fontSize: 12, color: '#aac4d8', marginBottom: 32 }}>Si se deja en blanco, se mostrará &quot;Nuestra boda&quot; por defecto.</p>

                <button onClick={() => setStep(1)} className="btn-blue" style={{ width: '100%', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  Comience →
                </button>
              </>
            )}

            {step === 1 && (
              <>
                <h1 style={{ fontFamily: F, fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 600, color: INK, lineHeight: 1.2, marginBottom: 16 }}>
                  ¿En qué punto estáis de la planificación?
                </h1>
                <p style={{ fontFamily: F, fontSize: 16, color: '#7a9ab5', lineHeight: 1.6, marginBottom: 32 }}>
                  Tanto si estáis empezando a mirar como si estáis en la cuenta atrás final, os acompañamos.
                </p>

                {STAGES.map(s => (
                  <button
                    key={s.label}
                    onClick={() => setStage(s.label)}
                    className="stage-btn"
                    style={{ border: `1.5px solid ${stage === s.label ? BLUE_DARK : BLUE}`, background: stage === s.label ? BLUE_LIGHT : 'white' }}
                  >
                    <span style={{ fontSize: 18 }}>{s.icon}</span> {s.label}
                  </button>
                ))}

                <button
                  onClick={() => router.push('/dashboard')}
                  disabled={!stage}
                  className="btn-blue"
                  style={{ width: '100%', border: 'none', marginTop: 12, opacity: stage ? 1 : 0.5, cursor: stage ? 'pointer' : 'not-allowed' }}
                >
                  Siguiente
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
