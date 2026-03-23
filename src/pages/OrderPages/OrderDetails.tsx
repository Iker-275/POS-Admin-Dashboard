import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";

export default function OrderDetailsPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    selectedOrder,
    loadOrder,
    loading,
    message,
  } = useOrder();

  useEffect(() => {
    if (id) {
      loadOrder(id);
    }
  }, [id]);

  if (loading || !selectedOrder) {
    return <p className="p-4">Loading order...</p>;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Order #{selectedOrder.orderId}
        </h2>

        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 border rounded"
        >
          Back
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-4 border p-4 rounded-lg">

        <div>
          <p><strong>Customer:</strong> {selectedOrder.customer_name || "-"}</p>
          <p><strong>Phone:</strong> {selectedOrder.customer_phone || "-"}</p>
        </div>

        <div>
          <p><strong>Status:</strong> {selectedOrder.status}</p>
          <p><strong>Payment:</strong> {selectedOrder.paymentStatus}</p>
        </div>

        <div>
          <p><strong>Total:</strong> ${selectedOrder.orderTotal}</p>
          <p><strong>Paid:</strong> ${selectedOrder.paidAmount}</p>
        </div>

        <div>
          <p><strong>Balance:</strong> ${selectedOrder.balance}</p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(selectedOrder.createdAt).toLocaleString()}
          </p>
        </div>

      </div>

      {/* DISHES */}
      <div className="border rounded-lg p-4">

        <h3 className="font-semibold mb-3">Items</h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">Qty</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Total</th>
            </tr>
          </thead>

          <tbody>
            {selectedOrder.dishesOrdered.map((item: any) => (
              <tr key={item._id} className="border-b">
                <td className="p-2">{item.menuItem}</td>
                <td className="p-2">{item.qty}</td>
                <td className="p-2">${item.pricePerQty}</td>
                <td className="p-2">${item.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* MESSAGE */}
      {message && (
        <p className="text-green-600">{message}</p>
      )}

    </div>
  );
}