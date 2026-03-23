import { useParams, useNavigate } from "react-router-dom";
import CustomerForm from "../../components/customforms/CustomerForm";
import { useCustomer } from "../../hooks/useCustomers";

export default function UpdateCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { customers, editCustomer } = useCustomer();

  const customer = customers.find((c) => c._id === id);

  const handleUpdate = async (data: any) => {
    await editCustomer(id!, data);
    navigate("/customers");
  };

  if (!customer) return <p>Loading...</p>;

  return (
    <CustomerForm
      mode="edit"
      initialData={{
        name: customer.name,
        phone: customer.phone,
      }}
      onSubmit={handleUpdate}
    />
  );
}