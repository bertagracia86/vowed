'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const F = "'Cormorant Garamond',serif"
const M = "'DM Mono',monospace"

const TABS = [
  { id: 'home', label: 'Mi boda' },
  { id: 'checklist', label: 'Tareas' },
  { id: 'vendors', label: 'Proveedores' },
  { id: 'guests', label: 'Invitados' },
  { id: 'budget', label: 'Presupuesto' },
]

function CircleStat({ value, total, label, sub, color = '#C9A84C' }: { value: number, total: number, label: string, sub: string, color?: string }) {
  const pct = total > 0 ? value / total : 0
  const r = 22
  const circ = 2 * Math.PI * r
  return (
    <div style={{background:'white',border:'1px solid #EFEAE3',padding:'22px 20px',display:'flex',alignItems:'center',gap:16,flex:1}}>
      <svg width="52" height="52" viewBox="0 0 52 52" style={{flexShrink:0}}>
        <circle cx="26" cy="26" r={r} fill="none" stroke="#F0EAE0" strokeWidth="4"/>
        <circle cx="26" cy="26" r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ - circ * pct}
          transform="rotate(-90 26 26)" style={{transition:'stroke-dashoffset 0.8s ease'}}/>
      </svg>
      <div>
        <div style={{fontSize:13,fontWeight:500,color:'#1A1A1A'}}>{label}</div>
        <div style={{fontFamily:M,fontSize:11,color:'#AAA',marginTop:2}}>{value} de {total} {sub}</div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const router = useRouter()
  const [tab, setTab] = useState('home')
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUser(data.user)
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', data.user.id).single()
      setProfile(prof)
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
      <div className="min-h-screen flex items-center justify-center" style={{background:'#FAF7F3'}}>
        <div style={{fontFamily:F,fontSize:20,fontWeight:300,letterSpacing:'0.2em',textTransform:'uppercase',color:'#C9A84C'}}>Vowed</div>
      </div>
    )
  }

  const name1 = profile?.name1 || user?.user_metadata?.name1 || 'Vosotros'
  const name2 = profile?.name2 || user?.user_metadata?.name2 || 'Tu pareja'

  let daysLeft = null
  if (profile?.wedding_date) {
    const diff = Math.ceil((new Date(profile.wedding_date).getTime() - Date.now()) / 86400000)
    daysLeft = Math.max(0, diff)
  }

  return (
    <div className="min-h-screen" style={{background:'#FAF7F3',fontFamily:"'Inter',sans-serif"}}>

      {/* TOP NAV */}
      <header style={{background:'white',borderBottom:'1px solid #EFEAE3'}} className="sticky top-0 z-20">
        <div className="flex items-center justify-between px-10 py-4">
          <div style={{fontFamily:F,fontSize:20,fontWeight:300,letterSpacing:'0.2em',textTransform:'uppercase'}}>Vowed</div>
          <button onClick={handleLogout} style={{fontFamily:M,fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase',color:'#AAA',background:'none',border:'none',cursor:'pointer'}}>
            Cerrar sesión
          </button>
        </div>
        <div className="flex gap-8 px-10" style={{borderTop:'1px solid #F5F1EB'}}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding:'14px 0',fontSize:13,fontWeight:500,background:'none',border:'none',cursor:'pointer',
                color: tab===t.id ? '#1A1A1A' : '#AAA',
                borderBottom: tab===t.id ? '2px solid #C9A84C' : '2px solid transparent'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="px-10 py-10 max-w-6xl mx-auto">

        {tab === 'home' && (
          <div>
            {/* HERO CARD */}
            <div style={{
              background:'linear-gradient(135deg,#F3E3DC 0%,#FAF1EA 100%)',
              border:'1px solid #EFE3D8', padding:'40px 44px',
              display:'flex', alignItems:'center', justifyContent:'space-between',
              marginBottom:20
            }}>
              <div>
                <div style={{fontFamily:M,fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:'#C9A84C',marginBottom:10}}>
                  Vuestro espacio privado
                </div>
                <h1 style={{fontFamily:F,fontSize:38,fontWeight:400,fontStyle:'italic',color:'#2A2018'}}>
                  Hola, {name1} & {name2}
                </h1>
                {profile?.wedding_date && (
                  <p style={{fontSize:13,color:'#7A6A5E',marginTop:8}}>
                    {new Date(profile.wedding_date).toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'})}
                  </p>
                )}
              </div>
              {daysLeft !== null && (
                <div style={{textAlign:'center'}}>
                  <div style={{fontFamily:F,fontSize:64,fontWeight:300,color:'#C9A84C',lineHeight:1}}>{daysLeft}</div>
                  <div style={{fontFamily:M,fontSize:10,color:'#9A8A7E',letterSpacing:'0.1em',marginTop:4}}>DÍAS PARA LA BODA</div>
                </div>
              )}
            </div>

            {/* PROGRESS CARDS */}
            <div className="grid grid-cols-4 gap-3 mb-10">
              <CircleStat value={0} total={9} label="Proveedores" sub="contratados" />
              <CircleStat value={0} total={30} label="Tareas" sub="completadas" />
              <CircleStat value={0} total={0} label="Invitados" sub="confirmados" color="#B76E79" />
              <CircleStat value={0} total={Number(profile?.budget || 1)} label="Presupuesto" sub="usado" color="#2A5C45" />
            </div>

            {/* NEXT STEPS */}
            <div className="grid grid-cols-2 gap-5">
              <div style={{background:'white',border:'1px solid #EFEAE3',padding:28}}>
                <div style={{fontFamily:M,fontSize:9,letterSpacing:'0.15em',textTransform:'uppercase',color:'#C9A84C',marginBottom:6}}>Siguiente paso</div>
                <h3 style={{fontFamily:F,fontSize:22,fontWeight:400,marginBottom:10}}>Encontrad el espacio</h3>
                <p style={{fontSize:13,color:'#888',lineHeight:1.7,marginBottom:18}}>El lugar condiciona todo lo demás: fecha, estilo, número de invitados. Empezad por aquí.</p>
                <button onClick={() => setTab('vendors')} style={{fontFamily:M,fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase',background:'#1A1A1A',color:'white',border:'none',padding:'11px 22px',cursor:'pointer'}}>
                  Ver proveedores
                </button>
              </div>
              <div style={{background:'white',border:'1px solid #EFEAE3',padding:28}}>
                <div style={{fontFamily:M,fontSize:9,letterSpacing:'0.15em',textTransform:'uppercase',color:'#C9A84C',marginBottom:6}}>Vuestro equipo</div>
                <h3 style={{fontFamily:F,fontSize:22,fontWeight:400,marginBottom:10}}>Cread vuestro equipo soñado</h3>
                <p style={{fontSize:13,color:'#888',lineHeight:1.7,marginBottom:18}}>Fotógrafo, catering, música. Guardad vuestros favoritos y contactadlos cuando estéis listos.</p>
                <button onClick={() => setTab('checklist')} style={{fontFamily:M,fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase',border:'1px solid #DDD',background:'none',color:'#666',padding:'11px 22px',cursor:'pointer'}}>
                  Ver checklist
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === 'checklist' && (
          <div style={{background:'white',border:'1px solid #EFEAE3',padding:40,textAlign:'center'}}>
            <p style={{fontFamily:F,fontSize:20,fontStyle:'italic',color:'#888'}}>El checklist completo se conecta aquí — dime si quieres que lo integre.</p>
          </div>
        )}
        {tab === 'vendors' && (
          <div style={{background:'white',border:'1px solid #EFEAE3',padding:40,textAlign:'center'}}>
            <p style={{fontFamily:F,fontSize:20,fontStyle:'italic',color:'#888'}}>Proveedores — dime si quieres que lo integre con esta estética.</p>
          </div>
        )}
        {tab === 'guests' && (
          <div style={{background:'white',border:'1px solid #EFEAE3',padding:40,textAlign:'center'}}>
            <p style={{fontFamily:F,fontSize:20,fontStyle:'italic',color:'#888'}}>Invitados — dime si quieres que lo integre con esta estética.</p>
          </div>
        )}
        {tab === 'budget' && (
          <div style={{background:'white',border:'1px solid #EFEAE3',padding:40,textAlign:'center'}}>
            <p style={{fontFamily:F,fontSize:20,fontStyle:'italic',color:'#888'}}>Presupuesto — dime si quieres que lo integre con esta estética.</p>
          </div>
        )}

      </main>
    </div>
  )
}
