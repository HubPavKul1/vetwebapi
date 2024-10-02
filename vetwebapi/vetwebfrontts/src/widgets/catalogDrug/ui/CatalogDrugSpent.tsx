import { CatalogDrugMovementTable } from "features/catalogDrug";
import { useParams } from "react-router-dom";
import { catalogDrugSpentUrl } from "shared/index";

export function CatalogDrugSpent() {
  const { id } = useParams();
  const catalogDrugId = Number(id);

  return (
    <CatalogDrugMovementTable
      url={catalogDrugSpentUrl(catalogDrugId)}
      queryKey="catalogDrugSpent"
      tableTitle="Расход препарата"
    />
  );
}
