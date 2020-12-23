import { ReparacionData } from './Reparacion.types'
import { mockClientesData } from '../cliente'
import { Reparacion } from './Reparacion'

export const mockReparacionesData = (): ReparacionData[] => [
  {
    id: 'n7KYnt8vJjCH8Us6ftFF',
    cliente: mockClientesData()[0],
    details: 'Mantenimiento de Xbox',
    deviceSN: 'EUJO324HU2',
    deviceType: 'Consola',
    tags: ['Consola', 'Xbox', 'Mantenimiento'],
    tipo: 'revision',
    isReviewed: false,
    receiptDate: new Date()
  },
  {
    id: 'bf1LVn1JDDU79FOcOGkZ',
    cliente: mockClientesData()[1],
    details: 'Cambiar touch',
    deviceSN: 'SAAJFIE7519',
    deviceType: 'Celular',
    isReviewed: true,
    receiptDate: new Date('2020/12/10'),
    tags: ['Celular', 'Huawei', 'Pantalla'],
    tipo: 'cambioPieza',
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

export const mockReparaciones = (
  data: ReparacionData[] = mockReparacionesData()
): Reparacion[] => data.map(reparacion => new Reparacion(reparacion))
