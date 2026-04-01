

import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

function buildChartOptions(categories: string[]): ApexOptions {
  return {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#22C55E"], // billed, paid

    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "area",
      height: 310,
      toolbar: { show: false },
    },

    stroke: {
      curve: "smooth",
      width: [2, 2],
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0,
      },
    },

    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },

    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },

    dataLabels: {
      enabled: false,
    },

    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `$${val.toFixed(2)}`,
      },
    },

    xaxis: {
      type: "category",
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    yaxis: {
      labels: {
        formatter: (val: number) => `$${val}`,
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
    },
  };
}



export default function SalesVsPaymentsChart({ data }: any) {
  const monthly = data?.monthly || [];

  const categories = monthly.map((m: any) => m._id);

  const sales = monthly.map((m: any) => m.totalSales);
  const paid = monthly.map((m: any) => m.totalPaid);

  const series = [
    { name: "Sales", data: sales },
    { name: "Paid", data: paid },
  ];

  const options = buildChartOptions(categories);

  return (
    <div className="rounded-2xl border bg-white p-5 dark:bg-white/[0.03]">
      <h3 className="text-lg font-semibold mb-4">
        Sales vs Payments
      </h3>

      <Chart options={options} series={series} type="area" height={310} />
    </div>
  );
}