import { useGetVetWorkData } from "features/vetWork";

import { Col, Container, Row } from "react-bootstrap";
import { companyDoctorString } from "shared/helpers";

export function ActPDFBodyTop() {
  const data = useGetVetWorkData();
  if (!data) return;
  if (!data.companies) return;


  const doctors = data.doctors.map(
    (doctor) => `${doctor.position} ${data.clinic} ${doctor.fullname}`
  );

  const companyDoctor = data.companies[0]?.employee && companyDoctorString(
    data.companies[0]?.employee,
    data.companies[0]?.short_name
  )
  

  return (
    <Container className="mb-3">
      <Row className="mb-3">
        <Col sm={2}>Мы, нижеподписавшиеся</Col>
        <Col className="pdf-report-underlined p-1 italic">{doctors}</Col>
      </Row>
      <Row className="">
        <Col sm={2}>в присутствии</Col>
        <Col className="pdf-report-underlined p-1 italic">{companyDoctor}</Col>
      </Row>
      <Row className="text-sm text-center mb-3">
        <Col sm={3}></Col>
        <Col>(указать должность, Ф.И.О. представителя хозяйства, фермы)</Col>
      </Row>
    </Container>
  );
}
