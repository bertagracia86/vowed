// ---------------------------------------------------------------------------
// Invitation template schema. Templates are pure data (JSON) — the editor,
// canvas renderer, exporter and print flow never hardcode template content,
// they only interpret this schema. Adding a new template = adding a new
// JSON file (or DB row later), never touching editor/renderer/export code.
// ---------------------------------------------------------------------------

export interface Zone { x: number; y: number; width: number; height: number }

export interface BaseElement {
  id: string
  /** Bounding zone the element may be dragged within. Omit to lock position. */
  allowedZone?: Zone
  x: number
  y: number
}

export interface TextElement extends BaseElement {
  type: 'text'
  text: string
  font: string
  fontSize: number
  color: string
  align?: 'left' | 'center' | 'right'
  fontStyle?: 'normal' | 'italic' | 'bold' | 'italic bold'
  width?: number
  editable?: {
    text?: boolean
    font?: boolean
    color?: boolean
    fontSize?: { min: number; max: number }
    position?: boolean
  }
}

export interface ImageElement extends BaseElement {
  type: 'image'
  src: string
  width: number
  height: number
  editable?: {
    image?: boolean // user may upload/replace the photo
    position?: boolean
  }
}

export interface ShapeElement extends BaseElement {
  type: 'shape'
  shape: 'rect' | 'circle' | 'line'
  width?: number
  height?: number
  radius?: number
  fill?: string
  stroke?: string
  strokeWidth?: number
  editable?: {
    color?: boolean
  }
}

export type TemplateElement = TextElement | ImageElement | ShapeElement

export interface InvitationTemplate {
  id: string
  name: string
  style: string
  /** Physical card size in mm — drives the true-scale canvas + PDF export. */
  widthMm: number
  heightMm: number
  background: string
  thumbnail: string
  elements: TemplateElement[]
  /** Fonts offered in the font picker for this template. */
  fontOptions: string[]
  /** Curated color palette offered in the color picker for this template. */
  colorOptions: string[]
}

// A user's saved customization is just the diff against the template:
// element id -> overridden properties. Keeps storage tiny and templates
// always re-editable even if we improve the base design later.
export type ElementOverride = Partial<Pick<TextElement, 'text' | 'font' | 'fontSize' | 'color' | 'x' | 'y'>>
  & Partial<Pick<ImageElement, 'src' | 'x' | 'y'>>

export interface InvitationDesign {
  id: string
  templateId: string
  overrides: Record<string, ElementOverride>
}

export function applyOverrides(template: InvitationTemplate, overrides: Record<string, ElementOverride>): TemplateElement[] {
  return template.elements.map(el => {
    const o = overrides[el.id]
    if (!o) return el
    return { ...el, ...o } as TemplateElement
  })
}
