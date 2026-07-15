import { supabase } from './supabase'
import { Guest } from './types'

export async function fetchGuests(userId: string): Promise<Guest[]> {
  const { data, error } = await supabase.from('vowed_guests').select('*').eq('user_id', userId).order('created_at')
  if (error || !data) return []
  return data.map((r: any): Guest => ({
    id: r.id,
    name: r.name,
    contact: r.contact ?? '',
    rsvp: r.rsvp ?? 'Pendiente',
    table_name: r.table_name,
    seat: r.seat,
    menu: r.menu ?? '',
    group: r.group ?? '',
    avoid: r.avoid ?? [],
    address: r.address ?? '',
    thanked: r.thanked ?? false,
    events: r.events ?? [],
  }))
}

export async function seedGuests(userId: string, guests: Guest[]) {
  if (guests.length === 0) return
  await supabase.from('vowed_guests').insert(guests.map(g => ({ ...g, user_id: userId })))
}

export async function syncGuests(userId: string, guests: Guest[]) {
  if (guests.length > 0) {
    await supabase.from('vowed_guests').upsert(guests.map(g => ({ ...g, user_id: userId })))
  }
  const { data } = await supabase.from('vowed_guests').select('id').eq('user_id', userId)
  const currentIds = new Set(guests.map(g => g.id))
  const staleIds = (data ?? []).map((r: any) => r.id).filter((id: string) => !currentIds.has(id))
  if (staleIds.length > 0) {
    await supabase.from('vowed_guests').delete().in('id', staleIds)
  }
}
