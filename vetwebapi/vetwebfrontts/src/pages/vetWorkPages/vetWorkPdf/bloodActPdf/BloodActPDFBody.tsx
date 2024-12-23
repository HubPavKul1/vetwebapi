import { addressString } from "entities/address/addressHelper";
import { useGetVetWorkData } from "features/vetWork";

import { Col, Container, Row } from "react-bootstrap";
import { companyDoctorString, convertDateString } from "shared/helpers";

export function BloodActPDFBody() {
  const data = useGetVetWorkData();
  if (!data) return;
  if (!data.animals) return;
  if (!data.companies) return;

  const vetworkDate = convertDateString(data.vetwork_date);

  const disease = data.diseases[0].toLowerCase();
  const animal = data.animals[0]?.animal_group?.toLowerCase();

  const doctors = data.doctors.map(
    (doctor) => `${doctor.position} ${data.clinic} ${doctor.fullname}`
  );

  const companyDoctor = data.companies[0]?.employee && companyDoctorString(
      data.companies[0].employee,
      data.companies[0].short_name
    )
  

  const companyAddress =
    data.companies[0]?.address && addressString(data.companies[0].address);

  console.log(vetworkDate);

  return (
    <Container className="mb-5">
      <Row className="mb-3">
        <Col>Наименование юридического лица или ФИО физического лица</Col>
        <Col className="pdf-report-underlined p-1 italic">
          {data.companies[0]?.short_name}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="pdf-report-underlined p-1 italic">{companyDoctor}</Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3}>Место отбора проб(образцов)</Col>
        <Col className="pdf-report-underlined p-1 text-center italic">
          {companyAddress}
        </Col>
      </Row>
      <Row className="">
        <Col sm={2}>Пробы отобраны</Col>
        <Col className="pdf-report-underlined p-1 italic">{doctors}</Col>
      </Row>
      <Row className="text-sm text-center mb-3">
        <Col sm={3}></Col>
        <Col>
          (указать должность, Ф.И.О. представителя организации осуществляющего
          отбор проб)
        </Col>
      </Row>
      <Row className="">
        <Col sm={2}>в присутствии </Col>
        <Col className="pdf-report-underlined p-1 italic">{companyDoctor}</Col>
      </Row>
      <Row className="text-sm text-center mb-3">
        <Col sm={2}></Col>
        <Col>
          (должность, Ф.И.О. представителя юридического лица или Ф.И.О.
          физического лица владельца животного)
        </Col>
      </Row>
      <Row>
        <Col sm={2}>Направляется</Col>
        <Col sm={1} className="pdf-report-underlined p-1 text-center italic">
          {data.animals.length}
        </Col>
        <Col sm={1}>проб</Col>
        <Col className="pdf-report-underlined p-1 text-center italic">
          {data.biomaterial}
        </Col>
      </Row>
      <Row className="text-sm text-center mb-3">
        <Col sm={2}></Col>
        <Col sm={1}>(количество)</Col>
        <Col sm={1}></Col>
        <Col>(наименование материала, стабилизация, консервирование)</Col>
      </Row>
      <Row>
        <Col sm={1}>от</Col>
        <Col className="pdf-report-underlined p-1 text-center italic">
          {animal}
        </Col>
      </Row>
      <Row className="text-sm text-center mb-3">
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
        <Col sm={5}>Для проведения лабораторных исследований на</Col>
        <Col className="pdf-report-underlined p-1 text-center italic">
          {disease}
        </Col>
      </Row>
      <Row className="">
        <Col sm={3}>Исследование проводится:</Col>
        <Col className="pdf-report-underlined p-1 text-center italic">
          {data.is_primary ? "первично" : "повторно"}
        </Col>
      </Row>
      <Row className="text-sm text-center mb-3">
        <Col sm={1}></Col>
        <Col>(первично, повторно - указать нужное)</Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3}>Сведения о вакцинации:</Col>
        <Col className="pdf-report-underlined p-1 text-center italic"></Col>
      </Row>
      <Row>
        <Col sm={4}>Дата и время отбора проб(образцов)</Col>
        <Col className="pdf-report-underlined text-left italic">
          {vetworkDate.shortDate}
        </Col>
      </Row>
      <Row>
        <Col sm={4}>Дата отправки проб(образцов)</Col>
        <Col className="pdf-report-underlined text-left italic">
          {vetworkDate.shortDate}
        </Col>
      </Row>
    </Container>
  );
}
