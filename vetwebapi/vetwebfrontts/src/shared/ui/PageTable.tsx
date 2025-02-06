import { Table } from "react-bootstrap";
import clsx from "clsx";

interface PageTableProps {
  tableHeaders: string[];
  tableItems?: React.ReactElement | React.ReactNode;
  isPDF?: boolean;
}

export function PageTable({ ...props }: PageTableProps) {
  return (
    <>
      <Table>
        <thead
          className={clsx(
            props.isPDF ? "table-head-report" : "page-table-head"
          )}
        >
          <tr>
            {props.tableHeaders.map((item, i) => (
              <th key={i}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody
          className={clsx(props.isPDF ? "table-body-report" : "table-body")}
        >
          {props.tableItems}
        </tbody>
      </Table>
    </>
  );
}
