import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { IDrugReport } from "entities/drugReport/model/drugReportInterfaces";
import { Vet1BTableItem } from "entities/drugReport";

interface Vet1BPDFBodyProps {
  data: IDrugReport[];
}

export function Vet1BPDFBody({ data }: Vet1BPDFBodyProps) {
  const rowNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <Container className="p-0">
      <Table className="report-text">
        <thead className="table-head">
          <tr>
            <th rowSpan={2}>Наименование болезни</th>
            <th rowSpan={2}>Наименование продукции</th>
            <th rowSpan={2}>Серия</th>
            <th rowSpan={2}>Ед. измер.</th>
            <th rowSpan={2}>Наличие на нач. отчет. периода (тыс.доз)</th>
            <th rowSpan={2}>Приход на конец отчет. периода (тыс.доз)</th>
            <th colSpan={2}>
              Кол-во вакцинированных, подвергнутых диагностическим исследованиям
              животных (тыс. гол.)
            </th>
            <th rowSpan={2}>Расход на обработку (тыс.доз)</th>
            <th rowSpan={2}>Утилизир-но (тыс.доз)</th>
            <th rowSpan={2}>Расход Утилизация (тыс.доз)</th>
            <th rowSpan={2}>Осталось на конец отчет. периода (тыс.доз)</th>
          </tr>
          <tr>
            <th>план</th>
            <th>факт</th>
          </tr>
          <tr>
            {rowNums.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {data.map((drug) => (
            <Vet1BTableItem key={drug.id} drug={drug} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
