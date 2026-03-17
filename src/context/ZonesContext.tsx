import { createContext, useContext, useState, useEffect } from "react";
import * as zoneApi from "../api/ZoneApi";
import toast from "react-hot-toast";

type Zone = {
  _id: string;
  code: string;
  name: string;
  isActive: boolean;
};

type Pagination = {
  page: number;
  totalPages: number;
};

// type ZoneContextType = {
//   zones: Zone[];
//   loading: boolean;
//   message: string | null;
//   error: string | null;
//   pagination: Pagination | null;
//   fetchZones: (page?: number) => void;
//   createZone: (data: {
//     code: string;
//     name: string;
//   }) => Promise<void>;

//   updateZone: (
//     id: string,
//     data: {
//       code: string;
//       name: string;
//     }
//   ) => Promise<void>;
//   removeZone: (id: string) => Promise<void>;
// };
type ZoneContextType = {
  zones: Zone[];
  loading: boolean;
  message: string | null;
  error: string | null;
  pagination: Pagination | null;

  fetchZones: (page?: number) => Promise<void>;
  createZone: (data: { code: string; name: string }) => Promise<boolean>;
  updateZone: (id: string, data: { code: string; name: string }) => Promise<boolean>;
  removeZone: (id: string) => Promise<boolean>;
};

const ZoneContext = createContext<ZoneContextType | null>(null);

export const ZoneProvider = ({ children }: any) => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [message, setMessage] = useState<string | null>(null);
const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  

  const fetchZones = async (page = 1) => {
  try {
    setLoading(true);
    setError(null);

    const res = await zoneApi.getZones(page);

    setZones(res.data);
    setPagination(res.pagination);
  } catch (err) {
    setError("Failed to load zones");

  } finally {
    setLoading(false);
  }
};

  
  const removeZone = async (id: string) => {
  try {
    setLoading(true);

    const res = await zoneApi.deleteZone(id);

    setMessage(res.message);
    toast.success(res.message);
    fetchZones();

    return true;
  } catch {
    setError("Failed to delete zone");
    toast.error("Failed to delete zone");

    
    return false;
  } finally {
    setLoading(false);
  }
};

const createZone = async (data: { code: string; name: string }) => {
  try {
    setLoading(true);
    const res = await zoneApi.createZone(data);

    setMessage(res.message);
    toast.success(res.message);
    fetchZones();

    return true;
  } catch (err) {
    setError("Failed to create zone");
    toast.error("Failed to create zone");

    return false;
  } finally {
    setLoading(false);
  }
};



const updateZone = async (
  id: string,
  data: { code: string; name: string }
) => {
  try {
    setLoading(true);

    const res = await zoneApi.updateZone(id, data);

    setMessage(res.message);
    toast.success(res.message);
    fetchZones();

    return true;
  } catch {
    setError("Failed to update zone");
    toast.error("Failed to update zone");
    return false;
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchZones();
  }, []);

  return (
    

    <ZoneContext.Provider
  value={{
    zones,
    loading,
    message,
    error,
    pagination,
    fetchZones,
    createZone,
    updateZone,
    removeZone
  }}
>
  {children}
</ZoneContext.Provider>
  );
};

export const useZoneContext = () => {
  const ctx = useContext(ZoneContext);
  if (!ctx) throw new Error("useZoneContext must be used inside ZoneProvider");
  return ctx;
};