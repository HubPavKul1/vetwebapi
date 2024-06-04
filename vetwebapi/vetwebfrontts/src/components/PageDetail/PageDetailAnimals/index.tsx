import { Col, Container, Row } from "react-bootstrap";
import { IAnimal } from "../../../interfaces/AnimalInterfaces";

import styles from "./PageDetailAnimals.module.scss";
import { CompanyAnimal } from "../../companies/animal/CompanyAnimal";

interface PageDetailAnimalsProps {
  animals: IAnimal[];
  companyId: number;
}

export function PageDetailAnimals({
  animals,
  companyId,
}: PageDetailAnimalsProps) {
  return (
    <Container className={styles.companyAnimals}>
      <h5>Животные </h5>
      <p className={styles.animalCounter}>Всего голов: {animals?.length}</p>
      <Row className={styles.tableHead}>
        <Col>Вид животных</Col>
        <Col>Пол животных</Col>
        <Col>Дата рождения</Col>
        <Col>Кличка</Col>
        <Col>Идентификация</Col>
        <Col></Col>
        <Col></Col>
      </Row>

      {animals.map((animal) => (
        <CompanyAnimal key={animal.id} company_id={companyId} animal={animal} />
      ))}
    </Container>
  );
}
