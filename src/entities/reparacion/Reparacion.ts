import { Timestamp } from '@/plugins/firebase'
import { ClienteData } from '../cliente'
import {
  ReparacionData,
  ReparacionFns,
  ReparacionOptionalData
} from './Reparacion.types'
export class Reparacion implements ReparacionData, ReparacionFns {
  id?: string
  cliente: string | ClienteData
  deviceType: string
  deviceSN: string
  deviceBrand?: string
  deviceModel?: string
  deviceAttach?: string
  details: string
  isReviewed: boolean
  tags: string[]
  receiptDate: Date
  repairedDate?: Date
  deliveredDate?: Date
  cotizacionAdelanto?: boolean
  cotizacionPieza?: number
  cotizacionPiezaUrl?: string
  cotizacionPiezaCosto?: number

  constructor(
    reparacion: ReparacionData = {
      cliente: '',
      deviceType: '',
      deviceSN: Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase(),
      details: '',
      isReviewed: false,
      tags: [],
      receiptDate: new Date()
    }
  ) {
    this.id = reparacion.id
    this.cliente = reparacion.cliente
    this.deviceType = reparacion.deviceType
    this.deviceSN = reparacion.deviceSN
    this.deviceBrand = reparacion.deviceBrand || undefined
    this.deviceModel = reparacion.deviceModel || undefined
    this.deviceAttach = reparacion.deviceAttach || undefined
    this.details = reparacion.details
    this.isReviewed = reparacion.isReviewed
    this.tags = reparacion.tags
    this.receiptDate = this.setterDate(reparacion.receiptDate)
    if (reparacion.repairedDate)
      this.repairedDate = this.setterDate(reparacion.repairedDate)
    if (reparacion.deliveredDate)
      this.deliveredDate = this.setterDate(reparacion.deliveredDate)
    this.cotizacionAdelanto = reparacion.cotizacionAdelanto || undefined
    this.cotizacionPieza = reparacion.cotizacionPieza || undefined
    this.cotizacionPiezaUrl = reparacion.cotizacionPiezaUrl || undefined
    this.cotizacionPiezaCosto = reparacion.cotizacionPiezaCosto || undefined
  }

  public get receiptDatePicker(): string {
    return this.getterDatePicker(this.receiptDate) as string
  }
  public get receiptDateTime(): string {
    return this.getterDateTime(this.receiptDate) as string
  }

  public get repairedDatePicker(): string | undefined {
    return this.getterDatePicker(this.repairedDate)
  }
  public get repairedDateTime(): string | undefined {
    return this.getterDateTime(this.repairedDate)
  }

  public get deliveredDatePicker(): string | undefined {
    return this.getterDatePicker(this.deliveredDate)
  }
  public get deliveredDateTime(): string | undefined {
    return this.getterDateTime(this.deliveredDate)
  }

  private setterDate(date: Date | Timestamp) {
    return date instanceof Date ? date : date.toDate()
  }
  private getterDatePicker(date: Date | undefined): string | undefined {
    if (!date) return
    return date.toISOString().split('T')[0]
  }
  private getterDateTime(date: Date | undefined): string | undefined {
    if (!date) return
    return date.toTimeString().substr(0, 5)
  }
  private localeStringFormat(
    date: Date,
    options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    }
  ): string {
    return date.toLocaleString('es-ES', options)
  }

  dayReceipt(): string {
    return this.localeStringFormat(this.receiptDate)
  }
  dayRepaired(): string {
    if (this.repairedDate) {
      return this.localeStringFormat(this.repairedDate)
    } else return 'Reparación Pendiente'
  }
  dayDelivered(): string {
    if (this.deliveredDate) {
      return this.localeStringFormat(this.deliveredDate)
    } else return 'Entrega Pendiente'
  }
  daysBetweenReceivedAndRepaired(): string | undefined {
    return 'Method not implemented yet'
  }
  daysBetweenRepairedAndDelivered(): string | undefined {
    return 'Method not implemented yet'
  }
  valid(): boolean {
    const keys = Object.keys(this) as Array<keyof ReparacionOptionalData>
    keys.forEach(key => {
      if (this[key] === undefined) delete this[key]
    })
    return this.cliente != ''
  }
}
