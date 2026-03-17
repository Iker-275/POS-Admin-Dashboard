import axios from "axios";
import { Village, ApiResponse } from "../types/VillageType";
import { API_BASE_URL } from "./config";

const BASE_URL = API_BASE_URL;
  

export const villageApi = {

  getVillages: async (page = 1, limit = 10) => {
    const res = await axios.get<ApiResponse<Village[]>>(
      `${BASE_URL}/village?page=${page}&limit=${limit}`
    );
    return res.data;
  },

  getVillage: async (id: string) => {
    const res = await axios.get<ApiResponse<Village>>(
      `${BASE_URL}/village/${id}`
    );
    return res.data;
  },

  createVillage: async (data: {
    zoneId: string;
    zoneCode: string;
    code: string;
    name: string;
  }) => {
    const res = await axios.post<ApiResponse<Village>>(
      `${BASE_URL}/village`,
      data
    );
    return res.data;
  },

  updateVillage: async (
    id: string,
    data: {
      zoneCode: string;
      code: string;
      name: string;
    }
  ) => {
    const res = await axios.put<ApiResponse<Village>>(
      `${BASE_URL}/village/${id}`,
      data
    );
    return res.data;
  },

  deleteVillage: async (id: string) => {
    const res = await axios.delete<ApiResponse<null>>(
      `${BASE_URL}/village/${id}`
    );
    return res.data;
  },
};