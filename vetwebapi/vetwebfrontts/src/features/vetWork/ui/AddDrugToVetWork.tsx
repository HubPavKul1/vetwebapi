import { AddDrugMenuItem } from "features/drugMovements";
import { useParams } from "react-router-dom";
import { vetWorkDrugUrl } from "shared/urls/vetWorkUrls";

export function AddDrugToVetWork() {
  const { id } = useParams();
  const vetWorkId = Number(id);

  return <AddDrugMenuItem url={vetWorkDrugUrl(vetWorkId)} queryKey="vetwork" />;
}
