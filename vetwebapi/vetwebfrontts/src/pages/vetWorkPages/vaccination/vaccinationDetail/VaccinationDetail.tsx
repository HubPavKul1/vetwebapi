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
import { PageDetail } from "../../../../components/PageDetail";
import { VetWorkCompany } from "../../VetWorkCompany";

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

  return (
    <>
      {!act && !animalsList && !animals ? (
        <PageDetail
          imgSrc="/vetworkBg.jpg"
          alt={data.vetwork_date}
          menu={
            <VetWorkPageMenu
              showAct={showAct}
              showAnimalsList={showAnimalsList}
            />
          }
          title={`Вакцинация ${date.fullDate}`}
        >
          <>
            <Container className={styles.drugWrap}>
              <p className={styles.animalCounter}>
                Всего голов: {data?.animals?.length}
              </p>
              <h5>Предприятия </h5>
              {data.companies?.length &&
                data.companies.map((company) => (
                  <VetWorkCompany
                   company={company}
                   setAnimals={setAnimals} 
                   setCompanyId={setCompanyId}
                   animals={data.animals}
                  />
                ))}
            </Container>

            <Container className={styles.drugWrap}>
              <h5>Препарат </h5>

              <Row className="border-top border-bottom border-black font-bold">
                <Col>Наименование препарата</Col>
                <Col>Серия</Col>
                <Col>Контроль</Col>
                <Col>Дата Изготовления</Col>
                <Col>Количество упаковок</Col>
                <Col>Количество единиц учета</Col>
              </Row>

              {data.drug && <ReceiptDrug drug={data.drug} />}
            </Container>
          </>
        </PageDetail>
      ) : 
      
      act ? (
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
