import { ICompanyVetWorksReport } from "features/vetWork/models/interfaces";
import { convertDateString } from "shared/helpers";

interface CompanyVetWorkReportItemProps {
  data: ICompanyVetWorksReport;
  rowNum: number;
}

export function CompanyVetWorkReportItem({
  data,
  rowNum,
}: CompanyVetWorkReportItemProps) {

  const vetworkDate = convertDateString(data.vetwork_date).shortDate
  return (
    <tr key={rowNum} className="border-bottom border-black align-middle">
      <td>{rowNum}</td>
      <td>{vetworkDate}</td>
      <td>{data.work_type}</td>
      <td>{data.disease}</td>
      <td>{data.animals_count}</td>
    </tr>
  );
}
