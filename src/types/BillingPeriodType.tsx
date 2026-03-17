export type BillingStatus = "OPEN" | "CLOSED" | "LOCKED";

export interface BillingPeriod {
  _id: string;
  period: string;
  status: BillingStatus;
  notes: string;

  createdBy: string;

  openedAt: string;
  closedAt?: string;
  lockedAt?: string;

  createdAt: string;
  updatedAt: string;

  deletedAt?: string | null;
}