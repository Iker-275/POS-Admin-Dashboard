import { useNavigate } from "react-router-dom";
import MenuForm from "../../components/customforms/MenuForm";
import { useMenu } from "../../hooks/useMenu";

export default function CreateMenu() {
  const navigate = useNavigate();
  const { addMenu } = useMenu();

  const handleCreate = async (data: any) => {
    await addMenu(data);
    navigate("/menu");
  };

  return <MenuForm mode="create" onSubmit={handleCreate} />;
}