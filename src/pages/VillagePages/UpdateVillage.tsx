import { useParams, useNavigate } from "react-router-dom";
import { useVillage } from "../../hooks/useVillage";
import VillageForm from "../../components/customforms/VillageForm";

export default function EditVillage() {
  const { id } = useParams();
  const { villages, updateVillage, } = useVillage();
  const navigate = useNavigate();

  const village = villages.find((v) => v._id === id);

  const handleUpdate = async (data: {
    zoneId: string;
    zoneCode: string;
    code: string;
    name: string;
  }) => {
    await updateVillage(id!, data);
    navigate("/villages");
  };

  if (!village) return <p>Loading...</p>;

  return (
    <div>
      <VillageForm
        mode="edit"
        initialData={{
          code: village.code,
          name: village.name,
          zoneId: village.zoneId,
        }}
        onSubmit={handleUpdate}
      />

      
    </div>
  );
}