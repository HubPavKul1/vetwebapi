import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./VaccinationDetail.module.scss";
import { AppService } from "../../../../app.service";

import { CustomButton } from "../../../../components/CustomButton";
import { useState } from "react";
import { IVetWorkSchema } from "../../../../interfaces/VetWorkInterfaces";

import { ReceiptDrug } from "../../../../components/drugs/drugMovements/ReceiptDrug";
import { AddAnimalsToVetWorkForm } from "../../../../components/vetWorks/AddAnimalsToVetWorkForm/AddAnimalsToVetWorkForm";
import { AnimalInVetwork } from "../../../../components/vetWorks/AnimalInVetwork";
import { ActPDF } from "./actPdf/ActPDF";
import { VetWorkPageMenu } from "../../../../components/menu/VetWorkPageMenu";
import { AnimalsListPDF } from "./animalsListPdf/AnimalsListPDF";

interface VaccinationData {
  data?: IVetWorkSchema;
  isLoading: boolean;
}

export function VaccinationDetail() {
  const [act, showAct] = useState(false);
  const [animalsList, showAnimalsList] = useState(false);
  const [animals, setAnimals] = useState(false);
  const [companyId, setCompanyId] = useState("");

  const { id } = useParams();
  const url = `/api/vetwork/${id}`;

  const { isLoading, data }: VaccinationData = useQuery(
    ["vaccination", id],
    () => AppService.get(url),
    {
      enabled: !!id,
    }
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  const date = AppService.convertDateString(data.vetwork_date);

  const addAnimals = (company_id: string) => {
    setAnimals(true);
    setCompanyId(company_id);
  };

  return (
    <>
      {!act && !animalsList && !animals ? (
        <Container className={styles.detailWrap}>
          <Row className={styles.rowTop}>
            <Col sm={8} className={styles.colImg}>
              <img src="/vetworkBg.jpg" alt={data.vetwork_date} />
            </Col>

            <Col>
              <VetWorkPageMenu />
              <Container className={styles.pdfButtons}>
                <div>
                  <CustomButton
                    className="btn-submit"
                    title="Акт на обработку"
                    onClick={() => showAct(true)}
                  />
                </div>
                <div>
                  <CustomButton
                    className="btn-submit"
                    title="Опись к акту"
                    onClick={() => showAnimalsList(true)}
                  />
                </div>
              </Container>
            </Col>
          </Row>

          <Container className={styles.drugWrap}>
            <p className={styles.animalCounter}>
              Всего голов: {data?.animals?.length}
            </p>
            <h5>Предприятия </h5>
            {data.companies?.length &&
              data.companies.map((company) => (
                <div key={company.id} className={styles.companyWrap}>
                  <div>
                    <Row className={styles.companyTitle}>
                      <Col sm={6}>
                        <h5>
                          <Link to={`/companies/${company.id}`}>
                            {company.full_name}
                          </Link>
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

                    <p>
                      адрес:{" "}
                      {company.address &&
                        `${company.address.street}, ${company.address.house_number}`}
                    </p>
                    <p>
                      телефон:{" "}
                      {company.address &&
                        `${company.address.phone_number1}, ${company.address.phone_number2}`}
                    </p>
                  </div>

                  <Container className={styles.companyAnimals}>
                    <h5>Животные </h5>
                    <p className={styles.animalCounter}>
                      Всего голов хозяйства : {data.animals?.length}
                    </p>
                    <Row>
                      <Col>Вид животных</Col>
                      <Col>Пол животных</Col>
                      <Col>Дата рождения</Col>
                      <Col>Кличка</Col>
                      <Col>Идентификация</Col>
                      <Col>Дозировка</Col>
                      <Col></Col>
                      <Col></Col>
                    </Row>

                    {data.animals?.length &&
                      data.animals
                        .filter((animal) => animal.company_id === company.id)
                        .map((animal) => (
                          <AnimalInVetwork
                            key={animal.animal_id}
                            animal={animal}
                          />
                        ))}
                  </Container>
                </div>
              ))}
          </Container>

          <Container className={styles.drugWrap}>
            <h5>Препарат </h5>

            <Row>
              <Col>Наименование препарата</Col>
              <Col>Серия</Col>
              <Col>Контроль</Col>
              <Col>Дата Изготовления</Col>
              <Col>Количество упаковок</Col>
              <Col>Количество единиц учета</Col>
            </Row>

            {data.drug && <ReceiptDrug drug={data.drug} />}
          </Container>
        </Container>
      ) : act ? (
        <ActPDF setPdf={showAct} data={data} />
      ) : animalsList ? (
        <AnimalsListPDF setPdf={showAnimalsList} data={data} />
      ) : (
        animals && (
          <AddAnimalsToVetWorkForm
            setAnimals={setAnimals}
            companyId={companyId}
          />
        )
      )}
    </>
  );
}
