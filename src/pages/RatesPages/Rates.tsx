import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import {RatesTable} from "../../components/tables/BasicTables/BasicTableOne";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function Rates() {
  
  return (
    <>
      <PageMeta
        title="Rates"
        description="My Rates"
      />
       <PageBreadcrumb pageTitle="Rates" />
      <div className="space-y-6">
        <ComponentCard title="Rates">
          <RatesTable />
        </ComponentCard>
      </div>
      
    </>
  );
}
