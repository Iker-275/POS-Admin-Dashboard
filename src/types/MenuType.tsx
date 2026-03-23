export interface MenuItem {
  _id: string;
  menuItem: string;
  pricePerQty: number;
  currency: string;
  availableToday: boolean;
  category: string;
  imageUrl: string;
  bestSeller: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuResponse {
  success: boolean;
  message?: string;
}

export interface AddMenuResponse extends MenuResponse {
  data: MenuItem;
}

export interface GetMenuResponse extends MenuResponse {
  count: number;
  page: number;
  limit: number;
  totalPages: number;
  next: boolean;
  data: MenuItem[];
}

export interface UpdateMenuResponse extends MenuResponse {
  data: MenuItem;
}

export interface MenuQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  alphabetical?: "asc" | "desc";
}