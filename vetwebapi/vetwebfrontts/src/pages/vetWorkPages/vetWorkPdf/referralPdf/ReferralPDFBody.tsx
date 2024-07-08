import { Container, Row, Col } from "react-bootstrap";
import { IVetWorkSchema } from "../../../../interfaces/VetWorkInterfaces";
import { AppService } from "../../../../app.service";

interface ReferralPDFBodyProps {
  data: IVetWorkSchema;
}

export function ReferralPDFBody({ data }: ReferralPDFBodyProps) {
  if (!data.animals) return;
//   if (!data.drug) return;
  if (!data.companies) return;

  
  const animals = new Set(
    data.animals.map((animal) => animal.animal_group.toLowerCase() + ", ")
  );
  const diseases = new Set(
    data.diseases.map((disease) => disease.toLowerCase() + ", ")
  );


  return (
    <Container >
      <Row>
        <Col>Направляется</Col>
        <Col className="pdf-report-underlined">{data.animals.length}</Col>
        <Col></Col>
        <Col sm={4}>проб крови/сыворотки крови (ненужное зачеркнуть) от</Col>
        <Col className="pdf-report-underlined">{animals}</Col>
      </Row>
      {/* <Container >
        <Row>
          <Col sm={3}>Подписи:</Col>
        </Row> */}
        {/* {data.doctors.map((doctor) => (
          <Row>
            <Col sm={3}></Col>
            <Col sm={2} ></Col>
            <Col sm={4}></Col>
          </Row>
        ))} */}
        {/* <Row>
          <Col sm={3}></Col>
          <Col sm={2} ></Col>
          <Col sm={4}>{data.companies[0].employee?.fullname}</Col>
        </Row> */}
      {/* </Container> */}
    </Container>
  );
}
