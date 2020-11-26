import { Timestamp } from '@/plugins/firebase'

export interface ReparacionData {
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
}

export interface ReparacionFns {
  dayReceipt(): string
  dayRepaired(): string
  dayDelivered(): string
  daysBetweenReceivedAndRepaired(): string | undefined
  daysBetweenRepairedAndDelivered(): string | undefined
  valid(): boolean
}
