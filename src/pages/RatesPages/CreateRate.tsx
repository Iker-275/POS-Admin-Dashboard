
import { useNavigate } from "react-router";
import RatesForm from "../../components/customforms/RatesForm";
import UserForm from "../../components/customforms/UserForm";
import VillageForm from "../../components/customforms/VillageForm";
import { useRates } from "../../hooks/useRate";

export default function CreateRate() {
  return (
    <div>
      <RatesForm />
    </div>
  );
}