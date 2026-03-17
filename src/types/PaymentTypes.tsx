
export interface PaymentCustomer {
  _id: string;
  name: string;
  customerCode?: string;
}

export interface Payment {
  _id: string;
  customerId: PaymentCustomer;
  zoneId: string;
  villageId: string;
  amountCents: number;
  currency: string;
  method: string;
  status: string;
  createdBy?: string;
  reversalOf?: string | null;
  reason?: string;
  receivedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentFilters {
  customerId?: string;
  zoneId?: string;
  villageId?: string;
  method?: string;
  status?: string;
  from?: string;
  to?: string;
  month?: number;
  year?: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
}




