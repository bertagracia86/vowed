'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

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
  timeline: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
  inspiration: <path d="M12 21s-7-4.4-9.5-9C.7 8.3 2.4 4 6.5 4 9 4 11 5.7 12 7c1-1.3 3-3 5.5-3 4.1 0 5.8 4.3 4 8-2.5 4.6-9.5 9-9.5 9z"/>,
  vendors: <><path d="M4 9l8-6 8 6v11a1 1 0 01-1 1H5a1 1 0 01-1-1V9z"/><path d="M9 21V12h6v9"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.97 7.97 0 000-2l2-1.5-2-3.4-2.4.6a8 8 0 00-1.7-1l-.4-2.5H10.1l-.4 2.5a8 8 0 00-1.7 1l-2.4-.6-2 3.4L5.6 11a8 8 0 000 2l-2 1.5 2 3.4 2.4-.6a8 8 0 001.7 1l.4 2.5h3.8l.4-2.5a8 8 0 001.7-1l2.4.6 2-3.4-2-1.5z"/></>,
}

const NAV = [
  { id: 'home', label: 'Dashboard' },
  { id: 'todo', label: 'To-Do' },
  { id: 'budget', label: 'Budget' },
  { id: 'guests', label: 'Guests' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'inspiration', label: 'Inspiration' },
  { id: 'vendors', label: 'Vendors' },
  { id: 'settings', label: 'Settings' },
]

const NEXT_TASKS = ['Reservar el fotógrafo', 'Enviar las invitaciones', 'Confirmar la prueba de menú']

const INSPO_IMGS = [
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=200&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=200&q=80',
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=200&q=80',
  'https://images.unsplash.com/photo-1546032996-6098e9b04e0a?w=200&q=80',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200&q=80',
]

function Icon({ name }: { name: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  )
}

export default function Dashboard() {
  const router = useRouter()
  const [tab, setTab] = useState('home')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUser(data.user)
      setLoading(false)
    })
  }, [router])

  async function handleLogout() {
    const supabase = createClient()
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

  const name1 = user?.user_metadata?.name1 || 'Alex'

  return (
    <div className="min-h-screen flex" style={{background:'#FBFCFE',fontFamily:"'Inter',sans-serif"}}>

      <aside style={{width:190,background:'white',borderRight:'1px solid #EEF2F7',padding:'24px 16px',display:'flex',flexDirection:'column'}}>
        <div style={{fontFamily:F,fontSize:20,fontStyle:'italic',color:BLUE,marginBottom:28}}>vowed</div>
        {NAV.map(n => (
          <button
            key={n.id}
            onClick={() => n.id === 'home' ? setTab(n.id) : null}
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

      <main className="flex-1 px-10 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{fontFamily:F,fontSize:26,fontWeight:500,color:INK}}>Hola, {name1} ♡</h1>
            <p style={{fontSize:12,color:MUTE,marginTop:2}}>Lo estáis haciendo genial</p>
          </div>
          <div className="flex items-center gap-4">
            <div style={{width:34,height:34,borderRadius:'50%',background:'#EAF1FA',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.7"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9zM13.7 21a2 2 0 01-3.4 0"/></svg>
            </div>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" alt="" style={{width:34,height:34,borderRadius:'50%',objectFit:'cover'}}/>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div style={{border:'1px solid #EEF2F7',borderRadius:18,padding:22,textAlign:'center'}}>
            <p style={{fontSize:11,color:MUTE,marginBottom:14}}>Planning Progress</p>
            <svg width="84" height="84" viewBox="0 0 80 80" style={{margin:'0 auto'}}>
              <circle cx="40" cy="40" r="32" fill="none" stroke="#EEF2F7" strokeWidth="7"/>
              <circle cx="40" cy="40" r="32" fill="none" stroke={BLUE} strokeWidth="7" strokeDasharray="201" strokeDashoffset="70" transform="rotate(-90 40 40)"/>
              <text x="40" y="46" textAnchor="middle" style={{fontFamily:F,fontSize:20,fill:INK}}>65%</text>
            </svg>
            <p style={{fontSize:11,color:MUTE,marginTop:10}}>Lleváis más de la mitad</p>
          </div>

          <div style={{border:'1px solid #EEF2F7',borderRadius:18,padding:22}}>
            <p style={{fontSize:11,color:MUTE,marginBottom:12}}>Next Up</p>
            {NEXT_TASKS.map(t => (
              <div key={t} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 0',fontSize:12,color:INK}}>
                <span style={{width:5,height:5,borderRadius:999,background:BLUE,flexShrink:0}}/>
                {t}
              </div>
            ))}
            <p style={{fontSize:11,color:BLUE,marginTop:12,cursor:'pointer'}}>Ver todas las tareas →</p>
          </div>

          <div style={{borderRadius:18,overflow:'hidden',position:'relative'}}>
            <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&q=80" alt="" style={{width:'100%',height:'100%',objectFit:'cover',position:'absolute',inset:0}}/>
            <div style={{position:'absolute',bottom:10,left:10,right:10,background:'white',borderRadius:10,padding:'8px 10px'}}>
              <p style={{fontSize:10,color:INK,fontStyle:'italic',fontFamily:F,lineHeight:1.4}}>Lo mejor que se puede tener en la vida es al otro ♡</p>
            </div>
          </div>
        </div>

        <h2 style={{fontFamily:F,fontSize:17,fontWeight:500,color:INK,marginBottom:12}}>Inspiración para vosotros</h2>
        <div className="grid grid-cols-5 gap-3">
          {INSPO_IMGS.map((src,i) => (
            <div key={i} style={{aspectRatio:'1',borderRadius:12,overflow:'hidden'}}>
              <img src={src} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
