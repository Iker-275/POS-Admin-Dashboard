import { useContext } from "react";
import { RateContext } from "../context/RateContext";

export const useRates = () => {
  const context = useContext(RateContext);

  if (!context) {
    throw new Error("useRates must be used within RateProvider");
  }

  return context;
};