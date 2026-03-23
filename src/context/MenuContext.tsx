import React, { createContext, useContext, useState } from "react";
import { MenuItem, MenuQueryParams } from "../types/MenuType";
import * as menuApi from "../api/MenuApi";

interface MenuContextType {
  menu: MenuItem[];
  loading: boolean;
  message: string | null;

  fetchMenu: (params?: MenuQueryParams) => Promise<void>;
  addMenu: (data: any) => Promise<void>;
  updateMenu: (id: string, data: any) => Promise<void>;
  deleteMenu: (id: string) => Promise<void>;

  clearMessage: () => void;
}

export const MenuContext = createContext<MenuContextType | null>(null);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // FETCH
  const fetchMenu = async (params?: MenuQueryParams) => {
    try {
      setLoading(true);
      const res = await menuApi.getMenuItems(params || {});
      setMenu(res.data);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to fetch menu");
    } finally {
      setLoading(false);
    }
  };

  // ADD
  const addMenu = async (data: any) => {
    try {
      setLoading(true);
      const res = await menuApi.addMenuItem(data);
      setMenu(prev => [res.data, ...prev]);
      setMessage(res.message ??"");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE
  const updateMenu = async (id: string, data: any) => {
    try {
      setLoading(true);
      const res = await menuApi.updateMenuItem(id, data);

      setMenu(prev =>
        prev.map(item => (item._id === id ? res.data : item))
      );

      setMessage(res.message ?? "");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deleteMenu = async (id: string) => {
    try {
      setLoading(true);
      const res = await menuApi.deleteMenuItem(id);

      setMenu(prev => prev.filter(item => item._id !== id));

      setMessage(res.message);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const clearMessage = () => setMessage(null);

  return (
    <MenuContext.Provider
      value={{
        menu,
        loading,
        message,
        fetchMenu,
        addMenu,
        updateMenu,
        deleteMenu,
        clearMessage
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

