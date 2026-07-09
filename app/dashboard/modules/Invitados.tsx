'use client'
import { useState, useRef } from 'react'
import { F, BLUE, INK, MUTE } from '@/lib/constants'
import { Guest } from '@/lib/types'

interface Props { guests: Guest[]; setGuests: (g: Guest[]) => void; onNavigate?: (t: string) => void }

function Tooltip({ children, text, width = 190, align = 'center' }: { children: React.ReactNode; text: string; width?: number; align?: 'center' | 'left' | 'right' }) {
  const [show, setShow] = useState(false)
  const pos = align === 'left' ? { left: 0 } : align === 'right' ? { right: 0 } : { left: '50%', transform: 'translateX(-50%)' }
  const arrowPos = align === 'left' ? { left: 14 } : align === 'right' ? { right: 14 } : { left: '50%', transform: 'translateX(-50%) rotate(45deg)' }
  return (
    <span style={{ position: 'relative', display: 'inline-block' }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span style={{
          position: 'absolute', top: '125%', ...pos, background: '#241c17', color: 'white',
          fontSize: 11, lineHeight: 1.5, borderRadius: 10, padding: '10px 14px', width, zIndex: 30, textAlign: 'left', boxShadow: '0 8px 20px rgba(0,0,0,0.25)'
        }}>
          {text}
          <span style={{ position: 'absolute', top: -5, width: 10, height: 10, background: '#241c17', ...(align === 'center' ? { transform: 'translateX(-50%) rotate(45deg)' } : { transform: 'rotate(45deg)' }), ...arrowPos }} />
        </span>
      )}
    </span>
  )
}

function AddGuestsModal({ onClose, onSave }: { onClose: () => void; onSave: (g: { name: string; contact: string }) => void }) {
  const [tab, setTab] = useState<'info' | 'address'>('info')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [invited, setInvited] = useState<'Definitivamente' | 'Quizás'>('Definitivamente')
  const [envelopeName, setEnvelopeName] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  function save() {
    if (!firstName.trim()) return
    const contact = [email, mobile].filter(Boolean).join(' · ')
    onSave({ name: `${firstName} ${lastName}`.trim(), contact })
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(36,28,23,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 18, width: 460, maxHeight: '85vh', overflowY: 'auto', padding: '26px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <p style={{ fontFamily: F, fontSize: 22, color: INK }}>Añadir invitados</p>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, color: MUTE, cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #ECE9E4', marginBottom: 20 }}>
          {(['info', 'address'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 10px', fontSize: 13, fontFamily: F,
              color: tab === t ? INK : MUTE, fontWeight: tab === t ? 600 : 400,
              borderBottom: tab === t ? '2px solid #8b5f3e' : '2px solid transparent'
            }}>
              {t === 'info' ? 'Datos del invitado' : 'Dirección postal'}
            </button>
          ))}
        </div>

        {tab === 'info' ? (
          <>
            <div style={{ background: '#F7F4EF', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 12, color: INK, lineHeight: 1.4 }}>¿No tenéis todos los datos de vuestros invitados?</span>
              <button style={{ border: '1px solid #241c17', background: 'white', borderRadius: 999, padding: '7px 14px', fontSize: 11, cursor: 'pointer', whiteSpace: 'nowrap' }}>Solicitar datos</button>
            </div>

            <p style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 10 }}>Invitado principal</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <div>
                <label style={{ fontSize: 11, color: MUTE }}>Nombre*</label>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} style={{ width: '100%', border: '1px solid #ECE9E4', borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none', marginTop: 4 }} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: MUTE }}>Apellidos*</label>
                <input value={lastName} onChange={e => setLastName(e.target.value)} style={{ width: '100%', border: '1px solid #ECE9E4', borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none', marginTop: 4 }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 11, color: MUTE }}>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', border: '1px solid #ECE9E4', borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none', marginTop: 4 }} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: MUTE }}>Móvil</label>
                <input value={mobile} onChange={e => setMobile(e.target.value)} style={{ width: '100%', border: '1px solid #ECE9E4', borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none', marginTop: 4 }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              <button style={{ border: '1px solid #241c17', background: 'white', borderRadius: 999, padding: '8px 16px', fontSize: 12, cursor: 'pointer' }}>+ Añadir acompañante</button>
              <button style={{ border: '1px solid #241c17', background: 'white', borderRadius: 999, padding: '8px 16px', fontSize: 12, cursor: 'pointer' }}>+ Añadir niño/a</button>
            </div>

            <p style={{ fontSize: 12, fontWeight: 600, color: INK, marginBottom: 8 }}>¿Invitado?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {(['Definitivamente', 'Quizás'] as const).map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: INK, cursor: 'pointer' }}>
                  <input type="radio" checked={invited === opt} onChange={() => setInvited(opt)} />
                  {opt} invitado/a
                </label>
              ))}
            </div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, color: MUTE }}>Nombre en el sobre</label>
              <input value={envelopeName} onChange={e => setEnvelopeName(e.target.value)} style={{ width: '100%', border: '1px solid #ECE9E4', borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none', marginTop: 4 }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, color: MUTE }}>Dirección</label>
              <input value={street} onChange={e => setStreet(e.target.value)} style={{ width: '100%', border: '1px solid #ECE9E4', borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none', marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: MUTE }}>Ciudad</label>
              <input value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', border: '1px solid #ECE9E4', borderRadius: 8, padding: '8px 10px', fontSize: 13, outline: 'none', marginTop: 4 }} />
            </div>
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24, paddingTop: 16, borderTop: '1px solid #ECE9E4' }}>
          <button onClick={onClose} style={{ border: '1px solid #241c17', background: 'white', borderRadius: 999, padding: '9px 18px', fontSize: 12, cursor: 'pointer' }}>Cancelar</button>
          <button onClick={save} style={{ background: firstName.trim() ? '#241c17' : '#DCD4C8', color: 'white', border: 'none', borderRadius: 999, padding: '9px 20px', fontSize: 12, cursor: firstName.trim() ? 'pointer' : 'default' }}>Guardar</button>
        </div>
      </div>
    </div>
  )
}

const TABS = ['Lista de invitados', 'Recopilar contactos', 'Eventos', 'Plano de mesas', 'Mensajería', 'Agradecimientos', 'Bloques de hotel']
const SUBTABS = ['Gestionar lista', 'Invitar a eventos', 'Direcciones de sobres', 'Seguimiento RSVP']
const EVENTS = ['Ceremonia', 'Cóctel', 'Banquete', 'Fiesta']

interface HotelBlock { id: string; hotel: string; code: string; rooms: number }
const DEFAULT_BLOCKS: HotelBlock[] = [
  { id: '1', hotel: 'Hotel Jardines del Rey', code: 'BODA2025', rooms: 20 },
]

const CARD = '#FFFDFB'
const BROWN = '#898a76'
const BEIGE = '#E7DDD2'
const SUBTEXT = '#7C6858'

function RsvpDonut({ confirmed, pending, declined }: { confirmed: number; pending: number; declined: number }) {
  const total = confirmed + pending + declined
  const pct = total > 0 ? Math.round((confirmed / total) * 100) : 0
  const r = 46, circ = 2 * Math.PI * r
  const cSeg = total > 0 ? (confirmed / total) * circ : 0
  const pSeg = total > 0 ? (pending / total) * circ : 0
  const dSeg = total > 0 ? (declined / total) * circ : 0
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={r} fill="none" stroke={BEIGE} strokeWidth="11" />
      <circle cx="60" cy="60" r={r} fill="none" stroke="#3A6B3A" strokeWidth="11" strokeDasharray={`${cSeg} ${circ - cSeg}`} strokeDashoffset={0} transform="rotate(-90 60 60)" strokeLinecap="round" />
      <circle cx="60" cy="60" r={r} fill="none" stroke="#B8862F" strokeWidth="11" strokeDasharray={`${pSeg} ${circ - pSeg}`} strokeDashoffset={-cSeg} transform="rotate(-90 60 60)" strokeLinecap="round" />
      <circle cx="60" cy="60" r={r} fill="none" stroke="#C0594F" strokeWidth="11" strokeDasharray={`${dSeg} ${circ - dSeg}`} strokeDashoffset={-(cSeg + pSeg)} transform="rotate(-90 60 60)" strokeLinecap="round" />
      <text x="60" y="56" textAnchor="middle" fontSize="22" fontFamily={F} fill={INK}>{pct}%</text>
      <text x="60" y="74" textAnchor="middle" fontSize="9.5" fill={SUBTEXT}>Confirmado</text>
    </svg>
  )
}

export default function Invitados({ guests, setGuests, onNavigate }: Props) {
  const [showModal, setShowModal] = useState(false)
  const [tab, setTab] = useState(TABS[0])
  const [subtab, setSubtab] = useState(SUBTABS[0])
  const [query, setQuery] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [filterInvited, setFilterInvited] = useState(false)
  const [filterMissing, setFilterMissing] = useState(false)
  const [blocks, setBlocks] = useState<HotelBlock[]>(DEFAULT_BLOCKS)
  const [newBlockHotel, setNewBlockHotel] = useState('')
  const [newBlockCode, setNewBlockCode] = useState('')
  const [newBlockRooms, setNewBlockRooms] = useState('')
  const [copiedCollect, setCopiedCollect] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function selectTab(t: string) {
    if (t === 'Plano de mesas') { onNavigate && onNavigate('mesas'); return }
    if (t === 'Mensajería') { onNavigate && onNavigate('mensajes'); return }
    setTab(t)
  }

  function toggleEvent(guestId: string, ev: string) {
    setGuests(guests.map(g => g.id === guestId ? { ...g, events: g.events.includes(ev) ? g.events.filter(e => e !== ev) : [...g.events, ev] } : g))
  }

  function toggleThanked(guestId: string) {
    setGuests(guests.map(g => g.id === guestId ? { ...g, thanked: !g.thanked } : g))
  }

  function addBlock() {
    if (!newBlockHotel.trim()) return
    setBlocks([...blocks, { id: Date.now().toString(), hotel: newBlockHotel, code: newBlockCode, rooms: Number(newBlockRooms) || 0 }])
    setNewBlockHotel(''); setNewBlockCode(''); setNewBlockRooms('')
  }

  function removeBlock(id: string) {
    setBlocks(blocks.filter(b => b.id !== id))
  }

  function copyCollectLink() {
    navigator.clipboard?.writeText('https://mylov3.com/contactos').then(() => {
      setCopiedCollect(true)
      setTimeout(() => setCopiedCollect(false), 2000)
    })
  }

  const confirmed = guests.filter(g => g.rsvp === 'Sí').length
  const pending = guests.filter(g => g.rsvp === 'Pendiente').length
  const declined = guests.filter(g => g.rsvp === 'No').length
  const missing = guests.filter(g => !g.contact).length
  const activeFilters = (filterInvited ? 1 : 0) + (filterMissing ? 1 : 0)

  function update(id: string, field: keyof Guest, value: string) {
    setGuests(guests.map(g => g.id === id ? { ...g, [field]: value } : g))
  }

  function remove(id: string) {
    setGuests(guests.filter(g => g.id !== id))
  }

  function exportCsv() {
    const header = 'Nombre,Contacto,Mesa,Menu,Asistencia\n'
    const rows = guests.map(g => `${g.name},${g.contact},${g.table_name || ''},${g.menu},${g.rsvp}`).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'invitados.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  function importCsv(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result || '')
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
      const newGuests: Guest[] = lines
        .filter(l => !l.toLowerCase().startsWith('nombre'))
        .map(line => {
          const [name, contact] = line.split(',').map(s => s?.trim() || '')
          return { id: Date.now().toString() + Math.random(), name: name || line, contact: contact || '', rsvp: 'Pendiente' as const, table_name: null, seat: null, menu: '', group: '', avoid: [], address: '', thanked: false, events: [] }
        })
        .filter(g => g.name)
      if (newGuests.length) setGuests([...guests, ...newGuests])
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const adults = guests.length
  const children = 0

  const visibleGuests = guests
    .filter(g => g.name.toLowerCase().includes(query.toLowerCase()))
    .filter(g => !filterInvited || g.rsvp !== 'No')
    .filter(g => !filterMissing || !g.contact)

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 16 }}>Invitados y RSVP</h1>

      <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #ECE9E4', marginBottom: 14, overflowX: 'auto' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => selectTab(t)} style={{
            background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', padding: '0 0 10px', fontSize: 13, fontFamily: F,
            color: tab === t ? INK : MUTE, fontWeight: tab === t ? 600 : 400, borderBottom: tab === t ? '2px solid #8b5f3e' : '2px solid transparent'
          }}>{t}</button>
        ))}
      </div>

      {tab === 'Lista de invitados' && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {SUBTABS.map(t => (
            <button key={t} onClick={() => setSubtab(t)} style={{
              background: subtab === t ? '#F4E7D8' : 'transparent', border: 'none', borderRadius: 8, cursor: 'pointer',
              padding: '8px 14px', fontSize: 12.5, color: subtab === t ? '#6b4226' : MUTE, fontWeight: subtab === t ? 600 : 400
            }}>{t}</button>
          ))}
        </div>
      )}

      {tab === 'Recopilar contactos' && (
        <div>
          <div style={{ background: 'linear-gradient(135deg, #F4EFE8, #EFE6F5)', border: '1px solid #ECE9E4', borderRadius: 16, padding: '20px 24px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <p style={{ fontFamily: F, fontSize: 17, color: INK, marginBottom: 4 }}>Recopilad los datos que faltan</p>
              <p style={{ fontSize: 11.5, color: MUTE }}>Compartid este enlace para que vuestros invitados rellenen su email, teléfono y dirección.</p>
            </div>
            <button onClick={copyCollectLink} style={{ background: copiedCollect ? '#3A6B3A' : '#8b5f3e', color: 'white', border: 'none', borderRadius: 999, padding: '10px 20px', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {copiedCollect ? '¡Copiado!' : 'Copiar enlace'}
            </button>
          </div>
          <p style={{ fontSize: 11, color: MUTE, marginBottom: 10 }}>Pendientes de completar ({guests.filter(g => !g.contact || !g.address).length})</p>
          <div style={{ border: '1px solid #F5EFE0', borderRadius: 16, overflow: 'hidden' }}>
            {guests.filter(g => !g.contact || !g.address).length === 0 ? (
              <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '30px 0' }}>Todos vuestros invitados tienen sus datos completos ♡</p>
            ) : guests.filter(g => !g.contact || !g.address).map((g, i, arr) => (
              <div key={g.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', borderBottom: i < arr.length - 1 ? '1px solid #F5EFE0' : 'none' }}>
                <span style={{ fontSize: 13, color: INK }}>{g.name}</span>
                <span style={{ fontSize: 11, color: '#C0594F' }}>{[!g.contact && 'Sin contacto', !g.address && 'Sin dirección'].filter(Boolean).join(' · ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(tab === 'Eventos' || subtab === 'Invitar a eventos') && tab !== 'Recopilar contactos' && tab !== 'Agradecimientos' && tab !== 'Bloques de hotel' && tab !== 'Lista de invitados' && (
        <div style={{ border: '1px solid #F5EFE0', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `1.5fr repeat(${EVENTS.length}, 1fr)`, padding: '10px 18px', background: '#FBF9F5', borderBottom: '1px solid #F5EFE0' }}>
            <span style={{ fontSize: 10, color: MUTE, letterSpacing: '0.04em' }}>INVITADO</span>
            {EVENTS.map(ev => <span key={ev} style={{ fontSize: 10, color: MUTE, letterSpacing: '0.04em', textAlign: 'center' }}>{ev}</span>)}
          </div>
          {guests.map((g, i) => (
            <div key={g.id} style={{ display: 'grid', gridTemplateColumns: `1.5fr repeat(${EVENTS.length}, 1fr)`, alignItems: 'center', padding: '10px 18px', borderBottom: i < guests.length - 1 ? '1px solid #F5EFE0' : 'none' }}>
              <span style={{ fontSize: 13, color: INK }}>{g.name}</span>
              {EVENTS.map(ev => (
                <span key={ev} style={{ display: 'flex', justifyContent: 'center' }}>
                  <input type="checkbox" checked={g.events.includes(ev)} onChange={() => toggleEvent(g.id, ev)} />
                </span>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === 'Agradecimientos' && (
        <div style={{ border: '1px solid #F5EFE0', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr auto', padding: '10px 18px', background: '#FBF9F5', borderBottom: '1px solid #F5EFE0' }}>
            <span style={{ fontSize: 10, color: MUTE, letterSpacing: '0.04em' }}>INVITADO</span>
            <span style={{ fontSize: 10, color: MUTE, letterSpacing: '0.04em' }}>ESTADO</span>
            <span style={{ fontSize: 10, color: MUTE, letterSpacing: '0.04em' }}>AGRADECIDO</span>
          </div>
          {guests.length === 0 ? (
            <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '30px 0' }}>Sin invitados todavía.</p>
          ) : guests.map((g, i) => (
            <div key={g.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr auto', alignItems: 'center', padding: '10px 18px', borderBottom: i < guests.length - 1 ? '1px solid #F5EFE0' : 'none' }}>
              <span style={{ fontSize: 13, color: INK }}>{g.name}</span>
              <span style={{ fontSize: 11, color: g.rsvp === 'Sí' ? '#3A6B3A' : g.rsvp === 'No' ? '#C0594F' : '#B8862F' }}>{g.rsvp}</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: INK, cursor: 'pointer' }}>
                <input type="checkbox" checked={g.thanked} onChange={() => toggleThanked(g.id)} />
                {g.thanked ? 'Sí' : 'No'}
              </label>
            </div>
          ))}
        </div>
      )}

      {tab === 'Bloques de hotel' && (
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            <input value={newBlockHotel} onChange={e => setNewBlockHotel(e.target.value)} placeholder="Nombre del hotel" style={{ flex: 1, minWidth: 160, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
            <input value={newBlockCode} onChange={e => setNewBlockCode(e.target.value)} placeholder="Código de reserva" style={{ width: 160, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
            <input value={newBlockRooms} onChange={e => setNewBlockRooms(e.target.value)} type="number" placeholder="Habitaciones" style={{ width: 130, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
            <button onClick={addBlock} style={{ background: BLUE, color: 'white', border: 'none', borderRadius: 12, padding: '11px 22px', fontSize: 13, cursor: 'pointer' }}>Añadir</button>
          </div>
          {blocks.length === 0 ? (
            <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '30px 0' }}>Sin bloques de hotel todavía.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {blocks.map(b => (
                <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', border: '1px solid #ECE9E4', borderRadius: 14, padding: '14px 18px' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: INK }}>{b.hotel}</p>
                    <p style={{ fontSize: 11, color: MUTE }}>Código: {b.code || '—'} · {b.rooms} habitaciones reservadas</p>
                  </div>
                  <button onClick={() => removeBlock(b.id)} style={{ background: 'none', border: 'none', color: '#C9BCA8', cursor: 'pointer', fontSize: 18 }}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'Lista de invitados' && subtab === 'Direcciones de sobres' && (
        <div style={{ border: '1px solid #F5EFE0', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr', padding: '10px 18px', background: '#FBF9F5', borderBottom: '1px solid #F5EFE0' }}>
            <span style={{ fontSize: 10, color: MUTE, letterSpacing: '0.04em' }}>INVITADO</span>
            <span style={{ fontSize: 10, color: MUTE, letterSpacing: '0.04em' }}>DIRECCIÓN POSTAL</span>
          </div>
          {guests.map((g, i) => (
            <div key={g.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr', alignItems: 'center', padding: '10px 18px', borderBottom: i < guests.length - 1 ? '1px solid #F5EFE0' : 'none' }}>
              <span style={{ fontSize: 13, color: INK }}>{g.name}</span>
              <input value={g.address} onChange={e => update(g.id, 'address', e.target.value)} placeholder="Calle, ciudad, código postal..." style={{ border: 'none', background: 'transparent', fontSize: 12, color: MUTE, outline: 'none' }} />
            </div>
          ))}
        </div>
      )}

      {tab === 'Lista de invitados' && subtab === 'Seguimiento RSVP' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {(['Sí', 'Pendiente', 'No'] as const).map(status => {
            const list = guests.filter(g => g.rsvp === status)
            const label = status === 'Sí' ? 'Confirmados' : status === 'Pendiente' ? 'Pendientes' : 'Declinados'
            const color = status === 'Sí' ? '#3A6B3A' : status === 'Pendiente' ? '#B8862F' : '#C0594F'
            return (
              <div key={status}>
                <p style={{ fontFamily: F, fontSize: 15, color, marginBottom: 8 }}>{label} ({list.length})</p>
                {list.length === 0 ? (
                  <p style={{ fontSize: 12, color: MUTE, paddingLeft: 4 }}>Nadie en este grupo todavía.</p>
                ) : (
                  <div style={{ border: '1px solid #F5EFE0', borderRadius: 14, overflow: 'hidden' }}>
                    {list.map((g, i) => (
                      <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 18px', borderBottom: i < list.length - 1 ? '1px solid #F5EFE0' : 'none' }}>
                        <span style={{ fontSize: 13, color: INK }}>{g.name}</span>
                        <span style={{ fontSize: 12, color: MUTE }}>{g.contact || 'Sin contacto'}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {tab === 'Lista de invitados' && subtab === 'Gestionar lista' && (
      <>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75', label: 'Invitados totales', value: guests.length, color: INK },
          { icon: 'M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Confirmados', value: confirmed, color: '#3A6B3A' },
          { icon: 'M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'RSVP pendiente', value: pending, color: '#B8862F' },
          { icon: 'M18 6L6 18M6 6l12 12', label: 'Declinados', value: declined, color: '#C0594F' },
        ].map(s => (
          <div key={s.label} style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: BEIGE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={BROWN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
            </div>
            <div>
              <p style={{ fontFamily: F, fontSize: 21, color: s.color, lineHeight: 1.1 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: SUBTEXT }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 8, position: 'relative' }}>
              <button onClick={() => setShowFilter(s => !s)} style={{ border: activeFilters ? `1px solid #8b5f3e` : '1px solid #ECE9E4', background: activeFilters ? '#F4E7D8' : 'white', borderRadius: 999, padding: '9px 16px', fontSize: 12, color: INK, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                Filtrar{activeFilters > 0 && ` (${activeFilters})`}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              {showFilter && (
                <div style={{ position: 'absolute', top: '115%', left: 0, background: 'white', border: '1px solid #ECE9E4', borderRadius: 12, boxShadow: '0 8px 20px rgba(0,0,0,0.08)', padding: 14, zIndex: 30, width: 220 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: INK, marginBottom: 10, cursor: 'pointer' }}>
                    <input type="checkbox" checked={filterInvited} onChange={e => setFilterInvited(e.target.checked)} />
                    Definitivamente invitados
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: INK, cursor: 'pointer' }}>
                    <input type="checkbox" checked={filterMissing} onChange={e => setFilterMissing(e.target.checked)} />
                    Con contacto pendiente
                  </label>
                </div>
              )}
              <div style={{ border: '1px solid #ECE9E4', background: 'white', borderRadius: 999, padding: '9px 16px', fontSize: 12, color: MUTE, display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar por nombre" style={{ border: 'none', outline: 'none', fontSize: 12, color: INK, background: 'transparent', fontFamily: F, width: 130 }} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input ref={fileInputRef} type="file" accept=".csv,.txt" onChange={importCsv} style={{ display: 'none' }} />
              <button onClick={() => fileInputRef.current?.click()} style={{ border: '1px solid #241c17', background: 'white', borderRadius: 999, padding: '9px 18px', fontSize: 12, cursor: 'pointer' }}>Subir hoja de cálculo</button>
              <button onClick={() => setShowModal(true)} style={{ background: '#241c17', color: 'white', border: 'none', borderRadius: 999, padding: '9px 20px', fontSize: 12, cursor: 'pointer' }}>Añadir invitados</button>
            </div>
          </div>

          {visibleGuests.length === 0 ? (
            <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '40px 0' }}>{guests.length === 0 ? 'Sin invitados todavía.' : 'Ningún invitado coincide con la búsqueda o filtros.'}</p>
          ) : (
            <div style={{ border: '1px solid #F5EFE0', borderRadius: 16, overflow: 'visible' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 14px 0' }}>
                <Tooltip text="Exporta la información de los invitados a una hoja de cálculo." align="right">
                  <button onClick={exportCsv} style={{ background: 'none', border: 'none', color: MUTE, cursor: 'pointer', fontSize: 16, letterSpacing: 1 }}>⋯</button>
                </Tooltip>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '0.5fr 1.3fr 1.5fr 1.4fr auto', padding: '10px 18px', background: '#FBF9F5', borderBottom: '1px solid #F5EFE0' }}>
                <Tooltip text="Total de invitados en el grupo." align="left">
                  <span style={{ fontSize: 10, color: MUTE, letterSpacing: '0.04em', cursor: 'default' }}>N.º</span>
                </Tooltip>
                <Tooltip text="Ordena por apellido, ascendente o descendente." align="left">
                  <span style={{ fontSize: 10, color: MUTE, letterSpacing: '0.04em', cursor: 'default' }}>NOMBRE ↑</span>
                </Tooltip>
                {['CONTACTO', 'ESTADO'].map(h => (
                  <span key={h} style={{ fontSize: 10, color: MUTE, letterSpacing: '0.04em' }}>{h}</span>
                ))}
                <span />
              </div>
              {visibleGuests.map((g, i) => (
                <div key={g.id} style={{ display: 'grid', gridTemplateColumns: '0.5fr 1.3fr 1.5fr 1.4fr auto', alignItems: 'center', padding: '12px 18px', borderBottom: i < visibleGuests.length - 1 ? '1px solid #F5EFE0' : 'none' }}>
                  <span style={{ fontSize: 12, color: MUTE }}>{i + 1}</span>
                  <span style={{ fontSize: 13, color: INK }}>{g.name}</span>
                  {g.contact ? (
                    <input value={g.contact} onChange={e => update(g.id, 'contact', e.target.value)} placeholder="Email o teléfono" style={{ border: 'none', background: 'transparent', fontSize: 12, color: MUTE, outline: 'none' }} />
                  ) : (
                    <div>
                      <p style={{ fontSize: 11.5, color: '#C0594F', marginBottom: 2 }}>Sin email · Sin móvil</p>
                      <Tooltip text="¿Falta la dirección o el contacto de un invitado? Os ayudamos a recopilarlo." align="left">
                        <span style={{ fontSize: 11.5, color: '#8b5f3e', textDecoration: 'underline', cursor: 'pointer' }}>Solicitar datos</span>
                      </Tooltip>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 14 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: INK, cursor: 'pointer' }}>
                      <input type="radio" name={`inv-${g.id}`} checked={g.rsvp !== 'No'} onChange={() => update(g.id, 'rsvp', 'Pendiente')} />
                      Definitivamente
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: INK, cursor: 'pointer' }}>
                      <input type="radio" name={`inv-${g.id}`} checked={g.rsvp === 'No'} onChange={() => update(g.id, 'rsvp', 'No')} />
                      Quizás
                    </label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Tooltip text={g.contact.includes('@') ? `Enviar email a ${g.contact}` : 'Añade el email del invitado para enviarle un mensaje.'} align="right">
                      <span onClick={() => { if (g.contact.includes('@')) window.location.href = `mailto:${g.contact}` }} style={{ display: 'flex', color: g.contact.includes('@') ? '#8b5f3e' : '#C9BCA8', cursor: g.contact.includes('@') ? 'pointer' : 'default' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                      </span>
                    </Tooltip>
                    <Tooltip text="Eliminar invitado." align="right">
                      <span onClick={() => remove(g.id)} style={{ display: 'flex', color: '#C9BCA8', cursor: 'pointer' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6" /></svg>
                      </span>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignSelf: 'flex-start' }}>
          <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
            <p style={{ fontFamily: F, fontSize: 15, color: INK, marginBottom: 12 }}>Progreso de RSVP</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <RsvpDonut confirmed={confirmed} pending={pending} declined={declined} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: INK }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3A6B3A', display: 'inline-block' }} />{confirmed} Confirmados</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: INK }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#B8862F', display: 'inline-block' }} />{pending} Pendientes</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: INK }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#C0594F', display: 'inline-block' }} />{declined} Declinados</span>
              </div>
            </div>
          </div>

          <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
            <p style={{ fontFamily: F, fontSize: 15, color: INK, marginBottom: 12 }}>Grupos de invitados</p>
            {(() => {
              const groups = Array.from(new Set(guests.map(g => g.group).filter(Boolean)))
              const withoutGroup = guests.filter(g => !g.group).length
              if (groups.length === 0 && withoutGroup === guests.length) {
                return <p style={{ fontSize: 12, color: SUBTEXT }}>Asignad un grupo a vuestros invitados desde el plano de mesas.</p>
              }
              return (
                <>
                  {groups.map(gr => (
                    <div key={gr} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${BEIGE}` }}>
                      <span style={{ fontSize: 12.5, color: INK }}>{gr}</span>
                      <span style={{ fontSize: 11.5, color: SUBTEXT }}>{guests.filter(g => g.group === gr).length}</span>
                    </div>
                  ))}
                  {withoutGroup > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
                      <span style={{ fontSize: 12.5, color: SUBTEXT }}>Sin grupo</span>
                      <span style={{ fontSize: 11.5, color: SUBTEXT }}>{withoutGroup}</span>
                    </div>
                  )}
                </>
              )
            })()}
          </div>

          <div style={{ background: 'linear-gradient(135deg, #F4EFE8, #EFE6F5)', border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
            <p style={{ fontFamily: F, fontSize: 15, color: INK, marginBottom: 6 }}>Sugerencias</p>
            <p style={{ fontSize: 11.5, color: SUBTEXT, marginBottom: 12, lineHeight: 1.5 }}>
              {pending > 0 ? `${pending} invitado${pending !== 1 ? 's' : ''} aún no ha${pending !== 1 ? 'n' : ''} respondido.` : 'Todos vuestros invitados han respondido. ¡Bien hecho!'}
            </p>
            <button onClick={() => onNavigate && onNavigate('mensajes')} style={{ background: BROWN, color: 'white', border: 'none', borderRadius: 999, padding: '9px 18px', fontSize: 12, cursor: 'pointer' }}>
              Enviar recordatorio
            </button>
          </div>
        </div>
      </div>

      </>
      )}

      {showModal && (
        <AddGuestsModal
          onClose={() => setShowModal(false)}
          onSave={({ name, contact }) => {
            setGuests([...guests, { id: Date.now().toString(), name, contact, rsvp: 'Pendiente', table_name: null, seat: null, menu: '', group: '', avoid: [], address: '', thanked: false, events: [] }])
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}
