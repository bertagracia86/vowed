import { Task } from './types'
import { DEFAULT_TASKS, TASK_PHASES } from './defaults'

const PHASE_THRESHOLDS = [12, 9, 6, 3, 1, 0]

export function monthsUntil(dateStr: string): number | null {
  if (!dateStr) return null
  const target = new Date(dateStr)
  if (isNaN(target.getTime())) return null
  const now = new Date()
  const months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth())
  return Math.max(0, months)
}

// Reasigna cada tarea a la fase más urgente que ya debería estar en marcha,
// según los meses reales que quedan hasta la boda.
export function generatePersonalizedTasks(weddingDate: string): Task[] {
  const months = monthsUntil(weddingDate)
  if (months === null) return DEFAULT_TASKS
  let currentIdx = PHASE_THRESHOLDS.findIndex(t => months >= t)
  if (currentIdx === -1) currentIdx = PHASE_THRESHOLDS.length - 1
  return DEFAULT_TASKS.map(t => {
    const idx = TASK_PHASES.indexOf(t.phase)
    const newIdx = idx < currentIdx ? currentIdx : idx
    return { ...t, phase: TASK_PHASES[newIdx] }
  })
}
