import { useNavigate } from "react-router";
import CustomerForm from "../../components/customforms/CustomerForm";

export default function CreateCustomer() {
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
        Create Customer
      </h2>

      <CustomerForm
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />

    </div>

  );
}