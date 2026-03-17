import { API_BASE_URL, headers } from "./config";

export const userApi = {
  getUsers: async () => {
    const res = await fetch(`${API_BASE_URL}/user`);
    return res.json();
  },

  getUser: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/user/${id}`);
    return res.json();
  },

  updateUser: async (id: string, data: any) => {
    const res = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    return res.json();
  },

  deleteUser: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },

  toggleUser: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/user/${id}/toggle-active`, {
      method: "PATCH",
    });
    return res.json();
  },
};