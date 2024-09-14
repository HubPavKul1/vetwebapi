import { IDrugInMovement } from "interfaces/DrugInterfaces";
import { AppService } from "shared/services/app.service";

interface ReceiptDrugProps {
  drug: IDrugInMovement;
}

export function ReceiptDrug({ drug }: ReceiptDrugProps) {
  const productionDate = AppService.convertDateString(
    drug.production_date
  ).shortDate;

  return (
    <tr key={drug.id}>
      <td>{drug.name}</td>
      <td>{drug.batch}</td>
      <td>{drug.control}</td>
      <td>{productionDate}</td>
      <td>{drug.packs_amount}</td>
      <td>{drug.units_amount}</td>
    </tr>
  );
}
