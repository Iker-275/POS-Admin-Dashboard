export default function EcommerceMetrics({ data }: any) {
  const summary = data?.summary;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-6">
      
      <MetricCard title="Orders" value={summary?.totalOrders || 0} />
      <MetricCard title="Customers" value={summary?.totalCustomers || 0} />
      <MetricCard title="Sales" value={`$${summary?.totalSales || 0}`} />
      <MetricCard title="Paid" value={`$${summary?.totalPaid || 0}`} />
      <MetricCard title="Unpaid" value={`$${summary?.totalUnpaid || 0}`} />

    </div>
  );
}


function MetricCard({ title, value }: any) {
  return (
    <div className="rounded-2xl border bg-white p-5 dark:bg-white/[0.03]">
      <p className="text-sm text-gray-500">{title}</p>
      <h4 className="mt-2 text-2xl font-bold">{value}</h4>
    </div>
  );
}