import { Container, Row, Col } from "react-bootstrap";

import { AppService } from "services/app.service";

export function Vet1BPDFFooter() {
  const today = new Date().toISOString().slice(0, 10);

  const reportDate = AppService.convertDateString(today).shortDate;

  return (
    <Container className="report-text">
      <Row>
        <Col md={3}>Начальник:</Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col md={1}></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col md={1}></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
      </Row>
      <Row className="text-center mb-2">
        <Col md={3}></Col>
        <Col md={2}>(Ф.И.О)</Col>
        <Col md={1}></Col>
        <Col md={2}>(подпись)</Col>
        <Col md={1}></Col>
        <Col md={2}></Col>
      </Row>
      <Row>
        <Col md={3}>Должностное лицо ответственное за составление формы:</Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col md={1}></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col md={1}></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
      </Row>
      <Row className="text-center mb-4">
        <Col md={3}></Col>
        <Col md={2}>(должность)</Col>
        <Col md={1}></Col>
        <Col md={2}>(Ф.И.О)</Col>
        <Col md={1}></Col>
        <Col md={2}>(подпись)</Col>
      </Row>
      <Row>
        <Col md={3} className="pdf-report-underlined"></Col>
        <Col md={6}></Col>
        <Col md={3} className="pdf-report-underlined text-center">
          {reportDate}
        </Col>
      </Row>
      <Row className="text-center mb-4">
        <Col md={3}>(номер контактного телефона)</Col>
        <Col md={6}></Col>
        <Col md={3}>(дата составления документа)</Col>
      </Row>
    </Container>
  );
}
