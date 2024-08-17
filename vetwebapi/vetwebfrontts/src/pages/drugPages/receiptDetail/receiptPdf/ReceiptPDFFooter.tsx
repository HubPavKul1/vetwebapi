import { Container, Row, Col } from "react-bootstrap";

export function ReceiptPDFFooter() {
  return (
    <Container className="report-text">
      <Row>
        <Col md={4}>
          <h5>Отпустил:</h5>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row className="mb-3">
        <Col md={5}>
          <h5>Уполномоченное ответственное лицо, ветеринарный врач</h5>
        </Col>
        <Col md={3} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col md={3} className="pdf-report-underlined"></Col>
      </Row>
      <Row></Row>
      <Row>
        <Col md={4}>
          <h5>Получил:</h5>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col md={5}>
          <h5>Ветврач-исполнитель</h5>
        </Col>
        <Col md={3} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col md={3} className="pdf-report-underlined"></Col>
      </Row>
      <Row>
        <Col md={5}>
          <h5>Ветврач-лаборант</h5>
        </Col>
        <Col md={3} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col md={3} className="pdf-report-underlined"></Col>
      </Row>
    </Container>
  );
}
