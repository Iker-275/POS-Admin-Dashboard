import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import {StatusTable} from "../../components/tables/BasicTables/BasicTableOne";

export default function Status() {
  return (
    <>
      <PageMeta title="Order Status" description="Manage Order Statuses" />
      <PageBreadcrumb pageTitle="Order Status" />

      <div className="space-y-6">
        <ComponentCard title="Statuses">
          <StatusTable />
        </ComponentCard>
      </div>
    </>
  );
}