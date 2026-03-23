import api from "./api";
import {
  GetTillResponse,
  TillStatusResponse
} from "../types/Till";

const BASE = "/sales";

// GET ACTIVE TILL
export const getTodayTill = async () => {
  const res = await api.get<GetTillResponse>(`${BASE}/today`);
  return res.data;
};

// OPEN
export const openTill = async () => {
  const res = await api.post<GetTillResponse>(`${BASE}/open`);
  return res.data;
};

// CLOSE
export const closeTill = async () => {
  const res = await api.post<GetTillResponse>(`${BASE}/close`);
  return res.data;
};

// REOPEN
export const reopenTill = async (payload: {
  userId: string;
  reason: string;
}) => {
  const res = await api.post<GetTillResponse>(
    `${BASE}/today/reopen`,
    payload
  );
  return res.data;
};

// STATUS
export const getTillStatus = async () => {
  const res = await api.get<TillStatusResponse>(
    `${BASE}/today/status`
  );
  return res.data;
};