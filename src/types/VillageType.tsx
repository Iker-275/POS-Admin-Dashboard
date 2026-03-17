export interface Village {
  _id: string;
  code: string;
  name: string;
  zoneId: string;
  zoneCode: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: Pagination | null;
}