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
      <Container className="text-base text-left mb-1">
        <Row>
          <Col md={3}>
            <h6 className="underline">Производитель:</h6>
          </Col>
          <Col md={9}>
            <h6>{drugManufacturer}</h6>
          </Col>
        </Row>
      </Container>
      <Container className="text-base text-left mb-2">
        <Row>
          <Col md={2}>
            <h6 className="underline">Заболевания:</h6>
          </Col>
          <Col md={10}>
            <h6>{drugDiseases}</h6>
          </Col>
        </Row>
      </Container>
    </>
  );
}
