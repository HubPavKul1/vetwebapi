import { Table } from "react-bootstrap";

interface PageTableProps {
  reportHeaders: string[];
  reportItems?: React.ReactElement | React.ReactNode;
}

export function PageTable({ ...props }: PageTableProps) {
  return (
    <>
      <Table>
        <thead className="table-head text-xs">
          <tr>
            {props.reportHeaders.map((item, i) => (
              <th key={i}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body text-xs ">{props.reportItems}</tbody>
      </Table>
    </>
  );
}
