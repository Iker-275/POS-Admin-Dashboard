

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCustomer } from "../../hooks/useCustomers";
import ComponentCard from "../../components/common/ComponentCard";
import Switch from "../../components/customComponents/Switch";

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    selectedCustomer,
    balances,
    totals,
    loadCustomer,
    loadBalance,
    loading,
    message,
  } = useCustomer();

  const [onlyUnpaid, setOnlyUnpaid] = useState(false);

  useEffect(() => {
    if (id) loadCustomer(id);
  }, [id]);

  useEffect(() => {
    if (selectedCustomer?.phone) {
      loadBalance(selectedCustomer.phone, onlyUnpaid);
    }
  }, [selectedCustomer, onlyUnpaid]);

  if (loading || !selectedCustomer) {
    return <p className="p-4">Loading customer...</p>;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{selectedCustomer.name}</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Back
        </button>
      </div>

      {/* CUSTOMER INFO */}
      <ComponentCard title="Customer Info">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Name:</strong> {selectedCustomer.name}</p>
            <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
          </div>

          <div>
            <p><strong>Status:</strong> {selectedCustomer.active ? "Active" : "Inactive"}</p>
            <p><strong>Created At:</strong> {new Date(selectedCustomer.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </ComponentCard>

      {/* TOTALS */}
      {totals && (
        <ComponentCard title="Totals">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-gray-50 rounded p-2">Total Sales: {totals.totalSales}</div>
            <div className="bg-gray-50 rounded p-2">Paid: {totals.totalPaid}</div>
            <div className="bg-gray-50 rounded p-2">Balance: {totals.totalBalance}</div>
            <div className="bg-gray-50 rounded p-2">Orders: {totals.totalOrders}</div>
          </div>
        </ComponentCard>
      )}

      {/* UNPAID TOGGLE */}
      <ComponentCard title="Filters">
        <Switch
          label="Only Unpaid Balances"
          checked={onlyUnpaid}
          onChange={(value) => setOnlyUnpaid(value)}
        />
      </ComponentCard>

      {/* BALANCES TABLE */}
      <ComponentCard title="Balances">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Paid</th>
                <th className="px-4 py-2 text-left">Balance</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {balances.map((b: any) => (
                <tr key={b._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{b.orderId}</td>
                  <td className="px-4 py-2">{b.orderTotal}</td>
                  <td className="px-4 py-2">{b.paidAmount}</td>
                  <td className="px-4 py-2">{b.balance}</td>
                  <td className="px-4 py-2">{b.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentCard>

      {/* MESSAGE */}
      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
}