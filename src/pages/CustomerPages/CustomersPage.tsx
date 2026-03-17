import { useCustomers } from "../../hooks/useCustomers";
import {CustomersTable} from "../../components/tables/BasicTables/BasicTableOne";
import CustomersFilters from "../../components/customComponents/CustomerFilters";
import { useState } from "react";


// export default function CustomersPage() {

//   const {
//     customers,
//     pagination,
//     loading,
//     filters,
//     setFilters,
//     page,
//     setPage
//   } = useCustomers();

//   return (
//     <div className="space-y-6">

//       <CustomersFilters
//         filters={filters}
//         setFilters={setFilters}
//       />

//       <CustomersTable
//         customers={customers}
//         loading={loading}
//       />

//       {pagination && (
//         <div className="flex justify-end gap-2">

//           <button
//             disabled={!pagination.hasNextPage && page === 1}
//             onClick={() => setPage(page - 1)}
//           >
//             Prev
//           </button>

//           <span>
//             Page {pagination.page} / {pagination.totalPages}
//           </span>

//           <button
//             disabled={!pagination.hasNextPage}
//             onClick={() => setPage(page + 1)}
//           >
//             Next
//           </button>

//         </div>
//       )}
//     </div>
//   );
// }





export default function CustomersPage() {

  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const {
    customers,
    pagination,
    loading,
  } = useCustomers(
    {
    page,
    limit: 10,
    filters
  }
);

  return (
    <div className="space-y-6">

      <CustomersFilters
        filters={filters}
        setFilters={(f) => {
          setPage(1); // reset page when filters change
          setFilters(f);
        }}
      />

      <CustomersTable
        customers={customers}
        loading={loading}
      />

      {pagination && (
        <div className="flex items-center justify-between mt-4">

          <span className="text-sm text-gray-500">
            Showing page {pagination.page} of {pagination.totalPages}
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