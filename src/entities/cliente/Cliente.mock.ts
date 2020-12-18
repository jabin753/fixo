import { Cliente } from './Cliente'
import { ClienteData } from './Cliente.types'

export const mockClientesData = (): ClienteData[] => [
  {
    id: 'n7KYnt8vJjCH8Us6ftDN',
    nombre: 'Juan Pedro',
    correo: 'juanpedro32@gmail.com',
    telefono: '7535321245'
  },
  {
    id: 'bf1LVn1JXoU79FOcOGkZ',
    nombre: 'Hernesto Isidro',
    correo: 'userpc23@hotmail.com',
    telefono: '7531314255'
  }
]

export const mockClientes = (
  data: ClienteData[] = mockClientesData()
): Cliente[] => data.map(cliente => new Cliente(cliente))
