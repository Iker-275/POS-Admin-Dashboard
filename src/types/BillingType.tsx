export interface BillingCustomer {
  _id: string;
  customerCode: string;
  name: string;
  phone: string;
}

export interface Billing {
  _id: string;

  customerId: BillingCustomer;

  billingPeriod: string;

  previousReading: number;
  currentReading: number;

  unitsConsumed: number;

  ratePerUnit: number;

  amount: number;

  fixedCharges: number;
  penalties: number;

  totalAmount: number;

  billingType: "MANUAL" | "GLOBAL" | "ZONE" | "VILLAGE" | "ADJUSTMENT" | "REVERSAL";

  visitId?: string;

  billedBy: string;

  status: "ACTIVE" | "PAID" | "REVERSED";

  billedAt: string;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface BillingFiltersType {
  customerId?: string;
  customerName?: string;
  billingPeriod?: string;
  billingType?: string;
  status?: string;

  zoneId?: string;
  villageId?: string;
  collectorId?: string;

  minAmount?: number;
  maxAmount?: number;

  unpaidOnly?: boolean;

  dateFrom?: string;
  dateTo?: string;
}

export interface UnbilledCustomer {

  _id: string;

  billingPeriod: string;

  reason: string;

  customerId: {
    _id: string;
    customerCode: string;
    houseNo: string;
    name: string;
    phone: string;

    zoneId?: {
      _id: string;
      name: string;
    };

    villageId?: {
      _id: string;
      name: string;
    };

    balances?: {
      previousBalance: number;
      expectedTotal: number;
      totalPaid: number;
      unpaid: number;
    };
  };

  createdAt: string;
}

export interface UnbilledFilters {

  billingPeriod?: string;

  customerId?: string;

  zoneId?: string;

  villageId?: string;

  reason?: string;

  dateFrom?: string;

  dateTo?: string;
}