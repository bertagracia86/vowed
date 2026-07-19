import { supabase } from '@/lib/supabase'
import { ElementOverride } from './schema'

export async function loadDesign(userId: string, templateId: string): Promise<Record<string, ElementOverride>> {
  const { data } = await supabase.from('vowed_invitation_designs').select('overrides').eq('user_id', userId).eq('template_id', templateId).maybeSingle()
  return (data?.overrides as Record<string, ElementOverride>) ?? {}
}

export async function saveDesign(userId: string, templateId: string, overrides: Record<string, ElementOverride>) {
  await supabase.from('vowed_invitation_designs').upsert({ user_id: userId, template_id: templateId, overrides, updated_at: new Date().toISOString() })
}
