'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE } from '@/lib/constants'
import { Task } from '@/lib/types'

interface Props { tasks: Task[]; setTasks: (t: Task[]) => void }

export default function Tareas({ tasks, setTasks }: Props) {
  const [newTask, setNewTask] = useState('')
  const done = tasks.filter(t => t.done).length

  function toggle(id: string) {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function add() {
    if (!newTask.trim()) return
    setTasks([...tasks, { id: Date.now().toString(), title: newTask, done: false }])
    setNewTask('')
  }

  function remove(id: string) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Vuestras tareas</h1>
      <p style={{ fontSize: 12, color: MUTE, marginBottom: 24 }}>{done} de {tasks.length} completadas</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input
          value={newTask} onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Añadir tarea..."
          style={{ flex: 1, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }}
        />
        <button onClick={add} style={{ background: BLUE, color: 'white', border: 'none', borderRadius: 12, padding: '11px 22px', fontSize: 13, cursor: 'pointer' }}>Añadir</button>
      </div>

      {tasks.length === 0 ? (
        <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '40px 0' }}>Sin tareas. Añadid la primera arriba.</p>
      ) : (
        <div style={{ border: '1px solid #F5EFE0', borderRadius: 16, overflow: 'hidden' }}>
          {tasks.map((t, i) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 18px', borderBottom: i < tasks.length - 1 ? '1px solid #F5EFE0' : 'none' }}>
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
      )}
    </div>
  )
}
