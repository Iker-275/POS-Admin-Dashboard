import { useNavigate } from "react-router-dom";
import CustomerForm from "../../components/customforms/CustomerForm";
import { useCustomer } from "../../hooks/useCustomers";

export default function CreateCustomer() {
  const navigate = useNavigate();
  const { addCustomer } = useCustomer();

  const handleCreate = async (data: any) => {
    await addCustomer(data);
    navigate("/customers");
  };

  return <CustomerForm mode="create" onSubmit={handleCreate} />;
}