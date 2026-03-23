import { CustomerResponse } from "./CustomerType";

export interface DishOrdered {
  menuItem: string;
  qty: number;
  priceAtPurchase: number;
  pricePerQty: number;
  currency: string;
  totalAmount: number;
}

export interface CustomerOrder {
  _id: string;
  orderId: number;
  orderTotal: number;
  paidAmount: number;
  balance: number;
  fully_paid: boolean;
  partially_paid: boolean;
  status: string;
  paymentStatus: string;

  customer_phone: string;
  customer_name: string;

  dishesOrdered: DishOrdered[];

  createdAt: string;
}

export interface CustomerBalanceTotals {
  totalSales: number;
  totalPaid: number;
  totalBalance: number;
  totalOrders: number;
}

export interface GetCustomerBalanceResponse extends CustomerResponse {
  page: number;
  limit: number;
  totalPages: number;
  totalOrders: number;
  totals: CustomerBalanceTotals;
  data: CustomerOrder[];
}