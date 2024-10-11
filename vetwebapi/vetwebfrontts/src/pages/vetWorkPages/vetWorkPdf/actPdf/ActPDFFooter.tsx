import { Container, Row, Col } from "react-bootstrap";

import { IVetWorkPageContext } from "features/vetWork/models/interfaces";
import { useContext } from "react";
import { VetWorkPageContext } from "features/vetWork";

export function ActPDFFooter() {
  const context: IVetWorkPageContext = useContext(VetWorkPageContext);
  const data = context.data;
  if (!data.animals) return;
  if (!data.drug) return;
  if (!data.companies) return;

  return (
    <Container className="">
      <Row>
        <Col sm={3}>Подписи:</Col>
      </Row>
      {data.doctors.map((doctor) => (
        <Row key={doctor.id} className="mb-2">
          <Col sm={3}></Col>
          <Col sm={2} className="pdf-report-underlined"></Col>
          <Col sm={4}>{doctor.fullname}</Col>
        </Row>
      ))}
      <Row>
        <Col sm={3}></Col>
        <Col sm={2} className="pdf-report-underlined"></Col>
        <Col sm={4}>{data.companies[0].employee?.fullname}</Col>
      </Row>
    </Container>
  );
}
