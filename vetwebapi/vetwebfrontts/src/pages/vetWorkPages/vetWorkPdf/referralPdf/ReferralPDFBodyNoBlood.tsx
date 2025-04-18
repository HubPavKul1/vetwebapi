import { Container, Row, Col } from "react-bootstrap";
import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";
import { StateAssignment } from "shared/index";
import { convertDateString } from "shared/helpers";
import { addressString } from "entities/address/addressHelper";

interface ReferralPDFBodyNoBloodProps {
  data: IVetWorkSchema;
}

export function ReferralPDFBodyNoBlood({ data }: ReferralPDFBodyNoBloodProps) {
  if (!data.animals) return;
  if (!data.companies?.length) return;

  const date = convertDateString(data.vetwork_date);

  const diseases = new Set(
    data.diseases.map((disease) => disease.toLowerCase() + ", ")
  );
  const doctor = `${data.doctors[0].position} ${data.clinic} ${data.doctors[0].fullname}`;

  const companyAddress =
    data.companies[0].address && addressString(data.companies[0].address);

  return (
    <Container className="text-lg mb-3">
      {data.is_state_assignment && <StateAssignment />}
      <Row className="font-bold">
        <Col md={4}>Направляется для исключения</Col>
        <Col className="pdf-report-underlined">{diseases}</Col>
      </Row>
      <Row className="text-center text-sm mb-3">
        <Col md={2}></Col>
        <Col>(наименование заболевания)</Col>
      </Row>
      <Row className="mb-3">
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row className="mb-2">
        <Col className="font-bold">
          Патологический (биологический) материал (указать наименование
          материала, количество материала):
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="pdf-report-underlined">{data.biomaterial}</Col>
      </Row>
      <Row className="font-bold">
        <Col md={1}>От:</Col>
        <Col className="pdf-report-underlined">Опись прилагается</Col>
      </Row>
      <Row className="text-center text-sm mb-2">
        <Col md={1}></Col>
        <Col>(вид и возраст животного)</Col>
      </Row>
      <Row className="font-bold">
        <Col md={2}>Принадлежащего:</Col>
        <Col className="pdf-report-underlined">
          {data.companies[0].short_name}
        </Col>
      </Row>
      <Row className="text-center text-sm mb-2">
        <Col sm={2}></Col>
        <Col>
          (наименование организации, хозяйства, предприятия, ФИО владельца
          животного)
        </Col>
      </Row>
      <Row>
        <Col sm={12} className="pdf-report-underlined font-bold">
          <h5 className="mb-1">{companyAddress}</h5>
        </Col>
      </Row>
      <Row className="text-center text-sm">
        <Col sm={12}>(фактический / юридический адрес)</Col>
      </Row>
      <Row className="font-bold mb-2">
        <Col sm={4}>Дата заболевания животного</Col>
        <Col sm={3} className="pdf-report-underlined"></Col>
        <Col sm={2} className="text-center">
          Дата падежа
        </Col>
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row className="font-bold mb-4">
        <Col sm={3}>Клиническая картина</Col>
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row className="pdf-report-underlined mb-2">
        <Col></Col>
      </Row>
      <Row className="font-bold mb-4">
        <Col sm={5}>Данные патологоанатомического вскрытия</Col>
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row className="pdf-report-underlined mb-2">
        <Col></Col>
      </Row>
      {/* <Row className="font-bold mb-3">
        <Col sm={3}>Предположительный диагноз</Col>
        <Col className="pdf-report-underlined"></Col>
      </Row> */}
      <Row className="font-bold mb-3">
        <Col sm={3}>Место отбора</Col>
        <Col className="pdf-report-underlined">{companyAddress}</Col>
      </Row>
      <Row>
        <Col sm={3} className="font-bold">
          Дата, время отбора
        </Col>
        <Col className="pdf-report-underlined">{date.shortDate}</Col>
        <Col sm={1} className="font-bold">
          № акта
        </Col>
        <Col className="pdf-report-underlined">{data.id}</Col>
      </Row>
      <Row>
        <Col className="font-bold">Дата, отправки материала</Col>
        <Col className="pdf-report-underlined">{date.shortDate}</Col>
        <Col sm={2} className="font-bold">
          Вид упаковки
        </Col>
        <Col className="pdf-report-underlined">{data.biomaterial_package}</Col>
      </Row>
      <Row>
        <Col sm={5} className="font-bold">
          Материал собран, упакован и отправлен
        </Col>
        <Col className="pdf-report-underlined">{doctor}</Col>
      </Row>
      <Row className="text-center text-sm">
        <Col sm={4}></Col>
        <Col>(должность, подпись, ФИО)</Col>
      </Row>
    </Container>
  );
}
