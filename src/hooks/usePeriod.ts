

import { useContext } from "react";
import { BillingPeriodContext } from "../context/BillingPeriodContext";

export const useBillingPeriods = () => {
  const context = useContext(BillingPeriodContext);

  if (!context) {
    throw new Error(
      "useBillingPeriods must be used inside BillingPeriodProvider"
    );
  }

  return context;
};