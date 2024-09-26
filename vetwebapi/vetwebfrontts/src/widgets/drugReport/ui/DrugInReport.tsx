import { IDrugReport } from "entities/drugReport/model/drugReportInterfaces";
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
      <td>доз</td>
      {drug.packs_start ? <td>{drug.packs_start}</td> : <td>0</td>}
      {drug.units_start ? <td>{drug.units_start}</td> : <td>0</td>}
      {drug.packs_received ? <td>{drug.packs_received}</td> : <td>0</td>}
      {drug.units_received ? <td>{drug.units_received}</td> : <td>0</td>}
      {drug.packs_spent ? <td>{drug.packs_spent}</td> : <td>0</td>}
      {drug.units_spent ? <td>{drug.units_spent}</td> : <td>0</td>}
      {drug.animals_count ? <td>{drug.animals_count}</td> : <td>0</td>}
      <td>{drug.disposed_units}</td>
      <td>{drug.units_spent_disposed}</td>
      {drug.packs_rest ? <td>{drug.packs_rest}</td> : <td>0</td>}
      {drug.units_rest ? <td>{drug.units_rest}</td> : <td>0</td>}
    </tr>
  );
}
