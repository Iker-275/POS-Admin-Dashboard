export interface Dish {
  menuItem: string;
  qty: number;
  priceAtPurchase: number;
  pricePerQty: number;
  currency: string;
  totalAmount: number;
  _id?: string;
}

export interface Order {
  _id: string;
  orderId: number;

  dailyRecordId: string;
  dailyRecordDate: string;

  user_id: string;

  dishesOrdered: Dish[];

  orderTotal: number;
  paidAmount: number;
  balance: number;

  fully_paid: boolean;
  partially_paid: boolean;

  status: string;
  paymentStatus: string;

  customer_phone: string;
  customer_name: string;

  createdAt: string;
  updatedAt: string;
}

export interface OrdersTotals {
  totalSales: number;
  confirmedPayments: number;
  pendingPayments: number;
  orderIds: number[];
}

export interface OrdersResponse {
  success: boolean;
  message?: string;

  page: number;
  limit: number;
  totalPages: number;
  totalOrders: number;

  totals: OrdersTotals;
  data: Order[];
}

export interface SingleOrderResponse {
  success: boolean;
  message?: string;
  data: Order;
}

export interface OrderFilters {
  page?: number;
  limit?: number;

  // basic filters
  status?: string;
  customer?: string;

  // date filters
  date?: string; // format: DD-MM-YYYY
  startDate?: string; // ISO or YYYY-MM-DD
  endDate?: string;

  // grouped filters
  year?: number;
  month?: number | string; // supports "January" or 1
  week?: number;
}