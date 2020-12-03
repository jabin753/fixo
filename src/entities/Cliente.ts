import { ClienteData, ClienteFns } from './Cliente.types'

export class Cliente implements ClienteData, ClienteFns {
  id?: string
  nombre: string
  telefono?: string | undefined
  correo?: string | undefined

  constructor(
    cliente: ClienteData = {
      nombre: ''
    }
  ) {
    this.id = cliente.id || undefined
    this.nombre = cliente.nombre
    this.telefono = cliente.telefono || undefined
    this.correo = cliente.correo || undefined
  }

  valid() {
    return this.nombre != ''
  }
}
