import { Container, Row, Col } from "react-bootstrap";

import { DrugReportTopText } from "entities/drugReport/ui/DrugReportTopText";
import { NoData } from "shared/index";
import { convertDateString } from "shared/helpers";
import { useGetVetWorkData } from "features/vetWork";

export function BloodActPDFHeader() {
  const data = useGetVetWorkData();
  if (!data) return;
  if (!data.companies) return <NoData title="Данные" />;
  if (!data.animals) return <NoData title="Данные" />;

  const date = convertDateString(data.vetwork_date);
  

  return (
    <Container className="mb-5">
      <Row className="mb-5">
        <Col sm={6}></Col>
        <Col>
          <DrugReportTopText textNumber={7} />
        </Col>
      </Row>
      <Row className="text-center text-lg font-bold">
        <Col sm={4}></Col>
        <Col>
          <h5>
            Акт № <span className="underline">{data.id}</span>
          </h5>
        </Col>
        <Col sm={4}></Col>
      </Row>
      <Row className="text-center">
        <Col></Col>
        <Col md={6}>отбора проб (образцов) сыворотки крови</Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col className="text-right">от</Col>
        <Col
          sm={2}
          className="pdf-report-underlined mb-2 p-1 italic text-center"
        >
          {date.fullDate}
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
