import { ICompanyVetWorksReport } from "features/vetWork/models/interfaces";

interface CompanyVetWorkReportItemProps {
  data: ICompanyVetWorksReport;
  rowNum: number;
}

export function CompanyVetWorkReportItem({
  data,
  rowNum,
}: CompanyVetWorkReportItemProps) {
  return (
    <tr key={rowNum} className="border-bottom border-black align-middle">
      <td>{rowNum}</td>
      <td>{data.vetwork_date}</td>
      <td>{data.work_type}</td>
      <td>{data.disease}</td>
      <td>{data.animals_count}</td>
    </tr>
  );
}
