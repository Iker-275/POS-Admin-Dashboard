import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import {BasicTableOne, PeriodsTable, UsersTable, ZoneTable} from "../../components/tables/BasicTables/BasicTableOne";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function BillingPeriods() {
  
  return (
    <>
      <PageMeta
        title="Billing Periods"
        description="My Billing Periods"
      />
       <PageBreadcrumb pageTitle="Billing Periods" />
      <div className="space-y-6">
        <ComponentCard title="Billing Periods">
          <PeriodsTable />
        </ComponentCard>
      </div>
      
    </>
  );
}
