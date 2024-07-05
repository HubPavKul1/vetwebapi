import { Table } from "react-bootstrap";

import { ITableHeaders } from "../../../interfaces/BaseInterface";

interface ReportPageTableProps {
  reportHeaders: ITableHeaders[];
  reportItems: React.ReactElement;
}

export function ReportPageTable({ ...props }: ReportPageTableProps) {
  return (
    <>
      <Table className="table-report">
        <thead>
          <tr className="border-bottom border-top border-black">
            {props.reportHeaders.map((item) => (
              <th key={item.id}>{item.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>{props.reportItems}</tbody>
      </Table>
    </>
  );
}
