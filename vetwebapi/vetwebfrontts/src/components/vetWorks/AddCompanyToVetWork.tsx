import { useParams } from "react-router-dom";
import { MenuItem } from "../MenuItem";
import { AddCompanyToVetWorkForm } from "./AddCompanyToVetWorkForm";
import { BsBuildingAdd } from "react-icons/bs";

export function AddCompanyToVetWork() {
  const { id } = useParams();

  return (
    <MenuItem
      title="Добавить предприятие"
      icon={<BsBuildingAdd color="blue" fontSize={30} />}
    >
      <AddCompanyToVetWorkForm
        url={`/api/vetwork/${id}/company`}
        queryKey="vetwork"
      />
    </MenuItem>
  );
}
