import type Konva from 'konva'
import { InvitationTemplate } from './schema'
import { editorSize, printSize } from './dims'

// Renderizado -> Exportación: this file never touches template content or
// editor state directly, it only takes a live Konva stage and turns it into
// downloadable artifacts. Swapping the export target (PNG/PDF/print-ready
// TIFF for a fulfillment API) only ever touches this file.

export function exportPng(stage: Konva.Stage, template: InvitationTemplate, filename: string) {
  const { width } = editorSize(template)
  const { width: printWidth } = printSize(template)
  const pixelRatio = printWidth / width // scales the on-screen stage up to true 300dpi
  const dataUrl = stage.toDataURL({ pixelRatio, mimeType: 'image/png' })
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = `${filename}.png`
  a.click()
}

export async function exportPdf(stage: Konva.Stage, template: InvitationTemplate, filename: string) {
  const { jsPDF } = await import('jspdf')
  const { width } = editorSize(template)
  const { width: printWidth } = printSize(template)
  const pixelRatio = printWidth / width
  const dataUrl = stage.toDataURL({ pixelRatio, mimeType: 'image/png' })

  const pdf = new jsPDF({ unit: 'mm', format: [template.widthMm, template.heightMm] })
  pdf.addImage(dataUrl, 'PNG', 0, 0, template.widthMm, template.heightMm)
  pdf.save(`${filename}.pdf`)
}
