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
          <Col md={2}>
            <h6>Животные:</h6>
          </Col>
          <Col md={10}>
            <h6>{companyAnimalGroup}</h6>
          </Col>
        </Row>
      )}
    </>
  );
}
