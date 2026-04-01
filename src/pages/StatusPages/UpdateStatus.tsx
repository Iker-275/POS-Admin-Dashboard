import { useParams, useNavigate } from "react-router-dom";
import { useStatus } from "../../hooks/useStatus";
import StatusForm from "../../components/customforms/StatusForm";

export default function UpdateStatus() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getStatusById, editStatus, message } = useStatus();

  const status = getStatusById(id!);

  const handleUpdate = async (data: any) => {
    await editStatus(id!, { name: data.name });
    navigate("/order-status");
  };

  if (!status) return <p>Loading...</p>;

  return (
    <>
      <StatusForm
        mode="edit"
        initialData={status}
        onSubmit={handleUpdate}
      />

      {message && (
        <p className="text-green-600 mt-4">{message}</p>
      )}
    </>
  );
}