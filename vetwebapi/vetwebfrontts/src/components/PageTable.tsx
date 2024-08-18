import { Table } from "react-bootstrap";

interface PageTableProps {
  tableHeaders: string[];
  tableItems?: React.ReactElement | React.ReactNode;
}

export function PageTable({ ...props }: PageTableProps) {
  return (
    <>
      <Table>
        <thead className="table-head text-xs">
          <tr>
            {props.tableHeaders.map((item, i) => (
              <th key={i}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body text-xs ">{props.tableItems}</tbody>
      </Table>
    </>
  );
}
