import { API_BASE_URL, headers } from "./config";

export const roleApi = {
  getRoles: async () => {
    const res = await fetch(`${API_BASE_URL}/role`);
    return res.json();
  },

  getRole: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/role/${id}`);
    return res.json();
  },

  createRole: async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/role`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateRole: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE_URL}/role/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteRole: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/role/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};