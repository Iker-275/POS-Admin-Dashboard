import { createContext, useState, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";
import { villageApi } from "../api/VillageApi";
import { Village, Pagination } from "../types/VillageType";

type VillageContextType = {
  villages: Village[];
  loading: boolean;
  pagination: Pagination | null;

  fetchVillages: (page?: number) => Promise<void>;
  createVillage: (data: {
    zoneId: string;
    zoneCode: string;
    code: string;
    name: string;
  }) => Promise<boolean>;

  updateVillage: (
    id: string,
    data: {
      zoneCode: string;
      code: string;
      name: string;
    }
  ) => Promise<boolean>;

  deleteVillage: (id: string) => Promise<void>;
};

export const VillageContext = createContext<VillageContextType | null>(null);

export const VillageProvider = ({ children }: { children: ReactNode }) => {
  const [villages, setVillages] = useState<Village[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const fetchVillages = async (page = 1) => {
    try {
      setLoading(true);

      const res = await villageApi.getVillages(page);

      setVillages(res.data);
      setPagination(res.pagination || null);
    } catch (err) {
      toast.error("Failed to fetch villages");
    } finally {
      setLoading(false);
    }
  };

  const createVillage = async (data: {
    zoneId: string;
    zoneCode: string;
    code: string;
    name: string;
  }) => {
    try {
      setLoading(true);

      const res = await villageApi.createVillage(data);

      toast.success(res.message);

      fetchVillages();

      return true;
    } catch (err) {
      toast.error("Failed to create village");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateVillage = async (
    id: string,
    data: {
      zoneCode: string;
      code: string;
      name: string;
    }
  ) => {
    try {
      setLoading(true);

      const res = await villageApi.updateVillage(id, data);

      toast.success(res.message);

      fetchVillages();

      return true;
    } catch (err) {
      toast.error("Failed to update village");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteVillage = async (id: string) => {
    try {
      setLoading(true);

      const res = await villageApi.deleteVillage(id);

      toast.success(res.message);

      setVillages((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      toast.error("Failed to delete village");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVillages();
  }, []);

  return (
    <VillageContext.Provider
      value={{
        villages,
        loading,
        pagination,
        fetchVillages,
        createVillage,
        updateVillage,
        deleteVillage,
      }}
    >
      {children}
    </VillageContext.Provider>
  );
};