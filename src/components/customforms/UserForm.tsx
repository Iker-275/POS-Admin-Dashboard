// import { useState } from "react";
// import ComponentCard from "../common/ComponentCard";
// import Label from "../form/Label";
// import Input from "../form/input/InputField.tsx";
// import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../icons";
// import DatePicker from "../form/date-picker.tsx";
// import Switch from "../form/switch/Switch.tsx";
// import Button from "../ui/button/Button.tsx";
// import Select from "../customComponents/DropDowns.tsx";

// export default function UserForm() {
  
//   const options = [
//     { value: "marketing", label: "Marketing" },
//     { value: "template", label: "Template" },
//     { value: "development", label: "Development" },
//   ];
//   const handleSelectChange = (value: string) => {
//     console.log("Selected value:", value);
//   };

//   return (
//     <ComponentCard title="Edit User">
//       <div className="space-y-6">
        
//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input type="text" id="email" placeholder="info@gmail.com" />
//         </div>
//         <div>
//           <Label>Select Role</Label>
//           <Select
//             options={options}
//             placeholder="Select an option"
//             onChange={handleSelectChange}
//             className="dark:bg-dark-900"
//           />
//         </div>
       

      
//       <Switch label="Status"/>
//       {/* Buttons */}
//       <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
//         <Button variant="outline">Cancel</Button>

//         <Button variant="outline" onClick={handleSubmit} disabled={loading}>
//           {loading
//             ? "Saving..."
//             : "Update User"}
//         </Button>
//       </div>
//     </ComponentCard>
//   );
// }


import { useState, useEffect } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import Select from "../customComponents/DropDowns";

import { useRoles } from "../../hooks/useRoles";
import { useUsers } from "../../hooks/useUser";
import Switch from "../customComponents/Switch";

interface UserFormProps {
  mode: "edit";
  userId: string;
  initialData?: {
    email: string;
    role: string;
    active: boolean;
  };
  onSubmit: (data: { role: string; active: boolean }) => void;
}

export default function UserForm({
  mode,
  initialData,
  onSubmit,
}: UserFormProps) {

  const { roles } = useRoles();
  const { loading } = useUsers();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState(true);

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setEmail(initialData.email);
      setRole(initialData.role);
      setActive(initialData.active);
    }
  }, [initialData]);

  /* Convert roles to dropdown options */
  const roleOptions = roles.map((role: any) => ({
    label: role.name,
    value: role.name,
  }));

  const validate = () => {
    const newErrors: any = {};

    if (!role) newErrors.role = "Role is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      role,
      active,
    });
  };

  return (
    <ComponentCard title="Edit User">
      <div className="space-y-6">

        {/* Email */}
        <div>
          <Label>Email</Label>
          <Input
            type="text"
            value={email}
            disabled
          />
        </div>

        {/* Role */}
        <div>
          <Label>Select Role</Label>

          <Select
            options={roleOptions}
            defaultValue={role}
            placeholder="Select Role"
            onChange={(value: string) => setRole(value)}
          />

          {errors.role && (
            <p className="text-red-500 text-sm mt-1">
              {errors.role}
            </p>
          )}
        </div>

        {/* Active Switch */}
        <Switch
          label="Active Status"
          checked={active}
          onChange={(value: boolean) => setActive(value)}
        />

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button variant="outline">
          Cancel
        </Button>

        <Button
          variant="outline"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Update User"}
        </Button>
      </div>
    </ComponentCard>
  );
}