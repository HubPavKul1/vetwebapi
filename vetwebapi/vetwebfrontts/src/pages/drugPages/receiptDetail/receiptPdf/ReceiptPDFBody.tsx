import { Container, Row, Col } from "react-bootstrap";
import { IDrugMovementDetail } from "../../../../interfaces/DrugInterfaces";

import styles from "./ReceiptPDF.module.scss";
import { AppService } from "../../../../app.service";

interface ReceiptPDFBodyProps {
  data: IDrugMovementDetail;
}

export function ReceiptPDFBody({ data }: ReceiptPDFBodyProps) {
  const diseases = data.drugs?.map((drug) => drug.diseases)[0];

  const diseasesUnique = new Set(diseases);

  return (
    <Container>
      <Row className={styles.pdfTitle}>
        <h3>Требование-заявка № {data.id}</h3>
        <h5>на отпуск ветеринарных препаратов и диагностических наборов</h5>
      </Row>

      <Row className={styles.pdfBody}>
        <h5>
          {" "}
          Прошу выделить ветеринарные препараты/диагностические наборы для
          проведения
        </h5>
      </Row>
      <Row className={styles.pdfBody}>
        <Col>
          {" "}
          <h5>диагностических исследований / обработок против:</h5>
        </Col>
        <Col className={styles.disease}>
          <h5>{diseasesUnique}</h5>
        </Col>
      </Row>
      <Row className={styles.pdfBody}>
        <h5>
          животных г. Иваново в ветклинике на ул. Танкиста Белороссова, д.30А
        </h5>
      </Row>
    </Container>
  );
}
