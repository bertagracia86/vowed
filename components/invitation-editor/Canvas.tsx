'use client'
import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Rect, Text, Line, Image as KonvaImage } from 'react-konva'
import Konva from 'konva'
import { InvitationTemplate, TemplateElement, Zone } from '@/lib/invitations/schema'
import { editorSize } from '@/lib/invitations/dims'

function useImage(src: string | undefined) {
  const [img, setImg] = useState<HTMLImageElement | null>(null)
  useEffect(() => {
    if (!src) { setImg(null); return }
    const el = new window.Image()
    el.crossOrigin = 'anonymous'
    el.src = src
    el.onload = () => setImg(el)
  }, [src])
  return img
}

function clampToZone(x: number, y: number, zone: Zone | undefined) {
  if (!zone) return { x, y }
  return {
    x: Math.min(Math.max(x, zone.x), zone.x + zone.width),
    y: Math.min(Math.max(y, zone.y), zone.y + zone.height),
  }
}

function EditableImage({ el, draggable, onDrag }: { el: Extract<TemplateElement, { type: 'image' }>; draggable: boolean; onDrag: (x: number, y: number) => void }) {
  const img = useImage(el.src)
  return (
    <KonvaImage
      image={img ?? undefined}
      x={el.x} y={el.y} width={el.width} height={el.height}
      draggable={draggable}
      onDragEnd={e => { const p = clampToZone(e.target.x(), e.target.y(), el.allowedZone); onDrag(p.x, p.y) }}
      dragBoundFunc={pos => el.allowedZone ? clampToZone(pos.x, pos.y, el.allowedZone) : pos}
    />
  )
}

export default function InvitationCanvas({
  template, elements, selectedId, onSelect, onDragElement, stageRef,
}: {
  template: InvitationTemplate
  elements: TemplateElement[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  onDragElement: (id: string, x: number, y: number) => void
  stageRef?: React.RefObject<Konva.Stage>
}) {
  const { width, height } = editorSize(template)

  return (
    <Stage width={width} height={height} ref={stageRef} onMouseDown={e => { if (e.target === e.target.getStage()) onSelect(null) }} style={{ background: template.background, borderRadius: 4 }}>
      <Layer>
        <Rect x={0} y={0} width={width} height={height} fill={template.background} />
        {elements.map(el => {
          const isSelected = el.id === selectedId
          const draggable = el.type === 'shape' ? false : !!(el as any).editable?.position

          if (el.type === 'text') {
            return (
              <Text
                key={el.id}
                text={el.text}
                x={el.x} y={el.y} width={el.width}
                fontFamily={el.font} fontSize={el.fontSize} fill={el.color}
                align={el.align ?? 'left'} fontStyle={el.fontStyle ?? 'normal'}
                draggable={draggable}
                onClick={() => onSelect(el.id)} onTap={() => onSelect(el.id)}
                onDragEnd={e => { const p = clampToZone(e.target.x(), e.target.y(), el.allowedZone); onDragElement(el.id, p.x, p.y) }}
                dragBoundFunc={pos => el.allowedZone ? clampToZone(pos.x, pos.y, el.allowedZone) : pos}
                stroke={isSelected ? '#898a76' : undefined}
                strokeWidth={isSelected ? 0.6 : 0}
              />
            )
          }
          if (el.type === 'image') {
            return <EditableImage key={el.id} el={el} draggable={draggable} onDrag={(x, y) => onDragElement(el.id, x, y)} />
          }
          if (el.type === 'shape' && el.shape === 'line') {
            return <Line key={el.id} points={[el.x, el.y, el.x + (el.width ?? 60), el.y]} stroke={el.stroke} strokeWidth={el.strokeWidth ?? 1} />
          }
          if (el.type === 'shape' && el.shape === 'rect') {
            return <Rect key={el.id} x={el.x} y={el.y} width={el.width} height={el.height} fill={el.fill} stroke={el.stroke} strokeWidth={el.strokeWidth} />
          }
          return null
        })}
      </Layer>
    </Stage>
  )
}
