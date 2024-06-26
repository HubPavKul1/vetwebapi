import { Container, Row, Col } from "react-bootstrap";

import styles from "./DrugReportPDF.module.scss";
import { AppService } from "../../../../app.service";

export function DrugReportPDFFooter() {

    let today = new Date().toISOString().slice(0, 10)

    const reportDate = AppService.convertDateString(today).shortDate

  return (
    <Container className={styles.pdfFooter}>
      <Row >
        <Col md={3}>Руководитель:</Col>
        <Col md={2} className={styles.col1}></Col>
        <Col md={1}></Col>
        <Col md={2} className={styles.col1}></Col>
        <Col md={1}></Col>
        <Col md={2} className={styles.col1}></Col>
      </Row>
      <Row className="text-center mb-2">
        <Col md={3}></Col>
        <Col md={2}>(Ф.И.О)</Col>
        <Col md={1}></Col>
        <Col md={2}>(подпись)</Col>
        <Col md={1}></Col>
        <Col md={2}></Col>
      </Row>
      <Row >
        <Col md={3}>Главный бухгалтер:</Col>
        <Col md={2} className={styles.col1}></Col>
        <Col md={1}></Col>
        <Col md={2} className={styles.col1}></Col>
        <Col md={1}></Col>
        <Col md={2} className={styles.col1}></Col>
      </Row>
      <Row className="text-center mb-2">
        <Col md={3}></Col>
        <Col md={2}>(Ф.И.О)</Col>
        <Col md={1}></Col>
        <Col md={2}>(подпись)</Col>
        <Col md={1}></Col>
        <Col md={2}></Col>
      </Row>
      <Row >
        <Col md={3}>Исполнитель:</Col>
        <Col md={2} className={styles.col1}></Col>
        <Col md={1}></Col>
        <Col md={2} className={styles.col1}></Col>
        <Col md={1}></Col>
        <Col md={2} className={styles.col1}></Col>
      </Row>
      <Row className="text-center mb-4">
        <Col md={3}></Col>
        <Col md={2}>(должность)</Col>
        <Col md={1}></Col>
        <Col md={2}>(Ф.И.О)</Col>
        <Col md={1}></Col>
        <Col md={2}>(подпись)</Col>
      </Row>
      <Row >
        <Col md={3} className={styles.col1}></Col>
        <Col md={6}></Col>
        <Col md={3} className={styles.col1}>{reportDate}</Col>
      </Row>
      <Row className="text-center mb-4">
        <Col md={3}>(номер контактного телефона)</Col>
        <Col md={6}></Col>
        <Col md={3}>(дата составления документа)</Col>
      </Row>

    </Container>
  );
}
