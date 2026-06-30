'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE } from '@/lib/constants'

interface Note { id: string; title: string; content: string; color: string }
interface Props { notes: Note[]; setNotes: (n: Note[]) => void }

const COLORS = ['#FBF3E1', '#EAF1FA', '#F3F0FA', '#FBEEEE', '#EEF5EE']

export default function Notas({ notes, setNotes }: Props) {
  const [newTitle, setNewTitle] = useState('')
  const [editing, setEditing] = useState<string | null>(null)

  function add() {
    const note: Note = { id: Date.now().toString(), title: newTitle || 'Nueva nota', content: '', color: COLORS[notes.length % COLORS.length] }
    setNotes([...notes, note])
    setNewTitle('')
    setEditing(note.id)
  }

  function update(id: string, field: keyof Note, value: string) {
    setNotes(notes.map(n => n.id === id ? { ...n, [field]: value } : n))
  }

  function remove(id: string) {
    setNotes(notes.filter(n => n.id !== id))
  }

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Notas</h1>
      <p style={{ fontSize: 12, color: MUTE, marginBottom: 24 }}>{notes.length} notas guardadas</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input value={newTitle} onChange={e => setNewTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="Título de la nota..." style={{ flex: 1, border: '1px solid #DCE7F4', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
        <button onClick={add} style={{ background: BLUE, color: 'white', border: 'none', borderRadius: 12, padding: '11px 22px', fontSize: 13, cursor: 'pointer' }}>+ Nota</button>
      </div>

      {notes.length === 0 ? (
        <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '40px 0' }}>Sin notas todavía.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {notes.map(note => (
            <div key={note.id} style={{ background: note.color, borderRadius: 16, padding: 20, position: 'relative' }}>
              <button onClick={() => remove(note.id)} style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', color: '#C7D2E0', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>×</button>
              <input
                value={note.title}
                onChange={e => update(note.id, 'title', e.target.value)}
                style={{ fontFamily: F, fontSize: 16, fontWeight: 500, color: INK, background: 'transparent', border: 'none', outline: 'none', width: '100%', marginBottom: 10 }}
              />
              <textarea
                value={note.content}
                onChange={e => update(note.id, 'content', e.target.value)}
                placeholder="Escribe aquí..."
                rows={4}
                style={{ fontSize: 13, color: INK, background: 'transparent', border: 'none', outline: 'none', width: '100%', resize: 'none', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
