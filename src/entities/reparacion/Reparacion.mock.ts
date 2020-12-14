import { ReparacionData } from './Reparacion.types'
import { all as clientes } from '../cliente'
const reparaciones: Array<ReparacionData> = [
  {
    id: 'n7KYnt8vJjCH8Us6ftFF',
    cliente: clientes[0],
    details: 'Mantenimiento de Xbox',
    deviceSN: 'EUJO324HU2',
    deviceType: 'Consola',
    tags: ['Consola', 'Xbox', 'Mantenimiento'],
    isReviewed: false,
    receiptDate: new Date()
  },
  {
    id: 'bf1LVn1JDDU79FOcOGkZ',
    cliente: clientes[1],
    details: 'Cambiar touch',
    deviceSN: 'SAAJFIE7519',
    deviceType: 'Celular',
    isReviewed: true,
    receiptDate: new Date('2020/12/10'),
    tags: ['Celular', 'Huawei', 'Pantalla'],
    deviceBrand: 'Huawei',
    deviceModel: 'ASDF232',
    deviceAttach: 'Cargador original',
    cotizacionAdelanto: true,
    cotizacionPieza: 300,
    cotizacionPiezaCosto: 500,
    cotizacionPiezaUrl: 'https://www.aliexpress.com/item/4000726400264.html',
    repairedDate: new Date('2020/12/11'),
    deliveredDate: new Date('2020/12/14')
  }
]

export const single = reparaciones[0]
export const all = reparaciones
