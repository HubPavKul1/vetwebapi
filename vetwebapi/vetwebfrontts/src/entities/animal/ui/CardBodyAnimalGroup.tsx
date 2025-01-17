import { Col, Row } from "react-bootstrap";
import { IAnimal } from "entities/animal";

interface CardBodyAnimalGroupProps {
  animal?: IAnimal;
}

export function CardBodyAnimalGroup({ animal }: CardBodyAnimalGroupProps) {
  const companyAnimalGroup = animal ? animal.animal_group : "";

  return (
    <>
      {companyAnimalGroup && (
        <Row>
          <Col md={1}>
            <h6>Животные:</h6>
          </Col>
          <Col md={2}></Col>
          <Col md={9}>
            <h6 className="text-sm">{companyAnimalGroup}</h6>
          </Col>
        </Row>
      )}
    </>
  );
}
