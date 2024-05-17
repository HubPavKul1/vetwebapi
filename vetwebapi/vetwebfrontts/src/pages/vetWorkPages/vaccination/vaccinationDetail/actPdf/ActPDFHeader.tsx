import { Container, Row, Col } from "react-bootstrap";


import { AppService } from "../../../../../app.service";
import { IVaccinationDetail } from "../../../../../interfaces/VetWorkInterfaces";

import styles from "./ActPDF.module.scss"



interface ActPDFHeaderProps {
    data: IVaccinationDetail;
}



export function ActPDFHeader({data}: ActPDFHeaderProps) {
    const date = AppService.convertDateString(data.vetwork_date)

    return (
        <Container className={styles.pdfHeader}>
            <Row>
                <Col sm={4}></Col>
                <Col>
                        <p> Приложение № 6 к Порядку учета, хранения,
                            использования и списания лекарственных средств и
                            препаратов для ветеринарного применения,
                            поступающих за счет средств федерального и
                            областного бюджетов, бюджетными
                            государственными учреждениями ветеринарии
                            Ивановской области
                        </p>
                        
                </Col>
            </Row>
            <Row className={styles.actTitle}>
                <Col sm={4}></Col>
                <Col><h5>Акт № {data.id}</h5></Col>
                <Col sm={4}></Col>
            </Row>
            <Row>
                <Col sm={2}></Col>
                <Col className={styles.colTitle}><h5>о проведении вакцинации животных против</h5></Col>
                <Col sm={4} className={styles.colBody}><h5>{data.diseases}</h5></Col>
            </Row>
            <Row className={styles.actDate}>
                <Col sm={2}></Col>
                <Col className={styles.colTitle}><h5>от</h5></Col>
                <Col sm={4} className={styles.colBody}><h5>{date.fullDate}</h5></Col>
            </Row>
            <Row>
                <Col sm={2}></Col>
                <Col className={styles.colTitle}><h5>населенный пункт</h5></Col>
                <Col sm={4} className={styles.colBody}><h5>г. Иваново</h5></Col>
            </Row>
            <Row>
                <Col sm={2}></Col>
                <Col className={styles.colTitle}><h5>хозяйство</h5></Col>
                <Col sm={4} className={styles.colBody}><h5></h5></Col>
            </Row>
            <Row>
                <Col sm={2}></Col>
                <Col className={styles.colTitle}><h5>район</h5></Col>
                <Col sm={4} className={styles.colBody}><h5></h5></Col>
            </Row>
            <Row>
                <Col sm={2}></Col>
                <Col className={styles.colTitle}><h5>область</h5></Col>
                <Col sm={4} className={styles.colBody}><h5></h5></Col>
            </Row>   
        </Container>
    )
}