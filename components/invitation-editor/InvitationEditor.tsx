'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import type Konva from 'konva'
import { InvitationTemplate } from '@/lib/invitations/schema'
import { useInvitationEditor } from '@/lib/invitations/store'
import { loadDesign, saveDesign } from '@/lib/invitations/persistApi'
import { exportPng, exportPdf } from '@/lib/invitations/export'
import EditorPanel from './EditorPanel'
import { F } from '@/lib/constants'

const Canvas = dynamic(() => import('./Canvas'), { ssr: false })

const SUBTEXT = '#7C6858'
const BROWN = '#898a76'
const BEIGE = '#E7DDD2'

export default function InvitationEditor({
  template, userId, readOnly, onBack,
}: { template: InvitationTemplate; userId?: string | null; readOnly?: boolean; onBack: () => void }) {
  const { loadTemplate, updateElement, select, selectedId, elements } = useInvitationEditor()
  const stageRef = useRef<Konva.Stage>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const els = elements()

  useEffect(() => {
    let cancelled = false
    async function init() {
      if (userId && !readOnly) {
        const overrides = await loadDesign(userId, template.id)
        if (!cancelled) loadTemplate(template, overrides)
      } else {
        loadTemplate(template, {})
      }
    }
    init()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template.id, userId, readOnly])

  function scheduleSave() {
    if (readOnly || !userId) return
    setSaveStatus('saving')
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      const { overrides } = useInvitationEditor.getState()
      await saveDesign(userId, template.id, overrides)
      setSaveStatus('saved')
    }, 700)
  }

  function handleUpdate(id: string, patch: any) {
    updateElement(id, patch)
    scheduleSave()
  }

  function handleDrag(id: string, x: number, y: number) {
    updateElement(id, { x, y })
    scheduleSave()
  }

  function handleImageUpload(id: string, file: File) {
    const reader = new FileReader()
    reader.onload = () => handleUpdate(id, { src: String(reader.result) })
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: SUBTEXT, fontSize: 12, cursor: 'pointer', padding: 0 }}>‹ Volver a las invitaciones</button>
        <span style={{ fontSize: 11, color: SUBTEXT }}>
          {readOnly ? 'Modo demo: los cambios no se guardan' : saveStatus === 'saving' ? 'Guardando…' : saveStatus === 'saved' ? 'Guardado ✓' : ''}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, border: `1px solid ${BEIGE}`, borderRadius: 16, overflow: 'hidden', background: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4EFE8', padding: 30 }}>
          {els.length > 0 && (
            <div style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
              <Canvas
                template={template}
                elements={els}
                selectedId={selectedId}
                onSelect={select}
                onDragElement={handleDrag}
                stageRef={stageRef}
              />
            </div>
          )}
        </div>
        <div style={{ borderLeft: `1px solid ${BEIGE}` }}>
          <EditorPanel template={template} elements={els} selectedId={selectedId} onUpdate={handleUpdate} onSelectImage={handleImageUpload} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button
          onClick={() => stageRef.current && exportPng(stageRef.current, template, template.id)}
          style={{ flex: 1, border: `1px solid ${BROWN}`, background: 'white', color: BROWN, borderRadius: 999, padding: '11px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          Descargar imagen
        </button>
        <button
          onClick={() => stageRef.current && exportPdf(stageRef.current, template, template.id)}
          style={{ flex: 1, background: BROWN, color: 'white', border: 'none', borderRadius: 999, padding: '11px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          Descargar PDF para imprenta
        </button>
      </div>
    </div>
  )
}
