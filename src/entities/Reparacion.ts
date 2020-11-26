import { Timestamp } from '@/plugins/firebase'
import { ReparacionData, ReparacionFns } from './Reparacion.types'

export class Reparacion implements ReparacionData, ReparacionFns {
  id?: string
  name: string
  phone: string
  deviceType: string
  deviceBrand?: string
  deviceModel?: string
  deviceAttach?: string
  details: string
  isReviewed: boolean
  tags: string[]
  receiptDate: Date | Timestamp
  repairedDate?: Date | Timestamp
  deliveredDate?: Date | Timestamp
  cotizacionAdelanto?: boolean
  cotizacionPieza?: number
  cotizacionPiezaUrl?: string
  cotizacionPiezaCosto?: number

  constructor(reparacion?: ReparacionData) {
    if (reparacion) {
      if (reparacion.id) this.id = reparacion.id
      this.name = reparacion.name
      this.phone = reparacion.phone
      this.deviceType = reparacion.deviceType
      if (reparacion.deviceBrand) this.deviceBrand = reparacion.deviceBrand
      if (reparacion.deviceModel) this.deviceModel = reparacion.deviceModel
      if (reparacion.deviceAttach) this.deviceAttach = reparacion.deviceAttach
      this.details = reparacion.details
      this.isReviewed = reparacion.isReviewed
      this.tags = reparacion.tags
      this.receiptDate = reparacion.receiptDate
      if (reparacion.receiptDate) this.repairedDate = reparacion.repairedDate
      if (reparacion.repairedDate) this.repairedDate = reparacion.repairedDate
      if (reparacion.deliveredDate)
        this.deliveredDate = reparacion.deliveredDate
      if (reparacion.cotizacionAdelanto)
        this.cotizacionAdelanto = reparacion.cotizacionAdelanto
      if (reparacion.cotizacionPieza)
        this.cotizacionPieza = reparacion.cotizacionPieza
      if (reparacion.cotizacionPiezaUrl)
        this.cotizacionPiezaUrl = reparacion.cotizacionPiezaUrl
      if (reparacion.cotizacionPiezaCosto)
        this.cotizacionPiezaCosto = reparacion.cotizacionPiezaCosto
    } else {
      this.name = ''
      this.phone = ''
      this.deviceType = ''
      this.details = ''
      this.isReviewed = false
      this.tags = []
      this.receiptDate = new Date()
    }
  }

  public get receiptDatePicker(): string {
    return this.getterDatePicker(this.receiptDate) as string
  }
  public set receiptDatePicker(date: string) {
    this.receiptDate = this.setterDatePicker(date) as Date
  }
  public get receiptDateTime(): string {
    return this.getterDateTime(this.receiptDate) as string
  }
  public set receiptDateTime(date: string) {
    this.setterDateTime("receiptDate",date)
  }

  public get repairedDatePicker(): string | undefined {
    return this.getterDatePicker(this.repairedDate)
  }
  public set repairedDatePicker(date: string | undefined) {
    this.repairedDate = this.setterDatePicker(date)
  }
  public get repairedDateTime(): string | undefined {
    return this.getterDateTime(this.repairedDate)
  }
  public set repairedDateTime(date: string | undefined) {
    this.setterDateTime("repairedDate",date as string)
  }

  public get deliveredDatePicker(): string | undefined {
    if (this.deliveredDate) return this.getterDatePicker(this.deliveredDate)
  }
  public set deliveredDatePicker(date: string | undefined) {
    this.setterDatePicker('deliveredDate', date as string)
  }
  public get deliveredDateTime(): string | undefined {
    if (this.deliveredDate) return this.getterDateTime(this.deliveredDate)
  }
  public set deliveredDateTime(date: string | undefined) {
    this.setterDateTime("deliveredDate",date as string)
  }



  private getterDatePicker(date: Date | Timestamp | undefined): string | undefined {
    console.log(date)
    if(!date) return

    let parsedDate: Date
    if (date instanceof Date) parsedDate = date
    else parsedDate = date.toDate()
    return parsedDate.toISOString().split('T')[0]
  }
  private setterDatePicker(newDate: string | undefined): Date | undefined {
    if(!newDate) return
      return new Date(`${newDate} ${new Date().toTimeString().substr(0,5)}:00`)
  }
  private getterDateTime(date: Date | Timestamp | undefined): string | undefined {
    if(!date) return
    let parsedDate: Date
    if (date instanceof Date) parsedDate = date
    else parsedDate = date.toDate()
    return parsedDate.toTimeString().substr(0,5)
  }
  private setterDateTime(
    dateRef: string,
    newTime: string = '00:00'
  ) {
    // @ts-ignore we are allowed to write it
    const newParsedDate = new Date(`${this[dateRef+'Picker']} ${newTime}:00`)
    // @ts-ignore we are allowed to write it
    this[dateRef] = newParsedDate
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
    return this.localeStringFormat((this.receiptDate as Timestamp).toDate())
  }
  dayRepaired(): string {
    if (this.repairedDate) {
      return this.localeStringFormat((this.repairedDate as Timestamp).toDate())
    } else return 'Reparación Pendiente'
  }
  dayDelivered(): string {
    if (this.deliveredDate) {
      return this.localeStringFormat((this.deliveredDate as Timestamp).toDate())
    } else return 'Entrega Pendiente'
  }
  daysBetweenReceivedAndRepaired(): string | undefined {
    return 'Method not implemented yet'
  }
  daysBetweenRepairedAndDelivered(): string | undefined {
    return 'Method not implemented yet'
  }
  valid(): boolean {
    return this.name != ''
  }
}
