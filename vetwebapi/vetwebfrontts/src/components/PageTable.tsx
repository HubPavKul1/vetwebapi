import { Table } from "react-bootstrap";

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
        <thead className={tableHeadStyle}>
          <tr>
            {props.tableHeaders.map((item, i) => (
              <th key={i}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody className={tableBodyStyle}>{props.tableItems}</tbody>
      </Table>
    </>
  );
}
