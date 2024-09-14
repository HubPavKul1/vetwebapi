import { Container, Row, Col } from "react-bootstrap";

import { AppService } from "shared/services/app.service";

export function DrugReportPDFFooter() {
  const today = new Date().toISOString().slice(0, 10);

  const reportDate = AppService.convertDateString(today).shortDate;

  return (
    <Container className="report-text">
      <Row>
        <Col md={3}>Руководитель:</Col>
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
        <Col md={3}>Главный бухгалтер:</Col>
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
        <Col md={3}>Исполнитель:</Col>
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
      <Row className="text-center">
        <Col md={3} className="pdf-report-underlined"></Col>
        <Col md={6}></Col>
        <Col md={3} className="pdf-report-underlined">
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
