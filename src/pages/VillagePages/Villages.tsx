import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import {VillageTable} from "../../components/tables/BasicTables/BasicTableOne";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function Villages() {
  
  return (
    <>
      <PageMeta
        title="villages"
        description="My villages"
      />
       <PageBreadcrumb pageTitle="Villages" />
      <div className="space-y-6">
        <ComponentCard title="Villages">
          <VillageTable />
        </ComponentCard>
      </div>
      
    </>
  );
}
