import React, { createContext, useContext, useEffect, useState } from "react";
import { DashboardResponse } from "../types/DashboardType";
import { getDashboard } from "../api/DashboardApi";

interface DashboardContextType {
  data: DashboardResponse | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getDashboard();
      setData(res);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        data,
        loading,
        error,
        refresh: fetchDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within DashboardProvider");
  }
  return context;
};