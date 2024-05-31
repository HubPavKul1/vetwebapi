import { useParams } from "react-router-dom";
import { MenuItem } from "../MenuItem";
import { AddCompanyToVetWorkForm } from "./AddCompanyToVetWorkForm";

export function AddCompanyToVetWork() {
  const { id } = useParams();

  return (
    <MenuItem title="Добавить предприятие">
      <AddCompanyToVetWorkForm
        url={`/api/vetwork/${id}/company`}
        queryKey="vaccination"
      />
    </MenuItem>
  );
}
