import api from "./api";
import { BillingFiltersType } from "../types/BillingType";

export const billingService = {

  async getBillings(params:any) {

    const res = await api.get("/billing", { params });

    return res.data;

  },

  async getBilling(id:string) {

    const res = await api.get(`/billing/${id}`);

    return res.data;

  },

  async runGlobalBilling(payload:any){

    const res = await api.post("/billing/run", payload);

    return res.data;

  },

  async runZoneBilling(zoneId:string,payload:any){

    const res = await api.post(`/billing/zone/${zoneId}`, payload);

    return res.data;

  },

  async runVillageBilling(villageId:string,payload:any){

    const res = await api.post(`/billing/village/${villageId}`, payload);

    return res.data;

  },

  async manualBillCustomer(customerId:string,payload:any){

    const res = await api.post(`/billing/manual/${customerId}`, payload);

    return res.data;

  },

  async reverseBilling(billingId:string,payload:any){

    const res = await api.post(`/billing/${billingId}/reverse`,payload);

    return res.data;

  },

  async adjustBilling(billingId:string,payload:any){

    const res = await api.post(`/billing/${billingId}/adjust`,payload);

    return res.data;

  },

  async getUnbilled(params:any){

    const res = await api.get("/billing/unbilled",{params});

    return res.data;

  },

  async downloadBillingsReport(filters:BillingFiltersType){

    const res = await api.get("/billing/reports/billings/pdf",{
      params:filters,
      responseType:"blob"
    });

    return res.data;

  },

  async downloadUnbilledReport(filters:any){

    const res = await api.get("/billing/reports/unbilled-customers/pdf",{
      params:filters,
      responseType:"blob"
    });

    return res.data;

  }

}