import { Timestamp } from '@/plugins/firebase'
import { IReparacion, IReparacionData } from './Reparacion.types'

export class Reparacion implements IReparacion {
  id?: string | undefined
  name: string
  phone: string
  deviceType: string
  details: string
  isReviewed: boolean
  tags: string[]
  receiptDate: Date | Timestamp
  repairedDate?: Date | Timestamp | undefined
  deliveredDate?: Date | Timestamp | undefined

  constructor(reparacion: IReparacionData) {
    if (reparacion.id) this.id = reparacion.id
    this.name = reparacion.name
    this.phone = reparacion.phone
    this.deviceType = reparacion.deviceType
    this.details = reparacion.details
    this.isReviewed = reparacion.isReviewed
    this.tags = reparacion.tags
    this.receiptDate = reparacion.receiptDate
    if (reparacion.receiptDate) this.repairedDate = reparacion.repairedDate
    if (reparacion.repairedDate) this.repairedDate = reparacion.repairedDate
    if (reparacion.deliveredDate) this.deliveredDate = reparacion.deliveredDate
  }

  private localeStringFormat(date: Date, options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit'
  }): string {
    return date.toLocaleString('es-ES',options)
  }

  dayReceipt(): string {
    return this.localeStringFormat((this.receiptDate as Timestamp).toDate())
  }
  dayRepaired(): string {
    if(this.repairedDate) {
      return this.localeStringFormat((this.repairedDate as Timestamp).toDate())
    }
    else return 'Reparación Pendiente'
  }
  dayDelivered(): string {
    if(this.deliveredDate) {
      return this.localeStringFormat((this.deliveredDate as Timestamp).toDate())
    }
    else return 'Entrega Pendiente'
  }
  daysBetweenReceivedAndRepaired(): string | undefined {
    return 'Method not implemented yet'
  }
  daysBetweenRepairedAndDelivered(): string | undefined {
    return 'Method not implemented yet'
  }
}
