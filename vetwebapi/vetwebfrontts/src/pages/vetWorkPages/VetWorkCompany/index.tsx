import { Col, Container, Row } from "react-bootstrap";
import { ICompanyCard } from "../../../interfaces/CompanyInterfaces";

import styles from "./VetWorkCompany.module.scss";
import { Link } from "react-router-dom";
import { CustomButton } from "../../../components/CustomButton";
import { CompanyAddress } from "../../../components/companies/address/CompanyAddress";
import { IAnimalInVetwork } from "../../../interfaces/VetWorkInterfaces";
import { AnimalInVetwork } from "../../../components/vetWorks/AnimalInVetwork";

interface VetWorkCompanyProps {
  company: ICompanyCard;
  setAnimals: CallableFunction;
  setCompanyId: CallableFunction;
  animals?: IAnimalInVetwork[];
}

export function VetWorkCompany({
  company,
  setAnimals,
  setCompanyId,
  animals,
}: VetWorkCompanyProps) {
  const addAnimals = (company_id: string) => {
    setAnimals(true);
    setCompanyId(company_id);
  };

  return (
    <Container key={company.id} className={styles.companyWrap}>
      <div>
        <Row className={styles.companyTitle}>
          <Col sm={6}>
            <h5>
              <Link to={`/companies/${company.id}`}>{company.full_name}</Link>
            </h5>
          </Col>
          <Col>
            <CustomButton
              className="btn-submit"
              title="Добавить животных"
              onClick={() => addAnimals(company.id.toString())}
            />
          </Col>
          <Col></Col>
        </Row>

        {company.address && <CompanyAddress address={company.address} />}

      </div>

      <Container className={styles.companyAnimals}>
        <h5>Животные </h5>
        <p className={styles.animalCounter}>
          Всего голов хозяйства :{" "}
          {animals?.filter((animal) => animal.company_id === company.id).length}
        </p>
        <Row className={styles.tableHead}>
          <Col>Вид животных</Col>
          <Col>Пол животных</Col>
          <Col>Дата рождения</Col>
          <Col>Кличка</Col>
          <Col>Идентификация</Col>
          <Col>Дозировка</Col>
          <Col></Col>
          <Col></Col>
        </Row>

        {animals?.length &&
          animals
            .filter((animal) => animal.company_id === company.id)
            .map((animal) => (
              <AnimalInVetwork key={animal.animal_id} animal={animal} />
            ))}
      </Container>
    </Container>
  );
}
