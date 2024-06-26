import { AppService } from "../../../../app.service";
import { IDrugReport } from "../../../../interfaces/DrugInterfaces";

interface ReceiptDrugProps {
  drug: IDrugReport;
}

export function DrugReportTableItem({ drug }: ReceiptDrugProps) {
  const expirationDate = AppService.convertDateString(
    drug.expiration_date
  ).shortDate;

  

  return (
    <tr key={drug.id}>
      <td>{drug.drug_name}</td>
      <td>{drug.batch}</td>
      <td>{expirationDate}</td>
      <td>тыс.доз</td>
      <td>{drug.units_start && drug.units_start / 1000}</td>
      <td>{drug.units_received && drug.units_received / 1000}</td>
      <td></td>
      <td></td>
      <td></td>
      <td>{drug.units_spent && drug.units_spent / 1000}</td>
      <td></td>
      <td></td>
      <td></td>
      <td>{drug.disposed_units && drug.disposed_units / 1000}</td>
      <td>{drug.packs_spent && (drug.packs_spent * drug.packing) / 1000}</td>
      <td>{drug.units_rest && drug.units_rest / 1000}</td>
    </tr>
  );
}
