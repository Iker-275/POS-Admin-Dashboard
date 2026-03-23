import api from "./api";
import {
  GetCustomersResponse,
  GetSingleCustomerResponse,
  CreateCustomerResponse,
  UpdateCustomerResponse,
 
} from "../types/CustomerType";
import { GetCustomerBalanceResponse} from "../types/BalanceTypes"
const BASE = "/customer";

// GET ALL
export const getCustomers = async () => {
  const res = await api.get<GetCustomersResponse>(BASE);
  return res.data;
};

// GET ONE
export const getCustomerById = async (id: string) => {
  const res = await api.get<GetSingleCustomerResponse>(`${BASE}/${id}`);
  return res.data;
};

// CREATE
export const createCustomer = async (payload: {
  name: string;
  phone: string;
  userId?: string;
}) => {
  const res = await api.post<CreateCustomerResponse>(BASE, payload);
  return res.data;
};

// UPDATE
export const updateCustomer = async (
  id: string,
  payload: {
    name?: string;
    phone?: string;
  }
) => {
  const res = await api.put<UpdateCustomerResponse>(
    `${BASE}/${id}`,
    payload
  );
  return res.data;
};

// BALANCES
export const getCustomerBalance = async (params: {
  phone: string;
  onlyUnpaid?: boolean;
}) => {
  const res = await api.get<GetCustomerBalanceResponse>(
    "/order/balance",
    {
      params: {
        phone: params.phone,
        onlyUnpaid: params.onlyUnpaid ?? false
      }
    }
  );
  return res.data;
};