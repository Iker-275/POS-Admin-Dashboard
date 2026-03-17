import { createContext, useState, useEffect } from "react";
import { rateApi } from "../api/RateApi";

import { Rate, CreateRatePayload } from "../types/RateType";
import { Pagination } from "../types/Pagination";

export interface RateContextType {
  rates: Rate[];
  pagination: Pagination | null;

  loading: boolean;
  message: string;
  error: string;

  fetchRates: (page?: number) => Promise<void>;

  createRate: (data: CreateRatePayload) => Promise<void>;

  deleteRate: (id: string) => Promise<void>;
}





export const RateContext = createContext<RateContextType | null>(null);

export const RateProvider = ({ children }: { children: React.ReactNode }) => {
  const [rates, setRates] = useState<Rate[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchRates = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await rateApi.getRates();

      setRates(res.data);
      setPagination(res.pagination);
    } catch {
      setError("Failed to fetch rates");
    } finally {
      setLoading(false);
    }
  };

  const createRate = async (data: CreateRatePayload) => {
    try {
      setLoading(true);
      const res = await rateApi.createRate(data);

      setMessage(res.message);
      fetchRates();
    } catch {
      setError("Failed to create rate");
    } finally {
      setLoading(false);
    }
  };

  const deleteRate = async (id: string) => {
    try {
      setLoading(true);

      const res = await rateApi.deleteRate(id);

      setMessage(res.message);
      fetchRates();
    } catch {
      setError("Failed to delete rate");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <RateContext.Provider
      value={{
        rates,
        pagination,
        loading,
        message,
        error,
        fetchRates,
        createRate,
        deleteRate,
      }}
    >
      {children}
    </RateContext.Provider>
  );
};

// export const RateContext = createContext<any>(null);

// export const RateProvider = ({ children }: any) => {
//   const [rates, setRates] = useState([]);
//   const [pagination, setPagination] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const fetchRates = async () => {
//     try {
//       setLoading(true);
//       const res = await rateApi.getRates();
//       setRates(res.data);
//       setPagination(res.pagination);
//     } catch {
//       setError("Failed to fetch rates");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createRate = async (data: any) => {
//     const res = await rateApi.createRate(data);
//     setMessage(res.message);
//     fetchRates();
//   };

//   const deleteRate = async (id: string) => {
//     const res = await rateApi.deleteRate(id);
//     setMessage(res.message);
//     fetchRates();
//   };

//   useEffect(() => {
//     fetchRates();
//   }, []);

//   return (
//     <RateContext.Provider
//       value={{
//         rates,
//         pagination,
//         loading,
//         message,
//         error,
//         fetchRates,
//         createRate,
//         deleteRate,
//       }}
//     >
//       {children}
//     </RateContext.Provider>
//   );
// };