import { IVetWorkReport } from "entities/vetWorkReport/model/reportInterfaces";

interface VetWorkReportItemProps {
  data: IVetWorkReport;
  isDiagnostic: boolean;
  rowNum: number;
}

export function VetWorkReportItem({
  data,
  isDiagnostic,
  rowNum,
}: VetWorkReportItemProps) {
  return (
    <tr key={rowNum} className="border-bottom border-black align-middle">
      <td>{data.animal_group}</td>
      <td>{data.disease}</td>
      <td>{rowNum}</td>
      <td>{data.animal_count}</td>
      {isDiagnostic && <td>{data.positive_count}</td>}
    </tr>
  );
}
