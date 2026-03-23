import api from "./api";
import {
  GetStatusesResponse,
  GetSingleStatusResponse,
  CreateStatusResponse,
  UpdateStatusResponse,
  StatusQueryParams
} from "../types/StatusType";

const BASE = "/status";

// GET ALL
export const getStatuses = async (params?: StatusQueryParams) => {
  const res = await api.get<GetStatusesResponse>(BASE, {
    params: params?.visible !== undefined
      ? { visible: params.visible.toString() }
      : {}
  });
  return res.data;
};

// GET ONE
export const getStatusById = async (id: string) => {
  const res = await api.get<GetSingleStatusResponse>(`${BASE}/${id}`);
  return res.data;
};

// CREATE
export const createStatus = async (payload: {
  name: string;
  visibility: boolean;
}) => {
  const res = await api.post<CreateStatusResponse>(BASE, payload);
  return res.data;
};

// UPDATE
export const updateStatus = async (
  id: string,
  payload: { name?: string }
) => {
  const res = await api.put<UpdateStatusResponse>(`${BASE}/${id}`, payload);
  return res.data;
};

// DELETE
export const deleteStatus = async (id: string) => {
  const res = await api.delete(`${BASE}/${id}`);
  return res.data as { success: boolean; message: string };
};

// TOGGLE VISIBILITY
export const toggleStatusVisibility = async (id: string) => {
  const res = await api.patch<UpdateStatusResponse>(`${BASE}/${id}`);
  return res.data;
};