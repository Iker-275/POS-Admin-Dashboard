import { OrdersTotals } from "../../types/OrderTypes";

interface Props {
  totals: OrdersTotals | null;
}

export default function OrdersSummaryCards({ totals }: Props) {
  if (!totals) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

      {/* TOTAL SALES */}
      <div className="p-4 rounded-xl border bg-white">
        <p className="text-sm text-gray-500">Total Sales</p>
        <h3 className="text-xl font-semibold">
          ${totals.totalSales.toFixed(2)}
        </h3>
      </div>

      {/* CONFIRMED PAYMENTS */}
      <div className="p-4 rounded-xl border bg-white">
        <p className="text-sm text-gray-500">Confirmed Payments</p>
        <h3 className="text-xl font-semibold text-green-600">
          ${totals.confirmedPayments.toFixed(2)}
        </h3>
      </div>

      {/* PENDING PAYMENTS */}
      <div className="p-4 rounded-xl border bg-white">
        <p className="text-sm text-gray-500">Pending Payments</p>
        <h3 className="text-xl font-semibold text-yellow-600">
          ${totals.pendingPayments.toFixed(2)}
        </h3>
      </div>

      {/* ORDERS COUNT */}
      <div className="p-4 rounded-xl border bg-white">
        <p className="text-sm text-gray-500">Orders</p>
        <h3 className="text-xl font-semibold">
          {totals.orderIds?.length || 0}
        </h3>
      </div>

    </div>
  );
}