import { Container, Row, Col } from "react-bootstrap";

import { IVetWorkSchema } from "interfaces/VetWorkInterfaces";
import { AppService } from "services/app.service";
import NoData from "components/NoData";

interface ReferralPDFHeaderProps {
  data: IVetWorkSchema;
}

export function ReferralPDFHeader({ data }: ReferralPDFHeaderProps) {
  
  if (!data.companies?.length) return <NoData title="Данные о предприятиях" />;
  if (!data.animals) return <NoData title="Данные о животных" />;


  const title = data.biomaterial === ("сыворотка крови" || "цельная кровь") ? "К ПРОБАМ КРОВИ, СЫВОРОТКИ КРОВИ (ненужное зачеркнуть)" : "К ПАТОЛОГИЧЕСКОМУ(БИОЛОГИЧЕСКОМУ) МАТЕРИАЛУ"
  const formNumber = data.biomaterial === ("сыворотка крови" || "цельная кровь") ? 1 : 0
  const companyName = data.companies[0] && data.companies[0].short_name;
  const clinic = data.clinic;
  const companyAddress = data.companies[0].address && AppService.addressString(data.companies[0].address)
    
  return (
    <Container className="mb-3">
      <Row className="mb-10">
        <Col sm={11}></Col>
        <Col>
          Ф-2{formNumber}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col sm={6} className="text-center text-lg font-bold">
          <p>
            Бюджетное государственное <br />
            учреждение Ивановской области <br />
            "Ивановская областная <br />
            ветеринарная лаборатория" <br />
            153022, г.Иваново, ул.Ташкентская д.66, <br />
            тел/факс(4932)23-46-75, 23-47-64 <br />
            mail: ivoblvetlab-info@mail.ru
            <br />
          </p>
        </Col>
        <Col sm={6}>
          <Row>
            <Col sm={2}>Заказчик</Col>
            <Col sm={10} className="pdf-report-underlined">
              {data.is_state_assignment ? clinic : companyName}
            </Col>
          </Row>
          <Row className="mb-4 text-center text-sm">
            <Col sm={2}></Col>
            <Col sm={10}>(наименование организации,</Col>
          </Row>
          <Row>
            <Col sm={12} className="pdf-report-underlined"></Col>
          </Row>
          <Row className="mb-4 text-center text-sm">
            <Col sm={2}></Col>
            <Col sm={10}>ФИО владельца животного,</Col>
          </Row>
          <Row>
            <Col sm={12} className="pdf-report-underlined">
              {!data.is_state_assignment && companyAddress}
            </Col>
          </Row>
          <Row className="mb-4 text-center text-sm">
            <Col sm={2}></Col>
            <Col sm={10}>юридический адрес, контактный телефон)</Col>
          </Row>
          <Row className="pdf-report-underlined">
            <Col sm={12}></Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col sm={2} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col sm={2} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col sm={2} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col sm={2} className="pdf-report-underlined"></Col>
      </Row>
      <Row className="text-sm text-center mb-3">
        <Col sm={2}>Регистрационный номер заявки</Col>
        <Col></Col>
        <Col sm={2}>Шифр образца</Col>
        <Col></Col>
        <Col sm={2}>Дата поступления</Col>
        <Col></Col>
        <Col sm={2}>Время поступления</Col>
      </Row>
      <Row className="text-center">
        <h5>СОПРОВОДИТЕЛЬНЫЙ ДОКУМЕНТ-ЗАЯВКА</h5>
      </Row>
      <Row className="text-center">
        <h5>{title}</h5>
      </Row>
    </Container>
  );
}
