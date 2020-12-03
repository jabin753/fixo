export interface ClienteData {
  id?: string
  nombre: string
  telefono?: string
  correo?: string
}
export interface ClienteFns {
  valid(): boolean
}
