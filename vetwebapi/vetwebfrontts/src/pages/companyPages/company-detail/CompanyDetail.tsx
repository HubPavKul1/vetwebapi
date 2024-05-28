import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { CompanyAddress } from "../../../components/companies/address/CompanyAddress";
import { CompanyEmployee } from "../../../components/companies/employee/CompanyEmployee";
import { CompanyAnimal } from "../../../components/companies/animal/CompanyAnimal";
import { CompanyPageMenu } from "../../../components/menu/CompanyPageMenu";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./CompanyDetail.module.scss";
import { AppService } from "../../../app.service";
import { ICompanyDetail } from "../../../interfaces/CompanyInterfaces";

interface CompanyData {
  data?: ICompanyDetail;
  isLoading: boolean;
}

export function CompanyDetail() {
  const { id } = useParams();
  const url = `/api/companies/${id}`;

  const { isLoading, data }: CompanyData = useQuery(
    ["company", id],
    () => AppService.get(url),
    {
      enabled: !!id,
    }
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <>
      <Container className={styles.companyDetailWrap}>
        <Row className={styles.rowTop}>
          <Col sm={8} className={styles.colImg}>
            <img src="/animals.jpg" alt="animals.jpg" />
          </Col>

          <Col>
            <CompanyPageMenu />
          </Col>
        </Row>

        <Container className={styles.titleWrap}>
          <h1>
            <a href="#">{data.full_name}</a>
          </h1>
          {data.address ? (
            <CompanyAddress address={data.address} />
          ) : (
            <p>Адрес отсутствует!</p>
          )}
        </Container>

        <Container className={styles.companyEmployee}>
          <h5>Работники</h5>
          <Row>
            <Col>Должность</Col>
            <Col>Фамилия</Col>
            <Col>Имя</Col>
            <Col>Отчество</Col>
          </Row>

          {data.employees &&
            data.employees.map((empoloyee) => (
              <CompanyEmployee key={empoloyee.id} employee={empoloyee} />
            ))}
        </Container>
        <Container className={styles.companyAnimals}>
          <h5>Животные </h5>
          <p className={styles.animalCounter}>
            Всего голов: {data?.animals?.length}
          </p>
          <Row>
            <Col>Вид животных</Col>
            <Col>Пол животных</Col>
            <Col>Дата рождения</Col>
            <Col>Кличка</Col>
            <Col>Идентификация</Col>
            <Col></Col>
            <Col></Col>
          </Row>

          {data.animals?.length &&
            data.animals.map((animal) => (
              <CompanyAnimal
                key={animal.id}
                company_id={data.id}
                animal={animal}
              />
            ))}
        </Container>
      </Container>
    </>
  );
}
