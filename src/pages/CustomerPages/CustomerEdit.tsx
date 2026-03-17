import { useNavigate, useParams } from "react-router-dom";
import CustomerForm from "../../components/customforms/CustomerForm";
import { useCustomer } from "../../hooks/useCustomer";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";

export default function EditCustomer() {
    
    const navigate = useNavigate();
    const handleCancel = () => {
    navigate("/customers")
  };
const handleSuccess = () => {
    navigate("/customers")
    alert("Customer updated")
  };

  
  const { id } = useParams();

  const { customer, loading } = useCustomer(id);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        Loading...
      </div>
    );
  }

  if (!customer) return null;

  return (

    <div className="p-6">

      <h2 className="text-xl font-semibold mb-6">
        Edit Customer
      </h2>
      
      <CustomerForm
        customer={customer}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
      

    </div>

  );
}