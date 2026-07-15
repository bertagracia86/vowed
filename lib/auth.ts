import { supabase } from './supabase'

export interface Session {
  userId: string | null
  email: string
  demo: boolean
}

const SESSION_KEY = 'vowed_session'

async function hashPin(pin: string): Promise<string> {
  const data = new TextEncoder().encode(pin)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(SESSION_KEY)
  return raw ? JSON.parse(raw) : null
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function startDemo(): Session {
  const session: Session = { userId: null, email: '', demo: true }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export async function signIn(email: string, pin: string): Promise<{ session?: Session; error?: string }> {
  const pinHash = await hashPin(pin)
  const { data, error } = await supabase.from('vowed_users').select('id, email, pin_hash').eq('email', email.trim().toLowerCase()).maybeSingle()
  if (error || !data) return { error: 'No existe una cuenta con ese email.' }
  if (data.pin_hash !== pinHash) return { error: 'PIN incorrecto.' }
  const session: Session = { userId: data.id, email: data.email, demo: false }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return { session }
}

export async function signUp(email: string, pin: string): Promise<{ session?: Session; error?: string }> {
  if (!/^\d{4}$/.test(pin)) return { error: 'El PIN debe tener 4 dígitos.' }
  const pinHash = await hashPin(pin)
  const normalizedEmail = email.trim().toLowerCase()
  const { data, error } = await supabase.from('vowed_users').insert({ email: normalizedEmail, pin_hash: pinHash }).select('id, email').single()
  if (error) {
    if (error.code === '23505') return { error: 'Ya existe una cuenta con ese email.' }
    return { error: 'No se pudo crear la cuenta.' }
  }
  const session: Session = { userId: data.id, email: data.email, demo: false }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return { session }
}
