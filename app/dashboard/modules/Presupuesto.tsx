'use client'
import { useState } from 'react'
import { F, BLUE, INK, MUTE } from '@/lib/constants'
import { BudgetItem } from '@/lib/types'

interface Props { budget: BudgetItem[]; setBudget: (b: BudgetItem[]) => void; guestCount: number }

export default function Presupuesto({ budget, setBudget, guestCount }: Props) {
  const [newCat, setNewCat] = useState('')
  const [newEst, setNewEst] = useState('')
  const [newPaid, setNewPaid] = useState('')

  const totalEst = budget.reduce((a, b) => a + b.estimated, 0)
  const totalPaid = budget.reduce((a, b) => a + b.paid, 0)
  const pct = totalEst > 0 ? Math.round((totalPaid / totalEst) * 100) : 0
  const costPerGuest = guestCount > 0 ? Math.round(totalEst / guestCount) : 0

  const r = 22, circ = 2 * Math.PI * r
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

  return (
    <div>
      <h1 style={{ fontFamily: F, fontSize: 26, fontWeight: 500, color: INK, marginBottom: 20 }}>Presupuesto</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { l: 'Presupuesto total', v: `${totalEst.toLocaleString('es-ES')} €` },
          { l: 'Total gastado', v: `${totalPaid.toLocaleString('es-ES')} €` },
          { l: 'Restante', v: `${Math.max(0, totalEst - totalPaid).toLocaleString('es-ES')} €` },
          { l: 'Coste por invitado', v: `${costPerGuest.toLocaleString('es-ES')} €` },
        ].map(c => (
          <div key={c.l} style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14, padding: 16 }}>
            <p style={{ fontSize: 11, color: MUTE, marginBottom: 8 }}>{c.l}</p>
            <p style={{ fontFamily: F, fontSize: 20, fontWeight: 600, color: INK }}>{c.v}</p>
          </div>
        ))}
        <div style={{ background: 'white', border: '1px solid #ECE9E4', borderRadius: 14, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="52" height="52" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r={r} fill="none" stroke="#EFEBE4" strokeWidth="5" />
            <circle cx="25" cy="25" r={r} fill="none" stroke={BLUE} strokeWidth="5" strokeDasharray={circ} strokeDashoffset={offset} transform="rotate(-90 25 25)" style={{ transition: 'stroke-dashoffset .6s' }} />
          </svg>
          <p style={{ fontSize: 11, color: MUTE, marginTop: 6 }}>{pct}% gastado</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="Categoría" style={{ flex: 1, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
        <input value={newEst} onChange={e => setNewEst(e.target.value)} type="number" placeholder="Presupuesto €" style={{ width: 140, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
        <input value={newPaid} onChange={e => setNewPaid(e.target.value)} type="number" placeholder="Pagado €" style={{ width: 120, border: '1px solid #E3DCC9', borderRadius: 12, padding: '11px 16px', fontSize: 13, outline: 'none' }} />
        <button onClick={add} style={{ background: BLUE, color: 'white', border: 'none', borderRadius: 12, padding: '11px 22px', fontSize: 13, cursor: 'pointer' }}>Añadir</button>
      </div>

      <div style={{ border: '1px solid #F5EFE0', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', padding: '10px 18px', background: '#FBF9F5', borderBottom: '1px solid #F5EFE0' }}>
          {['CATEGORÍA', 'PRESUPUESTO', 'PAGADO', 'RESTANTE', ''].map(h => (
            <span key={h} style={{ fontSize: 10, color: MUTE, letterSpacing: '0.04em' }}>{h}</span>
          ))}
        </div>
        {budget.length === 0 ? (
          <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '30px 0' }}>Sin partidas todavía.</p>
        ) : budget.map((b, i) => (
          <div key={b.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', alignItems: 'center', padding: '12px 18px', borderBottom: i < budget.length - 1 ? '1px solid #F5EFE0' : 'none' }}>
            <span style={{ fontSize: 13, color: INK }}>{b.category}</span>
            <span style={{ fontSize: 12, color: MUTE }}>{b.estimated.toLocaleString('es-ES')} €</span>
            <input
              type="number" value={b.paid}
              onChange={e => updatePaid(b.id, Number(e.target.value))}
              style={{ border: '1px solid #F5EFE0', borderRadius: 8, padding: '5px 8px', fontSize: 12, width: 90, outline: 'none' }}
            />
            <span style={{ fontSize: 12, color: b.estimated - b.paid < 0 ? '#C0594F' : MUTE }}>{Math.max(0, b.estimated - b.paid).toLocaleString('es-ES')} €</span>
            <button onClick={() => remove(b.id)} style={{ background: 'none', border: 'none', color: '#C9BCA8', cursor: 'pointer', fontSize: 16 }}>×</button>
          </div>
        ))}
      </div>
    </div>
  )
}
