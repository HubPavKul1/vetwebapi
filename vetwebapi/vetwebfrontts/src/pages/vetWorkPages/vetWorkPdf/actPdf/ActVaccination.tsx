import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";
import { Col, Row } from "react-bootstrap";

interface ActVaccinationProps {
  data: IVetWorkSchema;
  animals: Set<string>;
  diseases: Set<string>;
}

export default function ActVaccination({
  data,
  animals,
  diseases,
}: ActVaccinationProps) {
  if (!data.animals) return;
  return (
    <>
      <Row>
        <Col sm={3}>провели вакцинацию</Col>
        <Col sm={3} className="pdf-report-underlined p-1 italic text-center">
          {animals}
        </Col>
        <Col>против</Col>
        <Col sm={3} className="pdf-report-underlined p-1 italic text-center">
          {diseases}
        </Col>
        <Col></Col>
        <Col className="pdf-report-underlined p-1 text-center">
          {data.animals.length}
        </Col>
        <Col>голов</Col>
      </Row>
      <Row className="text-sm text-center">
        <Col sm={3}></Col>
        <Col sm={3}>(вид животных)</Col>
        <Col></Col>
        <Col sm={4}>(название заболевания)</Col>
        <Col>(количество)</Col>
        <Col></Col>
      </Row>
    </>
  );
}
