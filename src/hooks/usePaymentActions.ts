import { paymentService } from "../api/PaymentApi";

export function usePaymentActions() {

  const clearSingle = async (data: any) => {
    const res = await paymentService.clearPayment(data);
    return res;
  };

  const bulkClear = async (data: any) => {
    const res = await paymentService.bulkClear(data);
    return res;
  };

  const cancel = async (id: string, data: any) => {
    const res = await paymentService.cancelPayment(id, data);
    return res;
  };

  const getPdf = async (filters: any) => {
    const res = await paymentService.getPaymentsPdf(filters);
    return res;
  };

  return {
    clearSingle,
    bulkClear,
    cancel,
    getPdf
  };
}
