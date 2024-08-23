import { DrugReportTopText } from "components/drugs/drugReports/DrugReportTopText";
import { Container, Row, Col } from "react-bootstrap";

import { AppService } from "services/app.service";

interface ReceiptPdfHeaderProps {
  operationDate: string;
}

export function ReceiptPDFHeader({ operationDate }: ReceiptPdfHeaderProps) {
  const date = AppService.convertDateString(operationDate);

  return (
    <Container className="report-title">
      <Row>
        <Col sm={7}></Col>
        <Col className="text-left mb-3">
          <DrugReportTopText textNumber={4} />
        </Col>
      </Row>
      <Row className="mb-24">
        <Col></Col>
        <Col>
          <h5>УТВЕРЖДАЮ:</h5>
          <h5>Начальник БГУ Ивановской области</h5>
          <h5>"Ивановская городская СББЖ"</h5>
          <Row className="pdf-report-underlined my-3 ">
            <Col></Col>
            <Col>
              <h5>/ В.Н. Барашков</h5>
            </Col>
          </Row>
          <Row className="pdf-report-underlined">
            <Col>
              <h5>" {date.day} "</h5>
            </Col>
            <Col>
              <h5>{date.month}</h5>
            </Col>
            <Col>
              <h5>{date.year} г</h5>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
