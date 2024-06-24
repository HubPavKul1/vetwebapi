import { Container, Row, Col } from "react-bootstrap";

import { AppService } from "../../../../app.service";

import { useState } from "react";

import { PageDetail } from "../../../../components/PageDetail";
import { ReceiptPageMenu } from "../../../../components/menu/ReceiptPageMenu";
import { IDrugReport } from "../../../../interfaces/DrugInterfaces";
import { DrugInReport } from "../../../../components/drugs/drugReports/DrugInReport";
import { DrugReportMenu } from "../../../../components/menu/DrugReportMenu";

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
              <Row className="border-top border-bottom border-black">
                <Col xs={2}>Наименование препарата</Col>
                <Col>Серия</Col>
                <Col>Годен до</Col>
                <Col>Кол-во упаковок на начало отчетного периода</Col>
                <Col>Кол-во единиц учета на начало отчетного периода</Col>
                <Col>Кол-во упаковок получено за отчетный период</Col>
                <Col>Кол-во единиц учета получено за отчетный период</Col>
                <Col>Кол-во упаковок израсходовано за отчетный период</Col>
                <Col>Кол-во единиц учета израсходовано за отчетный период</Col>
                <Col>Кол-во единиц учета утилизировано за отчетный период</Col>
                <Col>Кол-во упаковок на конец отчетного периода</Col>
                <Col>Кол-во единиц учета на конец отчетного периода</Col>
              </Row>
              {data.length &&
                data.map((drug) => <DrugInReport key={drug.id} drug={drug} />)}
            </Container>
          </Container>
        </PageDetail>
      ) : (
        // <ReceiptPDF setPdf={setPdf} data={data} />
        <h1>PDF</h1>
      )}
    </>
  );
}
