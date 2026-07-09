export interface Task {
  id: string
  title: string
  done: boolean
  phase: string
}

export interface Guest {
  id: string
  name: string
  contact: string
  rsvp: 'Pendiente' | 'Sí' | 'No'
  table_name: string | null
  seat: number | null
  menu: string
  group: string
  avoid: string[]
  address: string
  thanked: boolean
  events: string[]
}

export interface BudgetItem {
  id: string
  category: string
  estimated: number
  paid: number
}

export interface Vendor {
  id: string
  name: string
  category: string
  contact: string
  status: 'Buscando' | 'Contactado' | 'Contratado'
  budget: number
  notes: string
}

export interface Milestone {
  id: string
  title: string
  date: string
  done: boolean
}

export interface TableRow {
  id: string
  name: string
  shape: 'round' | 'rect' | 'standing'
  capacity: number
}

export interface WeddingInfo {
  partner1: string
  partner2: string
  date: string
  venue: string
  message: string
}
