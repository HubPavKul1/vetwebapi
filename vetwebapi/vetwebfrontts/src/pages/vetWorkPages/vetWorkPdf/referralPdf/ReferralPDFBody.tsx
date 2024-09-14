import { Container, Row, Col } from "react-bootstrap";
import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";
import { AppService } from "shared/services/app.service";
import { StateAssignment } from "components/StateAssignment";

interface ReferralPDFBodyProps {
  data: IVetWorkSchema;
}

export function ReferralPDFBody({ data }: ReferralPDFBodyProps) {
  if (!data.animals) return;
  if (!data.companies?.length) return;

  const date = AppService.convertDateString(data.vetwork_date);

  const animals = new Set(
    data.animals.map((animal) => animal.animal_group.toLowerCase() + ", ")
  );
  const diseases = new Set(
    data.diseases.map((disease) => disease.toLowerCase() + ", ")
  );
  const doctor = `${data.doctors[0].position} ${data.clinic} ${data.doctors[0].fullname}`;

  const companyAddress =
    data.companies[0]?.address &&
    AppService.addressString(data.companies[0].address);

  return (
    <Container>
      <Row className="text-center">
        <Col>Направляется</Col>
        <Col className="pdf-report-underlined">{data.animals.length}</Col>
        <Col sm={5}>проб крови/сыворотки крови (ненужное зачеркнуть) от</Col>
        <Col className="pdf-report-underlined">{animals}</Col>
      </Row>
      <Row className="text-center text-xs">
        <Col></Col>
        <Col>(количество)</Col>
        <Col sm={5}></Col>
        <Col>(вид животных)</Col>
      </Row>
      <Row>
        <Col sm={2}>принадлежащих</Col>
        <Col sm={10} className="pdf-report-underlined">
          {data.companies[0].full_name}
        </Col>
      </Row>
      <Row className="text-center text-xs mb-3">
        <Col sm={2}></Col>
        <Col sm={10}>
          (наименование хозяйства, предприятия, ФИО владельца животного)
        </Col>
      </Row>
      <Row>
        <Col sm={12} className="pdf-report-underlined">
          {companyAddress}
        </Col>
      </Row>
      <Row className="text-center text-xs">
        <Col sm={12}>(фактический / юридический адрес)</Col>
      </Row>
      <Row>
        <Col sm={1}>для</Col>
        <Col sm={4} className="pdf-report-underlined">
          {data.diagnostic_method}
        </Col>
        <Col sm={2} className="text-center">
          исследований на
        </Col>
        <Col className="pdf-report-underlined">{diseases}</Col>
      </Row>
      <Row className="text-center text-xs">
        <Col sm={1}></Col>
        <Col sm={4}>(вид исследований)</Col>
        <Col sm={2}></Col>
        <Col>(наименование болезни)</Col>
      </Row>
      <Row>
        <Col sm={4}>Хозяйство, бригада, отара, гурт, табун</Col>
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row className="text-center text-xs">
        <Col sm={3}></Col>
        <Col>(благополучное, неблагополучное)</Col>
      </Row>
      <Row>
        <Col sm={2}>Животное</Col>
        <Col className="pdf-report-underlined"></Col>
      </Row>
      <Row className="text-center text-xs">
        <Col sm={2}></Col>
        <Col>(вакцинировано, указать вакцину, дату вакцинации)</Col>
      </Row>
      <Row>
        <Col sm={3}>Дата, время взятия крови</Col>
        <Col className="pdf-report-underlined">{date.shortDate}</Col>
        <Col></Col>
        <Col>№ акта</Col>
        <Col className="pdf-report-underlined">{data.id}</Col>
      </Row>
      {data.is_state_assignment && <StateAssignment />}
      <Row>
        <Col sm={3}>Дата, отправки материала</Col>
        <Col className="pdf-report-underlined">{date.shortDate}</Col>
        <Col></Col>
        <Col>вид упаковки</Col>
        <Col className="pdf-report-underlined">{data.biomaterial_package}</Col>
      </Row>
      <Row>
        <Col sm={4}>Материал собран, упакован и отправлен</Col>
        <Col className="pdf-report-underlined">{doctor}</Col>
      </Row>
      <Row className="text-center text-xs">
        <Col sm={4}></Col>
        <Col>(должность, подпись, ФИО)</Col>
      </Row>
    </Container>
  );
}
