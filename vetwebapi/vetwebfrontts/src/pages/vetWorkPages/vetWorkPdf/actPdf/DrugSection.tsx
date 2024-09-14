import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";
import { Col, Row } from "react-bootstrap";
import { AppService } from "shared/services/app.service";

interface DrugSectionProps {
  data: IVetWorkSchema;
}

export default function DrugSection({ data }: DrugSectionProps) {
  if (!data.drug) return;
  if (!data.animals) return;

  const productionDate = AppService.convertDateString(
    data.drug.production_date
  ).shortDate;
  const expirationDate = AppService.convertDateString(
    data.drug.expiration_date
  ).shortDate;

  let dosage = 0;
  data.animals.map((animal) => (animal.dosage ? (dosage += animal.dosage) : 0));
  const drugPacks = data.drug.packs_amount;
  const drugRest = (drugPacks * data.drug.packing - dosage) / 1000;

  return (
    <>
      <Row>
        <Col sm={3}>применяли препарат</Col>
        <Col className="pdf-report-underlined mb-2 p-1 italic text-sm">
          {data.drug.name}
        </Col>
      </Row>
      <Row>
        <Col>серия №</Col>
        <Col className="pdf-report-underlined mb-2 p-1 text-center">
          {data.drug.batch}
        </Col>
        <Col>контроль №</Col>
        <Col className="pdf-report-underlined mb-2 p-1 text-center">
          {data.drug.control}
        </Col>
        <Col>изготовлен</Col>
        <Col className="pdf-report-underlined mb-2 p-1 text-center">
          {productionDate}
        </Col>
        <Col>годен до</Col>
        <Col className="pdf-report-underlined mb-2 p-1 text-center">
          {expirationDate}
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>изготовитель</Col>
        <Col sm={4} className="pdf-report-underlined mb-2 p-1 italic">
          {data.drug.drug_manufacturer}
        </Col>
        <Col className="text-center">методом</Col>
        <Col className="pdf-report-underlined mb-2 p-1 text-center">
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
      {data.drug.administration_method !== "инстилляции" && (
        <Row>
          <Col sm={4}>место инъекции дезинфицировали</Col>
          <Col sm={7} className="pdf-report-underlined p-1">
            70% этиловым спиртом
          </Col>
        </Row>
      )}

      <Row className="text-sm text-center">
        <Col></Col>
        <Col sm={8}>(согласно инструкции по применению вакцины)</Col>
      </Row>
      <Row>
        <Col className="font-bold">Для проведения обработки израсходовано:</Col>
      </Row>
      <Row>
        <Col sm={3}>1. Препарата</Col>
        <Col sm={6} className="pdf-report-underlined mb-2 p- italic text-sm">
          {data.drug.name}
        </Col>
        <Col></Col>
        <Col className="pdf-report-underlined mb-2 p-1 text-center">
          {(dosage / 1000).toFixed(4)}
        </Col>
        <Col>тыс. доз</Col>
      </Row>
      <Row>
        <Col sm={3}>2. 70% этилового спирта</Col>
        <Col sm={3} className="pdf-report-underlined mb-2 p-1 text-center">
          {data.animals.length / 2}
        </Col>
        <Col>мл</Col>
      </Row>
      <Row>
        <Col sm={3}>3. Вата гигроскопическая</Col>
        <Col sm={3} className="pdf-report-underlined mb-2 p-1 text-center">
          {data.animals.length}
        </Col>
        <Col>г</Col>
      </Row>
      <Row>
        <Col sm={3}>4. Шприцы одноразовые</Col>
        <Col sm={3} className="pdf-report-underlined mb-2 p-1 text-center">
          {data.animals.length}
        </Col>
        <Col>штук</Col>
      </Row>
      <Row>
        <Col sm={4}>Остаток биопрепарата в количестве</Col>
        <Col className="pdf-report-underlined mb-2 p-1 text-center">
          {drugRest.toFixed(4)}
        </Col>
        <Col>тыс.доз</Col>
        <Col className="pdf-report-underlined mb-2 p-1 text-center">
          {drugPacks}
        </Col>
        <Col sm={3}>ампул/флаконов, шприцы</Col>
        <Col sm={2} l></Col>
      </Row>
      <Row>
        <Col sm={3}>обезврежены методом</Col>
        <Col className="pdf-report-underlined mb-2 p-1">
          {data.drug.disposal_method}
        </Col>
      </Row>
    </>
  );
}
