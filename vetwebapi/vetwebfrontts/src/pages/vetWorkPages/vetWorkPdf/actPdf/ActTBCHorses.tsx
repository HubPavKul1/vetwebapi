import { IVetWorkSchema } from "interfaces/VetWorkInterfaces";
import { Col, Row } from "react-bootstrap";

interface ActTBCHorsesProps {
  data: IVetWorkSchema;
  vetworkDate: string;
}

export default function ActTBCHorses({ data, vetworkDate }: ActTBCHorsesProps) {
  if (!data.animals) return;

  return (
    <>
      <Row>
        <Col>Составили настоящий акт о том, что</Col>
        <Col className="pdf-report-underlined mb-2 p-1">{vetworkDate}</Col>
        <Col>нами проведены клинический осмотр и</Col>
      </Row>
      <Row>
        <Col sm={6}>
          аллергическое исследование на туберкулез методом офтальмопробы
        </Col>
        <Col className="pdf-report-underlined mb-2 p-1">
          {data.animals.length}
        </Col>
        <Col>голов лошадей</Col>
        <Col sm={2}></Col>
      </Row>
      <Row>
        <Col sm={2}>Туберкулин введен</Col>
        <Col sm={2} className="pdf-report-underlined mb-2 p-1">
          {vetworkDate}
        </Col>
        <Col>в</Col>
        <Col className="pdf-report-underlined mb-2 p-1">8 - 00</Col>
        <Col sm={6}></Col>
      </Row>
      <Row>
        {!data.is_primary ? (
          <Col>
            Учет реакции провести через 3, 6, 9, 12 часов после введения
            туберкулина.
          </Col>
        ) : (
          <Col>
            Учет реакции провести через 6, 9, 12 и 24 часа после введения
            туберкулина.
          </Col>
        )}
      </Row>
    </>
  );
}
