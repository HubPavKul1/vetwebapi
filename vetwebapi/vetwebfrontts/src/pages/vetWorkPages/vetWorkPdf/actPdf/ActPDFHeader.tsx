import { Container, Row, Col } from "react-bootstrap";

import { AppService } from "../../../../app.service";
import { IVetWorkSchema } from "../../../../interfaces/VetWorkInterfaces";

import styles from "./ActPDF.module.scss";
import NoData from "../../../../components/NoData";

interface ActPDFHeaderProps {
  data: IVetWorkSchema;
}

export function ActPDFHeader({ data }: ActPDFHeaderProps) {
  const date = AppService.convertDateString(data.vetwork_date);
  if (!data.animals) return <NoData title="Данные о животных" />;
  if (!data.drug) return <NoData title="Данные о препаратах" />;
  if (!data.companies) return <NoData title="Данные о предприятиях" />;

  return (
    <Container className={styles.pdfHeader}>
      <Row>
        <Col sm={4}></Col>
        <Col>
          <p>
            {" "}
            Приложение № 6 к Порядку учета, хранения, использования и списания
            лекарственных средств и препаратов для ветеринарного применения,
            поступающих за счет средств федерального и областного бюджетов,
            бюджетными государственными учреждениями ветеринарии Ивановской
            области
          </p>
        </Col>
      </Row>
      <Row className={styles.actTitle}>
        <Col sm={4}></Col>
        <Col>
          <h5>Акт № {data.id}</h5>
        </Col>
        <Col sm={4}></Col>
      </Row>
      <Row>
        <Col sm={2}></Col>
        <Col className={styles.colTitle}>
          о проведении вакцинации животных против
        </Col>
        <Col sm={4} className={styles.colBody}>
          {data.diseases}
        </Col>
      </Row>
      <Row className={styles.actDate}>
        <Col sm={2}></Col>
        <Col className={styles.colTitle}>от</Col>
        <Col sm={4} className={styles.colBody}>
          {date.fullDate}
        </Col>
      </Row>
      <Row>
        <Col sm={2}></Col>
        <Col className={styles.colTitle}>населенный пункт</Col>
        <Col sm={4} className={styles.colBody}>
          {data.companies ? data.companies[0].address?.city : "г. Иваново"}
        </Col>
      </Row>
      <Row>
        <Col sm={2}></Col>
        <Col className={styles.colTitle}>хозяйство</Col>
        <Col sm={4} className={styles.colBody}>
          частный сектор и организации г. Иваново
        </Col>
      </Row>
      <Row>
        <Col sm={2}></Col>
        <Col className={styles.colTitle}>район</Col>
        <Col sm={4} className={styles.colBody}>
          {data.companies ? data.companies[0].address?.district : ""}
        </Col>
      </Row>
      <Row>
        <Col sm={2}></Col>
        <Col className={styles.colTitle}>область</Col>
        <Col sm={4} className={styles.colBody}>
          Ивановская обл.
        </Col>
      </Row>
    </Container>
  );
}
