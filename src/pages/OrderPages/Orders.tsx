import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";

import {OrdersTable} from "../../components/tables/BasicTables/BasicTableOne";
import OrderFilters from "../../components/customComponents/OrderFilters";

import { OrderFilters as OrderFiltersType } from "../../types/OrderTypes";
import OrdersSummaryCards from "../../components/customComponents/OrderSummary";
import { useOrder } from "../../hooks/useOrder";
import { getOrdersReport } from "../../api/OrderApi";
import PdfPreviewModal from "../../components/customComponents/PDFPreview";

export default function OrdersPage() {
     const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
    const {totals}= useOrder();

    


  const [filters, setFilters] = useState<OrderFiltersType>({
    page: 1,
    limit: 10,
  });

  const previewPdf = async () => {
  
      const blob = await getOrdersReport(filters);
  
      const url = URL.createObjectURL(blob);
  
      setPdfUrl(url);
      setPdfOpen(true);
  
    };
  return (
    <>
      <PageMeta title="Orders" description="Manage Orders" />
      <PageBreadcrumb pageTitle="Orders" />

      <div className="space-y-6">

        {/* FILTERS */}
        <ComponentCard title="Filters">
          <OrderFilters filters={filters} setFilters={setFilters} />
        </ComponentCard>
         {/* TOTALS / BALANCES */}
        <OrdersSummaryCards totals={totals} />

        {/* TABLE */}
        <ComponentCard title="Orders">
          <OrdersTable filters={filters} setFilters={setFilters} onPreviewPdf={previewPdf} />
        </ComponentCard>

          <PdfPreviewModal
              open={pdfOpen}
              url={pdfUrl}
              onClose={() => setPdfOpen(false)}
            />

      </div>
    </>
  );
}