import { Col, Row } from "react-bootstrap";

export function AnimalsListPDFFooter() {
  return (
    <div>
      <Row>
        <Col md={3}></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </div>
  );
}
