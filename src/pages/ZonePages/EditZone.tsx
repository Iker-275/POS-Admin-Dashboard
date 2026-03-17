import { useParams, useNavigate } from "react-router-dom";
import { useZones } from "../../hooks/useZone";
import ZoneForm from "../../components/customforms/ZoneForm";

export default function EditZone() {
  const { id } = useParams();
  const { zones, updateZone,message,error } = useZones();
  const navigate = useNavigate();

  const zone = zones.find((z) => z._id === id);

  const handleUpdate = async (data: { code: string; name: string }) => {
    await updateZone(id!, data);
    navigate("/zones");
  };

  if (!zone) return <p>Loading...</p>;

  return (
    <div>
    <ZoneForm
      mode="edit"
      initialData={{
        code: zone.code,
        name: zone.name,
      }}
      onSubmit={handleUpdate}
    />
    {message && (
                <div className="text-green-600 text-sm">{message}</div>
            )}

            {error && (
                <div className="text-red-600 text-sm">{error}</div>
            )}
    
    </div>
    
  );
}