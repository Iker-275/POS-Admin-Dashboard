

import { useState, useEffect } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useZones } from "../../hooks/useZone";
import Select from "../customComponents/DropDowns";

interface VillageFormProps {
  mode: "create" | "edit";
  initialData?: {
    code: string;
    name: string;
    zoneId: string;
  };
  onSubmit: (data: {
    zoneId: string;
    zoneCode: string;
    code: string;
    name: string;
  }) => Promise<void>;
}

export default function VillageForm({
  mode,
  initialData,
  onSubmit,
}: VillageFormProps) {
  const { zones, loading } = useZones();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [zoneId, setZoneId] = useState("");

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    zoneId: "",
    code: "",
    name: "",
  });

  // Populate when editing
  useEffect(() => {
    if (initialData) {
      setCode(initialData.code);
      setName(initialData.name);
      setZoneId(initialData.zoneId);
    }
  }, [initialData]);

  const zoneOptions = zones.map((zone) => ({
    label: zone.name,
    value: zone._id,
  }));

  // Validation
  const validate = () => {
    const newErrors = {
      zoneId: "",
      code: "",
      name: "",
    };

    if (!zoneId) newErrors.zoneId = "Zone is required";
    if (!code.trim()) newErrors.code = "Village code is required";
    if (!name.trim()) newErrors.name = "Village name is required";

    setErrors(newErrors);

    return !newErrors.zoneId && !newErrors.code && !newErrors.name;
  };

  const handleSubmit = async () => {
    setMessage("");

    if (!validate()) return;

    const selectedZone = zones.find((z) => z._id === zoneId);

    try {
      await onSubmit({
        zoneId,
        zoneCode: selectedZone?.code || "",
        code,
        name,
      });

      setMessage(
        mode === "create"
          ? "Village created successfully"
          : "Village updated successfully"
      );
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  return (
    <ComponentCard title={mode === "create" ? "Create Village" : "Edit Village"}>
      <div className="space-y-6">

        {/* Zone */}
        <div>
          <Label>Zone</Label>
          <Select
            options={zoneOptions}
            defaultValue={zoneId}
            placeholder="Select Zone"
            onChange={(value: string) => {
              setZoneId(value);
              setErrors({ ...errors, zoneId: "" });
            }}
          />
          {errors.zoneId && (
            <p className="text-red-500 text-sm mt-1">{errors.zoneId}</p>
          )}
        </div>

        {/* Village Code */}
        <div>
          <Label>Village Code</Label>
          <Input
            type="text"
            placeholder="Village code"
            value={code}
            onChange={(e: any) => {
              setCode(e.target.value);
              setErrors({ ...errors, code: "" });
            }}
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code}</p>
          )}
        </div>

        {/* Village Name */}
        <div>
          <Label>Village Name</Label>
          <Input
            type="text"
            placeholder="Village name"
            value={name}
            onChange={(e: any) => {
              setName(e.target.value);
              setErrors({ ...errors, name: "" });
            }}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Global Message */}
        {message && (
          <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded p-2">
            {message}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button variant="outline">Cancel</Button>

        <Button variant="outline" onClick={handleSubmit} disabled={loading}>
          {loading
            ? "Saving..."
            : mode === "create"
            ? "Create Village"
            : "Update Village"}
        </Button>
      </div>
    </ComponentCard>
  );
}