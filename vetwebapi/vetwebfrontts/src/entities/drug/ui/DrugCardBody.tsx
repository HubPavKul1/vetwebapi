import { Col, Container, Row } from "react-bootstrap";
import { diseasesString } from "shared/helpers";

interface DrugCardBodyProps {
  drugManufacturer: string;
  diseases: string[];
}

export function DrugCardBody({
  drugManufacturer,
  diseases,
}: DrugCardBodyProps) {
  const drugDiseases = diseasesString(diseases);
  return (
    <>
      <Container className="text-left mb-1">
        <Row>
          <Col md={1}>
            <h6 className="">Производитель:</h6>
          </Col>
          <Col md={3}></Col>
          <Col md={8}>
            <h6 className="text-sm">{drugManufacturer}</h6>
          </Col>
        </Row>
      </Container>
      <Container className="text-left mb-2">
        <Row>
          <Col md={1}>
            <h6 className="">Заболевания:</h6>
          </Col>
          <Col md={3}></Col>
          <Col md={8}>
            <h6>{drugDiseases}</h6>
          </Col>
        </Row>
      </Container>
    </>
  );
}
