import { AppService } from "shared/services/app.service";
import { IDrugReport } from "interfaces/DrugInterfaces";

interface DrugReportTableItemProps {
  drug: IDrugReport;
}

export function DrugReportTableItem({ drug }: DrugReportTableItemProps) {
  return (
    <tr key={drug.id}>
      <td>{drug.drug_name}</td>
      <td>{drug.batch}</td>
      <td>
        {drug.expiration_date &&
          AppService.convertDateString(drug.expiration_date).shortDate}
      </td>
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
      <td>{drug.units_spent_disposed && drug.units_spent_disposed / 1000}</td>
      <td>{drug.units_rest && drug.units_rest / 1000}</td>
    </tr>
  );
}
