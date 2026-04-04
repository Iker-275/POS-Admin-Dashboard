import React, { createContext, useState } from "react";
import { Order, OrderFilters, OrdersTotals } from "../types/OrderTypes";
import * as orderApi from "../api/OrderApi";

interface OrderContextType {
  orders: Order[];
  selectedOrder: Order | null;

  totals: OrdersTotals | null;

  page: number;
  totalPages: number;

  loading: boolean;
  message: string | null;

  // fetchOrders: (params?: any) => Promise<void>;
  fetchOrders: (params?: OrderFilters) => Promise<void>;
  fetchOrder: (id: string) => Promise<void>;

  createOrder: (data: any) => Promise<void>;
  updateOrder: (id: string, data: any) => Promise<void>;
  cancelOrder: (id: string) => Promise<void>;
  bulkPay: (orderIds: number[]) => Promise<void>;

  clearMessage: () => void;
}

export const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [totals, setTotals] = useState<OrdersTotals | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // FETCH ORDERS
  const fetchOrders = async (params?: OrderFilters) => {
  try {
    setLoading(true);

    const res = await orderApi.getOrders(params || {});
    

    setOrders(res.data);
    setTotals(res.totals);
    setPage(res.page);
    setTotalPages(res.totalPages);

  } catch (err: any) {
    setMessage(err?.response?.data?.message || "Failed to fetch orders");
  } finally {
    setLoading(false);
  }
};

  // FETCH ONE
  const fetchOrder = async (id: string) => {
    try {
      setLoading(true);
      const res = await orderApi.getOrder(id);
      setSelectedOrder(res.data);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const createNewOrder = async (data: any) => {
    try {
      setLoading(true);
      const res = await orderApi.createOrder(data);

      setOrders(prev => [res.data, ...prev]);
      setMessage(res.message ?? "");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE
  const updateExistingOrder = async (id: string, data: any) => {
    try {
      setLoading(true);
      const res = await orderApi.updateOrder(id, data);

      setOrders(prev =>
        prev.map(o => (o._id === id ? res.data : o))
      );

      setSelectedOrder(res.data);
      setMessage(res.message ?? "");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // CANCEL
  const cancelExistingOrder = async (id: string) => {
    try {
      setLoading(true);
      const res = await orderApi.cancelOrder(id);

      setOrders(prev =>
        prev.map(o => (o._id === id ? res.data : o))
      );

      setMessage(res.message ?? "");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Cancel failed");
    } finally {
      setLoading(false);
    }
  };

  // BULK PAY
  const bulkPay = async (orderIds: number[]) => {
    try {
      setLoading(true);
      const res = await orderApi.bulkPayOrders(orderIds);

      setMessage(res.message);

      // 🔥 refresh after bulk operation
      await fetchOrders();
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Bulk pay failed");
    } finally {
      setLoading(false);
    }
  };

  const clearMessage = () => setMessage(null);

  return (
    <OrderContext.Provider
      value={{
        orders,
        selectedOrder,
        totals,
        page,
        totalPages,
        loading,
        message,
        fetchOrders,
        fetchOrder,
        createOrder: createNewOrder,
        updateOrder: updateExistingOrder,
        cancelOrder: cancelExistingOrder,
        bulkPay,
        clearMessage
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};