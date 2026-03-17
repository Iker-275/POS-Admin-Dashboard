import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { ZoneTable} from "../../components/tables/BasicTables/BasicTableOne";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function Zones() {
  
  return (
    <>
      <PageMeta
        title="Zones"
        description="My zones"
      />
       <PageBreadcrumb pageTitle="Zones" />
      <div className="space-y-6">
        <ComponentCard title="Zones">
          <ZoneTable />
        </ComponentCard>
      </div>
      
    </>
  );
}
