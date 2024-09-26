import { useParams } from "react-router-dom";
import { MenuItem } from "shared/ui/MenuItem";
import { GiMedicinePills } from "react-icons/gi";
import { vetWorkDrugUrl } from "shared/urls/vetWorkUrls";
import { AddDrugForm } from "features/drugMovements/ui/AddDrugForm";

export function AddDrugToVetWork() {
  const { id } = useParams();
  const vetWorkId = Number(id);

  return (
    <MenuItem
      title="Добавить препарат"
      icon={<GiMedicinePills color="blue" fontSize={30} />}
    >
      <AddDrugForm url={vetWorkDrugUrl(vetWorkId)} queryKey="vetwork" />
    </MenuItem>
  );
}
