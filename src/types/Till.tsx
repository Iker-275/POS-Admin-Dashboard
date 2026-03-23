export interface Till {
  _id: string;
  date: string;

  started: boolean;
  isOpen: boolean;
  closed: boolean;

  time_started: string;
  time_closed: string;

  starting_balance: number;
  closing_balance: number;

  weekOfYear: number;
  month: string;
  year: string;

  totalSales: number;
  confirmedPayments: number;
  pendingPayments: number;

  orderIds: number[];

  reopenedBy: string | null;
  reopenedAt: string | null;
  reopenReason: string;

  createdAt: string;
  updatedAt: string;
}

export interface TillResponse {
  success: boolean;
  message?: string;
}

export interface GetTillResponse extends TillResponse {
  data: Till;
}

export interface TillStatusResponse extends TillResponse {
  exists: boolean;
  status: "open" | "closed" | "not_started";
  tillOpen: boolean;
  record: Till;
}