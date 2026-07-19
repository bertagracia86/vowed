import { create } from 'zustand'
import { InvitationTemplate, ElementOverride, applyOverrides, TemplateElement } from './schema'

interface EditorState {
  template: InvitationTemplate | null
  overrides: Record<string, ElementOverride>
  selectedId: string | null
  dirty: boolean

  loadTemplate: (template: InvitationTemplate, overrides?: Record<string, ElementOverride>) => void
  select: (id: string | null) => void
  updateElement: (id: string, patch: ElementOverride) => void
  elements: () => TemplateElement[]
}

export const useInvitationEditor = create<EditorState>((set, get) => ({
  template: null,
  overrides: {},
  selectedId: null,
  dirty: false,

  loadTemplate: (template, overrides = {}) => set({ template, overrides, selectedId: null, dirty: false }),

  select: id => set({ selectedId: id }),

  updateElement: (id, patch) => set(state => ({
    overrides: { ...state.overrides, [id]: { ...state.overrides[id], ...patch } },
    dirty: true,
  })),

  elements: () => {
    const { template, overrides } = get()
    if (!template) return []
    return applyOverrides(template, overrides)
  },
}))
