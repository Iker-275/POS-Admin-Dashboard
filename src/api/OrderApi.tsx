import api from "./api";
import {
  OrderFilters,
  OrdersResponse,
  SingleOrderResponse
} from "../types/OrderTypes";

const BASE = "/order";


export const getOrders = async (params?: OrderFilters) => {
  const res = await api.get<OrdersResponse>("/order", { params });
  return res.data;
};

export const getOrdersReport = async (filters: OrderFilters) => {

    const res = await api.get("/order/PDFreport", { params: filters, responseType: "blob" });

    return res.data;

  };

// GET SINGLE
export const getOrder = async (id: string) => {
  const res = await api.get<SingleOrderResponse>(`${BASE}/${id}`);
  return res.data;
};

// CREATE
export const createOrder = async (payload: any) => {
  const res = await api.post<SingleOrderResponse>(BASE, payload);
  return res.data;
};

// UPDATE
export const updateOrder = async (id: string, payload: any) => {
  const res = await api.put<SingleOrderResponse>(`${BASE}/${id}`, payload);
  return res.data;
};

// CANCEL
export const cancelOrder = async (id: string) => {
  const res = await api.patch<SingleOrderResponse>(
    `${BASE}/cancel/${id}`
  );
  return res.data;
};

// BULK PAY
export const bulkPayOrders = async (orderIds: number[]) => {
  const res = await api.put(`${BASE}/bulk-pay`, { orderIds });
  return res.data as { success: boolean; message: string };
};

