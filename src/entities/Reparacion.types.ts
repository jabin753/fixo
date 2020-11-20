import { Timestamp } from '@/plugins/firebase'

export interface IReparacionData {
  id?: string
  name: string
  phone: string
  deviceType: string
  details: string
  isReviewed: boolean
  tags: string[]
  receiptDate: Date | Timestamp
  repairedDate?: Date | Timestamp
  deliveredDate?: Date | Timestamp
}

export interface IReparacion extends IReparacionData {
  dayReceipt(): string
  dayRepaired(): string
  dayDelivered(): string
  daysPassedBeforeRepaired(): string | undefined
  daysPassedBeforeDelivered(): string | undefined
}
