export interface DashboardSummary {
  totalOrders: number;
  totalCustomers: number;
  totalSales: number;
  totalPaid: number;
  totalUnpaid: number;
}

export interface MonthlyData {
  _id: string; // month name
  totalSales: number;
  totalPaid: number;
  totalUnpaid: number;
}

export interface DishOrdered {
  menuItem: string;
  qty: number;
  priceAtPurchase: number;
  pricePerQty: number;
  currency: string;
  totalAmount: number;
  _id: string;
}

export interface RecentOrder {
  _id: string;
  orderId: number;
  customer_name: string;
  customer_phone: string;
  orderTotal: number;
  paidAmount: number;
  balance: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  month: string;
  year: string;
  dishesOrdered: DishOrdered[];
}

export interface Customer {
  _id: string;
  name: string;
  phone: string;
  active: boolean;
  userId: string | null;
  createdAt: string;
}

export interface DashboardResponse {
  success: boolean;
  summary: DashboardSummary;
  monthly: MonthlyData[];
  recentOrders: RecentOrder[];
  newCustomers: Customer[];
}