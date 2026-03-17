

import { useState, useEffect } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import Switch from "../customComponents/Switch";
import Button from "../ui/button/Button";

interface RoleFormProps {
  mode: "create" | "edit";
  initialData?: {
    name: string;
    description: string;
    active: boolean;
  };
  onSubmit: (data: {
    name: string;
    description: string;
    active: boolean;
  }) => void;
}

export default function RoleForm({
  mode,
  initialData,
  onSubmit,
}: RoleFormProps) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setActive(initialData.active);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: any = {};

    if (!name) newErrors.name = "Name is required";
    if (!description) newErrors.description = "Description is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      name,
      description,
      active,
    });
  };

  return (
    <ComponentCard
      title={mode === "create" ? "Create Role" : "Edit Role"}
    >

      <div className="space-y-6">

        <div>
          <Label>Name</Label>

          <Input
            type="text"
            placeholder="Role name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />

          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        <div>
          <Label>Description</Label>

          <TextArea
            placeholder="Enter description"
            value={description}
            onChange={(value) => setDescription(value)}
            rows={5}
          />

          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <Switch
          label="Active"
          checked={active}
          onChange={(value) => setActive(value)}
        />

      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">

        <Button variant="outline">
          Cancel
        </Button>

        <Button variant="outline" onClick={handleSubmit}>
          {mode === "create" ? "Create Role" : "Update Role"}
        </Button>

      </div>

    </ComponentCard>
  );
}
