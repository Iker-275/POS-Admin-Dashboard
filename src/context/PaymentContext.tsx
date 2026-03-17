import { createContext, useState, } from "react";
import { paymentService } from "../api/PaymentApi";

export const PaymentContext = createContext<any>(null);

export function PaymentProvider({ children }: any) {

  const [payments, setPayments] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchPayments = async (params: any) => {

    try {
      setLoading(true);

      const res = await paymentService.getPayments(params);
      console.log("params set",params);
      

      setPayments(res.data);
      setPagination(res.pagination);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        payments,
        pagination,
        loading,
        fetchPayments
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
