import { useEffect, useState } from "react";
import { customerService } from "../api/CustomerApi";
import { CustomerStatement } from "../types/StatementType";

export function useCustomerStatement(customerId?: string) {

  const [statement, setStatement] = useState<CustomerStatement | null>(null);

  const [loading, setLoading] = useState(false);

  const fetchStatement = async () => {

    if (!customerId) return;

    try {

      setLoading(true);

      const res = await customerService.getCustomerStatement(customerId);

      setStatement(res.data);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatement();
  }, [customerId]);

  return {
    statement,
    loading,
    refresh: fetchStatement
  };
}