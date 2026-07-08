import { Task, Guest, BudgetItem, Vendor, Milestone, TableRow, WeddingInfo } from './types'

export const TASK_PHASES = ['12+ meses antes', '9-11 meses antes', '6-8 meses antes', '3-5 meses antes', '1-2 meses antes', 'Última semana']

export const DEFAULT_TASKS: Task[] = [
  { id: '1', title: 'Definir el presupuesto total', done: true, phase: '12+ meses antes' },
  { id: '2', title: 'Elegir la fecha tentativa', done: true, phase: '12+ meses antes' },
  { id: '3', title: 'Confeccionar la primera lista de invitados', done: false, phase: '12+ meses antes' },
  { id: '4', title: 'Visitar y reservar el espacio', done: false, phase: '9-11 meses antes' },
  { id: '5', title: 'Contratar al fotógrafo', done: false, phase: '9-11 meses antes' },
  { id: '6', title: 'Elegir el vestido', done: false, phase: '9-11 meses antes' },
  { id: '7', title: 'Buscar y contratar catering', done: false, phase: '6-8 meses antes' },
  { id: '8', title: 'Reservar música / DJ', done: false, phase: '6-8 meses antes' },
  { id: '9', title: 'Diseñar y encargar invitaciones', done: false, phase: '3-5 meses antes' },
  { id: '10', title: 'Enviar invitaciones', done: false, phase: '3-5 meses antes' },
  { id: '11', title: 'Confirmar menú con catering', done: false, phase: '1-2 meses antes' },
  { id: '12', title: 'Hacer el plano de mesas', done: false, phase: '1-2 meses antes' },
  { id: '13', title: 'Prueba final del vestido', done: false, phase: '1-2 meses antes' },
  { id: '14', title: 'Confirmar asistencia final con el espacio', done: false, phase: 'Última semana' },
  { id: '15', title: 'Preparar los pagos pendientes a proveedores', done: false, phase: 'Última semana' },
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
