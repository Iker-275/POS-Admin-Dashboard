
import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useBillingPeriods } from "../../hooks/usePeriod";

export default function PeriodForm() {
  const { createPeriod, loading } = useBillingPeriods();

  const [period, setPeriod] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    if (!period || !notes) return;

    await createPeriod({
      period,
      notes,
      userId: "CURRENT_USER_ID", // replace with auth user later
    });
  };

  return (
    <ComponentCard title="Create Period">
      <div className="space-y-6">

        <div>
          <Label htmlFor="period">Period</Label>
          <Input
            type="month"
            id="period"
            value={period}
            onChange={(e:any) => setPeriod(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes</Label>
          <Input
            type="text"
            id="notes"
            placeholder="eg January 2026"
            value={notes}
            onChange={(e:any) => setNotes(e.target.value)}
          />
        </div>

      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Create Period"}
        </Button>
      </div>
    </ComponentCard>
  );
}