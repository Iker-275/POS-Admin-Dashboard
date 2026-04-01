
import { useDashboardContext } from "../context/DashboardContext";

export const useDashboard = () => {
  const { data, loading, error, refresh } = useDashboardContext();

  return {
    loading,
    error,
    refresh,
    dashboard: data, // 👈 ADD THIS (so your page works unchanged)
    
    summary: data?.summary,
    monthly: data?.monthly || [],
    recentOrders: data?.recentOrders || [],
    newCustomers: data?.newCustomers || [],
  };
};