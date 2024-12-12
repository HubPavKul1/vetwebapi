import { IDrugReport } from "entities/drugReport/model/drugReportInterfaces";
import { convertDateString } from "shared/helpers";

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
          convertDateString(drug.expiration_date).shortDate}
      </td>
      <td>тыс.доз</td>
      <td>{drug.units_start?.toFixed(4)}</td>
      <td>{drug.units_received?.toFixed(3)}</td>
      <td></td>
      <td></td>
      <td></td>
      <td>{drug.units_spent?.toFixed(4)}</td>
      <td></td>
      <td></td>
      <td></td>
      <td>{drug.disposed_units?.toFixed(4)}</td>
      <td>{drug.units_spent_disposed?.toFixed(4)}</td>
      <td>{drug.units_rest?.toFixed(4)}</td>
    </tr>
  );
}
