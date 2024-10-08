import { IDrugMovementDetail } from "entities/drugMovements/model/drugMovementInterfaces";
import { Container, Row, Col } from "react-bootstrap";
import { diseasesString } from "shared/helpers";


interface ReceiptPDFBodyProps {
  data: IDrugMovementDetail;
}

export function ReceiptPDFBody({ data }: ReceiptPDFBodyProps) {
  if (!data.drugs) return;
  const diseases = data.drugs.map((drug) => drug.diseases);
  const newDiseases = [].concat(...diseases);

  const diseasesUnique = diseasesString(newDiseases);

  return (
    <Container className="mb-5">
      <Row className="report-title mb-3">
        <h3>Требование-заявка № {data.id}</h3>
        <h5>на отпуск ветеринарных препаратов и диагностических наборов</h5>
      </Row>

      <Row className="pdf-report-underlined report-text mb-2 text-left">
        <Col>
          Прошу выделить ветеринарные препараты/диагностические наборы для
          проведения
        </Col>
      </Row>
      <Row className="pdf-report-underlined report-text mb-2 text-left">
        <Col md={5}>диагностических исследований / обработок против:</Col>
        <Col className="flex">{diseasesUnique}</Col>
        <Col></Col>
      </Row>
      <Row className="pdf-report-underlined report-text">
        <Col>
          животных г. Иваново в ветклинике на ул. Танкиста Белороссова, д.30А
        </Col>
      </Row>
    </Container>
  );
}
