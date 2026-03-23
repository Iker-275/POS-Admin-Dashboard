// import { useState, useEffect } from "react";

// interface Props {
//   mode: "create" | "edit";
//   initialData?: {
//     name: string;
//     phone: string;
//   };
//   onSubmit: (data: { name: string; phone: string }) => void;
// }

// export default function CustomerForm({ mode, initialData, onSubmit }: Props) {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");

//   useEffect(() => {
//     if (initialData) {
//       setName(initialData.name);
//       setPhone(initialData.phone);
//     }
//   }, [initialData]);

//   const handleSubmit = () => {
//     if (!name || !phone) return;
//     onSubmit({ name, phone });
//   };

//   return (
//     <div className="space-y-4">
//       <input
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <input
//         placeholder="Phone"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />

//       <button onClick={handleSubmit}>
//         {mode === "create" ? "Create" : "Update"}
//       </button>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Switch from "../customComponents/Switch";
import Button from "../ui/button/Button";

interface CustomerFormProps {
  mode: "create" | "edit";
  initialData?: {
    name: string;
    phone: string;
    unpaid?: boolean; // optional toggle for unpaid balances
  };
  onSubmit: (data: { name: string; phone: string; unpaid: boolean }) => void;
}

export default function CustomerForm({
  mode,
  initialData,
  onSubmit,
}: CustomerFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [unpaid, setUnpaid] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  // Initialize state from props
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPhone(initialData.phone);
      setUnpaid(initialData.unpaid ?? false);
    }
  }, [initialData]);

  // Validation
  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit({ name, phone, unpaid });
  };

  return (
    <ComponentCard title={mode === "create" ? "Create Customer" : "Edit Customer"}>
      <div className="space-y-6">

        {/* Name */}
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            placeholder="Enter customer name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <Label>Phone</Label>
          <Input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e: any) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Unpaid Toggle */}
        {/* <Switch
          label="Has Unpaid Balances"
          checked={unpaid}
          onChange={(value) => setUnpaid(value)}
        /> */}

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button variant="outline">Cancel</Button>
        <Button variant="outline" onClick={handleSubmit}>
          {mode === "create" ? "Create Customer" : "Update Customer"}
        </Button>
      </div>
    </ComponentCard>
  );
}