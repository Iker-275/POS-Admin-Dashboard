
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ZoneForm from "../../components/customforms/ZoneForm";
import { useZones } from "../../hooks/useZone";
import { useNavigate } from "react-router-dom";

export default function CreateZone() {
    const { createZone, message, error } = useZones();
    const navigate = useNavigate();

    const handleCreate = async (data: { code: string; name: string }) => {
        await createZone(data);
        navigate("/zones");
    };

    return (
        <>
            <PageMeta title="Create Zone" description="Create a new zone" />
            <PageBreadcrumb pageTitle="Create Zone" />

            <ZoneForm mode="create" onSubmit={handleCreate} />
            {message && (
                <div className="text-green-600 text-sm">{message}</div>
            )}

            {error && (
                <div className="text-red-600 text-sm">{error}</div>
            )}
        </>
    );
}