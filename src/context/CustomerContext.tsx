import React, { createContext, useState } from "react";
import {
  Customer,
 
} from "../types/CustomerType";
import { CustomerOrder,
  CustomerBalanceTotals} from "../types/BalanceTypes"

import * as customerApi from "../api/CustomerApi";

interface CustomerContextType {
  customers: Customer[];
  selectedCustomer: Customer | null;

  balances: CustomerOrder[];
  totals: CustomerBalanceTotals | null;

  loading: boolean;
  message: string | null;

  fetchCustomers: () => Promise<void>;
  fetchCustomer: (id: string) => Promise<void>;
  createCustomer: (data: any) => Promise<void>;
  updateCustomer: (id: string, data: any) => Promise<void>;
  fetchBalance: (phone: string, onlyUnpaid?: boolean) => Promise<void>;

  clearMessage: () => void;
}

export const CustomerContext = createContext<CustomerContextType | null>(null);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [balances, setBalances] = useState<CustomerOrder[]>([]);
  const [totals, setTotals] = useState<CustomerBalanceTotals | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // FETCH ALL
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await customerApi.getCustomers();
      setCustomers(res.data);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  // FETCH ONE
  const fetchCustomer = async (id: string) => {
    try {
      setLoading(true);
      const res = await customerApi.getCustomerById(id);
      setSelectedCustomer(res.data);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to fetch customer");
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const createNewCustomer = async (data: any) => {
    try {
      setLoading(true);
      const res = await customerApi.createCustomer(data);

      if (res.data) {
        setCustomers(prev => [res.data!, ...prev]);
      }

      setMessage(res.message || "Customer created");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE
  const updateExistingCustomer = async (id: string, data: any) => {
    try {
      setLoading(true);
      const res = await customerApi.updateCustomer(id, data);

      if (res.data) {
        setCustomers(prev =>
          prev.map(c => (c._id === id ? res.data! : c))
        );
        setSelectedCustomer(res.data);
      }

      setMessage(res.message || "Customer updated");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // BALANCE
  const fetchBalance = async (phone: string, onlyUnpaid?: boolean) => {
    try {
      setLoading(true);
      const res = await customerApi.getCustomerBalance({
        phone,
        onlyUnpaid
      });

      setBalances(res.data);
      setTotals(res.totals);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  };

  const clearMessage = () => setMessage(null);

  return (
    <CustomerContext.Provider
      value={{
        customers,
        selectedCustomer,
        balances,
        totals,
        loading,
        message,
        fetchCustomers,
        fetchCustomer,
        createCustomer: createNewCustomer,
        updateCustomer: updateExistingCustomer,
        fetchBalance,
        clearMessage
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};