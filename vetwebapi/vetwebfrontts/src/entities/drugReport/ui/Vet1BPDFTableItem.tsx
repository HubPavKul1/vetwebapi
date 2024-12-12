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
      <td>{drug.units_start?.toFixed(4)}</td>
      <td>{drug.units_received?.toFixed(4)}</td>
      <td></td>
      <td>{drug.animals_count ? (drug.animals_count / 1000).toFixed(3): 0}</td>
      <td>{drug.units_spent?.toFixed(4)}</td>
      <td>{drug.disposed_units?.toFixed(4)}</td>
      <td>{drug.units_spent_disposed?.toFixed(4)}</td>
      <td>{drug.units_rest?.toFixed(4)}</td>
    </tr>
  );
}
