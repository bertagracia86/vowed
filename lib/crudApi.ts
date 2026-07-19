import { supabase } from './supabase'

export function makeApi<T extends { id: string }>(table: string) {
  return {
    async fetch(userId: string): Promise<T[]> {
      const { data, error } = await supabase.from(table).select('*').eq('user_id', userId).order('created_at')
      if (error || !data) return []
      return data.map(({ user_id, created_at, ...rest }: any) => rest) as T[]
    },
    async seed(userId: string, rows: T[]) {
      if (rows.length === 0) return
      await supabase.from(table).insert(rows.map(r => ({ ...r, user_id: userId })))
    },
    async sync(userId: string, rows: T[]) {
      if (rows.length > 0) {
        await supabase.from(table).upsert(rows.map(r => ({ ...r, user_id: userId })))
      }
      const { data } = await supabase.from(table).select('id').eq('user_id', userId)
      const currentIds = new Set(rows.map(r => r.id))
      const staleIds = (data ?? []).map((r: any) => r.id).filter((id: string) => !currentIds.has(id))
      if (staleIds.length > 0) {
        await supabase.from(table).delete().eq('user_id', userId).in('id', staleIds)
      }
    },
  }
}
