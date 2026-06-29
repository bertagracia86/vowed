'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name1, name2 }
      }
    })
    if (error) {
      setError(error.message)
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
            Empezad hoy
          </div>
          <h2 className="font-display text-5xl font-light italic text-white leading-tight">
            Vuestra boda,<br />organizada.
          </h2>
        </div>
        <div className="font-mono-custom text-xs text-gray-600 tracking-widest">
          VOWED · 2025
        </div>
      </div>

      <div className="flex flex-col justify-center px-20">
        <div className="max-w-sm w-full">
          <div className="font-mono-custom text-xs tracking-widest uppercase text-[#C9A84C] mb-2">
            Registro
          </div>
          <h1 className="font-display text-3xl font-light italic mb-10">
            Cread vuestra cuenta
          </h1>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono-custom text-xs tracking-widest uppercase text-gray-400 block mb-2">
                  Tu nombre
                </label>
                <input
                  type="text"
                  value={name1}
                  onChange={e => setName1(e.target.value)}
                  required
                  className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="Laura"
                />
              </div>
              <div>
                <label className="font-mono-custom text-xs tracking-widest uppercase text-gray-400 block mb-2">
                  Tu pareja
                </label>
                <input
                  type="text"
                  value={name2}
                  onChange={e => setName2(e.target.value)}
                  required
                  className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors"
                  placeholder="Marcos"
                />
              </div>
            </div>
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
                minLength={6}
                className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="Mínimo 6 caracteres"
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
              {loading ? 'Creando cuenta...' : 'Crear cuenta gratis'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="font-mono-custom text-xs text-gray-400 tracking-wider">
              Ya tenéis cuenta?{' '}
              <Link href="/login" className="text-[#C9A84C] hover:underline">
                Acceder
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
