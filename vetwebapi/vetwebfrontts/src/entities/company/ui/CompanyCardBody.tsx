import { Col, Container, Row } from "react-bootstrap";

interface CompanyCardBodyProps {
  address?: string;
  phone?: string;
  phone2?: string;
  employee?: string;
}

export function CompanyCardBody({
  address,
  phone,
  phone2,
  employee,
}: CompanyCardBodyProps) {
  return (
    <>
      <Container className="text-base text-left mb-1">
        <Row>
          <Col>
            <h6 className="underline">Адрес:</h6>
          </Col>
          <Col md={9}>
            <h6>{address}</h6>
          </Col>
        </Row>
      </Container>
      <Container className="text-base text-left mb-2">
        <Row>
          <Col>
            <h6 className="underline">Персонал:</h6>
          </Col>
          <Col md={9}>
            <h6>{employee}</h6>
          </Col>
        </Row>
      </Container>
      <Container className="">
        <Row>
          <Col>
            <span>тел.: {phone}</span>
          </Col>
          {phone2 && (
            <Col>
              <span>тел2.: {phone2}</span>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
