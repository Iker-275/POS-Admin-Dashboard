export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface OrderFilters extends PaginationParams {
  status?: string;
  customer?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  year?: number;
  month?: number | string;
  week?: number;
}