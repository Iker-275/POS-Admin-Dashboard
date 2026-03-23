import React, { createContext, useContext, useState } from "react";
import { OrderStatus, StatusQueryParams } from "../types/StatusType";
import * as statusApi from "../api/StatusApi";

interface StatusContextType {
  statuses: OrderStatus[];
  loading: boolean;
  message: string | null;

  fetchStatuses: (params?: StatusQueryParams) => Promise<void>;
  createStatus: (data: { name: string; visibility: boolean }) => Promise<void>;
  updateStatus: (id: string, data: { name?: string }) => Promise<void>;
  deleteStatus: (id: string) => Promise<void>;
  toggleVisibility: (id: string) => Promise<void>;

  clearMessage: () => void;
}

export const StatusContext = createContext<StatusContextType | null>(null);

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [statuses, setStatuses] = useState<OrderStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // FETCH
  const fetchStatuses = async (params?: StatusQueryParams) => {
    try {
      setLoading(true);
      const res = await statusApi.getStatuses(params);
      setStatuses(res.data);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to fetch statuses");
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const createNewStatus = async (data: { name: string; visibility: boolean }) => {
    try {
      setLoading(true);
      const res = await statusApi.createStatus(data);

      if (res.data) {
        setStatuses(prev => [res.data!, ...prev]);
      }

      setMessage(res.message || "Status created");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE
  const updateExistingStatus = async (id: string, data: { name?: string }) => {
    try {
      setLoading(true);
      const res = await statusApi.updateStatus(id, data);

      setStatuses(prev =>
        prev.map(s => (s._id === id ? res.data : s))
      );

      setMessage(res.message ?? "");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const removeStatus = async (id: string) => {
    try {
      setLoading(true);
      const res = await statusApi.deleteStatus(id);

      setStatuses(prev => prev.filter(s => s._id !== id));

      setMessage(res.message);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // TOGGLE VISIBILITY
  const toggleVisibility = async (id: string) => {
    try {
      setLoading(true);
      const res = await statusApi.toggleStatusVisibility(id);

      setStatuses(prev =>
        prev.map(s => (s._id === id ? res.data : s))
      );

      setMessage(res.message ?? "");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Toggle failed");
    } finally {
      setLoading(false);
    }
  };

  const clearMessage = () => setMessage(null);

  return (
    <StatusContext.Provider
      value={{
        statuses,
        loading,
        message,
        fetchStatuses,
        createStatus: createNewStatus,
        updateStatus: updateExistingStatus,
        deleteStatus: removeStatus,
        toggleVisibility,
        clearMessage
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};