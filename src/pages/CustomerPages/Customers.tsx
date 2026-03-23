import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";

import {CustomersTable} from "../../components/tables/BasicTables/BasicTableOne";

export default function CustomersPage() {
  return (
    <>
      <PageMeta title="Customers" description="Manage Customers" />
      <PageBreadcrumb pageTitle="Customers" />

      <div className="space-y-6">

        {/* TABLE */}
        <ComponentCard title="Customers">
          <CustomersTable />
        </ComponentCard>

      </div>
    </>
  );
}