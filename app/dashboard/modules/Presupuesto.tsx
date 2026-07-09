'use client'
import { useState, useRef } from 'react'
import { F, INK } from '@/lib/constants'
import { BudgetItem } from '@/lib/types'

interface Props { budget: BudgetItem[]; setBudget: (b: BudgetItem[]) => void; guestCount: number }

const CARD = '#FFFDFB'
const BROWN = '#898a76'
const BEIGE = '#E7DDD2'
const SUBTEXT = '#7C6858'

const SUGGESTED = ['Espacio', 'Catering', 'Fotografía y vídeo', 'Vestido y complementos', 'Flores y decoración', 'Música y entretenimiento', 'Papelería', 'Otros']

const CAT_COLORS = [BROWN, '#C9A876', '#9BAA96', '#B08BC4', '#D19A6A', '#7FA3B8', '#C4849A', '#8FA88F']

const TABS = ['Categorías', 'Todos los gastos', 'Pagos', 'Facturas']

export default function Presupuesto({ budget, setBudget, guestCount }: Props) {
  const [tab, setTab] = useState(TABS[0])
  const [newCat, setNewCat] = useState('')
  const [newEst, setNewEst] = useState('')
  const [newPaid, setNewPaid] = useState('')
  const formRef = useRef<HTMLDivElement | null>(null)

  const totalEst = budget.reduce((a, b) => a + b.estimated, 0)
  const totalPaid = budget.reduce((a, b) => a + b.paid, 0)
  const remaining = Math.max(0, totalEst - totalPaid)
  const pct = totalEst > 0 ? Math.round((totalPaid / totalEst) * 100) : 0
  const costPerGuest = guestCount > 0 ? Math.round(totalEst / guestCount) : 0

  const paidCount = budget.filter(b => b.estimated > 0 && b.paid >= b.estimated).length
  const pendingCount = budget.filter(b => b.paid > 0 && b.paid < b.estimated).length
  const overdueCount = budget.filter(b => b.paid === 0 && b.estimated > 0).length

  const topExpenses = [...budget].sort((a, b) => b.estimated - a.estimated).slice(0, 5)

  const r = 46, circ = 2 * Math.PI * r
  const offset = circ - (circ * pct) / 100

  function add() {
    if (!newCat.trim()) return
    setBudget([...budget, { id: Date.now().toString(), category: newCat, estimated: Number(newEst) || 0, paid: Number(newPaid) || 0 }])
    setNewCat(''); setNewEst(''); setNewPaid('')
  }

  function updatePaid(id: string, val: number) {
    setBudget(budget.map(b => b.id === id ? { ...b, paid: val } : b))
  }

  function remove(id: string) {
    setBudget(budget.filter(b => b.id !== id))
  }

  function exportCsv() {
    const header = 'Categoría,Presupuesto,Pagado,Restante\n'
    const rows = budget.map(b => `${b.category},${b.estimated},${b.paid},${Math.max(0, b.estimated - b.paid)}`).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'presupuesto.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 4 }}>Presupuesto</h1>
      <p style={{ fontSize: 12, color: SUBTEXT, marginBottom: 20 }}>Controlad los gastos, gestionad los pagos y manteneos dentro del presupuesto.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 14, padding: 16 }}>
          <p style={{ fontSize: 11, color: SUBTEXT, marginBottom: 8 }}>Presupuesto total</p>
          <p style={{ fontFamily: F, fontSize: 21, fontWeight: 600, color: INK }}>{totalEst.toLocaleString('es-ES')} €</p>
        </div>
        <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 14, padding: 16 }}>
          <p style={{ fontSize: 11, color: SUBTEXT, marginBottom: 8 }}>Gastado</p>
          <p style={{ fontFamily: F, fontSize: 21, fontWeight: 600, color: INK, marginBottom: 6 }}>{totalPaid.toLocaleString('es-ES')} €</p>
          <div style={{ height: 6, borderRadius: 999, background: BEIGE, overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: BROWN, borderRadius: 999 }} />
          </div>
          <p style={{ fontSize: 10, color: SUBTEXT, marginTop: 4 }}>{pct}% del presupuesto</p>
        </div>
        <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 14, padding: 16 }}>
          <p style={{ fontSize: 11, color: SUBTEXT, marginBottom: 8 }}>Restante</p>
          <p style={{ fontFamily: F, fontSize: 21, fontWeight: 600, color: INK, marginBottom: 6 }}>{remaining.toLocaleString('es-ES')} €</p>
          <p style={{ fontSize: 10, color: SUBTEXT }}>{totalEst > 0 ? Math.round((remaining / totalEst) * 100) : 0}% del presupuesto</p>
        </div>
        <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 14, padding: 16 }}>
          <p style={{ fontSize: 11, color: SUBTEXT, marginBottom: 8 }}>Coste por invitado</p>
          <p style={{ fontFamily: F, fontSize: 21, fontWeight: 600, color: INK }}>{costPerGuest.toLocaleString('es-ES')} €</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        <div>
          <div style={{ display: 'flex', gap: 20, borderBottom: `1px solid ${BEIGE}`, marginBottom: 16, overflowX: 'auto' }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', padding: '0 0 10px', fontSize: 13, fontFamily: F,
                color: tab === t ? INK : SUBTEXT, fontWeight: tab === t ? 600 : 400, borderBottom: tab === t ? `2px solid ${BROWN}` : '2px solid transparent'
              }}>{t}</button>
            ))}
          </div>

          {tab !== 'Categorías' ? (
            <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: '40px 24px', textAlign: 'center' }}>
              <p style={{ fontFamily: F, fontSize: 17, color: INK, marginBottom: 6 }}>{tab}</p>
              <p style={{ fontSize: 12, color: SUBTEXT }}>Muy pronto podréis gestionar esto desde aquí.</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 16 }}>
                <button onClick={exportCsv} style={{ border: `1px solid ${BEIGE}`, background: 'white', borderRadius: 999, padding: '8px 16px', fontSize: 12, color: INK, cursor: 'pointer' }}>Exportar</button>
                <button onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })} style={{ background: BROWN, color: 'white', border: 'none', borderRadius: 999, padding: '8px 18px', fontSize: 12, cursor: 'pointer' }}>+ Añadir gasto</button>
              </div>

              <div style={{ border: `1px solid ${BEIGE}`, borderRadius: 16, overflow: 'hidden', marginBottom: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', padding: '10px 18px', background: '#FBF9F5', borderBottom: `1px solid ${BEIGE}` }}>
                  {['CATEGORÍA', 'PRESUPUESTO', 'PAGADO', 'RESTANTE', ''].map(h => (
                    <span key={h} style={{ fontSize: 10, color: SUBTEXT, letterSpacing: '0.04em' }}>{h}</span>
                  ))}
                </div>
                {budget.length === 0 ? (
                  <p style={{ fontSize: 13, color: SUBTEXT, textAlign: 'center', padding: '30px 0' }}>Sin partidas todavía.</p>
                ) : budget.map((b, i) => {
                  const itemPct = b.estimated > 0 ? Math.round((b.paid / b.estimated) * 100) : 0
                  return (
                    <div key={b.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', alignItems: 'center', padding: '12px 18px', borderBottom: i < budget.length - 1 ? `1px solid ${BEIGE}` : 'none' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: INK }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: CAT_COLORS[i % CAT_COLORS.length], flexShrink: 0 }} />
                        {b.category}
                      </span>
                      <span style={{ fontSize: 12, color: SUBTEXT }}>{b.estimated.toLocaleString('es-ES')} €</span>
                      <input
                        type="number" value={b.paid}
                        onChange={e => updatePaid(b.id, Number(e.target.value))}
                        style={{ border: `1px solid ${BEIGE}`, borderRadius: 8, padding: '5px 8px', fontSize: 12, width: 90, outline: 'none' }}
                      />
                      <span style={{ fontSize: 12, color: b.estimated - b.paid < 0 ? '#C0594F' : SUBTEXT }}>{Math.max(0, b.estimated - b.paid).toLocaleString('es-ES')} €</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 10.5, background: itemPct >= 100 ? '#D9E8D9' : itemPct > 0 ? '#FBF0D9' : BEIGE, color: itemPct >= 100 ? '#3A6B3A' : itemPct > 0 ? '#B8862F' : SUBTEXT, borderRadius: 999, padding: '3px 9px', whiteSpace: 'nowrap' }}>{itemPct}%</span>
                        <button onClick={() => remove(b.id)} style={{ background: 'none', border: 'none', color: '#C9BCA8', cursor: 'pointer', fontSize: 16 }}>×</button>
                      </div>
                    </div>
                  )
                })}
                {budget.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', padding: '12px 18px', background: '#FBF9F5', borderTop: `1px solid ${BEIGE}` }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: INK }}>Total</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: INK }}>{totalEst.toLocaleString('es-ES')} €</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: INK }}>{totalPaid.toLocaleString('es-ES')} €</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: INK }}>{remaining.toLocaleString('es-ES')} €</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: INK }}>{pct}%</span>
                  </div>
                )}
              </div>

              {SUGGESTED.filter(s => !budget.some(b => b.category === s)).length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 11, color: SUBTEXT, marginBottom: 8 }}>CATEGORÍAS SUGERIDAS</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {SUGGESTED.filter(s => !budget.some(b => b.category === s)).map(s => (
                      <button key={s} onClick={() => setBudget([...budget, { id: Date.now().toString() + s, category: s, estimated: 0, paid: 0 }])}
                        style={{ border: `1px solid ${BEIGE}`, background: 'white', borderRadius: 999, padding: '6px 12px', fontSize: 11.5, color: INK, cursor: 'pointer' }}>
                        + {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={formRef} style={{ display: 'flex', gap: 8, scrollMarginTop: 20 }}>
                <input value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="Categoría" style={{ flex: 1, border: `1px solid ${BEIGE}`, borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
                <input value={newEst} onChange={e => setNewEst(e.target.value)} type="number" placeholder="Presupuesto €" style={{ width: 140, border: `1px solid ${BEIGE}`, borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
                <input value={newPaid} onChange={e => setNewPaid(e.target.value)} type="number" placeholder="Pagado €" style={{ width: 120, border: `1px solid ${BEIGE}`, borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
                <button onClick={add} style={{ background: BROWN, color: 'white', border: 'none', borderRadius: 12, padding: '11px 22px', fontSize: 13, cursor: 'pointer' }}>Añadir</button>
              </div>
            </>
          )}
        </div>

        {/* SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignSelf: 'flex-start' }}>
          <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
            <p style={{ fontFamily: F, fontSize: 15, color: INK, marginBottom: 12 }}>Resumen del presupuesto</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 14 }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r={r} fill="none" stroke={BEIGE} strokeWidth="11" />
                <circle cx="60" cy="60" r={r} fill="none" stroke={BROWN} strokeWidth="11" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 60 60)" style={{ transition: 'stroke-dashoffset .6s' }} />
                <text x="60" y="56" textAnchor="middle" fontSize="20" fontFamily={F} fill={INK}>{pct}%</text>
                <text x="60" y="74" textAnchor="middle" fontSize="9" fill={SUBTEXT}>usado</text>
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: INK }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: BROWN, display: 'inline-block' }} />Gastado</span>
                <span style={{ color: INK }}>{totalPaid.toLocaleString('es-ES')} €</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: INK }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: BEIGE, display: 'inline-block' }} />Restante</span>
                <span style={{ color: INK }}>{remaining.toLocaleString('es-ES')} €</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, fontWeight: 600, borderTop: `1px solid ${BEIGE}`, paddingTop: 6, marginTop: 2 }}>
                <span style={{ color: INK }}>Total</span>
                <span style={{ color: INK }}>{totalEst.toLocaleString('es-ES')} €</span>
              </div>
            </div>
          </div>

          <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
            <p style={{ fontFamily: F, fontSize: 15, color: INK, marginBottom: 12 }}>Resumen de pagos</p>
            {[
              { l: 'Pagado', v: paidCount, color: '#3A6B3A' },
              { l: 'Parcial', v: pendingCount, color: '#B8862F' },
              { l: 'Sin pagar', v: overdueCount, color: '#C0594F' },
            ].map(row => (
              <div key={row.l} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: INK }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: row.color, display: 'inline-block' }} />{row.l}</span>
                <span style={{ fontSize: 12, color: SUBTEXT }}>{row.v}</span>
              </div>
            ))}
          </div>

          <div style={{ background: CARD, border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
            <p style={{ fontFamily: F, fontSize: 15, color: INK, marginBottom: 12 }}>Gastos principales</p>
            {topExpenses.length === 0 ? (
              <p style={{ fontSize: 12, color: SUBTEXT }}>Añadid partidas para ver el desglose.</p>
            ) : topExpenses.map((b, i) => {
              const share = totalEst > 0 ? Math.round((b.estimated / totalEst) * 100) : 0
              return (
                <div key={b.id} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: INK }}>{b.category}</span>
                    <span style={{ fontSize: 11, color: SUBTEXT }}>{share}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 999, background: BEIGE, overflow: 'hidden' }}>
                    <div style={{ width: `${share}%`, height: '100%', background: CAT_COLORS[i % CAT_COLORS.length], borderRadius: 999 }} />
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ background: 'linear-gradient(135deg, #F4EFE8, #EFE6F5)', border: `1px solid ${BEIGE}`, borderRadius: 16, padding: 18 }}>
            <p style={{ fontFamily: F, fontSize: 15, color: INK, marginBottom: 6 }}>Consejo</p>
            <p style={{ fontSize: 11.5, color: SUBTEXT, lineHeight: 1.5 }}>
              {overdueCount > 0
                ? `Tenéis ${overdueCount} partida${overdueCount !== 1 ? 's' : ''} sin ningún pago realizado. Revisadlas para no llevaros sorpresas de última hora.`
                : 'Vais al día con los pagos. Buen trabajo manteniendo el presupuesto bajo control.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
