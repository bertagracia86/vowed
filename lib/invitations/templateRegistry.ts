import { InvitationTemplate } from './schema'
import minimal01 from './templates/minimal-01.json'
import elegant01 from './templates/elegant-01.json'

// Static registry for now (repo-bundled JSON). Swapping this for a Supabase
// fetch later requires no change anywhere else — callers only ever use
// getTemplate()/listTemplates().
const TEMPLATES: InvitationTemplate[] = [minimal01, elegant01] as InvitationTemplate[]

export function listTemplates(): InvitationTemplate[] {
  return TEMPLATES
}

export function getTemplate(id: string): InvitationTemplate | undefined {
  return TEMPLATES.find(t => t.id === id)
}
