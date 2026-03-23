import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import {MenuTable} from "../../components/tables/BasicTables/BasicTableOne";

export default function Menu() {
  return (
    <>
      <PageMeta title="Menu" description="Menu Management" />
      <PageBreadcrumb pageTitle="Menu" />

      <div className="space-y-6">
        <ComponentCard title="Menu Items">
          <MenuTable />
        </ComponentCard>
      </div>
    </>
  );
}