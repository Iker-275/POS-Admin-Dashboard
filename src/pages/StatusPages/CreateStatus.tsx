import { useNavigate } from "react-router-dom";
import StatusForm from "../../components/customforms/StatusForm";
import { useStatus } from "../../hooks/useStatus";

export default function CreateStatus() {
  const navigate = useNavigate();
  const { addStatus } = useStatus();

  const handleCreate = async (data: any) => {
    await addStatus(data);
    navigate("/status");
  };

  return <StatusForm mode="create" onSubmit={handleCreate} />;
}