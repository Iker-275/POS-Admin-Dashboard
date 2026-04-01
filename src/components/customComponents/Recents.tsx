export function RecentOrders({ orders }: any) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o: any) => (
            <tr key={o._id} className="border-t">
              <td>{o.customer_name || "Walk-in"}</td>

              <td>${o.orderTotal}</td>

              <td>{o.paymentStatus}</td>

              <td>
                {new Date(o.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function NewCustomers({ customers }: any) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <h3 className="text-lg font-semibold mb-4">New Customers</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Name</th>
            <th>Phone</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c: any) => (
            <tr key={c._id} className="border-t">
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>
                {new Date(c.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}