// components/customComponents/PaymentReceiptModal.tsx

import { useEffect, useState } from "react";
import { paymentService } from "../../api/PaymentApi";

interface Props {
  open: boolean;
  paymentId: string | null;
  onClose: () => void;
}

export default function PaymentReceiptModal({ open, paymentId, onClose }: Props) {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {

    if (!paymentId || !open) return;

    const fetchPayment = async () => {
      try {
        setLoading(true);

        const res = await paymentService.getPayment(paymentId);
        setData(res.data);

      } finally {
        setLoading(false);
      }
    };

    fetchPayment();

  }, [paymentId, open]);

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-[600px] max-h-[90vh] overflow-y-auto p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Payment Receipt</h2>
          <button onClick={onClose}>Close</button>
        </div>

        {loading && (
          <div className="text-center py-10">Loading...</div>
        )}

        {!loading && data && (
          <div className="space-y-6">

            {/* PAYMENT INFO */}

            <div className="border rounded-lg p-4">
              <p><strong>Customer:</strong> {data.payment.customerId?.name}</p>
              <p><strong>Amount:</strong> {data.payment.amountCents}</p>
              <p><strong>Method:</strong> {data.payment.method}</p>
              <p><strong>Status:</strong> {data.payment.status}</p>
              <p><strong>Date:</strong> {new Date(data.payment.receivedAt).toLocaleString()}</p>
            </div>

            {/* ALLOCATIONS */}

            <div>
              <h3 className="font-semibold mb-2">Allocations</h3>

              <table className="min-w-full border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left">Period</th>
                    <th>Units</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>

                  {data.allocations?.map((a: any) => (

                    <tr key={a._id} className="border-t">

                      <td className="px-3 py-2">
                        {a.billingId?.billingPeriod}
                      </td>

                      <td>{a.billingId?.unitsConsumed}</td>

                      <td>{a.billingId?.ratePerUnit}</td>

                      <td className="font-medium">
                        {a.amountCents}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

