import { Container, Row, Col } from "react-bootstrap";

import { AppService } from "services/app.service";
import { IVetWorkSchema } from "interfaces/VetWorkInterfaces";
import { DrugReportTopText } from "components/drugs/drugReports/DrugReportTopText";

interface AnimalsListPDFHeaderProps {
  data: IVetWorkSchema;
}

export function AnimalsListPDFHeader({ data }: AnimalsListPDFHeaderProps) {
  const date = AppService.convertDateString(data.vetwork_date).fullDate;
  const animals = new Set(
    data.animals?.map((animal) => animal.animal_group.toLowerCase() + ", ")
  );
  const diseases = new Set(
    data.diseases?.map((disease) => disease.toLowerCase() + ", ")
  );

  return (
    <Container className="mb-4">
      <Row className="mb-3">
        <Col sm={6}></Col>
        <Col>
          <DrugReportTopText textNumber={8} />
        </Col>
      </Row>
      <Row className="text-center text-lg mb-2">
        <h5>
          Опись к акту № <span className="underline">{data.id}</span>
        </h5>
      </Row>
      <Row>
        <Col sm={4} className="pdf-report-underlined p-1 italic">
          {animals}
        </Col>
        <Col className="text-center">, принадлежащих: </Col>
        <Col sm={6} className="pdf-report-underlined p-1 italic">
          Организациям и частному сектору г.Иваново
        </Col>
      </Row>
      <Row className="text-center text-sm mb-2">
        <Col sm={3}>(вид животных)</Col>
        <Col></Col>
        <Col sm={6}></Col>
      </Row>
      <Row>
        <Col sm={3}>подвергнутых обработке против</Col>
        <Col sm={4} className="pdf-report-underlined p-1 italic">
          {diseases}
        </Col>
        <Col></Col>
        <Col sm={3} className="pdf-report-underlined p-1 italic">
          {date}
        </Col>
      </Row>
    </Container>
  );
}
