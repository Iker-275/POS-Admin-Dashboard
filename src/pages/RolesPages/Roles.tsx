import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import {BasicTableOne, RolesTable, UsersTable, ZoneTable} from "../../components/tables/BasicTables/BasicTableOne";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function Roles() {
  
  return (
    <>
      <PageMeta
        title="Roles"
        description="My Roles"
      />
       <PageBreadcrumb pageTitle="Roles" />
      <div className="space-y-6">
        <ComponentCard title="Roles">
          <RolesTable />
        </ComponentCard>
      </div>
      
    </>
  );
}
