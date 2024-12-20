import { IDrugReport } from "entities/drugReport";
import { convertDateString } from "shared/helpers";

interface DrugInReportProps {
  drug: IDrugReport;
}

export function DrugInReport({ drug }: DrugInReportProps) {
  return (
    <tr key={drug.id} className="border-bottom border-black">
      <td>{drug.drug_name}</td>
      <td>{drug.batch}</td>
      {drug.expiration_date ? (
        <td>{convertDateString(drug.expiration_date).shortDate}</td>
      ) : (
        <td></td>
      )}
      <td>{drug.accounting_unit}</td>
      {drug.packs_start ? <td>{drug.packs_start.toFixed(3)}</td> : <td>0</td>}
      {drug.units_start ? <td>{drug.units_start.toFixed(4)}</td> : <td>0</td>}
      {drug.packs_received ? (
        <td>{drug.packs_received.toFixed(3)}</td>
      ) : (
        <td>0</td>
      )}
      {drug.units_received ? (
        <td>{drug.units_received.toFixed(4)}</td>
      ) : (
        <td>0</td>
      )}
      {drug.packs_spent ? <td>{drug.packs_spent.toFixed(3)}</td> : <td>0</td>}
      {drug.units_spent ? <td>{drug.units_spent.toFixed(4)}</td> : <td>0</td>}
      {drug.animals_count ? <td>{drug.animals_count}</td> : <td>0</td>}
      <td>{drug.disposed_units?.toFixed(4)}</td>
      <td>{drug.units_spent_disposed?.toFixed(4)}</td>
      {drug.packs_rest ? <td>{drug.packs_rest.toFixed(3)}</td> : <td>0</td>}
      {drug.units_rest ? <td>{drug.units_rest.toFixed(3)}</td> : <td>0</td>}
    </tr>
  );
}
