import { Container, Row, Col } from "react-bootstrap";

import { AppService } from "../../../../app.service";
import { IVetWorkSchema } from "../../../../interfaces/VetWorkInterfaces";

import { StateAssignment } from "../../../../components/StateAssignment";

interface ActPDFBodyProps {
  data: IVetWorkSchema;
}

export function ActPDFBody({ data }: ActPDFBodyProps) {
  if (!data.animals) return;
  if (!data.drug) return;
  if (!data.companies) return;

  const productionDate = AppService.convertDateString(
    data.drug.production_date
  ).shortDate;
  const expirationDate = AppService.convertDateString(
    data.drug.expiration_date
  ).shortDate;

  const vetworkDate = AppService.convertDateString(data.vetwork_date)

  const disease = data.diseases[0].toLowerCase();
  const animal = data.animals[0].animal_group.toLowerCase();

  const doctor1 = `${data.doctors[0].position} ${data.clinic} ${data.doctors[0].fullname}`;
  const doctor2 = `${data.doctors[1].position} ${data.clinic} ${data.doctors[1].fullname}`;
  const companyDoctor = `${data.companies[0].employee?.position} ${data.companies[0].short_name} ${data.companies[0].employee?.fullname}`;
  const animals = new Set(
    data.animals.map((animal) => animal.animal_group.toLowerCase() + ", ")
  );
  const diseases = new Set(
    data.diseases.map((disease) => disease.toLowerCase() + ", ")
  );
  let dosage = 0;
  data.animals.map((animal) => (animal.dosage ? (dosage += animal.dosage) : 0));
  const drugPacks = data.drug.packs_amount;
  const drugRest = (drugPacks * data.drug.packing - dosage) / 1000;

  return (
    <Container className="mb-5">
      <Row>
        <Col sm={2}>Мы, нижеподписавшиеся</Col>
        <Col className="pdf-report-underlined mb-2 p-1 italic">
          {doctor1}, {doctor2}
        </Col>
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
        <>
         <Row>
          <Col>Составили настоящий акт о том, что</Col>
          <Col className="pdf-report-underlined mb-2 p-1">{vetworkDate.shortDate}</Col>
          <Col>нами проведены клинический осмотр и</Col>
        </Row>
        <Row>
          <Col sm={6}>аллергическое исследование на туберкулез методом офтальмопробы</Col>
          <Col className="pdf-report-underlined mb-2 p-1">{data.animals.length}</Col>
          <Col>голов лошадей</Col>
          <Col sm={2}></Col>
        </Row>
        <Row>
          <Col sm={2}>Туберкулин введен</Col>
          <Col sm={2} className="pdf-report-underlined mb-2 p-1">{vetworkDate.shortDate}</Col>
          <Col>в</Col>
          <Col className="pdf-report-underlined mb-2 p-1">8 - 00</Col>
          <Col sm={6}></Col>
        </Row>
        <Row>
          <Col>Учет реакции провести через 6, 9, 12 и 24 часа после введения туберкулина.</Col>
        </Row>
        </>
       
      ) : disease === "туберкулез" && animal === "крупный рогатый скот" ? (
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col sm={2}>провели вакцинацию</Col>
            <Col sm={3} className="pdf-report-underlined p-1 italic">
              {animals}
            </Col>
            <Col>против</Col>
            <Col sm={4} className="pdf-report-underlined p-1 italic">
              {diseases}
            </Col>
            <Col></Col>
            <Col className="pdf-report-underlined p-1">{data.animals?.length}</Col>
            <Col>голов</Col>
          </Row>
          {data.is_state_assignment && <StateAssignment />}
          <Row className="text-sm">
            <Col sm={3}></Col>
            <Col sm={3}>(вид животных)</Col>
            <Col></Col>
            <Col sm={4}>(название заболевания)</Col>
            <Col>(количество)</Col>
            <Col></Col>
          </Row>
        </>
      )}

      <Row>
        <Col sm={3}>применяли препарат</Col>
        <Col className="pdf-report-underlined mb-2 p-1 italic">{data.drug?.name}</Col>
      </Row>
      <Row>
        <Col>серия №</Col>
        <Col className="pdf-report-underlined mb-2 p-1">{data.drug?.batch}</Col>
        <Col>контроль №</Col>
        <Col className="pdf-report-underlined mb-2 p-1">{data.drug?.control}</Col>
        <Col>изготовлен</Col>
        <Col className="pdf-report-underlined mb-2 p-1">{productionDate}</Col>
        <Col>годен до</Col>
        <Col className="pdf-report-underlined mb-2 p-1">{expirationDate}</Col>
      </Row>
      <Row>
        <Col>изготовитель</Col>
        <Col sm={4} className="pdf-report-underlined mb-2 p-1 italic">
          {data.drug.drug_manufacturer}
        </Col>
        <Col>применялась путем</Col>
        <Col className="pdf-report-underlined mb-2 p-1">
          {data.drug.administration_method}
        </Col>
        <Col>введения в область</Col>
      </Row>
      <Row>
        <Col sm={4} className="pdf-report-underlined mb-2 p-1">
          {data.drug.place_of_administration}
        </Col>
        <Col>в дозе</Col>
        <Col sm={7} className="pdf-report-underlined mb-2 p-1">
          {data.drug.drug_dosage}
        </Col>
      </Row>
      <Row>
        <Col>место инъекции дезинфицировали</Col>
        <Col sm={9} className="pdf-report-underlined p-1">
          70% этиловым спиртом
        </Col>
      </Row>
      <Row className="text-sm text-center">
        <Col></Col>
        <Col sm={8}>(согласно инструкции по применению вакцины)</Col>
      </Row>
      <Row>
        <Col className="font-bold">
          Для проведения обработки израсходовано:
        </Col>
      </Row>
      <Row>
        <Col sm={3}>1. Препарата</Col>
        <Col sm={6} className="pdf-report-underlined mb-2 p- italic">
          {data.drug.name}
        </Col>
        <Col></Col>
        <Col className="pdf-report-underlined mb-2 p-1">{dosage / 1000}</Col>
        <Col>тыс. доз</Col>
      </Row>
      <Row>
        <Col sm={3}>2. 70% этилового спирта</Col>
        <Col sm={3} className="pdf-report-underlined mb-2 p-1">
          {data.animals.length / 2}
        </Col>
        <Col>мл</Col>
      </Row>
      <Row>
        <Col sm={3}>3. Вата гигроскопическая</Col>
        <Col sm={3} className="pdf-report-underlined mb-2 p-1">
          {data.animals.length}
        </Col>
        <Col>г</Col>
      </Row>
      <Row>
        <Col sm={3}>4. Шприцы одноразовые</Col>
        <Col sm={3} className="pdf-report-underlined mb-2 p-1">
          {data.animals.length}
        </Col>
        <Col>штук</Col>
      </Row>
      <Row>
        <Col sm={4}>Остаток биопрепарата в количестве</Col>
        <Col className="pdf-report-underlined mb-2 p-1">{drugRest}</Col>
        <Col>тыс.доз</Col>
        <Col className="pdf-report-underlined mb-2 p-1">{drugPacks}</Col>
        <Col sm={3}>ампул/флаконов, шприцы</Col>
        <Col sm={2}l></Col>
      </Row>
      <Row>
        <Col sm={3}>обезврежены методом</Col>
        <Col className="pdf-report-underlined mb-2 p-1">{data.drug.disposal_method}</Col>
      </Row>
      <Row>
        <Col sm={6}>Опись на обработанных прилагается.</Col>
      </Row>
      </Container>

      
  );
}
