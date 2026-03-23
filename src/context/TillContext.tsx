import React, { createContext, useState } from "react";
import { Till } from "../types/Till";
import * as tillApi from "../api/TillApi";

interface TillContextType {
  till: Till | null;
  status: string | null;

  loading: boolean;
  message: string | null;

  fetchTill: () => Promise<void>;
  openTill: () => Promise<void>;
  closeTill: () => Promise<void>;
  reopenTill: (data: { userId: string; reason: string }) => Promise<void>;
  fetchStatus: () => Promise<void>;

  clearMessage: () => void;
}

export const TillContext = createContext<TillContextType | null>(null);

export const TillProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [till, setTill] = useState<Till | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // GET TODAY TILL
  const fetchTill = async () => {
    try {
      setLoading(true);
      const res = await tillApi.getTodayTill();
      setTill(res.data);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to fetch till");
    } finally {
      setLoading(false);
    }
  };

  // STATUS
  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await tillApi.getTillStatus();

      setStatus(res.status);
      setTill(res.record);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to fetch status");
    } finally {
      setLoading(false);
    }
  };

  // OPEN
  const handleOpenTill = async () => {
    try {
      setLoading(true);
      const res = await tillApi.openTill();

      setTill(res.data);
      setMessage(res.message ?? "");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Open failed");
    } finally {
      setLoading(false);
    }
  };

  // CLOSE
  const handleCloseTill = async () => {
    try {
      setLoading(true);
      const res = await tillApi.closeTill();

      setTill(res.data);
      setMessage(res.message ?? "");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Close failed");
    } finally {
      setLoading(false);
    }
  };

  // REOPEN
  const handleReopenTill = async (data: {
    userId: string;
    reason: string;
  }) => {
    try {
      setLoading(true);
      const res = await tillApi.reopenTill(data);

      setTill(res.data);
      setMessage(res.message ?? "");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Reopen failed");
    } finally {
      setLoading(false);
    }
  };

  const clearMessage = () => setMessage(null);

  return (
    <TillContext.Provider
      value={{
        till,
        status,
        loading,
        message,
        fetchTill,
        fetchStatus,
        openTill: handleOpenTill,
        closeTill: handleCloseTill,
        reopenTill: handleReopenTill,
        clearMessage
      }}
    >
      {children}
    </TillContext.Provider>
  );
};