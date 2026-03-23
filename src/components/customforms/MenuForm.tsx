import { useState, useEffect } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Switch from "../customComponents/Switch";
import Button from "../ui/button/Button";

interface Props {
  mode: "create" | "edit";
  initialData?: any;
  onSubmit: (data: any) => void;
}

export default function MenuForm({ mode, initialData, onSubmit }: Props) {
  const [menuItem, setMenuItem] = useState("");
  const [pricePerQty, setPricePerQty] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [availableToday, setAvailableToday] = useState(true);

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setMenuItem(initialData.menuItem);
      setPricePerQty(initialData.pricePerQty);
      setCurrency(initialData.currency);
      setAvailableToday(initialData.availableToday);
    }
  }, [initialData]);

  const validate = () => {
    const e: any = {};
    if (!menuItem) e.menuItem = "Required";
    if (!pricePerQty) e.pricePerQty = "Required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      menuItem,
      pricePerQty,
      currency,
      availableToday,
    });
  };

  return (
    <ComponentCard title={mode === "create" ? "Add Menu Item" : "Edit Menu Item"}>
      <div className="space-y-6">

        <div>
          <Label>Name</Label>
          <Input value={menuItem} onChange={(e: any) => setMenuItem(e.target.value)} />
          {errors.menuItem && <p className="text-red-500">{errors.menuItem}</p>}
        </div>

        <div>
          <Label>Price</Label>
          <Input
            type="number"
            value={pricePerQty}
            onChange={(e: any) => setPricePerQty(Number(e.target.value))}
          />
        </div>

        <div>
          <Label>Currency</Label>
          <Input value={currency} onChange={(e: any) => setCurrency(e.target.value)} />
        </div>

        <Switch
          label="Available Today"
          checked={availableToday}
          onChange={setAvailableToday}
        />

      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">

        <Button variant="outline">
          Cancel
        </Button>

        <Button variant="outline" onClick={handleSubmit}>
          {mode === "create" ? "Create" : "Update"}
        </Button>

      </div>
    </ComponentCard>
  );
}