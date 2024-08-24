import { IVetWorkSchema } from "interfaces/VetWorkInterfaces";
import { Col, Row } from "react-bootstrap";

interface ActTBCCowsProps {
  data: IVetWorkSchema;
  vetworkDate: string;
}

export default function ActTBCCows({ data, vetworkDate }: ActTBCCowsProps) {
  if (!data.animals) return;
  return (
    <div className="mb-3">
      <Row>
        <Col sm={4}>Составили настоящий акт о том, что в период с</Col>
        <Col sm={1} className="pdf-report-underlined mb-2 p-1 text-center">
          {vetworkDate}
        </Col>
        <Col sm={1} className="text-center">
          по
        </Col>
        <Col
          sm={2}
          className="pdf-report-underlined mb-2 p-1 text-center"
        ></Col>
        <Col>нами проведены клинический осмотр и</Col>
      </Row>

      <Row>
        <Col sm={7}>
          аллергическое исследование на туберкулез методом внутрикожной
          аллергической пробы
        </Col>
        <Col className="pdf-report-underlined mb-2 p-1 text-center">
          {data.animals.length}
        </Col>
        <Col>голов крупного рогатого скота</Col>
      </Row>
      <Row className="font-bold mb-3">
        <Col>
          Учет реакции провести через 72 часа после введения туберкулина.
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>При учете реакции на введение туберкулина выявлено:</Col>
      </Row>
      <Row className="mb-3">
        <Col>Положительно реагирующих</Col>
        <Col sm={4} className="pdf-report-underlined mb-2 p-1"></Col>
        <Col>голов</Col>
        <Col></Col>
      </Row>
      <Row className="mb-3">
        <Col>Отрицательно реагирующих</Col>
        <Col sm={4} className="pdf-report-underlined mb-2 p-1"></Col>
        <Col>голов</Col>
        <Col></Col>
      </Row>
    </div>
  );
}
