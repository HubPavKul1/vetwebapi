import { Container, Row, Col, Table } from "react-bootstrap";

import { AppService } from "../../../../app.service";

import { useState } from "react";

import { PageDetail } from "../../../../components/PageDetail";
import { IDrugReport } from "../../../../interfaces/DrugInterfaces";
import { DrugInReport } from "../../../../components/drugs/drugReports/DrugInReport";
import { DrugReportMenu } from "../../../../components/menu/DrugReportMenu";
import { DrugReportPDF } from "../drugReportPdf/DrugReportPDF";

interface Vet1BProps {
  data: IDrugReport[];
  dateStart: string;
  dateEnd: string;
  setReportActive: CallableFunction;
}

export function Vet1B({
  data,
  dateStart,
  dateEnd,
  setReportActive,
}: Vet1BProps) {
  const [pdf, setPdf] = useState(false);

  const date1 = AppService.convertDateString(dateStart);
  const date2 = AppService.convertDateString(dateEnd);

  return (
    <>
      {!pdf ? (
        <PageDetail
          title={`Отчет 1-вет В с ${date1.shortDate} по ${date2.shortDate}`}
          imgSrc="/drugsBg.jpg"
          alt="Отчет 1-вет В"
          menu={
            <DrugReportMenu setPdf={setPdf} setReportActive={setReportActive} />
          }
        >
          <Container>
            <Container>
              <Table>
                <thead>
                  <tr className="text-center border-bottom border-top border-black">
                    <th>Наименование болезни</th>
                    <th>Наименование продукции</th>
                    <th>Серия</th>
                    <th>Единицы измерения</th>
                    <th>Наличие на нач. отчет. периода</th>
                    <th>Приход за отчет. периода</th>
                    <th>Количество вакцинированных, подвергнутых диагностическим
                    исследованиям животных тыс. гол</th>
                    <th>Расход на обработку</th>
                    <th>Утилизировано</th>
                    <th>Расход с утилизацией</th>
                    <th>Осталось на конец отчет. периода</th>
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
        <DrugReportPDF
          setPdf={setPdf}
          data={data}
          dateStart={dateStart}
          dateEnd={dateEnd}
        />
      )}
    </>
  );
}
