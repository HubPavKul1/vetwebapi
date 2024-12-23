import { addressString } from "entities/address/addressHelper";
import { useGetVetWorkData } from "features/vetWork";

import { Col, Container, Row } from "react-bootstrap";
import { convertDateString } from "shared/helpers";
import { ActPDFBodyTop } from "../ActPDFBodyTop";

export function SamplingActPDFBody() {
  const data = useGetVetWorkData();
  if (!data) return;
  if (!data.animals) return;
  if (!data.companies) return;

  const vetworkDate = convertDateString(data.vetwork_date);

  const disease = data.diseases[0].toLowerCase();
  const animal = data.animals[0]?.animal_group?.toLowerCase();

  const companyAddress =
    data.companies[0]?.address && addressString(data.companies[0].address);

  console.log(vetworkDate);

  return (
    <Container className="mb-5">
      <ActPDFBodyTop/>
      <Row className="mb-3">
        <Col sm={3}>провели отбор проб патматериала.</Col>
        <Col sm={1}>по адресу: </Col>
        <Col className="pdf-report-underlined p-1 italic">{companyAddress}</Col>
      </Row>
      <Row>
        <Col sm={3}>Наименование биоматериала</Col>
        <Col className="pdf-report-underlined p-1 text-center italic">
          {data.biomaterial}
        </Col>
      </Row>
      <Row className="text-sm text-center mb-3">
        <Col sm={4}></Col>
        <Col>(указать биологический материал)</Col>
      </Row>
      <Row>
        <Col sm={1}>Количество: </Col>
        <Col sm={1} className="pdf-report-underlined p-1 text-center italic">
          {data.animals.length}
        </Col>
        <Col sm={1}>проб от</Col>
        <Col className="pdf-report-underlined p-1 text-center italic">
          {animal}
        </Col>
      </Row>
      <Row className="text-sm text-center mb-3">
        <Col sm={1}></Col>
        <Col sm={1}>(количество)</Col>
        <Col sm={1}></Col>
        <Col>(вид животного)</Col>
      </Row>
      <Row className="mb-3">
        <Col sm={2}>Направляется в</Col>
        <Col className="pdf-report-underlined p-1 text-center italic">
          {data.laboratory}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={4}>Для проведения лабораторных исследований на</Col>
        <Col className="pdf-report-underlined p-1 text-center italic">
          {disease}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={2}>Метод консервации:</Col>
        <Col className="pdf-report-underlined p-1 text-center italic">
          {data.biomaterial_fixation}
        </Col>
      </Row>
      <Row>
        <Col sm={3}>Дата и время отбора проб(образцов)</Col>
        <Col className="pdf-report-underlined text-left italic">
          {vetworkDate.shortDate}
        </Col>
      </Row>
      <Row>
        <Col sm={3}>Дата отправки проб(образцов)</Col>
        <Col className="pdf-report-underlined text-left italic">
          {vetworkDate.shortDate}
        </Col>
      </Row>
    </Container>
  );
}
