import { useParams, Link } from "react-router-dom";
import { useCustomer } from "../../hooks/useCustomer";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import CustomerForm from "../customforms/CustomerForm";

export default function CustomerInfoCard() {

  const { id } = useParams();
  const { customer, loading } = useCustomer(id);

  const { isOpen, openModal, closeModal } = useModal();
 

  const handleSuccess = () => {
    alert("Customer created successfully");
   

  };
 

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  if (!customer) return null;

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">

      {/* Header */}
      <div className="flex justify-between items-start mb-6">

        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
            Customer Details
          </h4>

          <p className="text-sm text-gray-500">
            {customer.customerCode}
          </p>
        </div>

        <button
          onClick={openModal}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm"
        >
          Edit Customer
        </button>

      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7">

        <Info label="Customer Name" value={customer.name} />
        <Info label="Phone" value={customer.phone} />

        <Info label="House No" value={customer.houseNo} />
        <Info label="Purpose" value={customer.purpose} />

        <Info label="Village" value={customer.villageName} />
        <Info label="Zone" value={customer.zoneCode} />

        <Info label="Collector" value={customer.collectorName} />

        <Info
          label="Status"
          value={customer.status}
          highlight
        />

      </div>

      {/* Meter Section */}
      <div className="mt-8">

        <h5 className="text-md font-semibold mb-4 text-gray-800 dark:text-white">
          Meter Information
        </h5>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          <Info label="Meter Number" value={customer.meter?.meterNo} />

          <Info
            label="Current Reading"
            value={customer.meter?.currentReading}
          />

          <Info
            label="Last Reading Date"
            value={
              customer.meter?.lastReadAt
                ? new Date(customer.meter.lastReadAt).toLocaleDateString()
                : "-"
            }
          />

        </div>

      </div>

      {/* Financial Section */}
      <div className="mt-8">

        <h5 className="text-md font-semibold mb-4 text-gray-800 dark:text-white">
          Financial Summary
        </h5>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          <Info
            label="Previous Balance"
            value={customer.balances?.previousBalance}
          />

          <Info
            label="Total Paid"
            value={customer.balances?.totalPaid}
          />

          <Info
            label="Outstanding Balance"
            value={customer.balances?.unpaid}
            highlight
          />

        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-10 flex flex-wrap gap-3">

        <Link
          to={`/customers/${customer._id}/statement`}
          className="px-4 py-2 text-sm bg-gray-100 rounded-lg"
        >
          View Statement
        </Link>

        <Link
          to={`/customers/${customer._id}/visits`}
          className="px-4 py-2 text-sm bg-gray-100 rounded-lg"
        >
          Meter Visits
        </Link>

        <Link
          to={`/customers/${customer._id}/payments`}
          className="px-4 py-2 text-sm bg-gray-100 rounded-lg"
        >
          Payments
        </Link>

      </div>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">

        <div className="p-6">

          <h4 className="text-xl font-semibold mb-4">
            Edit Customer
          </h4>

        <CustomerForm
                customer={customer}
                onSuccess={handleSuccess}
              
              />

        </div>

      </Modal>

    </div>
  );
}

function Info({ label, value, highlight = false }: any) {
  return (
    <div>
      <p className="mb-1 text-xs text-gray-500">{label}</p>

      <p
        className={`text-sm font-medium ${
          highlight ? "text-red-600" : "text-gray-800 dark:text-white"
        }`}
      >
        {value ?? "-"}
      </p>
    </div>
  );
}