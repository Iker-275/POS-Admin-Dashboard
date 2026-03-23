import { useContext, useCallback } from "react";
import { CustomerContext } from "../context/CustomerContext";
import {
  CreateCustomerPayload,
  UpdateCustomerPayload
} from "../types/CustomerType";

export const useCustomer = () => {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error("useCustomer must be used within CustomerProvider");
  }

  const {
    customers,
    selectedCustomer,
    balances,
    totals,
    loading,
    message,

    fetchCustomers,
    fetchCustomer,
    createCustomer,
    updateCustomer,
    fetchBalance,

    clearMessage
  } = context;

  const loadCustomers = useCallback(async () => {
    await fetchCustomers();
  }, [fetchCustomers]);

  const loadCustomer = useCallback(async (id: string) => {
    await fetchCustomer(id);
  }, [fetchCustomer]);


const addCustomer = useCallback(async (data: CreateCustomerPayload) => {
  await createCustomer(data);
}, [createCustomer]);

const editCustomer = useCallback(async (id: string, data: UpdateCustomerPayload) => {
  await updateCustomer(id, data);
}, [updateCustomer]);

  const loadBalance = useCallback(
    async (phone: string, onlyUnpaid?: boolean) => {
      await fetchBalance(phone, onlyUnpaid);
    },
    [fetchBalance]
  );

  return {
    customers,
    selectedCustomer,
    balances,
    totals,
    loading,
    message,

    loadCustomers,
    loadCustomer,
    addCustomer,
    editCustomer,
    loadBalance,

    clearMessage
  };
};