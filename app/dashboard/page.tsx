'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import SeatingPlan from '@/components/SeatingPlan'

const F = "'Cormorant Garamond',serif"
const BLUE = '#6E8FC9'
const BLUE_DARK = '#3D5A80'
const INK = '#2C3E5C'
const MUTE = '#7A93B5'

const ICONS: Record<string, JSX.Element> = {
  home: <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>,
  todo: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
  budget: <><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 14h2"/></>,
  guests: <><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 20c0-2.4 1.6-4 3.7-4.5"/></>,
  invitations: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>,
}

const NAV = [
  { id: 'home', label: 'Dashboard' },
  { id: 'todo', label: 'To-Do' },
  { id: 'budget', label: 'Budget' },
  { id: 'guests', label: 'Guests' },
  { id: 'invitations', label: 'Invitations' },
]

const TEMPLATES = [
  { name: 'Jardín de olivos', price: '12 €', img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=300&q=80' },
  { name: 'Lino y oro', price: '14 €', img: 'https://images.unsplash.com/photo-1622037022824-0c71d511ec02?w=300&q=80' },
  { name: 'Acuarela floral', price: '12 €', img: 'https://images.unsplash.com/photo-1612630440053-cdc4458c79fd?w=300&q=80' },
  { name: 'Minimal clásica', price: '10 €', img: 'https://images.unsplash.com/photo-1595407753234-0882f1e76e26?w=300&q=80' },
]

function Icon({ name }: { name: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  )
}

interface Task { id: string; title: string; done: boolean }
interface Guest { id: string; name: string; contact: string | null; rsvp: string; table_name: string | null }
interface BudgetItem { id: string; category: string; estimated: number; paid: number }
interface TableRow { id: string; name: string; shape: string; pos_x: number; pos_y: number }

export default function Dashboard() {
  const router = useRouter()
  const [tab, setTab] = useState('home')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [tasks, setTasks] = useState<Task[]>([])
  const [guests, setGuests] = useState<Guest[]>([])
  const [budget, setBudget] = useState<BudgetItem[]>([])
  const [tables, setTables] = useState<TableRow[]>([])

  const [newTask, setNewTask] = useState('')
  const [newGuest, setNewGuest] = useState('')
  const [newCat, setNewCat] = useState('')
  const [newEst, setNewEst] = useState('')
  const [guestsView, setGuestsView] = useState<'list' | 'seating'>('list')

  const supabase = createClient()

  async function loadAll(uid: string) {
    const { data: t } = await supabase.from('tasks').select('id,title,done').eq('user_id', uid).order('created_at')
    const { data: g } = await supabase.from('guests').select('id,name,contact,rsvp,table_name').eq('user_id', uid).order('created_at')
    const { data: b } = await supabase.from('budget_items').select('id,category,estimated,paid').eq('user_id', uid).order('created_at')
    const { data: tb } = await supabase.from('tables_list').select('id,name,shape,pos_x,pos_y').eq('user_id', uid).order('created_at')
    setTasks(t || []); setGuests(g || []); setBudget(b || []); setTables(tb || [])
  }

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUser(data.user)
      await loadAll(data.user.id)
      setLoading(false)
    })
  }, [router])

  async function toggleTask(id: string, current: boolean) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !current } : t))
    await supabase.from('tasks').update({ done: !current }).eq('id', id)
  }

  async function addTask() {
    if (!newTask.trim() || !user) return
    const { data } = await supabase.from('tasks').insert({ user_id: user.id, title: newTask, done: false }).select().single()
    if (data) setTasks(prev => [...prev, data])
    setNewTask('')
  }

  async function addGuest() {
    if (!newGuest.trim() || !user) return
    const { data } = await supabase.from('guests').insert({ user_id: user.id, name: newGuest, rsvp: 'Pendiente' }).select().single()
    if (data) setGuests(prev => [...prev, data])
    setNewGuest('')
  }

  async function updateGuest(id: string, field: keyof Guest, value: string) {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g))
    await supabase.from('guests').update({ [field]: value }).eq('id', id)
  }

  async function addBudget() {
    if (!newCat.trim() || !user) return
    const { data } = await supabase.from('budget_items').insert({ user_id: user.id, category: newCat, estimated: Number(newEst) || 0, paid: 0 }).select().single()
    if (data) setBudget(prev => [...prev, data])
    setNewCat(''); setNewEst('')
  }

  async function assignGuestToTable(guestId: string, tableName: string | null) {
    setGuests(prev => prev.map(g => g.id === guestId ? { ...g, table_name: tableName } : g))
    await supabase.from('guests').update({ table_name: tableName }).eq('id', guestId)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background:'white'}}>
        <div style={{fontFamily:F,fontSize:22,fontStyle:'italic',color:BLUE}}>vowed</div>
      </div>
    )
  }

  const name1 = user?.user_metadata?.name1 || 'vosotros'
  const totalTasks = tasks.length
  const doneTasks = tasks.filter(t => t.done).length
  const progressPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0
  const nextTasks = tasks.filter(t => !t.done).slice(0, 3)
  const budgetPaid = budget.reduce((a, b) => a + Number(b.paid || 0), 0)
  const budgetEst = budget.reduce((a, b) => a + Number(b.estimated || 0), 0)
  const confirmedGuests = guests.filter(g => g.rsvp === 'Sí').length

  const r = 32
  const circ = 2 * Math.PI * r
  const offset = circ - (circ * progressPct) / 100

  return (
    <div className="min-h-screen flex" style={{background:'#FBFCFE',fontFamily:"'Inter',sans-serif"}}>

      <aside style={{width:190,background:'white',borderRight:'1px solid #EEF2F7',padding:'24px 16px',display:'flex',flexDirection:'column'}}>
        <div style={{fontFamily:F,fontSize:20,fontStyle:'italic',color:BLUE,marginBottom:28}}>vowed</div>
        {NAV.map(n => (
          <button
            key={n.id}
            onClick={() => setTab(n.id)}
            style={{
              display:'flex',alignItems:'center',gap:10,
              textAlign:'left',padding:'9px 12px',borderRadius:10,border:'none',
              background: tab===n.id ? '#EAF1FA' : 'transparent',
              color: tab===n.id ? BLUE_DARK : MUTE,
              fontWeight: tab===n.id ? 500 : 400,
              fontSize:13,cursor:'pointer',marginBottom:1
            }}
          >
            <Icon name={n.id} />
            {n.label}
          </button>
        ))}
        <button onClick={handleLogout} style={{marginTop:'auto',textAlign:'left',fontSize:11,color:'#C7D2E0',background:'none',border:'none',cursor:'pointer',padding:'9px 12px'}}>
          Cerrar sesión
        </button>
      </aside>

      <main className="flex-1 px-10 py-8" style={{maxWidth:920}}>

        {tab === 'home' && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 style={{fontFamily:F,fontSize:26,fontWeight:500,color:INK}}>Hola, {name1} ♡</h1>
                <p style={{fontSize:12,color:MUTE,marginTop:2}}>
                  {totalTasks === 0 ? 'Empezad añadiendo vuestra primera tarea' : progressPct === 100 ? 'Lo tenéis todo listo' : 'Vais avanzando'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div style={{border:'1px solid #EEF2F7',borderRadius:18,padding:22,textAlign:'center'}}>
                <p style={{fontSize:11,color:MUTE,marginBottom:14}}>Progreso</p>
                {totalTasks > 0 ? (
                  <>
                    <svg width="84" height="84" viewBox="0 0 80 80" style={{margin:'0 auto'}}>
                      <circle cx="40" cy="40" r={r} fill="none" stroke="#EEF2F7" strokeWidth="7"/>
                      <circle cx="40" cy="40" r={r} fill="none" stroke={BLUE} strokeWidth="7" strokeDasharray={circ} strokeDashoffset={offset} transform="rotate(-90 40 40)" style={{transition:'stroke-dashoffset .6s ease'}}/>
                      <text x="40" y="46" textAnchor="middle" style={{fontFamily:F,fontSize:20,fill:INK}}>{progressPct}%</text>
                    </svg>
                    <p style={{fontSize:11,color:MUTE,marginTop:10}}>{doneTasks} de {totalTasks} tareas</p>
                  </>
                ) : (
                  <p style={{fontSize:12,color:MUTE,padding:'20px 0'}}>Sin tareas todavía</p>
                )}
              </div>

              <div style={{border:'1px solid #EEF2F7',borderRadius:18,padding:22}}>
                <p style={{fontSize:11,color:MUTE,marginBottom:12}}>Próximas tareas</p>
                {nextTasks.length > 0 ? nextTasks.map(t => (
                  <div key={t.id} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 0',fontSize:12,color:INK}}>
                    <span style={{width:5,height:5,borderRadius:999,background:BLUE,flexShrink:0}}/>
                    {t.title}
                  </div>
                )) : <p style={{fontSize:12,color:MUTE}}>Nada pendiente ♡</p>}
                <p onClick={() => setTab('todo')} style={{fontSize:11,color:BLUE,marginTop:12,cursor:'pointer'}}>Ver todas →</p>
              </div>

              <div style={{border:'1px solid #EEF2F7',borderRadius:18,padding:22}}>
                <p style={{fontSize:11,color:MUTE,marginBottom:10}}>Vuestros datos</p>
                <p style={{fontFamily:F,fontSize:22,color:INK,marginBottom:2}}>{confirmedGuests} / {guests.length}</p>
                <p style={{fontSize:11,color:MUTE,marginBottom:14}}>invitados confirmados</p>
                <p style={{fontFamily:F,fontSize:22,color:INK,marginBottom:2}}>{budgetPaid.toLocaleString('es-ES')} €</p>
                <p style={{fontSize:11,color:MUTE}}>pagado de {budgetEst.toLocaleString('es-ES')} €</p>
              </div>
            </div>
          </>
        )}

        {tab === 'todo' && (
          <>
            <h1 style={{fontFamily:F,fontSize:26,fontWeight:500,color:INK,marginBottom:4}}>Vuestras tareas</h1>
            <p style={{fontSize:12,color:MUTE,marginBottom:24}}>{doneTasks} de {totalTasks} completadas</p>

            <div className="flex gap-2 mb-5">
              <input
                value={newTask} onChange={e=>setNewTask(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTask()}
                placeholder="Nueva tarea..."
                style={{flex:1,border:'1px solid #DCE7F4',borderRadius:12,padding:'11px 16px',fontSize:13,outline:'none'}}
              />
              <button onClick={addTask} style={{background:BLUE,color:'white',border:'none',borderRadius:12,padding:'11px 22px',fontSize:13,cursor:'pointer'}}>Añadir</button>
            </div>

            {tasks.length === 0 ? (
              <p style={{fontSize:13,color:MUTE,textAlign:'center',padding:'40px 0'}}>Aún no tenéis tareas. Añadid la primera arriba.</p>
            ) : (
              <div style={{border:'1px solid #EEF2F7',borderRadius:18,overflow:'hidden'}}>
                {tasks.map((t, i) => (
                  <div key={t.id} onClick={() => toggleTask(t.id, t.done)} style={{
                    display:'flex',alignItems:'center',gap:12,padding:'14px 20px',
                    borderBottom: i < tasks.length-1 ? '1px solid #F0F3F8' : 'none', cursor:'pointer'
                  }}>
                    <span style={{
                      width:18,height:18,borderRadius:6,flexShrink:0,
                      border: t.done ? 'none' : '1.5px solid #DCE7F4',
                      background: t.done ? BLUE : 'white',
                      display:'flex',alignItems:'center',justifyContent:'center'
                    }}>
                      {t.done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </span>
                    <span style={{fontSize:13,color: t.done ? '#C7D2E0' : INK, textDecoration: t.done ? 'line-through' : 'none'}}>{t.title}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'guests' && (
          <>
            <div className="flex items-center justify-between mb-1">
              <h1 style={{fontFamily:F,fontSize:26,fontWeight:500,color:INK}}>Invitados</h1>
              <div style={{display:'flex',gap:1,background:'#EEF2F7',borderRadius:10,padding:2}}>
                <button onClick={()=>setGuestsView('list')} style={{
                  padding:'7px 16px',borderRadius:8,border:'none',fontSize:12,cursor:'pointer',
                  background: guestsView==='list' ? 'white' : 'transparent',
                  color: guestsView==='list' ? INK : MUTE,
                  fontWeight: guestsView==='list' ? 500 : 400
                }}>Lista</button>
                <button onClick={()=>setGuestsView('seating')} style={{
                  padding:'7px 16px',borderRadius:8,border:'none',fontSize:12,cursor:'pointer',
                  background: guestsView==='seating' ? 'white' : 'transparent',
                  color: guestsView==='seating' ? INK : MUTE,
                  fontWeight: guestsView==='seating' ? 500 : 400
                }}>Mesas</button>
              </div>
            </div>
            <p style={{fontSize:12,color:MUTE,marginBottom:24}}>{guests.length} en la lista · {confirmedGuests} confirmados</p>

            {guestsView === 'list' && (
              <>
                <div className="flex gap-2 mb-5">
                  <input
                    value={newGuest} onChange={e=>setNewGuest(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addGuest()}
                    placeholder="Nombre del invitado..."
                    style={{flex:1,border:'1px solid #DCE7F4',borderRadius:12,padding:'11px 16px',fontSize:13,outline:'none'}}
                  />
                  <button onClick={addGuest} style={{background:BLUE,color:'white',border:'none',borderRadius:12,padding:'11px 22px',fontSize:13,cursor:'pointer'}}>Añadir</button>
                </div>

                {guests.length === 0 ? (
                  <p style={{fontSize:13,color:MUTE,textAlign:'center',padding:'40px 0'}}>Aún no tenéis invitados. Añadid el primero arriba.</p>
                ) : (
                  <div style={{border:'1px solid #EEF2F7',borderRadius:18,overflow:'hidden'}}>
                    <div style={{display:'grid',gridTemplateColumns:'1.4fr 1.4fr 1fr 1fr',padding:'10px 20px',background:'#FAFBFD',borderBottom:'1px solid #EEF2F7'}}>
                      <span style={{fontSize:10,color:MUTE,letterSpacing:'0.04em'}}>NOMBRE</span>
                      <span style={{fontSize:10,color:MUTE,letterSpacing:'0.04em'}}>CONTACTO</span>
                      <span style={{fontSize:10,color:MUTE,letterSpacing:'0.04em'}}>MESA</span>
                      <span style={{fontSize:10,color:MUTE,letterSpacing:'0.04em'}}>ASISTENCIA</span>
                    </div>
                    {guests.map((g, i) => (
                      <div key={g.id} style={{display:'grid',gridTemplateColumns:'1.4fr 1.4fr 1fr 1fr',alignItems:'center',padding:'10px 20px',borderBottom: i < guests.length-1 ? '1px solid #F0F3F8' : 'none'}}>
                        <span style={{fontSize:13,color:INK}}>{g.name}</span>
                        <input
                          value={g.contact || ''} onChange={e=>updateGuest(g.id,'contact',e.target.value)}
                          placeholder="Email o teléfono"
                          style={{border:'none',background:'transparent',fontSize:12,color:MUTE,outline:'none'}}
                        />
                        <span style={{fontSize:12,color: g.table_name ? INK : '#C7D2E0'}}>{g.table_name || '—'}</span>
                        <select
                          value={g.rsvp} onChange={e=>updateGuest(g.id,'rsvp',e.target.value)}
                          style={{border:'1px solid #EEF2F7',borderRadius:8,padding:'5px 8px',fontSize:11,color:INK,background:'white',outline:'none',width:'fit-content'}}
                        >
                          <option>Pendiente</option>
                          <option>Sí</option>
                          <option>No</option>
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {guestsView === 'seating' && user && (
              <SeatingPlan
                guests={guests}
                tables={tables}
                setTables={setTables}
                assignGuestToTable={assignGuestToTable}
                userId={user.id}
              />
            )}
          </>
        )}

        {tab === 'budget' && (
          <>
            <h1 style={{fontFamily:F,fontSize:26,fontWeight:500,color:INK,marginBottom:4}}>Presupuesto</h1>
            <p style={{fontSize:12,color:MUTE,marginBottom:24}}>{budgetPaid.toLocaleString('es-ES')} € pagado de {budgetEst.toLocaleString('es-ES')} € estimado</p>

            <div className="flex gap-2 mb-5">
              <input
                value={newCat} onChange={e=>setNewCat(e.target.value)}
                placeholder="Categoría (ej: Catering)"
                style={{flex:1,border:'1px solid #DCE7F4',borderRadius:12,padding:'11px 16px',fontSize:13,outline:'none'}}
              />
              <input
                value={newEst} onChange={e=>setNewEst(e.target.value)} type="number"
                placeholder="Presupuesto €"
                style={{width:140,border:'1px solid #DCE7F4',borderRadius:12,padding:'11px 16px',fontSize:13,outline:'none'}}
              />
              <button onClick={addBudget} style={{background:BLUE,color:'white',border:'none',borderRadius:12,padding:'11px 22px',fontSize:13,cursor:'pointer'}}>Añadir</button>
            </div>

            {budget.length === 0 ? (
              <p style={{fontSize:13,color:MUTE,textAlign:'center',padding:'40px 0'}}>Aún no tenéis partidas de presupuesto.</p>
            ) : (
              <div style={{border:'1px solid #EEF2F7',borderRadius:18,overflow:'hidden'}}>
                {budget.map((b, i) => (
                  <div key={b.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 20px',borderBottom: i < budget.length-1 ? '1px solid #F0F3F8' : 'none'}}>
                    <span style={{fontSize:13,color:INK}}>{b.category}</span>
                    <span style={{fontSize:12,color:MUTE}}>{Number(b.estimated).toLocaleString('es-ES')} €</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'invitations' && (
          <>
            <h1 style={{fontFamily:F,fontSize:26,fontWeight:500,color:INK,marginBottom:4}}>Invitaciones</h1>
            <p style={{fontSize:12,color:MUTE,marginBottom:24}}>Plantillas listas para personalizar</p>

            <div className="grid grid-cols-2 gap-5">
              {TEMPLATES.map(t => (
                <div key={t.name} style={{border:'1px solid #EEF2F7',borderRadius:18,overflow:'hidden'}}>
                  <div style={{aspectRatio:'4/3',overflow:'hidden'}}>
                    <img src={t.img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  </div>
                  <div style={{padding:16,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div>
                      <p style={{fontFamily:F,fontSize:15,color:INK}}>{t.name}</p>
                      <p style={{fontSize:12,color:MUTE}}>{t.price}</p>
                    </div>
                    <button style={{background:BLUE,color:'white',border:'none',borderRadius:999,padding:'9px 20px',fontSize:12,cursor:'pointer'}}>
                      Comprar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </main>
    </div>
  )
}
