
export interface CreateCustomerPayload {
  name: string;
  phone: string;
}

export interface UpdateCustomerPayload {
  name?: string;
  phone?: string;
}


export interface CustomerFilters {
  name?: string;
  phone?: string;
}


export interface Customer {
  _id: string;
  name: string;
  phone: string;
  active: boolean;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerResponse {
  success: boolean;
  message?: string;
}

export interface GetCustomersResponse extends CustomerResponse {
  count: number;
  data: Customer[];
}

export interface GetSingleCustomerResponse extends CustomerResponse {
  data: Customer;
}

export interface CreateCustomerResponse extends CustomerResponse {
  data?: Customer;
}

export interface UpdateCustomerResponse extends CustomerResponse {
  data?: Customer;
}