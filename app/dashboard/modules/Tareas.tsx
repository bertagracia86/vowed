'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE, TEXT_PRIMARY, TEXT_SECONDARY } from '@/lib/constants'
import { Task } from '@/lib/types'
import { TASK_PHASES } from '@/lib/defaults'

interface Props { tasks: Task[]; setTasks: (t: Task[]) => void }

export default function Tareas({ tasks, setTasks }: Props) {
  const [newTask, setNewTask] = useState('')
  const [newPhase, setNewPhase] = useState(TASK_PHASES[0])
  const done = tasks.filter(t => t.done).length

  function toggle(id: string) {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function add() {
    if (!newTask.trim()) return
    setTasks([...tasks, { id: Date.now().toString(), title: newTask, done: false, phase: newPhase }])
    setNewTask('')
  }

  function remove(id: string) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const pct = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: TEXT_PRIMARY, marginBottom: 4 }}>Checklist</h1>
      <p style={{ fontSize: 12, color: TEXT_SECONDARY, marginBottom: 16 }}>{done} de {tasks.length} completadas</p>

      <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14, padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, height: 8, borderRadius: 999, background: '#F1EADA', overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: BLUE, borderRadius: 999, transition: 'width 0.4s' }} />
        </div>
        <span style={{ fontSize: 13, fontFamily: F, color: TEXT_PRIMARY, flexShrink: 0 }}>{pct}%</span>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          value={newTask} onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Añadir tarea..."
          style={{ flex: 1, minWidth: 180, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }}
        />
        <select value={newPhase} onChange={e => setNewPhase(e.target.value)} style={{ border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 14px', fontSize: 13, outline: 'none', background: 'white' }}>
          {TASK_PHASES.map(p => <option key={p}>{p}</option>)}
        </select>
        <button onClick={add} style={{ background: BLUE, color: 'white', border: 'none', borderRadius: 12, padding: '11px 22px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Añadir</button>
      </div>

      {tasks.length === 0 ? (
        <p style={{ fontSize: 13, color: TEXT_SECONDARY, textAlign: 'center', padding: '40px 0' }}>Sin tareas. Añadid la primera arriba.</p>
      ) : (
        TASK_PHASES.map(phase => {
          const phaseTasks = tasks.filter(t => t.phase === phase)
          if (phaseTasks.length === 0) return null
          const phaseDone = phaseTasks.filter(t => t.done).length
          return (
            <div key={phase} style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <p style={{ fontFamily: F, fontSize: 15, color: TEXT_PRIMARY }}>{phase}</p>
                <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>{phaseDone}/{phaseTasks.length}</span>
              </div>
              <div style={{ border: '1px solid #F5EFE0', borderRadius: 16, overflow: 'hidden' }}>
                {phaseTasks.map((t, i) => (
                  <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 18px', borderBottom: i < phaseTasks.length - 1 ? '1px solid #F5EFE0' : 'none' }}>
                    <span
                      onClick={() => toggle(t.id)}
                      style={{ width: 18, height: 18, borderRadius: 6, flexShrink: 0, border: t.done ? 'none' : '1.5px solid #E3DCC9', background: t.done ? BLUE : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      {t.done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </span>
                    <span style={{ flex: 1, fontSize: 13, color: t.done ? '#C9BCA8' : INK, textDecoration: t.done ? 'line-through' : 'none' }}>{t.title}</span>
                    <button onClick={() => remove(t.id)} style={{ background: 'none', border: 'none', color: '#C9BCA8', cursor: 'pointer', fontSize: 16, padding: '0 4px' }}>×</button>
                  </div>
                ))}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
