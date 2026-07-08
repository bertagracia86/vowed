import { Task, Guest, BudgetItem, Vendor, Milestone, TableRow, WeddingInfo } from './types'

export const DEFAULT_TASKS: Task[] = [
  { id: '1', title: 'Definir el presupuesto total', done: true },
  { id: '2', title: 'Elegir la fecha tentativa', done: true },
  { id: '3', title: 'Visitar y reservar el espacio', done: false },
  { id: '4', title: 'Contratar al fotógrafo', done: false },
  { id: '5', title: 'Buscar y contratar catering', done: false },
  { id: '6', title: 'Enviar invitaciones', done: false },
  { id: '7', title: 'Elegir el vestido', done: false },
]

export const DEFAULT_GUESTS: Guest[] = [
  { id: '1', name: 'María García', contact: 'maria@email.com', rsvp: 'Sí', table_name: 'Mesa 1', menu: 'Normal' },
  { id: '2', name: 'Carlos López', contact: '600 123 456', rsvp: 'Sí', table_name: 'Mesa 1', menu: 'Vegetariano' },
  { id: '3', name: 'Ana Martínez', contact: '', rsvp: 'Pendiente', table_name: null, menu: '' },
]

export const DEFAULT_BUDGET: BudgetItem[] = [
  { id: '1', category: 'Catering', estimated: 8000, paid: 3000 },
  { id: '2', category: 'Finca', estimated: 5000, paid: 500 },
  { id: '3', category: 'Fotografía', estimated: 2800, paid: 2800 },
  { id: '4', category: 'Flores', estimated: 1500, paid: 0 },
]

export const DEFAULT_VENDORS: Vendor[] = [
  { id: '1', name: 'Estudio Luz', category: 'Fotografía', contact: 'info@estudioluz.com', status: 'Contratado', budget: 2800, notes: 'Pago pendiente en marzo' },
  { id: '2', name: 'Catering Saborea', category: 'Catering', contact: '91 234 56 78', status: 'Contactado', budget: 8000, notes: 'Degustación el 15 de enero' },
  { id: '3', name: 'Jardines del Rey', category: 'Finca', contact: 'reservas@jardinesdelrey.es', status: 'Contratado', budget: 5000, notes: '' },
]

export const DEFAULT_MILESTONES: Milestone[] = [
  { id: '1', title: 'Reservar la finca', date: '2025-02-01', done: true },
  { id: '2', title: 'Enviar invitaciones', date: '2025-03-15', done: false },
  { id: '3', title: 'Prueba del vestido', date: '2025-04-10', done: false },
  { id: '4', title: 'Confirmar menú con catering', date: '2025-05-01', done: false },
  { id: '5', title: 'Ensayo de la ceremonia', date: '2025-06-14', done: false },
]

export const DEFAULT_TABLES: TableRow[] = [
  { id: '1', name: 'Mesa 1', shape: 'round', capacity: 8 },
  { id: '2', name: 'Mesa 2', shape: 'round', capacity: 8 },
  { id: '3', name: 'Mesa 3', shape: 'rect', capacity: 10 },
]

export const DEFAULT_WEDDING: WeddingInfo = {
  partner1: 'Laura',
  partner2: 'Marcos',
  date: '2025-06-15',
  venue: 'Jardines del Rey, Madrid',
  message: 'Nos casamos y queremos celebrarlo con vosotros. ¡Os esperamos!',
}
