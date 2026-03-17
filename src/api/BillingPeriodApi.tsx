import { API_BASE_URL, headers } from "./config";

export const billingPeriodApi = {
  getPeriods: async () => {
    const res = await fetch(`${API_BASE_URL}/billing-periods`);
    return res.json();
  },

  createPeriod: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/billing-periods`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return res.json();
  },

  closePeriod: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/billing-periods/${id}/close`, {
      method: "PATCH",
    });
    return res.json();
  },

  lockPeriod: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/billing-periods/${id}/lock`, {
      method: "PATCH",
    });
    return res.json();
  },

  deletePeriod: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/billing-periods/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};