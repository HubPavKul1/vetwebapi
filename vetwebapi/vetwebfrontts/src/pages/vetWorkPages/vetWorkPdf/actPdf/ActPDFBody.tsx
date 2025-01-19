import { Container, Row, Col } from "react-bootstrap";

import ActTBCHorses from "./ActTBCHorses";
import ActVaccination from "./ActVaccination";
import DrugSection from "./DrugSection";
import ActTBCCows from "./ActTBCCows";
import { convertDateString } from "shared/helpers";
import { StateAssignment } from "shared/index";

import { useGetVetWorkData } from "features/vetWork";
import { ActPDFBodyTop } from "../ActPDFBodyTop";

export function ActPDFBody() {
  const data = useGetVetWorkData();
  if (!data) return;
  if (!data.animals) return;
  if (!data.drug) return;
  if (!data.companies) return;

  const vetworkDate = convertDateString(data.vetwork_date);

  const disease = data.diseases[0].toLowerCase();
  const animal = data.animals[0].animal_group.toLowerCase();

  const animals = new Set(
    data.animals.map((animal) => animal.animal_group.toLowerCase() + ", ")
  );
  const diseases = new Set(
    data.diseases.map((disease) => disease.toLowerCase() + ", ")
  );

  return (
    <Container className="mb-5">
      <ActPDFBodyTop />
      {disease === "туберкулез" && animal === "лошади" ? (
        <ActTBCHorses data={data} vetworkDate={vetworkDate.shortDate} />
      ) : disease === "туберкулез" && animal === "крупный рогатый скот" ? (
        <ActTBCCows data={data} vetworkDate={vetworkDate.shortDate} />
      ) : (
        <ActVaccination data={data} animals={animals} diseases={diseases} />
      )}
      <Row>
        {/* <Col></Col> */}
        <Col sm={7}>{data.is_state_assignment && <StateAssignment />}</Col>
        {/* <Col></Col> */}
      </Row>
      <DrugSection data={data} />
      <Row>
        <Col sm={6}>Опись на обработанных прилагается.</Col>
      </Row>
    </Container>)
}
