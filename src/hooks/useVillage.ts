import { useContext } from "react";
import { VillageContext } from "../context/VillageContext";

export const useVillage = () => {
  const context = useContext(VillageContext);

  if (!context) {
    throw new Error("useVillage must be used within VillageProvider");
  }

  return context;
};