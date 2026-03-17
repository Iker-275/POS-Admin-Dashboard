import { useNavigate } from "react-router";
import CustomerForm from "../../components/customforms/CustomerForm";
import BulkUploadCustomers from "../../components/customComponents/BulkUploader";

export default function BulkCreateCustomer() {
    const navigate = useNavigate();

  const handleSuccess = () => {
    alert("Customer created successfully");
    navigate("/customers")

  };
  const handleCancel = () => {
    navigate("/customers")
  };

  return (

    <div className="p-6">

      <h2 className="text-xl font-semibold mb-6">
        Upload Customers
      </h2>

    <BulkUploadCustomers/>

    </div>

  );
}