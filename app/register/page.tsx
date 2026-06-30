'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const F = "'Cormorant Garamond',serif"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { name1, name2 } }
    })
    if (error) { setError(error.message); setLoading(false) }
    else { router.push('/dashboard') }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{background:'linear-gradient(180deg,#EAF1FA 0%,white 40%)',fontFamily:"'Inter',sans-serif"}}>
      <Link href="/" style={{fontFamily:F,fontSize:22,fontStyle:'italic',fontWeight:700,color:'#3D5A80',position:'absolute',top:32,left:40}}>
        Vowed
      </Link>

      <div style={{width:'100%',maxWidth:380}}>

        {step === 0 && (
          <div className="text-center">
            <h1 style={{fontFamily:F,fontSize:32,fontWeight:300,fontStyle:'italic',color:'#2C3E5C',lineHeight:1.3,marginBottom:12}}>
              ¿Cómo os llamáis?
            </h1>
            <p style={{fontSize:13,color:'#7A93B5',marginBottom:40}}>Solo esto, para empezar.</p>
            <div className="flex flex-col gap-3 mb-8">
              <input
                value={name1} onChange={e=>setName1(e.target.value)}
                placeholder="Tu nombre"
                style={{width:'100%',border:'1px solid #DCE7F4',borderRadius:999,padding:'16px 24px',fontSize:15,outline:'none',textAlign:'center',background:'white'}}
                onFocus={e=>e.target.style.borderColor='#3D5A80'} onBlur={e=>e.target.style.borderColor='#DCE7F4'}
              />
              <input
                value={name2} onChange={e=>setName2(e.target.value)}
                placeholder="Nombre de tu pareja"
                style={{width:'100%',border:'1px solid #DCE7F4',borderRadius:999,padding:'16px 24px',fontSize:15,outline:'none',textAlign:'center',background:'white'}}
                onFocus={e=>e.target.style.borderColor='#3D5A80'} onBlur={e=>e.target.style.borderColor='#DCE7F4'}
              />
            </div>
            <button
              onClick={() => name1 && name2 && setStep(1)}
              disabled={!name1 || !name2}
              style={{
                width:'100%',borderRadius:999,padding:'16px 0',border:'none',
                background: name1 && name2 ? '#3D5A80' : '#E2EBF6',
                color: name1 && name2 ? 'white' : '#AFC2DC',
                fontSize:14,fontWeight:500,cursor: name1 && name2 ? 'pointer' : 'default'
              }}
            >
              Continuar
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="text-center">
            <h1 style={{fontFamily:F,fontSize:32,fontWeight:300,fontStyle:'italic',color:'#2C3E5C',lineHeight:1.3,marginBottom:12}}>
              Y vuestro email
            </h1>
            <p style={{fontSize:13,color:'#7A93B5',marginBottom:40}}>Para guardar todo lo que vayáis organizando.</p>
            <form onSubmit={handleRegister} className="flex flex-col gap-3">
              <input
                type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                placeholder="vuestro@email.com"
                style={{width:'100%',border:'1px solid #DCE7F4',borderRadius:999,padding:'16px 24px',fontSize:15,outline:'none',textAlign:'center',background:'white'}}
                onFocus={e=>e.target.style.borderColor='#3D5A80'} onBlur={e=>e.target.style.borderColor='#DCE7F4'}
              />
              <input
                type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6}
                placeholder="Contraseña"
                style={{width:'100%',border:'1px solid #DCE7F4',borderRadius:999,padding:'16px 24px',fontSize:15,outline:'none',textAlign:'center',background:'white'}}
                onFocus={e=>e.target.style.borderColor='#3D5A80'} onBlur={e=>e.target.style.borderColor='#DCE7F4'}
              />
              {error && <p style={{fontSize:12,color:'#C0594F'}}>{error}</p>}
              <button
                type="submit" disabled={loading}
                style={{width:'100%',borderRadius:999,padding:'16px 0',border:'none',background:'#3D5A80',color:'white',fontSize:14,fontWeight:500,cursor:'pointer',marginTop:8,opacity:loading?0.6:1}}
              >
                {loading ? 'Creando vuestro espacio...' : 'Empezar'}
              </button>
              <button type="button" onClick={() => setStep(0)} style={{background:'none',border:'none',fontSize:12,color:'#AFC2DC',cursor:'pointer',marginTop:4}}>
                Atrás
              </button>
            </form>
          </div>
        )}

        <p style={{textAlign:'center',fontSize:12,color:'#AFC2DC',marginTop:32}}>
          Ya tenéis cuenta? <Link href="/login" style={{color:'#7A93B5',textDecoration:'underline'}}>Acceder</Link>
        </p>
      </div>
    </div>
  )
}
