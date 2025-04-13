import { ICompanyVetWorksReport } from "features/vetWork/models/interfaces";
import { Link } from "react-router-dom";
import { convertDateString } from "shared/helpers";
import { vetWorkLink } from "shared/index";

interface CompanyVetWorkReportItemProps {
  data: ICompanyVetWorksReport;
  rowNum: number;
}

export function CompanyVetWorkReportItem({
  data,
  rowNum,
}: CompanyVetWorkReportItemProps) {
  const vetworkDate = convertDateString(data.vetwork_date).shortDate;
  return (
    
      <tr key={rowNum} className="border-bottom border-black align-middle">
        <td>{rowNum}</td>
        <td><Link to={vetWorkLink(data.vetwork_id)}><span className="hover:text-red-500 underline">{vetworkDate}</span></Link></td>
        <td>{data.work_type}</td>
        <td>{data.disease}</td>
        <td>{data.animals_count}</td>
      </tr>
    
  );
}
