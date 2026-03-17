import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import Select from "../customComponents/DropDowns";
import { useRates } from "../../hooks/useRate";
import { useNavigate } from "react-router";

export default function RatesForm() {
  const { createRate, loading } = useRates();
const navigate = useNavigate();


  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState("");

  const currencyOptions = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "KES", label: "KES - Kenyan Shilling" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
  ];

  const discountTypeOptions = [
    { value: "percentage", label: "Percentage (%)" },
    { value: "flat", label: "Fixed Amount" },
  ];

  const handleSubmit = async () => {
    if (!price || !currency || !discountType || !discountValue) return;

    await createRate({
      pricingPerUnit: Number(price),
      currency,
      discount: {
        type: discountType as "percentage" | "fixed",
        value: Number(discountValue),
      },
    });
    navigate("/rates");
  };

  return (
    <ComponentCard title="Create Rate">
      <div className="space-y-6">

        {/* Pricing */}
        <div>
          <Label htmlFor="price">Pricing Per Unit</Label>
          <Input
            type="number"
            id="price"
            placeholder="eg 4"
            value={price}
            onChange={(e:any) => setPrice(e.target.value)}
          />
        </div>

        {/* Currency */}
        <div>
          <Label>Select Currency</Label>
          <Select
            options={currencyOptions}
            placeholder="Select currency"
            onChange={(value) => setCurrency(value)}
          />
        </div>

        {/* Discount Type */}
        <div>
          <Label>Select Discount Type</Label>
          <Select
            options={discountTypeOptions}
            placeholder="Select discount type"
            onChange={(value) => setDiscountType(value)}
          />
        </div>

        {/* Discount Value */}
        <div>
          <Label htmlFor="discount">Discount Value</Label>
          <Input
            type="number"
            id="discount"
            placeholder="eg 5"
            value={discountValue}
            onChange={(e:any) => setDiscountValue(e.target.value)}
          />
        </div>

      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Create Rate"}
        </Button>
      </div>
    </ComponentCard>
  );
}