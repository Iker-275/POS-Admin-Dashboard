

import { useEffect, useState } from "react";
import { customerService } from "../api/CustomerApi";
import { Customer, CustomerFilters, Pagination } from "../types/CustomerType";

interface UseCustomersParams {
  page?: number;
  limit?: number;
  filters?: CustomerFilters;
}

export function useCustomers({
  page = 1,
  limit = 10,
  filters = {},
}: UseCustomersParams) {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const res = await customerService.getCustomers({
        page,
        limit,
        filters,
      });

      setCustomers(res.data);
      setPagination(res.pagination);

    } catch (err: any) {
      setError(err.message || "Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, limit, filters]);

  return {
    customers,
    pagination,
    loading,
    error,
    refresh: fetchCustomers,
  };
}