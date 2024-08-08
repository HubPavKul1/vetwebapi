import { Table } from "react-bootstrap";


interface PageTableProps {
  reportHeaders: string[];
  reportItems?: React.ReactElement | React.ReactNode;
}

export function PageTable({ ...props }: PageTableProps) {
  return (
    <>
      <Table >
        <thead>
          <tr className="border border-black text-center font-bold">
            {props.reportHeaders.map((item, i) => (
              <th  key={i}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{props.reportItems}</tbody>
      </Table>
    </>
  );
}
