import { CatalogDrugMovementTable } from "features/catalogDrug";
import { useParams } from "react-router-dom";
import { catalogDrugReceiptsUrl } from "shared/index";

export function CatalogDrugReceipts() {
  const { id } = useParams();
  const catalogDrugId = Number(id);

  return (
    <CatalogDrugMovementTable
      url={catalogDrugReceiptsUrl(catalogDrugId)}
      queryKey="catalogDrugReceipts"
      tableTitle="Поступление препарата"
    />
  );
}
