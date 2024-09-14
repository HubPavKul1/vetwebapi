import { Container, Row, Col } from "react-bootstrap";

import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";

import ActTBCHorses from "./ActTBCHorses";
import ActVaccination from "./ActVaccination";
import DrugSection from "./DrugSection";
import ActTBCCows from "./ActTBCCows";
import { convertDateString } from "shared/helpers";
import { StateAssignment } from "shared/index";

interface ActPDFBodyProps {
  data: IVetWorkSchema;
}

export function ActPDFBody({ data }: ActPDFBodyProps) {
  if (!data.animals) return;
  if (!data.drug) return;
  if (!data.companies) return;

  const vetworkDate = convertDateString(data.vetwork_date);

  const disease = data.diseases[0].toLowerCase();
  const animal = data.animals[0].animal_group.toLowerCase();

  const doctors = data.doctors.map(
    (doctor) => `${doctor.position} ${data.clinic} ${doctor.fullname}, `
  );

  const companyDoctor =
    data.companies[0].employee?.position !== "ИП"
      ? `${data.companies[0].employee?.position} ${data.companies[0].short_name} ${data.companies[0].employee?.fullname}`
      : `${data.companies[0].employee?.fullname}`;
  const animals = new Set(
    data.animals.map((animal) => animal.animal_group.toLowerCase() + ", ")
  );
  const diseases = new Set(
    data.diseases.map((disease) => disease.toLowerCase() + ", ")
  );

  return (
    <Container className="mb-5">
      <Row>
        <Col sm={2}>Мы, нижеподписавшиеся</Col>
        <Col className="pdf-report-underlined mb-2 p-1 italic">{doctors}</Col>
      </Row>
      <Row>
        <Col sm={2}>в присутствии</Col>
        <Col className="pdf-report-underlined p-1 italic">{companyDoctor}</Col>
      </Row>
      <Row className="text-sm text-center">
        <Col sm={3}></Col>
        <Col>(указать должность, Ф.И.О. представителя хозяйства, фермы)</Col>
      </Row>
      {disease === "туберкулез" && animal === "лошади" ? (
        <ActTBCHorses data={data} vetworkDate={vetworkDate.shortDate} />
      ) : disease === "туберкулез" && animal === "крупный рогатый скот" ? (
        <ActTBCCows data={data} vetworkDate={vetworkDate.shortDate} />
      ) : (
        <ActVaccination data={data} animals={animals} diseases={diseases} />
      )}
      <Row>
        <Col></Col>
        <Col sm={7}>{data.is_state_assignment && <StateAssignment />}</Col>
        <Col></Col>
      </Row>
      <DrugSection data={data} />
      <Row>
        <Col sm={6}>Опись на обработанных прилагается.</Col>
      </Row>
    </Container>
  );
}
