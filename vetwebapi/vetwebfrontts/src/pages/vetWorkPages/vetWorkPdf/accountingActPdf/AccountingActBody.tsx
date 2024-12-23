import { useGetVetWorkData } from "features/vetWork";

import { Col, Container, Row } from "react-bootstrap";
import { ActPDFBodyTop } from "../ActPDFBodyTop";

export function AccountingActBody() {
  const data = useGetVetWorkData();
  if (!data) return;
  if (!data.animals) return;
  if (!data.drug) return;
  if (!data.companies) return;
  

  const animal = data.animals[0].animal_group.toLowerCase();

  const administrMethod =
    animal !== "лошади" ? "внутрикожно" : "методом офтальмопробы";

  let accountingTime = "";

  animal === "лошади" && !data.is_primary
    ? (accountingTime = "3, 6, 9, 12")
    : animal === "лошади" && data.is_primary
    ? (accountingTime = "6, 9, 12, 24")
    : (accountingTime = "72");

  return (
    <Container className="mb-5">
      <ActPDFBodyTop/>
      <Row className="mb-3">
        <Col sm={3}>Составили настоящий акт о том, что</Col>
        <Col className="pdf-report-underlined p-1"></Col>
        <Col sm={8}>
          нами проведены клинический осмотр и учет реакции на туберкулин
          введенный {administrMethod}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="pdf-report-underlined p-1 text-center">
          {data.animals.length}
        </Col>
        <Col>голов</Col>
        <Col sm={8}></Col>
      </Row>
      <Row className="text-center mb-3">
        <Col>Туберкулин введен</Col>
        <Col className="pdf-report-underlined p-1 text-center"></Col>
        <Col sm={1}>в</Col>
        <Col className="pdf-report-underlined p-1 text-center"></Col>
        <Col sm={6}></Col>
      </Row>
      <Row className="mb-3">
        <Col>
          Учет реакции проведен через {accountingTime} ч после введения
          туберкулина
        </Col>
      </Row>
      <Row>
        <Col sm={3}>Выявлено положительных</Col>
        <Col sm={1} className="pdf-report-underlined text-center"></Col>
        <Col sm={6}>Опись прилагается.</Col>
        <Col sm={2}></Col>
      </Row>
    </Container>
  );
}
