

import { useEffect, useState } from "react";
import { billingService } from "../api/BillingApi";

export function useUnbilled({ page, limit, filters }: any) {

  const [unbilled, setUnbilled] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {

    try {

      setLoading(true);

      const res = await billingService.getUnbilled({
        page,
        limit,
        ...filters
      });

      setUnbilled(res.data);
      setPagination(res.pagination);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchData();
  }, [page, JSON.stringify(filters)]);

  return {
    unbilled,
    pagination,
    loading
  };
}