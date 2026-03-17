import { API_BASE_URL, headers } from "./config";

export const rateApi = {
  getRates: async () => {
    const res = await fetch(`${API_BASE_URL}/rate`);
    return res.json();
  },

  createRate: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/rate`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteRate: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/rate/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};