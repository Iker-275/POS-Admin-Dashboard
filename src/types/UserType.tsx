export interface User {
  _id: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserContextType {
  users: User[];
  loading: boolean;
  message: string;
  error: string;

  fetchUsers: () => Promise<void>;
  updateUser: (id: string, data: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  toggleUser: (id: string) => Promise<void>;
}