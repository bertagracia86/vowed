'use client'

import {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  useState  from 'react'

const F = "'Cormorant Garamond',serif"
#const BLUE = '
6E8FC9'
#const BLUE_DARK = '
3D5A80'
#const INK = '
2C2A26'
#const MUTE = '
8A8580'
#const BG = '
FAF9F7'

const ICONS: Record<string, JSX.Element> = {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}} 
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


const NAV_TOP = 
{.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: 'home', label: 'Resumen' ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: 'activity', label: 'Actividad' ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: 'budget', label: 'Presupuesto' ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: 'todo', label: 'Tareas' ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: 'guests', label: 'Invitados' ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: 'vendors', label: 'Proveedores' ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: 'seating', label: 'Mesas' ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: 'invitations', label: 'Invitaciones' ,

{.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: 'pricing', label: 'Precios' ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: 'settings', label: 'Ajustes' ,

{.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  name: 'Jardín de olivos', price: '12 ', img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=300&q=80' ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  name: 'Lino y oro', price: '14 ', img: 'https://images.unsplash.com/photo-1622037022824-0c71d511ec02?w=300&q=80' ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  name: 'Acuarela floral', price: '12 ', img: 'https://images.unsplash.com/photo-1612630440053-cdc4458c79fd?w=300&q=80' ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  name: 'Minimal clásica', price: '10 ', img: 'https://images.unsplash.com/photo-1595407753234-0882f1e76e26?w=300&q=80' ,
{.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  name : {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  name: string ) {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}} 
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}} ICONSame
    </svg>
  )


interface Task {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: string; title: string; done: boolean 
interface Guest {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: string; name: string; contact: string; rsvp: string; table_name: string  null 
interface BudgetItem {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: string; category: string; estimated: number; paid: number 
interface TableRow {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: string; name: string 

const DEFAULT_TASKS: Task
{.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: '1', title: 'Definir el presupuesto total', done: true ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: '2', title: 'Elegir la fecha tentativa', done: true ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: '3', title: 'Visitar y reservar el espacio', done: false ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: '4', title: 'Contratar al fotógrafo', done: false ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: '5', title: 'Buscar y contratar catering', done: false ,

{.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: '1', name: 'María García', contact: 'mariaemail.com', rsvp: 'Sí', table_name: 'Mesa 1' ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: '2', name: 'Carlos López', contact: '600 123 456', rsvp: 'Sí', table_name: 'Mesa 1' ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: '3', name: 'Ana Martínez', contact: '', rsvp: 'Pendiente', table_name: null ,

{.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: '1', category: 'Catering', estimated: 8000, paid: 3000 ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: '2', category: 'Finca', estimated: 5000, paid: 500 ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: '3', category: 'Fotografía', estimated: 2800, paid: 2800 ,

{.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: '1', name: 'Mesa 1' ,
  {.{env.local.example,git{,ignore}},README.md,app,components,lib,next.config.js,p{ackage.json,ostcss.config.js},t{ailwind.config.js,sconfig.json}}  id: '2', name: 'Mesa 2' ,

cd ~/vowed
cat >> app/dashboard/page.tsx << 'C1'
'use client'

import { useState } from 'react'

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
  { id: 'home', label: 'Resumen' },
  { id: 'activity', label: 'Actividad' },
  { id: 'budget', label: 'Presupuesto' },
  { id: 'todo', label: 'Tareas' },
  { id: 'guests', label: 'Invitados' },
  { id: 'vendors', label: 'Proveedores' },
  { id: 'seating', label: 'Mesas' },
  { id: 'invitations', label: 'Invitaciones' },
]
const NAV_BOTTOM = [
  { id: 'pricing', label: 'Precios' },
  { id: 'settings', label: 'Ajustes' },
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
interface Guest { id: string; name: string; contact: string; rsvp: string; table_name: string | null }
interface BudgetItem { id: string; category: string; estimated: number; paid: number }
interface TableRow { id: string; name: string }

const DEFAULT_TASKS: Task[] = [
  { id: '1', title: 'Definir el presupuesto total', done: true },
  { id: '2', title: 'Elegir la fecha tentativa', done: true },
  { id: '3', title: 'Visitar y reservar el espacio', done: false },
  { id: '4', title: 'Contratar al fotógrafo', done: false },
  { id: '5', title: 'Buscar y contratar catering', done: false },
]

const DEFAULT_GUESTS: Guest[] = [
  { id: '1', name: 'María García', contact: 'maria@email.com', rsvp: 'Sí', table_name: 'Mesa 1' },
  { id: '2', name: 'Carlos López', contact: '600 123 456', rsvp: 'Sí', table_name: 'Mesa 1' },
  { id: '3', name: 'Ana Martínez', contact: '', rsvp: 'Pendiente', table_name: null },
]

const DEFAULT_BUDGET: BudgetItem[] = [
  { id: '1', category: 'Catering', estimated: 8000, paid: 3000 },
  { id: '2', category: 'Finca', estimated: 5000, paid: 500 },
  { id: '3', category: 'Fotografía', estimated: 2800, paid: 2800 },
]

const DEFAULT_TABLES: TableRow[] = [
  { id: '1', name: 'Mesa 1' },
  { id: '2', name: 'Mesa 2' },
]

export default function Dashboard() {
  const [authed, setAuthed] = useState(false)
  const [pwInput, setPwInput] = useState('')
  const [pwError, setPwError] = useState('')

  const [tab, setTab] = useState('home')
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS)
  const [guests, setGuests] = useState<Guest[]>(DEFAULT_GUESTS)
  const [budget, setBudget] = useState<BudgetItem[]>(DEFAULT_BUDGET)
  const [tables, setTables] = useState<TableRow[]>(DEFAULT_TABLES)

  const [newTask, setNewTask] = useState('')
  const [newGuest, setNewGuest] = useState('')
  const [newCat, setNewCat] = useState('')
  const [newEst, setNewEst] = useState('')
  const [budgetFilter, setBudgetFilter] = useState('All')

  function checkPassword(e: React.FormEvent) {
    e.preventDefault()
    if (pwInput === '1234') {
      setAuthed(true)
      setPwError('')
    } else {
      setPwError('Contraseña incorrecta')
    }
  }

  function toggleTask(id: string) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function addTask() {
    if (!newTask.trim()) return
    setTasks(prev => [...prev, { id: Date.now().toString(), title: newTask, done: false }])
    setNewTask('')
  }

  function addGuest() {
    if (!newGuest.trim()) return
    setGuests(prev => [...prev, { id: Date.now().toString(), name: newGuest, contact: '', rsvp: 'Pendiente', table_name: null }])
    setNewGuest('')
  }

  function updateGuest(id: string, field: keyof Guest, value: string) {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g))
  }

  function addBudget() {
    if (!newCat.trim()) return
    setBudget(prev => [...prev, { id: Date.now().toString(), category: newCat, estimated: Number(newEst) || 0, paid: 0 }])
    setNewCat(''); setNewEst('')
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background:BG,fontFamily:"'Inter',sans-serif"}}>
        <form onSubmit={checkPassword} style={{background:'white',border:'1px solid #ECE9E4',borderRadius:18,padding:'40px 36px',width:320,textAlign:'center'}}>
          <div style={{fontFamily:F,fontSize:24,fontStyle:'italic',fontWeight:700,color:BLUE,marginBottom:6}}>Vowed</div>
          <p style={{fontSize:12,color:MUTE,marginBottom:24}}>Introduce la contraseña para entrar</p>
          <input
            type="password" value={pwInput} onChange={e=>setPwInput(e.target.value)}
            placeholder="••••" autoFocus
            style={{width:'100%',border:'1px solid #DCE7F4',borderRadius:12,padding:'12px 16px',fontSize:14,outline:'none',textAlign:'center',marginBottom:12}}
          />
          {pwError && <p style={{fontSize:12,color:'#C0594F',marginBottom:12}}>{pwError}</p>}
          <button type="submit" style={{width:'100%',background:BLUE,color:'white',border:'none',borderRadius:12,padding:'12px 0',fontSize:14,cursor:'pointer'}}>
            Entrar
          </button>
        </form>
      </div>
    )
  }

  const totalTasks = tasks.length
  const doneTasks = tasks.filter(t => t.done).length
  const nextTasks = tasks.filter(t => !t.done).slice(0, 3)
  const budgetPaid = budget.reduce((a, b) => a + b.paid, 0)
  const budgetEst = budget.reduce((a, b) => a + b.estimated, 0)
  const confirmedGuests = guests.filter(g => g.rsvp === 'Sí').length

  return (
    <div className="min-h-screen flex" style={{background:BG,fontFamily:"'Inter',sans-serif"}}>

      <aside style={{width:220,background:'white',borderRight:'1px solid #ECE9E4',padding:'20px 14px',display:'flex',flexDirection:'column'}}>
        <div className="flex items-center gap-2 mb-1" style={{padding:'4px 8px 18px'}}>
          <div style={{width:30,height:30,borderRadius:9,background:'#F4EFE7',display:'flex',alignItems:'center',justifyContent:'center',color:BLUE,fontSize:15}}>♡</div>
          <span style={{fontFamily:F,fontSize:18,fontWeight:600,color:INK}}>Vowed</span>
        </div>

        {NAV_TOP.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} style={{
            display:'flex',alignItems:'center',gap:10,textAlign:'left',padding:'9px 10px',borderRadius:9,border:'none',
            background: tab===n.id ? '#F4F2EE' : 'transparent', color: tab===n.id ? INK : MUTE,
            fontWeight: tab===n.id ? 600 : 400, fontSize:13,cursor:'pointer',marginBottom:1
          }}>
            <Icon name={n.id} />{n.label}
          </button>
        ))}

        <div style={{marginTop:'auto'}}>
          {NAV_BOTTOM.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} style={{
              display:'flex',alignItems:'center',gap:10,textAlign:'left',padding:'9px 10px',borderRadius:9,border:'none',
              background: tab===n.id ? '#F4F2EE' : 'transparent', color: tab===n.id ? INK : MUTE,
              fontWeight: tab===n.id ? 600 : 400, fontSize:13,cursor:'pointer',marginBottom:1
            }}>
              <Icon name={n.id} />{n.label}
            </button>
          ))}
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header style={{borderBottom:'1px solid #ECE9E4',padding:'16px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'white'}}>
          <span style={{fontFamily:F,fontSize:17,fontWeight:600,color:INK}}>Nuestra Boda</span>
          <div style={{border:'1px solid #ECE9E4',borderRadius:10,padding:'8px 14px',fontSize:12,color:MUTE,display:'flex',alignItems:'center',gap:8,width:220}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={MUTE} strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>
            Buscar...
          </div>
        </header>

        <main className="flex-1 px-9 py-8 overflow-y-auto">

          {tab === 'home' && (
            <>
              <h1 style={{fontFamily:F,fontSize:30,fontWeight:600,color:INK,marginBottom:4}}>Bienvenidos de nuevo</h1>
              <p style={{fontSize:13,color:MUTE,marginBottom:24}}>Resumen de vuestra planificación</p>

              <div className="grid grid-cols-4 gap-4 mb-8">
                <div style={{background:'white',border:'1px solid #ECE9E4',borderRadius:16,padding:20}}>
                  <div style={{width:34,height:34,borderRadius:9,background:'#F4F2EE',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14}}><Icon name="budget" /></div>
                  <p style={{fontSize:12,color:MUTE,marginBottom:6}}>Presupuesto</p>
                  <p style={{fontFamily:F,fontSize:26,fontWeight:600,color:INK,marginBottom:4}}>{budgetPaid.toLocaleString('es-ES')} €</p>
                  <p style={{fontSize:11,color:MUTE}}>{Math.max(0,budgetEst-budgetPaid).toLocaleString('es-ES')} € restantes</p>
                </div>
                <div style={{background:'white',border:'1px solid #F3D9D9',borderRadius:16,padding:20}}>
                  <div style={{width:34,height:34,borderRadius:9,background:'#FBEEEE',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14,color:'#C0594F'}}><Icon name="todo" /></div>
                  <p style={{fontSize:12,color:MUTE,marginBottom:6}}>Tareas</p>
                  <p style={{fontFamily:F,fontSize:26,fontWeight:600,color:INK,marginBottom:4}}>{doneTasks}/{totalTasks}</p>
                  <p style={{fontSize:11,color:'#C0594F'}}>{nextTasks.length} pendientes</p>
                </div>
                <div style={{background:'white',border:'1px solid #EFE0C2',borderRadius:16,padding:20}}>
                  <div style={{width:34,height:34,borderRadius:9,background:'#FBF3E1',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14,color:'#B8862F'}}><Icon name="guests" /></div>
                  <p style={{fontSize:12,color:MUTE,marginBottom:6}}>Invitados</p>
                  <p style={{fontFamily:F,fontSize:26,fontWeight:600,color:INK,marginBottom:4}}>{guests.length}</p>
                  <p style={{fontSize:11,color:'#B8862F'}}>{guests.filter(g=>g.rsvp==='Pendiente').length} por confirmar</p>
                </div>
                <div style={{background:'white',border:'1px solid #EFE0C2',borderRadius:16,padding:20}}>
                  <div style={{width:34,height:34,borderRadius:9,background:'#FBF3E1',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:14,color:'#B8862F'}}><Icon name="vendors" /></div>
                  <p style={{fontSize:12,color:MUTE,marginBottom:6}}>Mesas</p>
                  <p style={{fontFamily:F,fontSize:26,fontWeight:600,color:INK,marginBottom:4}}>{tables.length}</p>
                </div>
              </div>

              <div style={{background:'white',border:'1px solid #ECE9E4',borderRadius:16,padding:24}}>
                <p style={{fontFamily:F,fontSize:18,fontWeight:600,color:INK,marginBottom:16}}>Acciones rápidas</p>
                <div className="flex gap-3 flex-wrap">
                  <button onClick={()=>setTab('budget')} style={{display:'flex',alignItems:'center',gap:8,border:'1px solid #ECE9E4',borderRadius:10,padding:'10px 16px',background:'white',fontSize:13,color:INK,cursor:'pointer'}}><Icon name="budget" /> Gestionar presupuesto</button>
                  <button onClick={()=>setTab('todo')} style={{display:'flex',alignItems:'center',gap:8,border:'1px solid #ECE9E4',borderRadius:10,padding:'10px 16px',background:'white',fontSize:13,color:INK,cursor:'pointer'}}><Icon name="todo" /> Ver tareas</button>
                  <button onClick={()=>setTab('guests')} style={{display:'flex',alignItems:'center',gap:8,border:'1px solid #ECE9E4',borderRadius:10,padding:'10px 16px',background:'white',fontSize:13,color:INK,cursor:'pointer'}}><Icon name="guests" /> Gestionar invitados</button>
                </div>
              </div>
            </>
          )}

          {tab === 'todo' && (
            <>
              <h1 style={{fontFamily:F,fontSize:26,fontWeight:500,color:INK,marginBottom:4}}>Vuestras tareas</h1>
              <p style={{fontSize:12,color:MUTE,marginBottom:24}}>{doneTasks} de {totalTasks} completadas</p>
              <div className="flex gap-2 mb-5">
                <input value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addTask()} placeholder="Nueva tarea..." style={{flex:1,border:'1px solid #DCE7F4',borderRadius:12,padding:'11px 16px',fontSize:13,outline:'none'}} />
                <button onClick={addTask} style={{background:BLUE,color:'white',border:'none',borderRadius:12,padding:'11px 22px',fontSize:13,cursor:'pointer'}}>Añadir</button>
              </div>
              <div style={{border:'1px solid #EEF2F7',borderRadius:18,overflow:'hidden'}}>
                {tasks.map((t,i) => (
                  <div key={t.id} onClick={()=>toggleTask(t.id)} style={{display:'flex',alignItems:'center',gap:12,padding:'14px 20px',borderBottom: i<tasks.length-1?'1px solid #F0F3F8':'none',cursor:'pointer'}}>
                    <span style={{width:18,height:18,borderRadius:6,flexShrink:0,border:t.done?'none':'1.5px solid #DCE7F4',background:t.done?BLUE:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      {t.done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </span>
                    <span style={{fontSize:13,color:t.done?'#C7D2E0':INK,textDecoration:t.done?'line-through':'none'}}>{t.title}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'guests' && (
            <>
              <h1 style={{fontFamily:F,fontSize:26,fontWeight:500,color:INK,marginBottom:4}}>Invitados</h1>
              <p style={{fontSize:12,color:MUTE,marginBottom:24}}>{guests.length} en la lista · {confirmedGuests} confirmados</p>
              <div className="flex gap-2 mb-5">
                <input value={newGuest} onChange={e=>setNewGuest(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addGuest()} placeholder="Nombre del invitado..." style={{flex:1,border:'1px solid #DCE7F4',borderRadius:12,padding:'11px 16px',fontSize:13,outline:'none'}} />
                <button onClick={addGuest} style={{background:BLUE,color:'white',border:'none',borderRadius:12,padding:'11px 22px',fontSize:13,cursor:'pointer'}}>Añadir</button>
              </div>
              <div style={{border:'1px solid #EEF2F7',borderRadius:18,overflow:'hidden'}}>
                <div style={{display:'grid',gridTemplateColumns:'1.4fr 1.4fr 1fr 1fr',padding:'10px 20px',background:'#FAFBFD',borderBottom:'1px solid #EEF2F7'}}>
                  <span style={{fontSize:10,color:MUTE}}>NOMBRE</span><span style={{fontSize:10,color:MUTE}}>CONTACTO</span><span style={{fontSize:10,color:MUTE}}>MESA</span><span style={{fontSize:10,color:MUTE}}>ASISTENCIA</span>
                </div>
                {guests.map((g,i) => (
                  <div key={g.id} style={{display:'grid',gridTemplateColumns:'1.4fr 1.4fr 1fr 1fr',alignItems:'center',padding:'10px 20px',borderBottom:i<guests.length-1?'1px solid #F0F3F8':'none'}}>
                    <span style={{fontSize:13,color:INK}}>{g.name}</span>
                    <input value={g.contact} onChange={e=>updateGuest(g.id,'contact',e.target.value)} placeholder="Email o teléfono" style={{border:'none',background:'transparent',fontSize:12,color:MUTE,outline:'none'}} />
                    <span style={{fontSize:12,color:g.table_name?INK:'#C7D2E0'}}>{g.table_name || '—'}</span>
                    <select value={g.rsvp} onChange={e=>updateGuest(g.id,'rsvp',e.target.value)} style={{border:'1px solid #EEF2F7',borderRadius:8,padding:'5px 8px',fontSize:11,color:INK,background:'white',outline:'none',width:'fit-content'}}>
                      <option>Pendiente</option><option>Sí</option><option>No</option>
                    </select>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'budget' && (
            <>
              <h1 style={{fontFamily:F,fontSize:26,fontWeight:600,color:INK,marginBottom:18}}>Presupuesto</h1>
              <div className="flex gap-2 mb-5">
                <input value={newCat} onChange={e=>setNewCat(e.target.value)} placeholder="Categoría" style={{flex:1,border:'1px solid #DCE7F4',borderRadius:12,padding:'11px 16px',fontSize:13,outline:'none'}} />
                <input value={newEst} onChange={e=>setNewEst(e.target.value)} type="number" placeholder="Presupuesto €" style={{width:140,border:'1px solid #DCE7F4',borderRadius:12,padding:'11px 16px',fontSize:13,outline:'none'}} />
                <button onClick={addBudget} style={{background:BLUE,color:'white',border:'none',borderRadius:12,padding:'11px 22px',fontSize:13,cursor:'pointer'}}>Añadir</button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {budget.map(b => (
                  <div key={b.id} style={{background:'white',border:'1px solid #ECE9E4',borderRadius:16,padding:18}}>
                    <p style={{fontFamily:F,fontSize:16,fontWeight:500,color:INK,marginBottom:10}}>{b.category}</p>
                    <p style={{fontSize:12,color:MUTE}}>{b.paid.toLocaleString('es-ES')} € de {b.estimated.toLocaleString('es-ES')} €</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'vendors' && (
            <>
              <h1 style={{fontFamily:F,fontSize:26,fontWeight:500,color:INK,marginBottom:4}}>Proveedores</h1>
              <p style={{fontSize:13,color:MUTE,textAlign:'center',padding:'40px 0',border:'1px solid #EEF2F7',borderRadius:18}}>Esta sección estará disponible muy pronto.</p>
            </>
          )}

          {tab === 'seating' && (
            <>
              <h1 style={{fontFamily:F,fontSize:26,fontWeight:500,color:INK,marginBottom:4}}>Mesas</h1>
              <p style={{fontSize:13,color:MUTE,textAlign:'center',padding:'40px 0',border:'1px solid #EEF2F7',borderRadius:18}}>{tables.length} mesas creadas.</p>
            </>
          )}

          {tab === 'invitations' && (
            <>
              <h1 style={{fontFamily:F,fontSize:26,fontWeight:500,color:INK,marginBottom:4}}>Invitaciones</h1>
              <div className="grid grid-cols-2 gap-5">
                {TEMPLATES.map(t => (
                  <div key={t.name} style={{border:'1px solid #EEF2F7',borderRadius:18,overflow:'hidden'}}>
                    <div style={{aspectRatio:'4/3',overflow:'hidden'}}><img src={t.img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
                    <div style={{padding:16,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div><p style={{fontFamily:F,fontSize:15,color:INK}}>{t.name}</p><p style={{fontSize:12,color:MUTE}}>{t.price}</p></div>
                      <button style={{background:BLUE,color:'white',border:'none',borderRadius:999,padding:'9px 20px',fontSize:12,cursor:'pointer'}}>Comprar</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'pricing' && (
            <>
              <h1 style={{fontFamily:F,fontSize:26,fontWeight:600,color:INK,marginBottom:4}}>Precios</h1>
              <div className="grid grid-cols-2 gap-4">
                <div style={{background:'white',border:'1px solid #ECE9E4',borderRadius:16,padding:24}}>
                  <p style={{fontFamily:F,fontSize:20,color:INK,marginBottom:8}}>Organizador</p>
                  <p style={{fontFamily:F,fontSize:32,color:INK,marginBottom:4}}>Gratis</p>
                </div>
                <div style={{background:'white',border:`1px solid ${BLUE}`,borderRadius:16,padding:24}}>
                  <p style={{fontFamily:F,fontSize:20,color:INK,marginBottom:8}}>Plantillas</p>
                  <p style={{fontFamily:F,fontSize:32,color:INK,marginBottom:4}}>Desde 10 €</p>
                </div>
              </div>
            </>
          )}

          {tab === 'settings' && (
            <>
              <h1 style={{fontFamily:F,fontSize:26,fontWeight:600,color:INK,marginBottom:4}}>Ajustes</h1>
              <p style={{fontSize:13,color:MUTE}}>Espacio de pruebas compartido.</p>
            </>
          )}

        </main>
      </div>
    </div>
  )
}
