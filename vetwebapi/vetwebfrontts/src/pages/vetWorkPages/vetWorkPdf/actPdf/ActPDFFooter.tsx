import { Container, Row, Col } from "react-bootstrap";

import { IVetWorkSchema } from "../../../../interfaces/VetWorkInterfaces";

import NoData from "../../../../components/NoData";

interface ActPDFFooterProps {
  data: IVetWorkSchema;
}

export function ActPDFFooter({ data }: ActPDFFooterProps) {
  if (!data.animals) return <NoData title="Данные о животных" />;
  if (!data.drug) return <NoData title="Данные о препаратах" />;
  if (!data.companies) return <NoData title="Данные о предприятиях" />;

  

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
