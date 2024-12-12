import { IDrugInMovement } from "entities/drugMovements/model/drugMovementInterfaces";
import { convertDateString } from "shared/helpers";

interface ReceiptDrugProps {
  drug: IDrugInMovement;
}

export function ReceiptDrug({ drug }: ReceiptDrugProps) {
  const productionDate = convertDateString(drug.production_date).shortDate;

  return (
    <tr key={drug.id}>
      <td>{drug.name}</td>
      <td>{drug.accounting_unit}</td>
      <td>{drug.batch}</td>
      <td>{drug.control}</td>
      <td>{productionDate}</td>
      <td>{drug.packs_amount}</td>
      <td>{drug.units_amount}</td>
    </tr>
  );
}
