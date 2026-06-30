'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import SeatingPlan from '@/components/SeatingPlan'

const F = "'Cormorant Garamond',serif"
const BLUE = '#6E8FC9'
const BLUE_DARK = '#3D5A80'
const INK = '#2C2A26'
const MUTE = '#8A8580'
const BG = '#FAF9F7'

const ICONS: Record<string, JSX.Element> = {
  home: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
  activity: <path d="M3 12h4l2-7 4 14 2-7h6"/>,
  budget: <><circle cx="12" cy="12" r="9"/><path d="M12 7v10M15 9.5c0-1.5-1.5-2-3-2s-3 .8-3 2c0 1.2 1 1.7 3 2.2 2.2.5 3.2 1 3.2 2.3 0 1.4-1.6 2-3.2 2s-3-.6-3-2"/></>,
  todo: <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></>,
  guests: <><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 20c0-2.4 1.6-4 3.7-4.5"/></>,
  vendors: <><path d="M4 9l8-6 8 6v11a1 1 0 01-1 1H5a1 1 0 01-1-1V9z"/><path d="M9 21V12h6v9"/></>,
  seating: <><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></>,
  invitations: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>,
  pricing: <><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.97 7.97 0 000-2l2-1.5-2-3.4-2.4.6a8 8 0 00-1.7-1l-.4-2.5H10.1l-.4 2.5a8 8 0 00-1.7 1l-2.4-.6-2 3.4L5.6 11a8 8 0 000 2l-2 1.5 2 3.4 2.4-.6a8 8 0 001.7 1l.4 2.5h3.8l.4-2.5a8 8 0 001.7-1l2.4.6 2-3.4-2-1.5z"/></>,
}

const NAV_TOP = [
  { id: 'home', label: 'Dashboard' },
  { id: 'activity', label: 'Activity' },
  { id: 'budget', label: 'Budget' },
  { id: 'todo', label: 'Checklist' },
  { id: 'guests', label: 'Guests' },
  { id: 'invitations', label: 'Invitations' },
]
const NAV_BOTTOM = [
  { id: 'pricing', label: 'Pricing' },
  { id: 'settings', label: 'Settings' },
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
  const [newTable, setNewTable] = useState('')
  const [guestsView, setGuestsView] = useState<'list' | 'seating'>('list')
  const [budgetFilter, setBudgetFilter] = useState('All')
  const [draggedGuest, setDraggedGuest] = useState<string | null>(null)

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

  async function addTableRow() {
    if (!newTable.trim() || !user) return
    const { data } = await supabase.from('tables_list').insert({ user_id: user.id, name: newTable }).select().single()
    if (data) setTables(prev => [...prev, data])
    setNewTable('')
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
  const unassignedGuests = guests.filter(g => !g.table_name)

  const daysLeft: number | null = null

  const r = 32
  const circ = 2 * Math.PI * r
  const offset = circ - (circ * progressPct) / 100

  return (
    <div className="min-h-screen flex" style={{background:BG,fontFamily:"'Inter',sans-serif"}}>

      <aside style={{width:220,background:'white',borderRight:'1px solid #ECE9E4',padding:'20px 14px',display:'flex',flexDirection:'column'}}>
        <div className="flex items-center gap-2 mb-1" style={{padding:'4px 8px 18px'}}>
          <div style={{width:30,height:30,borderRadius:9,background:'#F4EFE7',display:'flex',alignItems:'center',justifyContent:'center',color:BLUE,fontSize:15}}>♡</div>
          <span style={{fontFamily:F,fontSize:18,fontWeight:600,color:INK}}>Vowed</span>
        </div>

        {daysLeft !== null && (
          <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 10px',marginBottom:14,fontSize:12,color:MUTE}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.6"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>
            {daysLeft} days to go
          </div>
        )}

        {NAV_TOP.map(n => (
          <button
            key={n.id}
            onClick={() => setTab(n.id)}
            style={{
              display:'flex',alignItems:'center',gap:10,
              textAlign:'left',padding:'9px 10px',borderRadius:9,border:'none',
              background: tab===n.id ? '#F4F2EE' : 'transparent',
              color: tab===n.id ? INK : MUTE,
              fontWeight: tab===n.id ? 600 : 400,
              fontSize:13,cursor:'pointer',marginBottom:1
            }}
          >
            <Icon name={n.id} />
            {n.label}
          </button>
        ))}

        <div style={{marginTop:'auto'}}>
          {NAV_BOTTOM.map(n => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              style={{
                display:'flex',alignItems:'center',gap:10,
                textAlign:'left',padding:'9px 10px',borderRadius:9,border:'none',
                background: tab===n.id ? '#F4F2EE' : 'transparent',
                color: tab===n.id ? INK : MUTE,
                fontWeight: tab===n.id ? 600 : 400,
                fontSize:13,cursor:'pointer',marginBottom:1
              }}
            >
              <Icon name={n.id} />
              {n.label}
            </button>
          ))}
          <button onClick={handleLogout} style={{display:'flex',alignItems:'center',gap:10,width:'100%',textAlign:'left',fontSize:13,color:MUTE,background:'none',border:'none',cursor:'pointer',padding:'9px 10px',marginTop:4}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">

        <header style={{borderBottom:'1px solid #ECE9E4',padding:'16px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'white'}}>
          <div className="flex items-center gap-3">
            <span style={{fontFamily:F,fontSize:17,fontWeight:600,color:INK}}>Our Wedding</span>
            {daysLeft !== null && (
              <span style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:MUTE,border:'1px solid #ECE9E4',borderRadius:999,padding:'4px 12px'}}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/></svg>
                {daysLeft} days to go
              </span>
            )}
          </div>
          <div style={{border:'1px solid #ECE9E4',borderRadius:10,padding:'8px 14px',fontSize:12,color:MUTE,display:'flex',alignItems:'center',gap:8,width:220}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
            Search...
          </div>
        </header>

        <main className="flex-1 px-9 py-8 overflow-y-auto">

          {tab === 'home' && (
            <>
              <div className="flex items-center justify-between mb-7">
                <div>
                  <h1 style={{fontFamily:F,fontSize:30,fontWeight:600,color:INK,marginBottom:4}}>Welcome back</h1>
                  <p style={{fontSize:13,color:MUTE}}>Here's an overview of your wedding planning progress</p>
                </div>
                {daysLeft !== null && (
                  <div style={{border:'1px solid #ECE9E4',borderRadius:10,padding:'10px 16px',display:'flex',alignItems:'center',gap:8,fontSize:13,color:INK,background:'white'}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/></svg>
                    {daysLeft} days to go
                  </div>
                )}
              </div>

              <div className="grid grid-cols-4 gap-4 mb-8">
                <div style={{background:'white',border:'1px solid #ECE9E4',borderRadius:16,padding:20}}>
                  <div style={{width:34,height:34,borderRadius:9,background:'#F4F2EE',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14}}>
                    <Icon name="budget" />
                  </div>
                  <p style={{fontSize:12,color:MUTE,marginBottom:6}}>Budget</p>
                  <p style={{fontFamily:F,fontSize:26,fontWeight:600,color:INK,marginBottom:4}}>{budgetPaid.toLocaleString('es-ES')} €</p>
                  <p style={{fontSize:11,color:MUTE,marginBottom:10}}>{Math.max(0,budgetEst-budgetPaid).toLocaleString('es-ES')} € remaining</p>
                  <div style={{height:5,borderRadius:99,background:'#EFEBE4'}}>
                    <div style={{height:5,borderRadius:99,background:BLUE,width: budgetEst>0 ? Math.min(100,(budgetPaid/budgetEst)*100)+'%' : '0%'}}/>
                  </div>
                </div>

                <div style={{background:'white',border:'1px solid #F3D9D9',borderRadius:16,padding:20}}>
                  <div style={{width:34,height:34,borderRadius:9,background:'#FBEEEE',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14,color:'#C0594F'}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/></svg>
                  </div>
                  <p style={{fontSize:12,color:MUTE,marginBottom:6}}>Tasks</p>
                  <p style={{fontFamily:F,fontSize:26,fontWeight:600,color:INK,marginBottom:4}}>{doneTasks}/{totalTasks}</p>
                  <p style={{fontSize:11,color:'#C0594F',marginBottom:10}}>{nextTasks.length > 0 ? nextTasks.length+' pending' : 'all clear'}</p>
                  <div style={{height:5,borderRadius:99,background:'#F6E4E4'}}>
                    <div style={{height:5,borderRadius:99,background:'#C0594F',width: totalTasks>0 ? (doneTasks/totalTasks)*100+'%' : '0%'}}/>
                  </div>
                </div>

                <div style={{background:'white',border:'1px solid #EFE0C2',borderRadius:16,padding:20}}>
                  <div style={{width:34,height:34,borderRadius:9,background:'#FBF3E1',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14,color:'#B8862F'}}>
                    <Icon name="guests" />
                  </div>
                  <p style={{fontSize:12,color:MUTE,marginBottom:6}}>Guests</p>
                  <p style={{fontFamily:F,fontSize:26,fontWeight:600,color:INK,marginBottom:4}}>{guests.length}</p>
                  <p style={{fontSize:11,color:'#B8862F',marginBottom:10}}>{guests.filter(g=>g.rsvp==='Pendiente').length} awaiting RSVP</p>
                  <div style={{height:5,borderRadius:99,background:'#F5EAD2'}}>
                    <div style={{height:5,borderRadius:99,background:'#B8862F',width: guests.length>0 ? (confirmedGuests/guests.length)*100+'%' : '0%'}}/>
                  </div>
                </div>

                <div style={{background:'white',border:'1px solid #EFE0C2',borderRadius:16,padding:20}}>
                  <div style={{width:34,height:34,borderRadius:9,background:'#FBF3E1',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14,color:'#B8862F'}}>
                    <Icon name="vendors" />
                  </div>
                  <p style={{fontSize:12,color:MUTE,marginBottom:6}}>Vendors</p>
                  <p style={{fontFamily:F,fontSize:26,fontWeight:600,color:INK,marginBottom:4}}>{tables.length}</p>
                  <p style={{fontSize:11,color:MUTE}}>tables created</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div style={{background:'white',border:'1px solid #ECE9E4',borderRadius:16,padding:22}}>
                  <p style={{fontSize:12,color:MUTE,marginBottom:14}}>Próximas tareas</p>
                  {nextTasks.length > 0 ? nextTasks.map(t => (
                    <div key={t.id} style={{display:'flex',alignItems:'center',gap:8,padding:'6px 0',fontSize:13,color:INK}}>
                      <span style={{width:5,height:5,borderRadius:999,background:BLUE,flexShrink:0}}/>
                      {t.title}
                    </div>
                  )) : <p style={{fontSize:12,color:MUTE}}>Nada pendiente ♡</p>}
                  <p onClick={() => setTab('todo')} style={{fontSize:12,color:BLUE,marginTop:12,cursor:'pointer'}}>Ver checklist completo →</p>
                </div>
                <div style={{background:'white',border:'1px solid #ECE9E4',borderRadius:16,padding:22}}>
                  <p style={{fontSize:12,color:MUTE,marginBottom:14}}>Resumen de invitados</p>
                  <p style={{fontFamily:F,fontSize:22,color:INK,marginBottom:2}}>{confirmedGuests} / {guests.length}</p>
                  <p style={{fontSize:12,color:MUTE}}>confirmados</p>
                </div>
              </div>
            </>
          )}

          {tab === 'activity' && (
            <>
              <h1 style={{fontFamily:F,fontSize:26,fontWeight:600,color:INK,marginBottom:4}}>Activity</h1>
              <p style={{fontSize:13,color:MUTE,marginBottom:24}}>Todo lo que habéis ido completando</p>
              <div style={{background:'white',border:'1px solid #ECE9E4',borderRadius:16,padding:22}}>
                {tasks.filter(t=>t.done).length === 0 ? (
                  <p style={{fontSize:13,color:MUTE,textAlign:'center',padding:'30px 0'}}>Aún no hay actividad. Id marcando tareas para verlas aquí.</p>
                ) : tasks.filter(t=>t.done).map((t,i,arr) => (
                  <div key={t.id} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom: i<arr.length-1 ? '1px solid #F0EEEA':'none'}}>
                    <span style={{width:16,height:16,borderRadius:'50%',background:BLUE,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span style={{fontSize:13,color:INK}}>{t.title}</span>
                  </div>
                ))}
              </div>
            </>
          )}
<div key={t.id} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom: i<arr.length-1 ? '1px solid #F0EEEA':'none'}}>
                    <span style={{width:16,height:16,borderRadius:'50%',background:BLUE,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <svg width="9" height="7" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span style={{fontSize:13,color:INK}}>{t.title}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'pricing' && (
            <>
              <h1 style={{fontFamily:F,fontSize:26,fontWeight:600,color:INK,marginBottom:4}}>Pricing</h1>
              <p style={{fontSize:13,color:MUTE,marginBottom:24}}>El organizador es gratuito. Solo cobramos por las plantillas de invitaciones.</p>
              <div className="grid grid-cols-2 gap-4">
                <div style={{background:'white',border:'1px solid #ECE9E4',borderRadius:16,padding:24}}>
                  <p style={{fontFamily:F,fontSize:20,color:INK,marginBottom:8}}>Organizador</p>
                  <p style={{fontFamily:F,fontSize:32,color:INK,marginBottom:4}}>Gratis</p>
                  <p style={{fontSize:12,color:MUTE}}>Checklist, presupuesto, invitados, seating. Para siempre.</p>
                </div>
                <div style={{background:'white',border:`1px solid ${BLUE}`,borderRadius:16,padding:24}}>
                  <p style={{fontFamily:F,fontSize:20,color:INK,marginBottom:8}}>Plantillas de invitación</p>
                  <p style={{fontFamily:F,fontSize:32,color:INK,marginBottom:4}}>Desde 10 €</p>
                  <p style={{fontSize:12,color:MUTE}}>Diseños listos para personalizar y enviar.</p>
                </div>
              </div>
            </>
          )}

          {tab === 'settings' && (
            <>
              <h1 style={{fontFamily:F,fontSize:26,fontWeight:600,color:INK,marginBottom:4}}>Settings</h1>
              <p style={{fontSize:13,color:MUTE,marginBottom:24}}>{user?.email}</p>
              <button onClick={handleLogout} style={{background:'white',border:'1px solid #ECE9E4',borderRadius:12,padding:'11px 22px',fontSize:13,color:INK,cursor:'pointer'}}>
                Cerrar sesión
              </button>
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

        {tab === 'budget' && (() => {
          const pctSpent = budgetEst > 0 ? Math.round((budgetPaid/budgetEst)*100) : 0
          const guestCount = guests.length || 1
          const costPerGuest = Math.round(budgetEst / guestCount)
          const overdueItems = budget.filter(b => b.paid < b.estimated)
          const categories = Array.from(new Set(budget.map(b => b.category)))
          const filteredBudget = budgetFilter === 'All' ? budget : budget.filter(b => b.category === budgetFilter)
          const overAllocated = budgetPaid > budgetEst ? budgetPaid - budgetEst : 0

          const rPct = 22
          const circPct = 2 * Math.PI * rPct
          const offsetPct = circPct - (circPct * pctSpent) / 100

          return (
          <>
            <h1 style={{fontFamily:F,fontSize:26,fontWeight:600,color:INK,marginBottom:18}}>Presupuesto</h1>

            <div className="grid grid-cols-5 gap-3 mb-5">
              <div style={{background:'white',border:'1px solid #ECE9E4',borderRadius:16,padding:18}}>
                <div className="flex items-center gap-2 mb-3">
                  <div style={{width:28,height:28,borderRadius:8,background:'#F4F2EE',display:'flex',alignItems:'center',justifyContent:'center',color:MUTE,fontSize:13}}>€</div>
                  <span style={{fontSize:12,color:MUTE}}>Total Budget</span>
                </div>
                <p style={{fontFamily:F,fontSize:22,fontWeight:600,color:INK}}>{budgetEst.toLocaleString('es-ES')} €</p>
              </div>
              <div style={{background:'white',border:'1px solid #ECE9E4',borderRadius:16,padding:18}}>
                <div className="flex items-center gap-2 mb-3">
                  <div style={{width:28,height:28,borderRadius:8,background:'#F4F2EE',display:'flex',alignItems:'center',justifyContent:'center',color:MUTE}}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 17l6-6 4 4 8-8"/></svg>
                  </div>
                  <span style={{fontSize:12,color:MUTE}}>Total Spent</span>
                </div>
                <p style={{fontFamily:F,fontSize:22,fontWeight:600,color:INK}}>{budgetPaid.toLocaleString('es-ES')} €</p>
              </div>
              <div style={{background:'white',border:'1px solid #ECE9E4',borderRadius:16,padding:18}}>
                <div className="flex items-center gap-2 mb-3">
                  <div style={{width:28,height:28,borderRadius:8,background:'#F4F2EE',display:'flex',alignItems:'center',justifyContent:'center',color:MUTE}}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7l-6 6-4-4-8 8"/></svg>
                  </div>
                  <span style={{fontSize:12,color:MUTE}}>Remaining</span>
                </div>
                <p style={{fontFamily:F,fontSize:22,fontWeight:600,color:INK}}>{Math.max(0,budgetEst-budgetPaid).toLocaleString('es-ES')} €</p>
              </div>
              <div style={{background:'white',border:'1px solid #ECE9E4',borderRadius:16,padding:18}}>
                <div className="flex items-center gap-2 mb-3">
                  <div style={{width:28,height:28,borderRadius:8,background:'#F4F2EE',display:'flex',alignItems:'center',justifyContent:'center',color:MUTE}}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v9l6 3"/></svg>
                  </div>
                  <span style={{fontSize:12,color:MUTE}}>% Spent</span>
                </div>
                <div className="flex items-center justify-between">
                  <p style={{fontFamily:F,fontSize:22,fontWeight:600,color:INK}}>{pctSpent}%</p>
                  <svg width="40" height="40" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r={rPct} fill="none" stroke="#EFEBE4" strokeWidth="5"/>
                    <circle cx="25" cy="25" r={rPct} fill="none" stroke={BLUE} strokeWidth="5" strokeDasharray={circPct} strokeDashoffset={offsetPct} transform="rotate(-90 25 25)"/>
                  </svg>
                </div>
              </div>
              <div style={{background:'white',border:'1px solid #ECE9E4',borderRadius:16,padding:18}}>
                <div className="flex items-center gap-2 mb-3">
                  <div style={{width:28,height:28,borderRadius:8,background:'#F4F2EE',display:'flex',alignItems:'center',justifyContent:'center',color:MUTE}}>
                    <Icon name="guests" />
                  </div>
                  <span style={{fontSize:12,color:MUTE}}>Cost Per Guest</span>
                </div>
                <p style={{fontFamily:F,fontSize:22,fontWeight:600,color:INK}}>{costPerGuest.toLocaleString('es-ES')} €</p>
              </div>
            </div>

            {overdueItems.length > 0 && (
              <div style={{background:'#FBEEEE',border:'1px solid #F3D9D9',borderRadius:16,padding:'16px 20px',marginBottom:20,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div className="flex items-center gap-3">
                  <span style={{color:'#C0594F',fontSize:18}}>⚠</span>
                  <div>
                    <p style={{fontSize:13,fontWeight:500,color:INK}}>You have {overdueItems.length} pending payment{overdueItems.length>1?'s':''}</p>
                    <p style={{fontSize:12,color:MUTE}}>Hay partidas con saldo pendiente de pagar.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-4" style={{borderBottom:'1px solid #ECE9E4',paddingBottom:10}}>
              <div className="flex items-center gap-6">
                <span style={{fontSize:13,fontWeight:600,color:INK,borderBottom:`2px solid ${BLUE}`,paddingBottom:10,marginBottom:-11}}>Categories</span>
                <span style={{fontSize:13,color:MUTE}}>Payments</span>
                <span style={{fontSize:13,color:MUTE}}>Insights</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <button onClick={()=>setBudgetFilter('All')} style={{
                padding:'7px 16px',borderRadius:999,border:'none',fontSize:12,cursor:'pointer',
                background: budgetFilter==='All' ? INK : '#F4F2EE',
                color: budgetFilter==='All' ? 'white' : MUTE
              }}>All</button>
              {categories.map(cat => (
                <button key={cat} onClick={()=>setBudgetFilter(cat)} style={{
                  padding:'7px 16px',borderRadius:999,border:'1px solid #ECE9E4',fontSize:12,cursor:'pointer',
                  background: budgetFilter===cat ? '#F4F2EE' : 'white',
                  color: budgetFilter===cat ? INK : MUTE
                }}>{cat}</button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span style={{fontFamily:F,fontSize:18,fontWeight:600,color:INK}}>Categories</span>
                {overAllocated > 0 && (
                  <span style={{background:'#FBEEEE',color:'#C0594F',fontSize:11,borderRadius:999,padding:'3px 10px'}}>Over-allocated: {overAllocated.toLocaleString('es-ES')} €</span>
                )}
              </div>
            </div>

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

            {filteredBudget.length === 0 ? (
              <p style={{fontSize:13,color:MUTE,textAlign:'center',padding:'40px 0'}}>Aún no tenéis partidas de presupuesto.</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {filteredBudget.map(b => {
                  const itemPct = b.estimated > 0 ? Math.min(100,(b.paid/b.estimated)*100) : 0
                  return (
                    <div key={b.id} style={{background:'white',border:'1px solid #ECE9E4',borderRadius:16,padding:18}}>
                      <p style={{fontFamily:F,fontSize:16,fontWeight:500,color:INK,marginBottom:10}}>{b.category}</p>
                      <p style={{fontSize:12,color:MUTE,marginBottom:4}}>{Number(b.paid).toLocaleString('es-ES')} € de {Number(b.estimated).toLocaleString('es-ES')} €</p>
                      <div style={{height:5,borderRadius:99,background:'#EFEBE4',marginTop:8}}>
                        <div style={{height:5,borderRadius:99,background:BLUE,width:itemPct+'%'}}/>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
          )
        })()}

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
    </div>
  )
}
