'use client'
import { F, BLUE, INK, MUTE } from '@/lib/constants'
import { WeddingInfo } from '@/lib/types'

interface Props { info: WeddingInfo; setInfo: (i: WeddingInfo) => void }

export default function WebBoda({ info, setInfo }: Props) {
  function update(field: keyof WeddingInfo, value: string) {
    setInfo({ ...info, [field]: value })
  }

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Página web de la boda</h1>
      <p style={{ fontSize: 12, color: MUTE, marginBottom: 24 }}>Esta información la verán vuestros invitados</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {[
          { label: 'Nombre 1', field: 'partner1', placeholder: 'Laura' },
          { label: 'Nombre 2', field: 'partner2', placeholder: 'Marcos' },
          { label: 'Fecha de la boda', field: 'date', placeholder: '', type: 'date' },
          { label: 'Lugar', field: 'venue', placeholder: 'Jardines del Rey, Madrid' },
        ].map(f => (
          <div key={f.field}>
            <p style={{ fontSize: 11, color: MUTE, marginBottom: 6, letterSpacing: '0.04em' }}>{f.label.toUpperCase()}</p>
            <input
              type={f.type || 'text'}
              value={info[f.field as keyof WeddingInfo]}
              onChange={e => update(f.field as keyof WeddingInfo, e.target.value)}
              placeholder={f.placeholder}
              style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, color: MUTE, marginBottom: 6, letterSpacing: '0.04em' }}>MENSAJE PARA LOS INVITADOS</p>
        <textarea
          value={info.message}
          onChange={e => update('message', e.target.value)}
          rows={4}
          placeholder="Nos casamos y queremos celebrarlo con vosotros..."
          style={{ width: '100%', border: '1px solid #E3DCC9', borderRadius: 12, padding: '13px 16px', fontSize: 13, outline: 'none', resize: 'vertical', lineHeight: 1.7 }}
        />
      </div>

      <p style={{ fontSize: 12, color: MUTE, marginBottom: 16 }}>Vista previa de cómo lo verán vuestros invitados:</p>
      <div style={{ border: '1px solid #F5EFE0', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #F1E7D0, #F8F3E8)', padding: '48px 40px', textAlign: 'center' }}>
          <p style={{ fontFamily: F, fontSize: 14, color: MUTE, marginBottom: 8 }}>Os invitamos a nuestra boda</p>
          <h2 style={{ fontFamily: F, fontSize: 42, fontWeight: 400, color: INK, marginBottom: 12 }}>
            {info.partner1 || 'Laura'} <span style={{ color: BLUE }}>♡</span> {info.partner2 || 'Marcos'}
          </h2>
          {info.date && (
            <p style={{ fontSize: 14, color: MUTE, marginBottom: 6 }}>
              {new Date(info.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
          {info.venue && <p style={{ fontSize: 13, color: MUTE }}>{info.venue}</p>}
          {info.message && (
            <p style={{ fontSize: 14, color: INK, maxWidth: 480, margin: '24px auto 0', lineHeight: 1.8, fontStyle: 'italic' }}>
              "{info.message}"
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
