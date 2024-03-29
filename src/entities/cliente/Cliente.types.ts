import { ReparacionData } from '../reparacion'

export interface ClienteOptionalData {
  id?: string
  telefono?: string
  correo?: string
  reparaciones?: ReparacionData[]
}
export interface ClienteData extends ClienteOptionalData {
  nombre: string
}
export interface ClienteFns {
  valid(): boolean
}
