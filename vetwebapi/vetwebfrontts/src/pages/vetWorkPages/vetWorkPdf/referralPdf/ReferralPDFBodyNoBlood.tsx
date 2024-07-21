import { Container, Row, Col } from "react-bootstrap";
import { IVetWorkSchema } from "../../../../interfaces/VetWorkInterfaces";
import { AppService } from "../../../../app.service";
import { StateAssignment } from "../../../../components/StateAssignment";
import NoData from "../../../../components/NoData";

interface ReferralPDFBodyNoBloodProps {
  data: IVetWorkSchema;
}

export function ReferralPDFBodyNoBlood({ data }: ReferralPDFBodyNoBloodProps) {
  if (!data.animals) return <NoData title="Данные о животных" />;
  if (!data.companies?.length) return <NoData title="Данные о предприятиях" />;

  const date = AppService.convertDateString(data.vetwork_date);

  const animals = new Set(
    data.animals.map((animal) => animal.animal_group.toLowerCase() + ", ")
  );
  const diseases = new Set(
    data.diseases.map((disease) => disease.toLowerCase() + ", ")
  );
  const doctor = `${data.doctors[0].position} ${data.clinic} ${data.doctors[0].fullname}`;

  const companyAddress =
    data.companies[0].address &&
    AppService.addressString(data.companies[0].address);

  return (
    <Container>
      <Row className="font-bold">
        <Col md={3}>Направляется для исключения</Col>
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
        <Col className="font-bold">Патологический (биологический) материал (указать наименование материала, количество материала):</Col>
      </Row>
      <Row className="mb-3">
        <Col className="pdf-report-underlined">{data.biomaterial}</Col>
      </Row>
      <Row className="font-bold">
        <Col md={1}>От:</Col>
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row className="text-center text-sm mb-2">
        <Col md={1}></Col>
        <Col>(вид и возраст животного)</Col>
      </Row>
      <Row className="font-bold">
        <Col md={2}>Принадлежащего:</Col>
        <Col className="pdf-report-underlined">{data.companies[0].short_name}</Col>
      </Row>
      <Row className="text-center text-sm mb-2">
        <Col sm={2}></Col>
        <Col>
          (наименование организации, хозяйства, предприятия, ФИО владельца животного)
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
        <Col sm={3}>Дата заболевания животного</Col>
        <Col sm={3} className="pdf-report-underlined">
        </Col>
        <Col sm={2} className="text-center">
          Дата падежа
        </Col>
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row className="font-bold mb-4">
        <Col sm={2}>Клиническая картина</Col>
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row className="pdf-report-underlined mb-2">
        <Col ></Col>
      </Row>
      <Row className="font-bold mb-4">
        <Col sm={4}>Данные патологоанатомического вскрытия</Col>
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row className="pdf-report-underlined mb-2">
        <Col ></Col>
      </Row>
      <Row className="font-bold mb-3">
        <Col sm={3}>Предположительный диагноз</Col>
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row>
        <Col className="font-bold">Дата, время отбора</Col>
        <Col className="pdf-report-underlined">{date.shortDate}</Col>
        <Col></Col>
        <Col className="font-bold">№ акта</Col>
        <Col className="pdf-report-underlined">{data.id}</Col>
      </Row>
      {data.is_state_assignment && <StateAssignment />}
      <Row>
        <Col className="font-bold">Дата, отправки материала</Col>
        <Col className="pdf-report-underlined">{date.shortDate}</Col>
        <Col></Col>
        <Col className="font-bold">вид упаковки</Col>
        <Col className="pdf-report-underlined">{data.biomaterial_package}</Col>
      </Row>
      <Row>
        <Col sm={4} className="font-bold">Материал собран, упакован и отправлен</Col>
        <Col className="pdf-report-underlined">{doctor}</Col>
      </Row>
      <Row className="text-center text-sm">
        <Col sm={4}></Col>
        <Col>(должность, подпись, ФИО)</Col>
      </Row>
    </Container>
  );
}
