'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const F = "'Cormorant Garamond',serif"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('Email o contraseña incorrectos.'); setLoading(false) }
    else { router.push('/dashboard') }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{background:'linear-gradient(180deg,#EAF1FA 0%,white 40%)',fontFamily:"'Inter',sans-serif"}}>
      <Link href="/" style={{fontFamily:F,fontSize:22,fontStyle:'italic',fontWeight:700,color:'#3D5A80',position:'absolute',top:32,left:40}}>
        Vowed
      </Link>

      <div style={{width:'100%',maxWidth:380}} className="text-center">
        <h1 style={{fontFamily:F,fontSize:32,fontWeight:300,fontStyle:'italic',color:'#2C3E5C',marginBottom:12}}>
          Bienvenidos de nuevo
        </h1>
        <p style={{fontSize:13,color:'#7A93B5',marginBottom:40}}>Continuad donde lo dejasteis.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="email" value={email} onChange={e=>setEmail(e.target.value)} required
            placeholder="vuestro@email.com"
            style={{width:'100%',border:'1px solid #DCE7F4',borderRadius:999,padding:'16px 24px',fontSize:15,outline:'none',textAlign:'center',background:'white'}}
            onFocus={e=>e.target.style.borderColor='#3D5A80'} onBlur={e=>e.target.style.borderColor='#DCE7F4'}
          />
          <input
            type="password" value={password} onChange={e=>setPassword(e.target.value)} required
            placeholder="Contraseña"
            style={{width:'100%',border:'1px solid #DCE7F4',borderRadius:999,padding:'16px 24px',fontSize:15,outline:'none',textAlign:'center',background:'white'}}
            onFocus={e=>e.target.style.borderColor='#3D5A80'} onBlur={e=>e.target.style.borderColor='#DCE7F4'}
          />
          {error && <p style={{fontSize:12,color:'#C0594F'}}>{error}</p>}
          <button
            type="submit" disabled={loading}
            style={{width:'100%',borderRadius:999,padding:'16px 0',border:'none',background:'#3D5A80',color:'white',fontSize:14,fontWeight:500,cursor:'pointer',marginTop:8,opacity:loading?0.6:1}}
          >
            {loading ? 'Accediendo...' : 'Acceder'}
          </button>
        </form>

        <p style={{fontSize:12,color:'#AFC2DC',marginTop:32}}>
          Sin cuenta aún? <Link href="/register" style={{color:'#7A93B5',textDecoration:'underline'}}>Creaos una gratis</Link>
        </p>
      </div>
    </div>
  )
}
