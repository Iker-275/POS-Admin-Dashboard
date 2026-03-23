import { useParams, useNavigate } from "react-router-dom";
import { useMenu } from "../../hooks/useMenu";
import MenuForm from "../../components/customforms/MenuForm";

export default function UpdateMenu() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { menu, updateMenu, message } = useMenu();

  const item = menu.find((m) => m._id === id);

  const handleUpdate = async (data: any) => {
    await updateMenu(id!, data);
    navigate("/menu");
  };

  if (!item) return <p>Loading...</p>;

  return (
    <>
      <MenuForm
        mode="edit"
        initialData={item}
        onSubmit={handleUpdate}
      />

      {message && (
        <p className="text-green-600 mt-4">{message}</p>
      )}
    </>
  );
}