'use client'
import { useState } from 'react'
import { F, INK } from '@/lib/constants'
import { WeddingInfo } from '@/lib/types'

interface Props { weddingInfo: WeddingInfo; setWeddingInfo: (w: WeddingInfo) => void; weddingDate: string; setWeddingDate: (d: string) => void; onLogout: () => void }

const CARD = '#FFFDFB'
const BROWN = '#8B5E3C'
const BEIGE = '#E7DDD2'
const SUBTEXT = '#7C6858'

const SECTIONS = [
  { id: 'perfil', label: 'Perfil', icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z' },
  { id: 'boda', label: 'Detalles de la boda', icon: 'M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z' },
  { id: 'cuenta', label: 'Cuenta', icon: 'M12 15a3 3 0 100-6 3 3 0 000 6zM3 12a9 9 0 1018 0 9 9 0 00-18 0z' },
  { id: 'notif', label: 'Notificaciones', icon: 'M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0' },
  { id: 'privacidad', label: 'Privacidad', icon: 'M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z' },
  { id: 'apps', label: 'Aplicaciones conectadas', icon: 'M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07L11 5M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 007.07 7.07L13 19' },
  { id: 'plan', label: 'Plan y facturación', icon: 'M2 8h20v13H2zM2 8l10 7 10-7' },
  { id: 'equipo', label: 'Equipo y colaboradores', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
  { id: 'exportar', label: 'Exportar datos', icon: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3' },
  { id: 'eliminar', label: 'Eliminar cuenta', icon: 'M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6' },
]

const TEAM = [
  { name: 'Vosotros', role: 'Propietario/a', you: true },
  { name: 'Ana Martínez', role: 'Editor', you: false },
  { name: 'Carlos López', role: 'Visor', you: false },
]

export default function Ajustes({ weddingInfo, setWeddingInfo, weddingDate, setWeddingDate, onLogout }: Props) {
  const [section, setSection] = useState('perfil')
  const [notifs, setNotifs] = useState({
    tareas: { email: true, push: true, sms: false },
    proveedores: { email: true, push: true, sms: false },
    invitados: { email: true, push: true, sms: true },
    marketing: { email: false, push: false, sms: false },
    resumen: { email: true, push: true, sms: false },
  })

  function toggleNotif(row: keyof typeof notifs, col: 'email' | 'push' | 'sms') {
    setNotifs(prev => ({ ...prev, [row]: { ...prev[row], [col]: !prev[row][col] } }))
  }

  const NOTIF_ROWS: { key: keyof typeof notifs; label: string }[] = [
    { key: 'tareas', label: 'Recordatorios de tareas' },
    { key: 'proveedores', label: 'Mensajes de proveedores' },
    { key: 'invitados', label: 'RSVP y novedades de invitados' },
    { key: 'marketing', label: 'Marketing y consejos' },
    { key: 'resumen', label: 'Resumen semanal de planificación' },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Ajustes</h1>
      <p style={{ fontSize: 12, color: SUBTEXT, marginBottom: 20 }}>Gestionad vuestra cuenta, preferencias y los detalles de la boda.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 300px', gap: 20 }}>
        {/* MENU LATERAL DE AJUSTES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setSection(s.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', padding: '9px 12px', borderRadius: 10, border: 'none',
              background: section === s.id ? '#F4E7D8' : 'transparent', color: section === s.id ? BROWN : SUBTEXT,
              fontWeight: section === s.id ? 600 : 400, fontSize: 12.5, cursor: 'pointer'
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
              {s.label}
            </button>
          ))}
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {section === 'perfil' && (
            <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <p style={{ fontFamily: F, fontSize: 17, color: INK }}>Información del perfil</p>
                <button style={{ border: `1px solid ${BROWN}`, background: 'white', color: BROWN, borderRadius: 999, padding: '7px 16px', fontSize: 12, cursor: 'pointer' }}>Editar perfil</button>
              </div>
              <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <img src="/pareja-portada.png" alt="" style={{ width: 84, height: 84, borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    <p style={{ fontSize: 10.5, color: SUBTEXT }}>NOMBRE COMPLETO</p>
                    <p style={{ fontSize: 13.5, color: INK }}>{weddingInfo.partner1 || 'Vosotros'} &amp; {weddingInfo.partner2 || 'dos'}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 10.5, color: SUBTEXT }}>EMAIL</p>
                    <p style={{ fontSize: 13.5, color: INK }}>bertagracia86@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {section === 'boda' && (
            <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 22 }}>
              <p style={{ fontFamily: F, fontSize: 17, color: INK, marginBottom: 18 }}>Detalles de la boda</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <p style={{ fontSize: 10.5, color: SUBTEXT, marginBottom: 4 }}>NOMBRE 1</p>
                  <input value={weddingInfo.partner1} onChange={e => setWeddingInfo({ ...weddingInfo, partner1: e.target.value })} style={{ width: '100%', border: `1px solid ${BEIGE}`, borderRadius: 10, padding: '9px 12px', fontSize: 13, outline: 'none' }} />
                </div>
                <div>
                  <p style={{ fontSize: 10.5, color: SUBTEXT, marginBottom: 4 }}>NOMBRE 2</p>
                  <input value={weddingInfo.partner2} onChange={e => setWeddingInfo({ ...weddingInfo, partner2: e.target.value })} style={{ width: '100%', border: `1px solid ${BEIGE}`, borderRadius: 10, padding: '9px 12px', fontSize: 13, outline: 'none' }} />
                </div>
                <div>
                  <p style={{ fontSize: 10.5, color: SUBTEXT, marginBottom: 4 }}>FECHA</p>
                  <input type="date" value={weddingDate} onChange={e => { setWeddingDate(e.target.value); setWeddingInfo({ ...weddingInfo, date: e.target.value }) }} style={{ width: '100%', border: `1px solid ${BEIGE}`, borderRadius: 10, padding: '9px 12px', fontSize: 13, outline: 'none' }} />
                </div>
                <div>
                  <p style={{ fontSize: 10.5, color: SUBTEXT, marginBottom: 4 }}>LUGAR</p>
                  <input value={weddingInfo.venue} onChange={e => setWeddingInfo({ ...weddingInfo, venue: e.target.value })} style={{ width: '100%', border: `1px solid ${BEIGE}`, borderRadius: 10, padding: '9px 12px', fontSize: 13, outline: 'none' }} />
                </div>
              </div>
              <p style={{ fontSize: 10.5, color: SUBTEXT, marginBottom: 4 }}>MENSAJE PARA LOS INVITADOS</p>
              <textarea value={weddingInfo.message} onChange={e => setWeddingInfo({ ...weddingInfo, message: e.target.value })} rows={3} style={{ width: '100%', border: `1px solid ${BEIGE}`, borderRadius: 10, padding: '9px 12px', fontSize: 13, outline: 'none', resize: 'vertical', fontFamily: F }} />
            </div>
          )}

          {section === 'notif' && (
            <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 22 }}>
              <p style={{ fontFamily: F, fontSize: 17, color: INK, marginBottom: 4 }}>Preferencias de notificaciones</p>
              <p style={{ fontSize: 11.5, color: SUBTEXT, marginBottom: 18 }}>Elegid cómo queréis recibir avisos.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(3, 60px)', gap: 8, alignItems: 'center' }}>
                <span />
                {['Email', 'Push', 'SMS'].map(h => <span key={h} style={{ fontSize: 11, color: SUBTEXT, textAlign: 'center' }}>{h}</span>)}
                {NOTIF_ROWS.map(row => (
                  <>
                    <span key={row.key} style={{ fontSize: 12.5, color: INK, padding: '8px 0' }}>{row.label}</span>
                    {(['email', 'push', 'sms'] as const).map(col => (
                      <span key={col} onClick={() => toggleNotif(row.key, col)} style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
                        <span style={{
                          width: 20, height: 20, borderRadius: '50%', border: notifs[row.key][col] ? 'none' : `1.5px solid ${BEIGE}`,
                          background: notifs[row.key][col] ? BROWN : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          {notifs[row.key][col] && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                        </span>
                      </span>
                    ))}
                  </>
                ))}
              </div>
            </div>
          )}

          {!['perfil', 'boda', 'notif'].includes(section) && (
            <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: '40px 24px', textAlign: 'center' }}>
              <p style={{ fontFamily: F, fontSize: 17, color: INK, marginBottom: 6 }}>{SECTIONS.find(s => s.id === section)?.label}</p>
              <p style={{ fontSize: 12, color: SUBTEXT }}>Muy pronto podréis gestionar esto desde aquí.</p>
            </div>
          )}

          <button onClick={onLogout} style={{ alignSelf: 'flex-start', background: 'white', border: `1px solid ${BEIGE}`, borderRadius: 999, padding: '10px 22px', fontSize: 13, color: INK, cursor: 'pointer' }}>
            Cerrar sesión
          </button>
        </div>

        {/* SIDEBAR DERECHA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignSelf: 'flex-start' }}>
          <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
            <p style={{ fontFamily: F, fontSize: 15, color: INK, marginBottom: 4 }}>Vuestro plan</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '10px 0' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F4E7D8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BROWN} strokeWidth="1.7"><path d="M12 2l2.5 6.5L21 9l-5.5 4.5L17 20l-5-3.5L7 20l1.5-6.5L3 9l6.5-.5L12 2z" /></svg>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: INK }}>Plan gratuito</p>
                <p style={{ fontSize: 10.5, color: SUBTEXT }}>Todas las herramientas básicas incluidas</p>
              </div>
            </div>
            <button style={{ width: '100%', border: `1px solid ${BROWN}`, background: 'white', color: BROWN, borderRadius: 999, padding: '8px 0', fontSize: 12, cursor: 'pointer' }}>Ver planes</button>
          </div>

          <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
            <p style={{ fontFamily: F, fontSize: 15, color: INK, marginBottom: 12 }}>Equipo y colaboradores</p>
            {TEAM.map(m => (
              <div key={m.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: BEIGE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: BROWN, fontFamily: F }}>
                    {m.name.split(' ').map(p => p[0]).join('').slice(0, 2)}
                  </div>
                  <span style={{ fontSize: 12, color: INK }}>{m.name}{m.you ? ' (tú)' : ''}</span>
                </div>
                <span style={{ fontSize: 10.5, color: SUBTEXT }}>{m.role}</span>
              </div>
            ))}
            <button style={{ marginTop: 8, background: 'none', border: 'none', color: BROWN, fontSize: 12, cursor: 'pointer', padding: 0 }}>+ Invitar colaborador</button>
          </div>

          <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
            <p style={{ fontFamily: F, fontSize: 15, color: INK, marginBottom: 4 }}>Seguridad</p>
            <p style={{ fontSize: 11, color: SUBTEXT, marginBottom: 12 }}>Mantened vuestra cuenta protegida.</p>
            <button style={{ width: '100%', border: `1px solid ${BEIGE}`, background: 'white', color: INK, borderRadius: 999, padding: '8px 0', fontSize: 12, cursor: 'pointer' }}>Cambiar contraseña</button>
          </div>
        </div>
      </div>
    </div>
  )
}
