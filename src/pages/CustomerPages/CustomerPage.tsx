import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import CustomerInfoCard from "../../components/customComponents/CustomerCard";

export default function CustomerPage() {
  return (
    <>
      <PageMeta
        title="Customer Page"
        description="Customer Details"
      />
      <PageBreadcrumb pageTitle="Customer Details" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
    
        <div className="space-y-6">
          
          <CustomerInfoCard/>
         
        </div>
      </div>
    </>
  );
}
