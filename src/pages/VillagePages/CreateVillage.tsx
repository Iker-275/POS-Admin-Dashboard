import { useVillage } from "../../hooks/useVillage";
import VillageForm from "../../components/customforms/VillageForm";

export default function CreateVillage() {
  const { createVillage } = useVillage();

  const handleSubmit = async (data: any) => {
    await createVillage(data);
  };

  return <VillageForm mode="create" onSubmit={handleSubmit} />;
}