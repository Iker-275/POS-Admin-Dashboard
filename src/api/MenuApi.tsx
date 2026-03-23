import api from "./api";
import {
  AddMenuResponse,
  GetMenuResponse,
  UpdateMenuResponse,
  MenuQueryParams
} from "../types/MenuType";

const BASE = "/menu";

// ADD MENU
export const addMenuItem = async (payload: {
  menuItem: string;
  pricePerQty: number;
  currency: string;
  availableToday: boolean;
}) => {
  const res = await api.post<AddMenuResponse>(`${BASE}/add`, payload);
  return res.data;
};

// GET MENU
export const getMenuItems = async (params: MenuQueryParams) => {
  const res = await api.get<GetMenuResponse>(BASE, { params });
  return res.data;
};

// UPDATE MENU
export const updateMenuItem = async (
  id: string,
  payload: {
    menuItem: string;
    pricePerQty: number;
    currency: string;
    availableToday: boolean;
  }
) => {
  const res = await api.put<UpdateMenuResponse>(
    `${BASE}/update/${id}`,
    payload
  );
  return res.data;
};

// DELETE MENU
export const deleteMenuItem = async (id: string) => {
  const res = await api.delete(`${BASE}/delete/${id}`);
  return res.data as { success: boolean; message: string };
};