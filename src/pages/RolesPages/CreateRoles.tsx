import { useNavigate } from "react-router-dom";
import RoleForm from "../../components/customforms/RolesForm";
import { useRoles } from "../../hooks/useRoles";

export default function CreateRole() {

  const navigate = useNavigate();
  const { createRole } = useRoles();

  const handleCreate = async (data: any) => {
    await createRole(data);
    navigate("/roles");
  };

  return (
    <RoleForm
      mode="create"
      onSubmit={handleCreate}
    />
  );
}