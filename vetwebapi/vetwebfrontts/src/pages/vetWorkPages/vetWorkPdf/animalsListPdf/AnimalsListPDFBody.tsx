import { Container, Row, Col } from "react-bootstrap";

import { AppService } from "../../../../app.service";
import { IVetWorkSchema } from "../../../../interfaces/VetWorkInterfaces";

import styles from "./AnimalsListPDF.module.scss";
import { StateAssignment } from "../../../../components/StateAssignment";

interface AnimalsListPDFBodyProps {
  data: IVetWorkSchema;
}

export function AnimalsListPDFBody({ data }: AnimalsListPDFBodyProps) {
  const date = AppService.convertDateString(data.vetwork_date).fullDate;
  if (!data.animals) return;

  // const animals = new Set(data.animals.map(animal => animal.animal_group.toLowerCase() + ", "));

  return (
    <Container className={styles.pdfTable}>
      <Row className={styles.tHead}>
        <Col>№ п/п</Col>
        <Col sm={3}>Вид животного</Col>
        <Col sm={3}>Кличка</Col>
        <Col sm={1}>Возраст</Col>
        <Col>t тела</Col>
        <Col>Расход тыс.доз на голову</Col>
        <Col>Подпись владельца</Col>
      </Row>
     
      {data.companies &&
        data.companies.map((company) => (
          <>
            <Row key={company.id} className={styles.companyRow}>
              <h5>{company.full_name}</h5>
            </Row>

            {data.animals &&
              data.animals
                .filter((animal) => animal.company_id === company.id)
                .map((animal, index) => (
                  <Row key={animal.animal_id} className={styles.tBody}>
                    <Col>{index + 1}</Col>
                    <Col sm={3}>{animal.species}</Col>
                    <Col sm={3}>{animal.nickname}</Col>
                    <Col sm={1}>
                      {AppService.convertDateString(animal.date_of_birth).year}
                    </Col>
                    <Col>38</Col>
                    <Col>{animal.dosage && animal.dosage / 1000}</Col>
                    <Col></Col>
                  </Row>
                ))}
          </>
        ))}
    </Container>
  );
}
