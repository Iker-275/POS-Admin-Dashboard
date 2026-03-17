export interface Role {
  _id: string;
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRolePayload {
  name: string;
  description: string;
}

export interface UpdateRolePayload {
  name?: string;
  description?: string;
  active?: boolean;
}

export interface RoleContextType {
  roles: Role[];
  loading: boolean;
  message: string;
  error: string;

  fetchRoles: () => Promise<void>;
  createRole: (data: CreateRolePayload) => Promise<void>;
  updateRole: (id: string, data: UpdateRolePayload) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
}