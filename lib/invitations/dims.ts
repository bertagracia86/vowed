import { InvitationTemplate } from './schema'

export const EDITOR_WIDTH_PX = 500

export function editorSize(template: InvitationTemplate) {
  const ratio = template.heightMm / template.widthMm
  return { width: EDITOR_WIDTH_PX, height: Math.round(EDITOR_WIDTH_PX * ratio) }
}

// 300dpi print export size in px for the template's physical dimensions.
export function printSize(template: InvitationTemplate) {
  const mmToPx = 300 / 25.4
  return { width: Math.round(template.widthMm * mmToPx), height: Math.round(template.heightMm * mmToPx) }
}
