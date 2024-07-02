import { Container, Row, Col, Table } from "react-bootstrap";

import { AppService } from "../../../../app.service";

import { useState } from "react";

import { PageDetail } from "../../../../components/PageDetail";
import { IDrugReport } from "../../../../interfaces/DrugInterfaces";
import { DrugInReport } from "../../../../components/drugs/drugReports/DrugInReport";
import { DrugReportMenu } from "../../../../components/menu/DrugReportMenu";
import { DrugReportPDF } from "../drugReportPdf/DrugReportPDF";

interface DrugReportProps {
  data: IDrugReport[];
  dateStart: string;
  dateEnd: string;
  setReportActive: CallableFunction;
}

export function DrugReport({
  data,
  dateStart,
  dateEnd,
  setReportActive,
}: DrugReportProps) {
  const [pdf, setPdf] = useState(false);

  const date1 = AppService.convertDateString(dateStart);
  const date2 = AppService.convertDateString(dateEnd);

  return (
    <>
      {!pdf ? (
        <PageDetail
          title={`Движение биопрепаратов с ${date1.shortDate} по ${date2.shortDate}`}
          imgSrc="/drugsBg.jpg"
          alt="Движение биопрепаратов"
          menu={
            <DrugReportMenu setPdf={setPdf} setReportActive={setReportActive} />
          }
        >
          <Container>
            <Container>
              <Table>
                <thead>
                  <tr>
                    <th>Наименование продукции</th>
                    <th>Серия</th>
                    <th>Годен до</th>
                    <th>Единицы учета</th>
                    <th>Упак. на нач. отчет. периода</th>
                    <th>Ед. учета на нач. отчет. периода</th>
                    <th>Упак. получено за отчет. период</th>
                    <th>Ед. учета получено за отчет. период</th>
                    <th>Упак. израсход. за отчет. период</th>
                    <th>Ед. учета израсход. за отчет. период</th>
                    <th>Ед. учета утилиз-но за отчет. период</th>
                    <th>Упак. на конец отчет. периода</th>
                    <th>Ед. учета на конец отчет. периода</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length &&
                  data.map((drug) => <DrugInReport key={drug.id} drug={drug} />)}
                </tbody>
              </Table>
            </Container>
          </Container>
        </PageDetail>
      ) : (
        <DrugReportPDF setPdf={setPdf} data={data} dateStart={dateStart} dateEnd={dateEnd}/>
      )}
    </>
  );
}
