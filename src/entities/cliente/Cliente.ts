import { ClienteData, ClienteFns, ClienteOptionalData } from '.'
import { ReparacionData } from '../Reparacion.types'

export class Cliente implements ClienteData, ClienteFns {
  id?: string
  nombre: string
  telefono?: string | undefined
  correo?: string | undefined
  reparaciones?: ReparacionData[]
  constructor(
    cliente: ClienteData = {
      nombre: ''
    }
  ) {
    this.id = cliente.id || undefined
    this.nombre = cliente.nombre
    this.telefono = cliente.telefono || undefined
    this.correo = cliente.correo || undefined
    this.reparaciones = cliente.reparaciones || undefined
  }

  valid() {
    const keys = Object.keys(this) as Array<keyof ClienteOptionalData>
    keys.forEach(key => {
      if (this[key] === undefined) delete this[key]
    })
    return this.nombre != ''
  }
}
