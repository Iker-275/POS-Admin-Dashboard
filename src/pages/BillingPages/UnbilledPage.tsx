import { useState } from "react";

import UnbilledFilters from "../../components/customComponents/UnbilledFilters";
import {UnbilledTable }from "../../components/tables/BasicTables/BasicTableOne";
import PdfPreviewModal from "../../components/customComponents/PDFPreview";

import { useUnbilled } from "../../hooks/useUnbilled";
import { billingService } from "../../api/BillingApi";

export default function UnbilledPage() {

  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const { unbilled, pagination, loading } = useUnbilled({
    page,
    limit: 10,
    filters
  });

  const previewPdf = async () => {

    const blob = await billingService.downloadUnbilledReport(filters);

    const url = URL.createObjectURL(blob);

    setPdfUrl(url);
    setPdfOpen(true);

  };

  return (

    <div className="space-y-6">

      <UnbilledFilters
        filters={filters}
        setFilters={setFilters}
      />

      <UnbilledTable
        unbilled={unbilled}
        loading={loading}
        onPreviewPdf={previewPdf}
      />
     

      <PdfPreviewModal
        open={pdfOpen}
        url={pdfUrl}
        onClose={() => setPdfOpen(false)}
      />

        {/* PAGINATION */}

      {pagination && (

        <div className="flex justify-between items-center">

          <span className="text-sm text-gray-500">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <div className="flex gap-2">

            <button
              disabled={pagination.page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded"
            >
              Prev
            </button>

            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>

          </div>

        </div>

      )}

    </div>

  );
}