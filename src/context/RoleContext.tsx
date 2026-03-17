import { createContext, useState, useEffect, ReactNode } from "react";
import { roleApi } from "../api/RoleApi";
import { Role, RoleContextType } from "../types/RoleType";


export const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const RoleProvider = ({ children }: Props) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const res = await roleApi.getRoles();
      setRoles(res.data);
    } catch (err) {
      setError("Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  const createRole = async (data: any) => {
    const res = await roleApi.createRole(data);
    setMessage(res.message);
    fetchRoles();
  };

  const updateRole = async (id: string, data: any) => {
    const res = await roleApi.updateRole(id, data);
    setMessage(res.message);
    fetchRoles();
  };

  const deleteRole = async (id: string) => {
    const res = await roleApi.deleteRole(id);
    setMessage(res.message);
    fetchRoles();
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <RoleContext.Provider
      value={{
        roles,
        loading,
        message,
        error,
        fetchRoles,
        createRole,
        updateRole,
        deleteRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};