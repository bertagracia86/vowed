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

export default function Invitados({ guests, setGuests, onNavigate }: Props) {
  const [showModal, setShowModal] = useState(false)
  const [tab, setTab] = useState(TABS[0])
  const [subtab, setSubtab] = useState(SUBTABS[0])
  const [query, setQuery] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [filterInvited, setFilterInvited] = useState(false)
  const [filterMissing, setFilterMissing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const confirmed = guests.filter(g => g.rsvp === 'Sí').length
  const pending = guests.filter(g => g.rsvp === 'Pendiente').length
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
          return { id: Date.now().toString() + Math.random(), name: name || line, contact: contact || '', rsvp: 'Pendiente' as const, table_name: null, menu: '', group: '', avoid: [] }
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
          <button key={t} onClick={() => setTab(t)} style={{
            background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', padding: '0 0 10px', fontSize: 13, fontFamily: F,
            color: tab === t ? INK : MUTE, fontWeight: tab === t ? 600 : 400, borderBottom: tab === t ? '2px solid #8b5f3e' : '2px solid transparent'
          }}>{t}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {SUBTABS.map(t => (
          <button key={t} onClick={() => setSubtab(t)} style={{
            background: subtab === t ? '#F4E7D8' : 'transparent', border: 'none', borderRadius: 8, cursor: 'pointer',
            padding: '8px 14px', fontSize: 12.5, color: subtab === t ? '#6b4226' : MUTE, fontWeight: subtab === t ? 600 : 400
          }}>{t}</button>
        ))}
      </div>

      {tab !== 'Lista de invitados' && (
        <div style={{ background: '#F7F4EF', borderRadius: 16, padding: '30px 24px', textAlign: 'center', marginBottom: 20 }}>
          <p style={{ fontFamily: F, fontSize: 17, color: INK, marginBottom: 4 }}>{tab}</p>
          <p style={{ fontSize: 12, color: MUTE }}>Muy pronto podréis gestionar esto desde aquí.</p>
        </div>
      )}
      {tab === 'Lista de invitados' && subtab !== 'Gestionar lista' && (
        <div style={{ background: '#F7F4EF', borderRadius: 16, padding: '30px 24px', textAlign: 'center', marginBottom: 20 }}>
          <p style={{ fontFamily: F, fontSize: 17, color: INK, marginBottom: 4 }}>{subtab}</p>
          <p style={{ fontSize: 12, color: MUTE }}>Muy pronto podréis gestionar esto desde aquí.</p>
        </div>
      )}

      {tab === 'Lista de invitados' && subtab === 'Gestionar lista' && (
      <>

      <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 0.7fr 0.7fr 1fr 1.6fr', gap: 12, marginBottom: 20 }}>
        <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14, padding: '14px 18px', textAlign: 'center' }}>
          <p style={{ fontFamily: F, fontSize: 22, color: INK }}>{guests.length}</p>
          <p style={{ fontSize: 11, color: MUTE }}>Invitados</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14, padding: '14px 18px', textAlign: 'center' }}>
          <p style={{ fontFamily: F, fontSize: 22, color: INK }}>{adults}</p>
          <p style={{ fontSize: 11, color: MUTE }}>Adultos</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14, padding: '14px 18px', textAlign: 'center' }}>
          <p style={{ fontFamily: F, fontSize: 22, color: INK }}>{children}</p>
          <p style={{ fontSize: 11, color: MUTE }}>Niños</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14, padding: '14px 18px', textAlign: 'center' }}>
          <p style={{ fontFamily: F, fontSize: 22, color: '#C0594F' }}>{missing}</p>
          <Tooltip text='Os ayudaremos a recopilarlas todas. Pulsad en "Direcciones pendientes" para empezar.'>
            <span style={{ fontSize: 11, color: '#8b5f3e', textDecoration: 'underline', cursor: 'pointer' }}>Direcciones pendientes</span>
          </Tooltip>
        </div>
        <div style={{ background: '#F4EFE8', border: '1px solid #ECE9E4', borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 54, height: 54, borderRadius: 10, background: '#e7dcc9', flexShrink: 0, overflow: 'hidden' }}>
            <img src="/invitaciones.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <p style={{ fontFamily: F, fontSize: 13.5, color: INK, marginBottom: 6, lineHeight: 1.2 }}>Recopilad las direcciones de vuestros invitados</p>
            <button style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 999, padding: '6px 12px', fontSize: 11, cursor: 'pointer' }}>Configurar recopilador</button>
          </div>
        </div>
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

        <div style={{ background: '#F4EFE8', border: '1px solid #ECE9E4', borderRadius: 16, padding: 18, alignSelf: 'flex-start' }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 12, marginBottom: 14, boxShadow: '0 6px 16px rgba(0,0,0,0.06)' }}>
            <img src="/pareja-portada.png" alt="" style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
            <p style={{ fontFamily: F, fontSize: 13, color: INK, textAlign: 'center' }}>15 de junio de 2025</p>
          </div>
          <p style={{ fontFamily: F, fontSize: 18, color: INK, marginBottom: 8, lineHeight: 1.25 }}>Habéis empezado vuestros Save the Dates</p>
          <p style={{ fontSize: 11.5, color: MUTE, marginBottom: 14, lineHeight: 1.5 }}>
            Nuestros diseños están hechos en casa e impresos en papel premium.
          </p>
          <button onClick={() => onNavigate && onNavigate('invitaciones')} style={{ background: '#241c17', color: 'white', border: 'none', borderRadius: 999, padding: '10px 20px', fontSize: 12, cursor: 'pointer' }}>
            Explorar diseños
          </button>
        </div>
      </div>

      </>
      )}

      {showModal && (
        <AddGuestsModal
          onClose={() => setShowModal(false)}
          onSave={({ name, contact }) => {
            setGuests([...guests, { id: Date.now().toString(), name, contact, rsvp: 'Pendiente', table_name: null, menu: '', group: '', avoid: [] }])
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}
