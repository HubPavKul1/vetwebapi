import { Table } from "react-bootstrap";


interface ReportPageTableProps {
  reportHeaders: string[];
  reportItems?: React.ReactElement;
}

export function PageTable({ ...props }: ReportPageTableProps) {
  return (
    <>
      <Table className="table-report">
        <thead>
          <tr>
            {props.reportHeaders.map((item, i) => (
              <th key={i}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{props.reportItems}</tbody>
      </Table>
    </>
  );
}
