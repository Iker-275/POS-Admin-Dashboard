import { useParams, useNavigate } from "react-router-dom";
import RoleForm from "../../components/customforms/RolesForm";
import { useRoles } from "../../hooks/useRoles";

export default function UpdateRole() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { roles, updateRole, message, error } = useRoles();

  const role = roles.find((r) => r._id === id);

  const handleUpdate = async (data: any) => {
    await updateRole(id!, data);
    navigate("/roles");
  };

  if (!role) return <p>Loading...</p>;

  return (
    <>

      <RoleForm
        mode="edit"
        initialData={{
          name: role.name,
          description: role.description,
          active: role.active,
        }}
        onSubmit={handleUpdate}
      />

      {message && (
        <p className="text-green-600 mt-4">{message}</p>
      )}

      {error && (
        <p className="text-red-600 mt-4">{error}</p>
      )}

    </>
  );
}