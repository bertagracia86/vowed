'use client'
import { InvitationTemplate, TemplateElement, TextElement } from '@/lib/invitations/schema'
import { F } from '@/lib/constants'

const SUBTEXT = '#7C6858'
const BEIGE = '#E7DDD2'
const BROWN = '#898a76'

export default function EditorPanel({
  template, elements, selectedId, onUpdate, onSelectImage,
}: {
  template: InvitationTemplate
  elements: TemplateElement[]
  selectedId: string | null
  onUpdate: (id: string, patch: Partial<TextElement>) => void
  onSelectImage: (id: string, file: File) => void
}) {
  const el = elements.find(e => e.id === selectedId)

  if (!el) {
    return (
      <div style={{ padding: 20 }}>
        <p style={{ fontFamily: F, fontSize: 16, color: '#2F2F2F', marginBottom: 6 }}>Personalizar</p>
        <p style={{ fontSize: 12, color: SUBTEXT, lineHeight: 1.6 }}>Tocad cualquier texto o foto de la invitación para editarlo. Solo podéis moveros dentro de las zonas permitidas de esta plantilla, así el diseño nunca se rompe.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <p style={{ fontFamily: F, fontSize: 15, color: '#2F2F2F', marginBottom: 16, textTransform: 'capitalize' }}>Editar {el.id}</p>

      {el.type === 'text' && (
        <>
          {el.editable?.text && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, color: SUBTEXT, marginBottom: 6 }}>Texto</p>
              <textarea
                value={el.text}
                onChange={e => onUpdate(el.id, { text: e.target.value })}
                rows={2}
                style={{ width: '100%', border: `1px solid ${BEIGE}`, borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: F }}
              />
            </div>
          )}

          {el.editable?.font && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, color: SUBTEXT, marginBottom: 6 }}>Tipografía</p>
              <select value={el.font} onChange={e => onUpdate(el.id, { font: e.target.value })} style={{ width: '100%', border: `1px solid ${BEIGE}`, borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none' }}>
                {template.fontOptions.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          )}

          {el.editable?.fontSize && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, color: SUBTEXT, marginBottom: 6 }}>Tamaño ({el.fontSize}px)</p>
              <input
                type="range" min={el.editable.fontSize.min} max={el.editable.fontSize.max} value={el.fontSize}
                onChange={e => onUpdate(el.id, { fontSize: Number(e.target.value) })}
                style={{ width: '100%' }}
              />
            </div>
          )}

          {el.editable?.color && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, color: SUBTEXT, marginBottom: 6 }}>Color</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {template.colorOptions.map(c => (
                  <button key={c} onClick={() => onUpdate(el.id, { color: c })} style={{
                    width: 26, height: 26, borderRadius: '50%', background: c, cursor: 'pointer',
                    border: el.color === c ? `2px solid ${BROWN}` : '1px solid rgba(0,0,0,0.1)',
                  }} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {el.type === 'image' && el.editable?.image && (
        <div>
          <p style={{ fontSize: 11, color: SUBTEXT, marginBottom: 6 }}>Foto</p>
          <label style={{ display: 'block', border: `1px dashed ${BEIGE}`, borderRadius: 10, padding: '18px 10px', textAlign: 'center', fontSize: 12, color: SUBTEXT, cursor: 'pointer' }}>
            Subir vuestra foto
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) onSelectImage(el.id, f) }} />
          </label>
        </div>
      )}
    </div>
  )
}
