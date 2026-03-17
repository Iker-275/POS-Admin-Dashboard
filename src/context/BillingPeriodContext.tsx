
import { createContext, useState, useEffect, ReactNode } from "react";
import { billingPeriodApi } from "../api/BillingPeriodApi";
import { BillingPeriod } from "../types/BillingPeriodType";
import { Pagination } from "../types/Pagination";

export interface BillingPeriodContextType {
  periods: BillingPeriod[];
  pagination: Pagination | null;

  loading: boolean;
  message: string;
  error: string;

  fetchPeriods: (page?: number) => Promise<void>;

  createPeriod: (data: CreateBillingPeriodPayload) => Promise<void>;

  closePeriod: (id: string) => Promise<void>;

  lockPeriod: (id: string) => Promise<void>;

  deletePeriod: (id: string) => Promise<void>;
}

export interface CreateBillingPeriodPayload {
  period: string;
  notes: string;
  userId: string;
}

export const BillingPeriodContext =
  createContext<BillingPeriodContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const BillingPeriodProvider = ({ children }: Props) => {
  const [periods, setPeriods] = useState<BillingPeriod[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const fetchPeriods = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const res = await billingPeriodApi.getPeriods();

      setPeriods(res.data);
      setPagination(res.pagination);
    } catch (err) {
      setError("Failed to fetch billing periods");
    } finally {
      setLoading(false);
    }
  };

  const createPeriod = async (data: CreateBillingPeriodPayload) => {
    try {
      setLoading(true);
      const res = await billingPeriodApi.createPeriod(data);
      setMessage(res.message);
      await fetchPeriods();
    } catch {
      setError("Failed to create billing period");
    } finally {
      setLoading(false);
    }
  };

  const closePeriod = async (id: string) => {
    try {
      setLoading(true);
      const res = await billingPeriodApi.closePeriod(id);
      setMessage(res.message);
      await fetchPeriods();
    } catch {
      setError("Failed to close billing period");
    } finally {
      setLoading(false);
    }
  };

  const lockPeriod = async (id: string) => {
    try {
      setLoading(true);
      const res = await billingPeriodApi.lockPeriod(id);
      setMessage(res.message);
      await fetchPeriods();
    } catch {
      setError("Failed to lock billing period");
    } finally {
      setLoading(false);
    }
  };

  const deletePeriod = async (id: string) => {
    try {
      setLoading(true);
      const res = await billingPeriodApi.deletePeriod(id);
      setMessage(res.message);
      await fetchPeriods();
    } catch {
      setError("Failed to delete billing period");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeriods();
  }, []);

  return (
    <BillingPeriodContext.Provider
      value={{
        periods,
        pagination,
        loading,
        message,
        error,
        fetchPeriods,
        createPeriod,
        closePeriod,
        lockPeriod,
        deletePeriod,
      }}
    >
      {children}
    </BillingPeriodContext.Provider>
  );
};