import { Container, Row, Col } from "react-bootstrap";
import { IVetWorkSchema } from "../../../../interfaces/VetWorkInterfaces";

interface ReferralPDFFooterProps {
  data: IVetWorkSchema;
}

export function ReferralPDFFooter({ data }: ReferralPDFFooterProps) {
  if (!data.companies) return;

  const doctor = `${data.doctors[0].position} ${data.clinic} ${data.doctors[0].fullname}`;

  const companyDoctor = `${data.companies[0].employee?.position} ${data.companies[0].short_name} ${data.companies[0].employee?.fullname}`;

  return (
    <Container>
      <Row>
        <Col sm={3}>Испытания провести согласно:</Col>
        <Col sm={2}>Области аккредитации</Col>
        <Col sm={1} className=" border-2 border-black"></Col>
        <Col sm={2}>Вне области аккредитации</Col>
        <Col sm={1} className=" border-2 border-black"></Col>
        <Col sm={3}></Col>
      </Row>
      <Row>
        <Col sm={12}>
          Прошу оригинал / копию (ненужное зачеркнуть) результата исследования:
        </Col>
      </Row>
      <Row>
        <Col sm={2}>Выдать на руки:</Col>
        <Col sm={1} className=" border-2 border-black text-center">
          V
        </Col>
        <Col sm={9}></Col>
      </Row>
      <Row>
        <Col sm={3}>Отправить по электронной почте:</Col>
        <Col sm={1} className=" border-2 border-black text-center">
          V
        </Col>
        <Col></Col>
        <Col sm={7} className="pdf-report-underlined"></Col>
      </Row>
      <Row>
        <Col sm={5}>Количество необходимых результатов исследований:</Col>
        <Col sm={7} className="pdf-report-underlined"></Col>
      </Row>
      <Row className="text-center font-bold">
        <Col>На обработку личных данных согласен (для физ.лиц)</Col>
      </Row>
      <Row>
        <Col md={3}>Заказчик (владелец):</Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col md={1}></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col md={1}></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
      </Row>
      <Row className="text-center mb-4">
        <Col md={3}></Col>
        <Col md={2}>(подпись)</Col>
        <Col md={1}></Col>
        <Col md={2}>(расшифровка подписи)</Col>
        <Col md={1}></Col>
        <Col md={2}>(дата)</Col>
      </Row>
      <Row>
        <Col md={3}>Подпись лица, сдавшего пробы, дата:</Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col md={1}></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col md={1}></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
      </Row>
      <Row className="text-center mb-4">
        <Col md={3}></Col>
        <Col md={2}>(подпись)</Col>
        <Col md={1}></Col>
        <Col md={2}>(расшифровка подписи)</Col>
        <Col md={1}></Col>
        <Col md={2}>(дата)</Col>
      </Row>
      <Row>
        <Col md={3}>Сотрудник, принявший пробы:</Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col md={1}></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col md={1}></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
      </Row>
      <Row className="text-center mb-4">
        <Col md={3}></Col>
        <Col md={2}>(подпись)</Col>
        <Col md={1}></Col>
        <Col md={2}>(расшифровка подписи)</Col>
        <Col md={1}></Col>
        <Col md={2}>(дата)</Col>
      </Row>
      <Row>
        <Col md={3}>Отметка лаборатории:</Col>
        <Col md={3}>Доставлено проб (кол-во):</Col>
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row>
        <Col md={3}></Col>
        <Col md={3}>Забраковано проб (кол-во):</Col>
        <Col className="pdf-report-underlined"></Col>
      </Row>
    </Container>
  );
}
