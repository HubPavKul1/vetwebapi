import { useParams } from "react-router-dom";
import { MenuItem } from "shared/ui/MenuItem";
import { AddCompanyToVetWorkForm } from "./AddCompanyToVetWorkForm";
import { BsBuildingAdd } from "react-icons/bs";
import { vetWorkCompanyUrl } from "shared/urls/vetWorkUrls";
import { VetWorkQueryKeys } from "shared/constants/vetworkConst";

export function AddCompanyToVetWork() {
  const { id } = useParams();
  const vetWorkId = Number(id);
  const queryKey = VetWorkQueryKeys.vetWorkDetail;

  return (
    <MenuItem
      title="Добавить предприятие"
      icon={<BsBuildingAdd color="indigo" fontSize={30} />}
    >
      <AddCompanyToVetWorkForm
        url={vetWorkCompanyUrl(vetWorkId)}
        queryKey={queryKey}
      />
    </MenuItem>
  );
}
