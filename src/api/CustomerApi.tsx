import api from "./api";
import {
  CustomersResponse,
  CustomerResponse,
  CustomerStatementResponse,
  CustomerFilters,
  CreateCustomerPayload,
  UpdateCustomerPayload
} from "../types/CustomerType";

export const customerService = {

  // GET /customer
  async getCustomers(params: {
    page?: number;
    limit?: number;
    filters?: CustomerFilters;
  }): Promise<CustomersResponse> {

    const { page = 1, limit = 10, filters = {} } = params;

    const query: any = {
      page,
      limit,
    };

    // Apply filters
    if (filters.zoneId) query.zoneId = filters.zoneId;
    if (filters.villageId) query.villageId = filters.villageId;
    if (filters.customerCode) query.customerCode = filters.customerCode;
    if (filters.status) query.status = filters.status;
    if (filters.collectorId) query.collectorId = filters.collectorId;

    if (filters.phone) query.phone = filters.phone;
    if (filters.name) query.name = filters.name;

    if (filters.hasBalance !== undefined)
      query.hasBalance = filters.hasBalance;

    if (filters.minBalance)
      query.minBalance = filters.minBalance;

    if (filters.maxBalance)
      query.maxBalance = filters.maxBalance;

    if (filters.dateFrom)
      query.dateFrom = filters.dateFrom;

    if (filters.dateTo)
      query.dateTo = filters.dateTo;

    const res = await api.get("/customer", { params: query });

    return res.data;
  },


  // GET /customer/{id}
  async getCustomer(id: string): Promise<CustomerResponse> {
    const res = await api.get(`/customer/${id}`);
    return res.data;
  },


  // GET /customer/statement/{id}
  async getCustomerStatement(id: string): Promise<CustomerStatementResponse> {
    const res = await api.get(`/customer/statement/${id}`);
    return res.data;
  },


  // POST /customer
  async createCustomer(
    payload: CreateCustomerPayload
  ): Promise<CustomerResponse> {

    const res = await api.post("/customer", payload);

    return res.data;
  },


  // PUT /customer/{id}
  async updateCustomer(
    id: string,
    payload: UpdateCustomerPayload
  ): Promise<CustomerResponse> {

    const res = await api.put(`/customer/${id}`, payload);

    return res.data;
  },


  // DELETE /customer/{id}
  async deleteCustomer(id: string) {
    const res = await api.delete(`/customer/${id}`);
    return res.data;
  },


  // PATCH /customer/{id}/toggle-status
  async toggleCustomerStatus(id: string) {
    const res = await api.patch(`/customer/${id}/toggle-status`);
    return res.data;
  },


  // GET /customer/reports/pdf
  async downloadCustomersReport(filters: CustomerFilters) {

    const res = await api.get("/customer/reports/pdf", {
      params: filters,
      responseType: "blob"
    });

    return res.data;
  },


  // POST /customer/bulk-upload
  async bulkUploadCustomers(file: File) {

    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post(
      "/customer/bulk-upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return res.data;
  }

};