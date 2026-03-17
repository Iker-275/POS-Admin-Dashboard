// ================= CANCEL MODAL =================
// components/customComponents/CancelPaymentModal.tsx

import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  paymentId: string | null;
  onClose: () => void;
  onConfirm: (data: { paymentId: string; reason: string }) => Promise<any>;
}

export default function CancelPaymentModal({
  open,
  paymentId,
  onClose,
  onConfirm
}: Props) {

  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleCancel = async () => {
    if (!reason || !paymentId) return;
    if (!reason.trim()) {
      alert("Reason is required");
      return;
    }

    try {
      setLoading(true);

      const res = await onConfirm({ paymentId, reason });

      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }

      onClose();
      setReason("");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-[400px] p-6">

        <h2 className="text-lg font-semibold mb-4">
          Cancel Payment
        </h2>

        <textarea
          placeholder="Reason for cancellation"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Close
          </button>

          <button
            onClick={handleCancel}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            {loading ? "Cancelling..." : "Confirm"}
          </button>

        </div>

      </div>

    </div>
  );
}

