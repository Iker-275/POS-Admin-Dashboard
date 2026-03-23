import { useState, useEffect } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Switch from "../customComponents/Switch";
import Button from "../ui/button/Button";

interface Props {
  mode: "create" | "edit";
  initialData?: {
    name: string;
    visibility: boolean;
  };
  onSubmit: (data: { name: string; visibility?: boolean }) => void;
}

export default function StatusForm({ mode, initialData, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setVisibility(initialData.visibility);
    }
  }, [initialData]);

  const validate = () => {
    const e: any = {};
    if (!name) e.name = "Name is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      name,
      visibility,
    });
  };

  return (
    <ComponentCard
      title={mode === "create" ? "Create Status" : "Edit Status"}
    >
      <div className="space-y-6">

        <div>
          <Label>Name</Label>
          <Input
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        {mode === "create" && (
          <Switch
            label="Visible"
            checked={visibility}
            onChange={setVisibility}
          />
        )}

      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">

        <Button variant="outline">Cancel</Button>

        <Button variant="outline" onClick={handleSubmit}>
          {mode === "create" ? "Create" : "Update"}
        </Button>
{/* 
        <Switch
  checked={s.visibility}
  onChange={() => toggleStatus(s._id)}
/> */}

      </div>
    </ComponentCard>
  );
}