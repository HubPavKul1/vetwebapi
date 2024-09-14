import { useParams } from "react-router-dom";
import { MenuItem } from "shared/ui/MenuItem";
import { AddCompanyToVetWorkForm } from "./AddCompanyToVetWorkForm";
import { BsBuildingAdd } from "react-icons/bs";
import { vetWorkCompanyUrl } from "shared/urls/vetWorkUrls";

export function AddCompanyToVetWork() {
  const { id } = useParams();
  const vetWorkId = Number(id);

  return (
    <MenuItem
      title="Добавить предприятие"
      icon={<BsBuildingAdd color="blue" fontSize={30} />}
    >
      <AddCompanyToVetWorkForm
        url={vetWorkCompanyUrl(vetWorkId)}
        queryKey="vetwork"
      />
    </MenuItem>
  );
}
