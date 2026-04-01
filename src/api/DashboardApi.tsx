import  api  from "./api";

import { DashboardResponse } from "../types/DashboardType";

export const getDashboard = async (): Promise<DashboardResponse> => {
  const res = await api.get("/dashboard");
  return res.data;
};