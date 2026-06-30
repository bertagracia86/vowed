'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const F = "'Cormorant Garamond',serif"
const M = "'DM Mono',monospace"

const PROVIDERS = [
  'Lugares para boda','Fotografía','Vídeo','Música','Catering','Coche de boda',
  'Invitaciones de boda','Detalles de boda','Novia y complementos','Luna de miel',
  'Transporte','Flores y decoración','Animación','Organización','Novio y complementos',
  'Belleza y salud','Joyería','Tartas de boda'
]

export default function Onboarding() {
  const router = useRouter()
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [guests, setGuests] = useState('')
  const [budget, setBudget] = useState('')
  const [city, setCity] = useState('')
  const [weddingDate, setWeddingDate] = useState('')
  const [selected, setSelected] = useState<string[]>(['Lugares para boda','Fotografía','Vídeo','Música','Catering'])
  const [saving, setSaving] = useState(false)

  function toggleProvider(p: string) {
    setSelected(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  async function finish() {
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('profiles').upsert({
        id: user.id,
        name1: name1 || user.user_metadata?.name1 || '',
        name2: name2 || user.user_metadata?.name2 || '',
        wedding_date: weddingDate || null,
        budget,
      })
    }
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen grid grid-cols-[380px_1fr]" style={{fontFamily:"'Inter',sans-serif"}}>

      {/* LEFT - peachy panel */}
      <div style={{background:'linear-gradient(160deg,#F3E3DC 0%,#F8ECE4 100%)'}} className="flex flex-col justify-between p-12 relative overflow-hidden">
        <div style={{fontFamily:F,fontSize:18,fontWeight:300,letterSpacing:'0.2em',textTransform:'uppercase',color:'#3A2E28'}}>Vowed</div>
        <div>
          <h1 style={{fontFamily:F,fontSize:34,fontWeight:400,lineHeight:1.25,color:'#2A2018',marginBottom:16}}>
            Un paso más...<br/>¡y listo!
          </h1>
          <p style={{fontSize:13,color:'#7A6A5E',lineHeight:1.8,maxWidth:260}}>
            Pon a punto vuestro organizador rellenando los datos básicos sobre vuestra boda.
          </p>
        </div>
        <div style={{fontFamily:M,fontSize:9,color:'#9A8A7E',letterSpacing:'0.1em'}}>VOWED · 2025</div>

        <div style={{position:'absolute',bottom:-60,right:-60,width:200,height:200,borderRadius:'50%',border:'1px solid rgba(201,168,76,0.25)'}}/>
        <div style={{position:'absolute',bottom:-20,right:-20,width:120,height:120,borderRadius:'50%',border:'1px solid rgba(201,168,76,0.18)'}}/>
      </div>

      {/* RIGHT - form */}
      <div className="px-20 py-16 overflow-y-auto">
        <div style={{maxWidth:680}}>

          <h2 style={{fontFamily:F,fontSize:26,fontWeight:400,marginBottom:28,color:'#1A1A1A'}}>Sobre nosotros</h2>
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <label style={{fontFamily:M,fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase',color:'#AAA',display:'block',marginBottom:8}}>Yo soy...</label>
              <input value={name1} onChange={e=>setName1(e.target.value)} placeholder="Tu nombre" style={{width:'100%',border:'none',borderBottom:'1px solid #E5E0DA',padding:'8px 0',fontSize:16,outline:'none',background:'transparent'}}
                onFocus={e=>e.target.style.borderBottomColor='#C9A84C'} onBlur={e=>e.target.style.borderBottomColor='#E5E0DA'}/>
            </div>
            <div>
              <label style={{fontFamily:M,fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase',color:'#AAA',display:'block',marginBottom:8}}>Mi pareja es...</label>
              <input value={name2} onChange={e=>setName2(e.target.value)} placeholder="Nombre de tu pareja" style={{width:'100%',border:'none',borderBottom:'1px solid #E5E0DA',padding:'8px 0',fontSize:16,outline:'none',background:'transparent'}}
                onFocus={e=>e.target.style.borderBottomColor='#C9A84C'} onBlur={e=>e.target.style.borderBottomColor='#E5E0DA'}/>
            </div>
          </div>

          <h2 style={{fontFamily:F,fontSize:26,fontWeight:400,marginBottom:28,color:'#1A1A1A'}}>Sobre vuestra boda</h2>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <label style={{fontFamily:M,fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase',color:'#AAA',display:'block',marginBottom:8}}>Fecha de la boda</label>
              <input type="date" value={weddingDate} onChange={e=>setWeddingDate(e.target.value)} style={{width:'100%',border:'none',borderBottom:'1px solid #E5E0DA',padding:'8px 0',fontSize:16,outline:'none',background:'transparent',color:'#1A1A1A'}}
                onFocus={e=>e.target.style.borderBottomColor='#C9A84C'} onBlur={e=>e.target.style.borderBottomColor='#E5E0DA'}/>
            </div>
            <div>
              <label style={{fontFamily:M,fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase',color:'#AAA',display:'block',marginBottom:8}}>Nº de invitados</label>
              <input type="number" value={guests} onChange={e=>setGuests(e.target.value)} placeholder="100" style={{width:'100%',border:'none',borderBottom:'1px solid #E5E0DA',padding:'8px 0',fontSize:16,outline:'none',background:'transparent'}}
                onFocus={e=>e.target.style.borderBottomColor='#C9A84C'} onBlur={e=>e.target.style.borderBottomColor='#E5E0DA'}/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <label style={{fontFamily:M,fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase',color:'#AAA',display:'block',marginBottom:8}}>Presupuesto aproximado (€)</label>
              <input type="number" value={budget} onChange={e=>setBudget(e.target.value)} placeholder="20000" style={{width:'100%',border:'none',borderBottom:'1px solid #E5E0DA',padding:'8px 0',fontSize:16,outline:'none',background:'transparent'}}
                onFocus={e=>e.target.style.borderBottomColor='#C9A84C'} onBlur={e=>e.target.style.borderBottomColor='#E5E0DA'}/>
            </div>
            <div>
              <label style={{fontFamily:M,fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase',color:'#AAA',display:'block',marginBottom:8}}>Población</label>
              <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Ciudad" style={{width:'100%',border:'none',borderBottom:'1px solid #E5E0DA',padding:'8px 0',fontSize:16,outline:'none',background:'transparent'}}
                onFocus={e=>e.target.style.borderBottomColor='#C9A84C'} onBlur={e=>e.target.style.borderBottomColor='#E5E0DA'}/>
            </div>
          </div>

          <h2 style={{fontFamily:F,fontSize:22,fontWeight:400,marginBottom:6,color:'#1A1A1A'}}>Selecciona lo que necesitáis</h2>
          <p style={{fontSize:12,color:'#AAA',marginBottom:24}}>Podéis cambiarlo en cualquier momento.</p>

          <div className="grid grid-cols-3 gap-x-8 gap-y-4 mb-12">
            {PROVIDERS.map(p => (
              <label key={p} className="flex items-center gap-3 cursor-pointer">
                <div style={{
                  width:18,height:18,flexShrink:0,
                  border: selected.includes(p) ? 'none' : '1.5px solid #DDD',
                  background: selected.includes(p) ? '#C9A84C' : 'white',
                  display:'flex',alignItems:'center',justifyContent:'center'
                }}>
                  {selected.includes(p) && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <input type="checkbox" className="hidden" checked={selected.includes(p)} onChange={()=>toggleProvider(p)} />
                <span style={{fontSize:13,color:'#333'}}>{p}</span>
              </label>
            ))}
          </div>

          <button
            onClick={finish}
            disabled={saving}
            style={{
              background:'#1A1A1A',color:'white',border:'none',
              padding:'15px 40px',fontFamily:M,fontSize:11,
              letterSpacing:'0.12em',textTransform:'uppercase',
              cursor:'pointer',opacity:saving?0.6:1
            }}
          >
            {saving ? 'Creando vuestro espacio...' : 'Crear nuestro organizador'}
          </button>
        </div>
      </div>
    </div>
  )
}
