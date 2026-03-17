
import { useState, useEffect } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useZones } from "../../hooks/useZone";

interface ZoneFormProps {
  mode: "create" | "edit";
  initialData?: {
    code: string;
    name: string;
  };
  onSubmit: (data: { code: string; name: string }) => Promise<void>;
}

export default function ZoneForm({
  mode,
  initialData,
  onSubmit,
}: ZoneFormProps) {
  const { loading } = useZones();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    code: "",
    name: "",
  });

  useEffect(() => {
    if (initialData) {
      setCode(initialData.code);
      setName(initialData.name);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {
      code: "",
      name: "",
    };

    if (!code.trim()) newErrors.code = "Zone code is required";
    if (!name.trim()) newErrors.name = "Zone name is required";

    setErrors(newErrors);

    return !newErrors.code && !newErrors.name;
  };

  const handleSubmit = async () => {
    setMessage("");

    if (!validate()) return;

    try {
      await onSubmit({ code, name });

      setMessage(
        mode === "create"
          ? "Zone created successfully"
          : "Zone updated successfully"
      );
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  return (
    <ComponentCard title={mode === "create" ? "Create Zone" : "Edit Zone"}>
      <div className="space-y-6">

        {/* Zone Code */}
        <div>
          <Label>Zone Code</Label>
          <Input
            type="text"
            placeholder="Zone code"
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

        {/* Zone Name */}
        <div>
          <Label>Zone Name</Label>
          <Input
            type="text"
            placeholder="Zone name"
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

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button variant="outline">
          Cancel
        </Button>

        <Button variant="outline" onClick={handleSubmit} disabled={loading}>
          {loading
            ? "Saving..."
            : mode === "create"
            ? "Create Zone"
            : "Update Zone"}
        </Button>
      </div>
    </ComponentCard>
  );
}