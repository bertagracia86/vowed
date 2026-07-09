'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const BLUE = '#AAA396'
const BLUE_DARK = '#898a76'
const BLUE_LIGHT = '#efe9e3'
const INK = '#898a76'
const F = "'Cormorant', serif"

// grupo del stepper al que pertenece cada paso (0-indexed)
const STEPS = ['Empezar', 'Lo básico', 'Últimos detalles']
const STEP_GROUP = [0, 1, 2, 2, 2]

const STAGES = [
  { label: 'Aún no estamos prometidos' },
  { label: 'Recién prometidos, explorando' },
  { label: 'Planificando, sin finca reservada' },
  { label: 'Planificando y con finca ya reservada' },
  { label: 'Casi listo, solo quedan los detalles' },
]

const SOURCES = [
  'Blog o artículo', 'Anuncio en la calle', 'Recomendación de amigos o familia', 'Instagram',
  'TikTok', 'Búsqueda con IA (ChatGPT, Gemini...)', 'Facebook', 'YouTube',
  'Búsqueda en Google', 'En las noticias', 'Proveedor de bodas', 'Pinterest', 'Podcast', 'Otro',
]

export default function Start() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [stage, setStage] = useState<string | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [partnerFirstName, setPartnerFirstName] = useState('')
  const [partnerLastName, setPartnerLastName] = useState('')
  const [weddingDate, setWeddingDate] = useState('')
  const [dateUndecided, setDateUndecided] = useState(false)
  const [location, setLocation] = useState('')
  const [locationUndecided, setLocationUndecided] = useState(false)
  const [guestCount, setGuestCount] = useState('')
  const [guestUndecided, setGuestUndecided] = useState(false)
  const [sources, setSources] = useState<string[]>([])

  const totalSteps = 5
  const group = STEP_GROUP[step]

  const toggleSource = (s: string) => {
    setSources(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  return (
    <main style={{ fontFamily: F, background: 'white' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');
        * { box-sizing: border-box; }
        .btn-blue { background: ${BLUE_DARK}; color: white; border-radius: 999px; padding: 14px 36px; font-size: 16px; font-weight: 500; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 20px rgba(43,42,38,0.35); font-family: ${F}; }
        .btn-blue:hover { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(43,42,38,0.55); }
        .start-input { width: 100%; padding: 16px 18px; border: 1px solid ${BLUE}; border-radius: 14px; font-family: ${F}; font-size: 16px; color: ${INK}; background: ${BLUE_LIGHT}; outline: none; transition: border-color 0.2s; }
        .start-input:focus { border-color: ${BLUE_DARK}; }
        .stage-btn { width: 100%; text-align: left; padding: 12px 18px; border-radius: 14px; background: white; cursor: pointer; display: flex; align-items: center; gap: 14px; font-family: ${F}; font-size: 15px; color: ${INK}; transition: all 0.2s; margin-bottom: 8px; }
        .stage-btn:hover { background: ${BLUE_LIGHT}; }
        .check-row { display: flex; align-items: center; gap: 10px; font-family: ${F}; font-size: 15px; color: ${INK}; cursor: pointer; user-select: none; }
        .source-chip { padding: 10px 16px; border-radius: 999px; border: 1.5px solid ${BLUE}; background: white; font-family: ${F}; font-size: 14px; color: ${INK}; cursor: pointer; transition: all 0.2s; }
        @media (max-width: 860px) { .start-photo { display: none !important; } }
      `}</style>

      <div style={{ height: '100vh', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* LEFT — foto */}
        <div className="start-photo" style={{ position: 'relative', overflow: 'hidden' }}>
          <img src="/invitados.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(43,42,38,0.55) 0%, rgba(43,42,38,0.05) 50%)' }} />
          <div style={{ position: 'absolute', bottom: 48, left: 48, right: 48 }}>
            <p style={{ fontFamily: F, fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 600, fontStyle: 'italic', color: 'white', lineHeight: 1.2, marginBottom: 20 }}>
              Para el día en que todo empieza
            </p>
            <div style={{ fontFamily: F, fontSize: 22, fontStyle: 'italic', fontWeight: 700, color: 'white' }}>mylov3 ♡</div>
          </div>
        </div>

        {/* RIGHT — panel */}
        <div style={{ position: 'relative', padding: '32px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', height: '100vh' }}>
          <Link href="/" aria-label="Cerrar" style={{ position: 'absolute', top: 28, right: 32, width: 34, height: 34, borderRadius: '50%', border: `1px solid ${BLUE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: INK, textDecoration: 'none', fontSize: 16 }}>✕</Link>

          {/* stepper */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24, maxWidth: 460 }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    border: `1.5px solid ${i <= group ? BLUE_DARK : BLUE}`,
                    background: i < group ? BLUE_DARK : 'white',
                    color: i < group ? 'white' : (i === group ? BLUE_DARK : '#AAA396'),
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, fontFamily: F,
                  }}>{i < group ? '✓' : i + 1}</div>
                  <span style={{ fontSize: 13, fontFamily: F, color: i === group ? INK : '#AAA396' }}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div style={{ flex: 1, height: 1, background: BLUE, margin: '0 10px' }} />}
              </div>
            ))}
          </div>

          <div style={{ maxWidth: 460 }}>

            {/* PASO 1 — etapa de planificación */}
            {step === 0 && (
              <>
                <h1 style={{ fontFamily: F, fontSize: 'clamp(1.5rem,2.6vw,2rem)', fontWeight: 600, color: INK, lineHeight: 1.2, marginBottom: 16 }}>
                  ¿En qué punto estáis de la planificación?
                </h1>
                <p style={{ fontFamily: F, fontSize: 16, color: '#8a7358', lineHeight: 1.5, marginBottom: 20 }}>
                  Tanto si estáis empezando a mirar como si estáis en la cuenta atrás final, os acompañamos.
                </p>

                {STAGES.map(s => (
                  <button
                    key={s.label}
                    onClick={() => setStage(s.label)}
                    className="stage-btn"
                    style={{ border: `1.5px solid ${stage === s.label ? BLUE_DARK : BLUE}`, background: stage === s.label ? BLUE_LIGHT : 'white' }}
                  >
                    {s.label}
                  </button>
                ))}

                <button
                  onClick={() => setStep(1)}
                  disabled={!stage}
                  className="btn-blue"
                  style={{ width: '100%', border: 'none', marginTop: 12, opacity: stage ? 1 : 0.5, cursor: stage ? 'pointer' : 'not-allowed' }}
                >
                  Siguiente
                </button>
              </>
            )}

            {/* PASO 2 — datos básicos */}
            {step === 1 && (
              <>
                <h1 style={{ fontFamily: F, fontSize: 'clamp(1.5rem,2.6vw,2rem)', fontWeight: 600, color: INK, lineHeight: 1.2, marginBottom: 16 }}>
                  Como en toda gran relación, esto empieza por lo básico
                </h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: F, fontSize: 14, fontWeight: 600, color: INK, marginBottom: 8 }}>Tu nombre</label>
                    <input className="start-input" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Sarah" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: F, fontSize: 14, fontWeight: 600, color: INK, marginBottom: 8 }}>Tus apellidos</label>
                    <input className="start-input" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="García" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: F, fontSize: 14, fontWeight: 600, color: INK, marginBottom: 8 }}>Nombre de tu pareja</label>
                    <input className="start-input" value={partnerFirstName} onChange={e => setPartnerFirstName(e.target.value)} placeholder="James" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: F, fontSize: 14, fontWeight: 600, color: INK, marginBottom: 8 }}>Apellidos de tu pareja</label>
                    <input className="start-input" value={partnerLastName} onChange={e => setPartnerLastName(e.target.value)} placeholder="López" />
                  </div>
                </div>

                <label style={{ display: 'block', fontFamily: F, fontSize: 14, fontWeight: 600, color: INK, marginBottom: 8 }}>Fecha de la boda <span style={{ fontWeight: 400, color: '#AAA396' }}>(podéis cambiarla luego)</span></label>
                <input className="start-input" type="text" value={weddingDate} onChange={e => setWeddingDate(e.target.value)} placeholder="DD/MM/AAAA" disabled={dateUndecided} style={{ marginBottom: 14, opacity: dateUndecided ? 0.5 : 1 }} />

                <label className="check-row" style={{ marginBottom: 16 }}>
                  <input type="checkbox" checked={dateUndecided} onChange={e => setDateUndecided(e.target.checked)} />
                  Aún lo estamos decidiendo
                </label>

                <button onClick={() => setStep(2)} className="btn-blue" style={{ width: '100%', border: 'none' }}>
                  Siguiente
                </button>
              </>
            )}

            {/* PASO 3 — dónde os casáis */}
            {step === 2 && (
              <>
                <h1 style={{ fontFamily: F, fontSize: 'clamp(1.5rem,2.6vw,2rem)', fontWeight: 600, color: INK, lineHeight: 1.2, marginBottom: 16 }}>
                  Ahora, hablemos del gran día
                </h1>
                <p style={{ fontFamily: F, fontSize: 16, color: '#8a7358', lineHeight: 1.5, marginBottom: 20 }}>
                  Os ayudamos a planificar la boda que queráis, pequeña o grande, cerca o lejos.
                </p>

                <label style={{ display: 'block', fontFamily: F, fontSize: 14, fontWeight: 600, color: INK, marginBottom: 8 }}>¿Dónde os casáis? <span style={{ fontWeight: 400, color: '#AAA396' }}>(vale con una idea aproximada)</span></label>
                <input className="start-input" value={location} onChange={e => setLocation(e.target.value)} placeholder="Ciudad o zona" disabled={locationUndecided} style={{ marginBottom: 14, opacity: locationUndecided ? 0.5 : 1 }} />

                <label className="check-row" style={{ marginBottom: 16 }}>
                  <input type="checkbox" checked={locationUndecided} onChange={e => setLocationUndecided(e.target.checked)} />
                  Aún lo estamos decidiendo
                </label>

                <button onClick={() => setStep(3)} className="btn-blue" style={{ width: '100%', border: 'none' }}>
                  Siguiente
                </button>
              </>
            )}

            {/* PASO 4 — número de invitados */}
            {step === 3 && (
              <>
                <h1 style={{ fontFamily: F, fontSize: 'clamp(1.5rem,2.6vw,2rem)', fontWeight: 600, color: INK, lineHeight: 1.2, marginBottom: 16 }}>
                  ¡Suena a fiesta! ¿Quién estará en la lista?
                </h1>
                <p style={{ fontFamily: F, fontSize: 16, color: '#8a7358', lineHeight: 1.5, marginBottom: 20 }}>
                  Una aproximación nos vale para empezar a organizar mesas y presupuesto.
                </p>

                <label style={{ display: 'block', fontFamily: F, fontSize: 14, fontWeight: 600, color: INK, marginBottom: 8 }}>Número aproximado de invitados</label>
                <input className="start-input" type="number" value={guestCount} onChange={e => setGuestCount(e.target.value)} placeholder="Ej. 80" disabled={guestUndecided} style={{ marginBottom: 14, opacity: guestUndecided ? 0.5 : 1 }} />

                <label className="check-row" style={{ marginBottom: 16 }}>
                  <input type="checkbox" checked={guestUndecided} onChange={e => setGuestUndecided(e.target.checked)} />
                  Aún lo estamos decidiendo
                </label>

                <button onClick={() => setStep(4)} className="btn-blue" style={{ width: '100%', border: 'none' }}>
                  Siguiente
                </button>
              </>
            )}

            {/* PASO 5 — cómo nos conociste */}
            {step === 4 && (
              <>
                <h1 style={{ fontFamily: F, fontSize: 'clamp(1.5rem,2.6vw,2rem)', fontWeight: 600, color: INK, lineHeight: 1.2, marginBottom: 16 }}>
                  Una última cosa. ¿Cómo nos conociste?
                </h1>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
                  {SOURCES.map(s => (
                    <button
                      key={s}
                      onClick={() => toggleSource(s)}
                      className="source-chip"
                      style={{ borderColor: sources.includes(s) ? BLUE_DARK : BLUE, background: sources.includes(s) ? BLUE_LIGHT : 'white' }}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <button onClick={() => router.push('/dashboard')} className="btn-blue" style={{ width: '100%', border: 'none' }}>
                  Empezar a planificar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
