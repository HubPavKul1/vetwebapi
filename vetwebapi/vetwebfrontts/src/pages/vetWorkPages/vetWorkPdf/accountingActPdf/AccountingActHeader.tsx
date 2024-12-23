import { Container, Row, Col } from "react-bootstrap";

import { DrugReportTopText } from "entities/drugReport/ui/DrugReportTopText";
import { NoData } from "shared/index";
import { convertDateString } from "shared/helpers";
import { useGetVetWorkData } from "features/vetWork";

export function AccountingActHeader() {
  const data = useGetVetWorkData();
  if (!data) return;
  if (!data.companies) return <NoData title="Данные о предприятиях" />;
  if (!data.animals) return <NoData title="Данные о животных" />;
  if (!data.drug) return <NoData title="Данные" />;

  const date = convertDateString(data.vetwork_date);
  

  const animals = data.animals[0].animal_group.toLowerCase();

  return (
    <Container className="mb-5">
      <Row className="mb-5">
        <Col sm={6}></Col>
        <Col>
          <DrugReportTopText textNumber={5} />
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
      <Row>
        {animals === "лошади" && (
          <Col className="text-center italic">
            о проведении учета реакции на введенный туберкулин лошадям
          </Col>
        )}
        {animals === "крупный рогатый скот" && (
          <Col className="text-center italic">
            о проведении учета реакции на введенный туберкулин крс
          </Col>
        )}
      </Row>
      <Row>
        <Col sm={7}></Col>
        <Col className="text-right">от</Col>
        <Col sm={4} className="pdf-report-underlined mb-2 p-1 italic">
          {date.fullDate}
        </Col>
      </Row>
      <Row>
        <Col sm={2}></Col>
        <Col className="text-right">населенный пункт</Col>
        <Col sm={4} className="pdf-report-underlined mb-2 p-1 italic">
          {data.companies ? data.companies[0].address?.city : "г. Иваново"}
        </Col>
      </Row>
      <Row>
        <Col sm={2}></Col>
        <Col className="text-right">хозяйство</Col>
        <Col sm={4} className="pdf-report-underlined mb-2 p-1 italic">
          частный сектор и организации г. Иваново
        </Col>
      </Row>
      <Row>
        <Col sm={2}></Col>
        <Col className="text-right">район</Col>
        <Col sm={4} className="pdf-report-underlined mb-2 p-1 italic">
          {data.companies ? data.companies[0].address?.district : ""}
        </Col>
      </Row>
      <Row>
        <Col sm={2}></Col>
        <Col className="text-right">область</Col>
        <Col sm={4} className="pdf-report-underlined mb-2 p-1 italic">
          Ивановская обл.
        </Col>
      </Row>
    </Container>
  );
}
