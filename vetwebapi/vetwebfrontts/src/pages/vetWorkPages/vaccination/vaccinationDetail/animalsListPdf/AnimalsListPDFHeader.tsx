import { Container, Row, Col } from "react-bootstrap";


import { AppService } from "../../../../../app.service";
import { IVetWorkSchema } from "../../../../../interfaces/VetWorkInterfaces";

import styles from "./AnimalsListPDF.module.scss"



interface AnimalsListPDFHeaderProps {
    data: IVetWorkSchema;
}



export function AnimalsListPDFHeader({data}: AnimalsListPDFHeaderProps) {
    const date = AppService.convertDateString(data.vetwork_date).fullDate;
    const animals = new Set(data.animals?.map(animal => animal.animal_group.toLowerCase() + ", "));
    const diseases = new Set(data.diseases?.map(disease => disease.toLowerCase() + ", "));



    return (
        <Container className={styles.pdfHeader}>
            <Row>
                <Col sm={4}></Col>
                <Col>
                        <p> Приложение № 8 к Порядку учета, хранения,
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
                <h5>Опись к акту № {data.id}</h5>
                
            </Row>
            <Row>
                <Col sm={3} className={styles.colBody}>{animals}</Col>
                <Col className={styles.colTitle}>, принадлежащих: </Col>
                <Col sm={6} className={styles.colBody}>Организациям и частному сектору г.Иваново</Col>
            </Row>
            <Row>
                <Col sm={3}>(вид животных)</Col>
                <Col ></Col>
                <Col sm={6}></Col>
            </Row>
            <Row>
                <Col sm={5}>подвергнутых обработке против</Col>
                <Col className={styles.colBody}>{diseases}</Col>
                <Col sm={3} className={styles.colBody}>{date}</Col>
            </Row>
        </Container>
    )
}