

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { useBillingPeriods } from "../../hooks/usePeriod";

export default function CreatePeriod() {
  const navigate = useNavigate();

  const { createPeriod, loading, message, error } = useBillingPeriods();

  const [period, setPeriod] = useState("");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState("");

  const handlePeriodChange = (value: string) => {
    setPeriod(value);

    // auto generate notes
    const date = new Date(value + "-01");
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    setNotes(`${month} ${year} Billing Period`);
  };

  const handleSubmit = async () => {
    setFormError("");

    if (!period) {
      setFormError("Please select a period");
      return;
    }

    if (!notes) {
      setFormError("Notes are required");
      return;
    }

    await createPeriod({
      period,
      notes,
      userId: "6968a3ddcc13bd29d4b09c24", // replace later with logged in user
    });

    navigate("/billing-periods");
  };

  return (
    <ComponentCard title="Create Billing Period">
      <div className="space-y-6">

        {/* Period */}
        <div>
          <Label htmlFor="period">Period</Label>
          <Input
            type="month"
            id="period"
            value={period}
            onChange={(e: any) => handlePeriodChange(e.target.value)}
          />
        </div>

        {/* Notes */}
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Input
            type="text"
            id="notes"
            value={notes}
            placeholder="Billing period description"
            onChange={(e: any) => setNotes(e.target.value)}
          />
        </div>

        {/* Form Error */}
        {formError && (
          <p className="text-red-500 text-sm">{formError}</p>
        )}

        {/* API Error */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* Success Message */}
        {message && (
          <p className="text-green-600 text-sm">{message}</p>
        )}

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="outline"
          onClick={() => navigate("/billing-periods")}
        >
          Cancel
        </Button>

        <Button
          variant="outline"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Create Period"}
        </Button>
      </div>
    </ComponentCard>
  );
}