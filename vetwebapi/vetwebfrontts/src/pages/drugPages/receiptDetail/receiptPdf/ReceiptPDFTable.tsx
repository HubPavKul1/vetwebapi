import { Container, Row, Col } from "react-bootstrap";
import { IDrugMovementDetail } from "../../../../interfaces/DrugInterfaces";

import styles from "./ReceiptPDF.module.scss"
import { AppService } from "../../../../app.service";


interface ReceiptPDFTableProps {
    data: IDrugMovementDetail
}

export function ReceiptPDFTable({data}: ReceiptPDFTableProps) {

    return (
        <Container className={styles.tableWrap}>
                <Row className={styles.tHead}>
                    <Col md={5}><h6>Наименование ветеринарного препарата</h6></Col>
                    <Col md={1}><h6>Единицы учета</h6></Col>
                    <Col md={1}><h6>Серия</h6></Col>
                    <Col md={2}><h6>Дата изготовления</h6></Col>
                    <Col md={1}><h6>Кол-во</h6></Col>
                    <Col md={1}><h6>Цена за единицу</h6></Col>
                    <Col md={1}><h6>Сумма</h6></Col>
                </Row>
                {data.drugs &&
                    data.drugs.map(drug => 
                    <Row key={drug.id} className={styles.tBody}>
                        <Col md={5}><h6>{drug.name}</h6></Col>
                        <Col md={1}><h6>доз</h6></Col>
                        <Col md={1}><h6>{drug.batch}</h6></Col>
                        <Col md={2}>
                            <h6>
                                {
                                AppService.convertDateString(
                                    drug.production_date
                                ).fullDate
                                }
                            </h6>
                        </Col>
                        <Col md={1}><h6>{drug.units_amount}</h6></Col>
                        <Col md={1}></Col>
                        <Col md={1}></Col>
                    </Row>

                    )
                }
            
                </Container>

    )
}
