import { DrugReportTopText } from "entities/drugReport/ui/DrugReportTopText";
import { Container, Row, Col } from "react-bootstrap";
import { convertDateString } from "shared/helpers";

interface DrugReportPDFHeaderProps {
  dateEnd: string;
}

export function DrugReportPDFHeader({ dateEnd }: DrugReportPDFHeaderProps) {
  const endDate = convertDateString(dateEnd);

  return (
    <Container className="report-title">
      <Row className="mb-8">
        <Col sm={7}></Col>
        <Col>
          <DrugReportTopText textNumber={2} />
        </Col>
      </Row>
      <Container className="report-title italic">
        <Row>
          <Col sm={4}></Col>
          <Col>
            <h5>СВЕДЕНИЯ</h5>
          </Col>
          <Col sm={4}></Col>
        </Row>
        <Row>
          <Col sm={2}></Col>
          <Col>
            о движении ветеринарных препаратов, полученных за счет федерального
            бюджета
          </Col>
          <Col sm={2}></Col>
        </Row>
        <Row>
          <Col sm={2}></Col>
          <Col>
            по БГУ Ивановской области "Ивгор СББЖ" за {endDate.month}{" "}
            {endDate.year}
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>
    </Container>
  );
}
