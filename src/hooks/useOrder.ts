import { useContext, useCallback } from "react";
import { OrderContext } from "../context/OrderContext";
import { OrderFilters } from "../types/OrderTypes";

export const useOrder = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrder must be used within OrderProvider");
  }

  const {
    orders,
    selectedOrder,
    totals,
    page,
    totalPages,
    loading,
    message,

    fetchOrders,
    fetchOrder,
    createOrder,
    updateOrder,
    cancelOrder,
    bulkPay,

    clearMessage
  } = context;

 
  const loadOrders = useCallback(async (params?: OrderFilters) => {
  await fetchOrders(params);
}, [fetchOrders]);

  const loadOrder = useCallback(async (id: string) => {
    await fetchOrder(id);
  }, [fetchOrder]);

  const addOrder = useCallback(async (data: any) => {
    await createOrder(data);
  }, [createOrder]);

  const editOrder = useCallback(async (id: string, data: any) => {
    await updateOrder(id, data);
  }, [updateOrder]);

  const cancel = useCallback(async (id: string) => {
    await cancelOrder(id);
  }, [cancelOrder]);

  const bulkPayOrders = useCallback(async (ids: number[]) => {
    await bulkPay(ids);
  }, [bulkPay]);

  return {
    orders,
    selectedOrder,
    totals,
    page,
    totalPages,
    loading,
    message,

    loadOrders,
    loadOrder,
    addOrder,
    editOrder,
    cancel,
    bulkPayOrders,

    clearMessage
  };
};