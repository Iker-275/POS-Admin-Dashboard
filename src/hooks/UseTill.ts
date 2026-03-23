import { useContext, useCallback } from "react";
import { TillContext } from "../context/TillContext";

export const useTill = () => {
  const context = useContext(TillContext);

  if (!context) {
    throw new Error("useTill must be used within TillProvider");
  }

  const {
    till,
    status,
    loading,
    message,
    fetchTill,
    fetchStatus,
    openTill,
    closeTill,
    reopenTill,
    clearMessage
  } = context;

  const loadTill = useCallback(async () => {
    await fetchTill();
  }, [fetchTill]);

  const loadStatus = useCallback(async () => {
    await fetchStatus();
  }, [fetchStatus]);

  const startTill = useCallback(async () => {
    await openTill();
  }, [openTill]);

  const endTill = useCallback(async () => {
    await closeTill();
  }, [closeTill]);

  const reopen = useCallback(
    async (data: { userId: string; reason: string }) => {
      await reopenTill(data);
    },
    [reopenTill]
  );

  return {
    till,
    status,
    loading,
    message,

    loadTill,
    loadStatus,
    startTill,
    endTill,
    reopen,

    clearMessage
  };
};