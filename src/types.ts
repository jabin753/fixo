export interface Reparacion {
  name: string;
  phone: string;
  deviceType: string;
  details: string;
  isReviewed: boolean;
  tags: string[];
  receiptDate: Record<string, any>;
  deliveredDate?: Record<string, any>;
}
