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
      <td>{drug.units_start}</td>
      <td>{drug.units_received}</td>
      <td></td>
      <td>{drug.animals_count}</td>
      <td>{drug.units_spent}</td>
      <td>{drug.disposed_units}</td>
      <td>{drug.units_spent_disposed}</td>
      <td>{drug.units_rest}</td>
    </tr>
  );
}
