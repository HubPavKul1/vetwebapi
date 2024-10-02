import { convertDateString } from "shared/helpers";
import { ICatalogDrugDetail } from "../model/drugCatalogInterfaces";

interface CatalogDrugMovement {
  drug: ICatalogDrugDetail;
}

export function CatalogDrugMovement({ ...props }: CatalogDrugMovement) {
  const { drug } = props;
  return (
    <tr>
      <td>
        {drug.operation_date &&
          convertDateString(drug.operation_date).shortDate}
      </td>
      <td>{drug.packs_amount}</td>
      <td>{drug.units_amount}</td>
    </tr>
  );
}
