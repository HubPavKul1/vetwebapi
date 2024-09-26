import { IDrugReport } from "entities/drugReport/model/drugReportInterfaces";
import { diseasesString } from "shared/helpers";

interface Vet1BPDFTableItemProps {
  drug: IDrugReport;
}

export function Vet1BTableItem({ drug }: Vet1BPDFTableItemProps) {
  const diseases = drug.diseases && diseasesString(drug.diseases);
  return (
    <tr key={drug.id}>
      <td>{diseases}</td>
      <td>{drug.drug_name}</td>
      <td>{drug.batch}</td>
      <td>тыс.доз</td>
      <td>{drug.units_start && drug.units_start / 1000}</td>
      <td>{drug.units_received && drug.units_received / 1000}</td>
      <td></td>
      <td>{drug.animals_count && drug.animals_count / 1000}</td>
      <td>{drug.units_spent && drug.units_spent / 1000}</td>
      <td>{drug.disposed_units && drug.disposed_units / 1000}</td>
      <td>{drug.units_spent_disposed && drug.units_spent_disposed / 1000}</td>
      <td>{drug.units_rest && drug.units_rest / 1000}</td>
    </tr>
  );
}
