export interface OrderStatus {
  _id: string;
  name: string;
  visibility: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StatusResponse {
  success: boolean;
  message?: string;
}

export interface GetStatusesResponse extends StatusResponse {
  data: OrderStatus[];
}

export interface GetSingleStatusResponse extends StatusResponse {
  data: OrderStatus;
}

export interface CreateStatusResponse extends StatusResponse {
  data?: OrderStatus; // ⚠️ optional because API may fail without returning data
}

export interface UpdateStatusResponse extends StatusResponse {
  data: OrderStatus;
}

export interface StatusQueryParams {
  visible?: boolean;
}