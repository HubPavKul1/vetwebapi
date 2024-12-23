import { Container, Row, Col } from "react-bootstrap";
import { useGetVetWorkData } from "features/vetWork";
import { companyDoctorString, NoData } from "shared/index";

export function ActPDFFooter() {
  const data = useGetVetWorkData();
  if (!data) return;
  if (!data.animals) return <NoData title="Данные о животных" />;
  if (!data.companies) return <NoData title="Данные о предприятиях" />;

  const companyDoctor = data.companies[0]?.employee && companyDoctorString(
    data.companies[0].employee,
    data.companies[0].short_name
  )


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
        <Col sm={4}>{companyDoctor}</Col>
      </Row>
    </Container>
  );
}
