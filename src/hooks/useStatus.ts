import { useContext, useCallback } from "react";
import { StatusContext } from "../context/StatusContext";
import { StatusQueryParams, OrderStatus } from "../types/StatusType";

export const useStatus = () => {
  const context = useContext(StatusContext);

  if (!context) {
    throw new Error("useStatus must be used within StatusProvider");
  }

  const {
    statuses,
    loading,
    message,
    fetchStatuses,
    createStatus,
    updateStatus,
    deleteStatus,
    toggleVisibility,
    clearMessage
  } = context;

  const loadStatuses = useCallback(
    async (params?: StatusQueryParams) => {
      await fetchStatuses(params);
    },
    [fetchStatuses]
  );

  const addStatus = useCallback(
    async (data: { name: string; visibility: boolean }) => {
      await createStatus(data);
    },
    [createStatus]
  );

  const editStatus = useCallback(
    async (id: string, data: { name?: string }) => {
      await updateStatus(id, data);
    },
    [updateStatus]
  );

  const removeStatus = useCallback(
    async (id: string) => {
      await deleteStatus(id);
    },
    [deleteStatus]
  );

  const toggleStatus = useCallback(
    async (id: string) => {
      await toggleVisibility(id);
    },
    [toggleVisibility]
  );

  const getStatusById = useCallback(
    (id: string): OrderStatus | undefined => {
      return statuses.find(s => s._id === id);
    },
    [statuses]
  );

  return {
    statuses,
    loading,
    message,

    loadStatuses,
    addStatus,
    editStatus,
    removeStatus,
    toggleStatus,

    clearMessage,

    getStatusById
  };
};