import { Container, Row, Col } from "react-bootstrap";


import styles from "./DrugReportPDF.module.scss";
import { AppService } from "../../../../app.service";
import { IDrugReport } from "../../../../interfaces/DrugInterfaces";



interface DrugReportPDFHeaderProps {
    dateStart: string;
    dateEnd: string
}



export function DrugReportPDFHeader({dateStart, dateEnd}: DrugReportPDFHeaderProps) {
    const startDate = AppService.convertDateString(dateStart)
    const endDate = AppService.convertDateString(dateEnd)
    

    return (
        <Container className={styles.pdfHeader}>
            <Row className={styles.pdfTop}>
                <Col sm={7}></Col>
                <Col>
                        <p> Приложение № 2 к Порядку учета, хранения,
                            использования и списания лекарственных средств и
                            препаратов для ветеринарного применения,
                            поступающих за счет средств федерального и
                            областного бюджетов, бюджетными
                            государственными учреждениями ветеринарии
                            Ивановской области
                        </p>
                        
                </Col>
            </Row>
            <Row className={styles.reportTitle}>
                <Col sm={4}></Col>
                <Col><h5>СВЕДЕНИЯ</h5></Col>
                <Col sm={4}></Col>
            </Row>
            <Row>
                <Col sm={2}></Col>
                <Col className={styles.colTitle}>о движении ветеринарных препаратов, полученных за счет федерального бюджета</Col>
                <Col sm={2}></Col>
            </Row>
            <Row className={styles.actDate}>
                <Col sm={2}></Col>
                <Col className={styles.colTitle}>по БГУ Ивановской области "Ивгор СББЖ" за {endDate.month} {endDate.year}</Col>
                <Col sm={2}></Col>
            </Row>
           
        </Container>
    )
}