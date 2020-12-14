import { Timestamp } from '@/plugins/firebase'
import { ClienteData } from './cliente'

export interface ReparacionOptionalData {
  id?: string
  deviceBrand?: string
  deviceModel?: string
  deviceAttach?: string
  repairedDate?: Date | Timestamp
  deliveredDate?: Date | Timestamp
  cotizacionAdelanto?: boolean
  cotizacionPieza?: number
  cotizacionPiezaUrl?: string
  cotizacionPiezaCosto?: number
}
export interface ReparacionData extends ReparacionOptionalData {
  cliente: string | ClienteData
  deviceType: string
  details: string
  isReviewed: boolean
  tags: string[]
  receiptDate: Date | Timestamp
}

export interface ReparacionFns {
  dayReceipt(): string
  dayRepaired(): string
  dayDelivered(): string
  daysBetweenReceivedAndRepaired(): string | undefined
  daysBetweenRepairedAndDelivered(): string | undefined
  valid(): boolean
}
