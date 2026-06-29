'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

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
    if (error) {
      setError('Email o contraseña incorrectos.')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="bg-[#0A0A0A] flex flex-col justify-between p-16">
        <Link href="/" className="font-display text-xl font-light tracking-widest uppercase text-white">
          Vowed
        </Link>
        <div>
          <div className="font-mono-custom text-xs tracking-widest text-[#C9A84C] uppercase mb-6">
            Bienvenidos de nuevo
          </div>
          <h2 className="font-display text-5xl font-light italic text-white leading-tight">
            Continuad donde<br />lo dejasteis.
          </h2>
        </div>
        <div className="font-mono-custom text-xs text-gray-600 tracking-widest">
          VOWED · 2025
        </div>
      </div>

      <div className="flex flex-col justify-center px-20">
        <div className="max-w-sm w-full">
          <div className="font-mono-custom text-xs tracking-widest uppercase text-[#C9A84C] mb-2">
            Acceder
          </div>
          <h1 className="font-display text-3xl font-light italic mb-10">
            Vuestra cuenta
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="font-mono-custom text-xs tracking-widest uppercase text-gray-400 block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="vuestro@email.com"
              />
            </div>
            <div>
              <label className="font-mono-custom text-xs tracking-widest uppercase text-gray-400 block mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="········"
              />
            </div>

            {error && (
              <p className="font-mono-custom text-xs text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-[#0A0A0A] text-white font-mono-custom text-xs tracking-widest uppercase px-8 py-4 hover:bg-gray-900 transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? 'Accediendo...' : 'Acceder'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="font-mono-custom text-xs text-gray-400 tracking-wider">
              Sin cuenta aún?{' '}
              <Link href="/register" className="text-[#C9A84C] hover:underline">
                Creaos una gratis
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
