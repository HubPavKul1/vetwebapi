import { Table } from "react-bootstrap";
import clsx from "clsx";

interface PageTableProps {
  tableHeaders: string[];
  tableItems?: React.ReactElement | React.ReactNode;
  isDrugReport?: boolean;
}

export function PageTable({ ...props }: PageTableProps) {
  const tableHeadStyle = props.isDrugReport
    ? "table-head-report"
    : "table-head";
  const tableBodyStyle = props.isDrugReport
    ? "table-body-report"
    : "table-body";

  return (
    <>
      <Table>
        <thead
          className={clsx(
            props.isDrugReport ? "table-head-report" : "table-head"
          )}
        >
          <tr>
            {props.tableHeaders.map((item, i) => (
              <th key={i}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody
          className={clsx(
            props.isDrugReport ? "table-body-report" : "table-body"
          )}
        >
          {props.tableItems}
        </tbody>
      </Table>
    </>
  );
}
