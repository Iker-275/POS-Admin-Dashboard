// ================= API =================
// api/PaymentApi.ts

import  api  from "./api";

// const api = new ApiService();

export const paymentService = {
  async getPayments(params:any) {

    const res = await api.get("/payments", { params });

    return res.data;

  },

  async getPayment(id:string) {

    const res = await api.get(`/payments/${id}`);

    return res.data;

  },

  async clearPayment(data:any){

    const res = await api.post("/payments/clear", data);

    return res.data;

  },
   async bulkClear(data:any){

    const res = await api.post("/payments/bulk-clear", data);

    return res.data;

  },

  async cancelPayment(id: string,data:any){

    const res = await api.post(`/payments/${id}/cancel`, data);

    return res.data;

  },

  async getPaymentsPdf(filters:any){

    const res = await api.get("/payments/reports/payments/pdf", {
      params: filters,
      responseType: "blob"
    });

    return res.data;

  }
   
};
