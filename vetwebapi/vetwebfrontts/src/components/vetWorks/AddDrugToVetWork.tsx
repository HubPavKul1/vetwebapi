import { useParams } from "react-router-dom";
import { AddDrugForm } from "../drugs/drugMovements/AddDrugForm";
import { MenuItem } from "../MenuItem";
import { GiMedicinePills } from "react-icons/gi";

export function AddDrugToVetWork() {
  const { id } = useParams();

  return (
    <MenuItem
      title="Добавить препарат"
      icon={<GiMedicinePills color="blue" fontSize={30} />}
    >
      <AddDrugForm url={`/api/vetwork/${id}/drug`} queryKey="vetwork" />
    </MenuItem>
  );
}
