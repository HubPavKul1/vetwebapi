import { Container, Row, Col } from "react-bootstrap";
import { IDrugReport } from "../../../../interfaces/DrugInterfaces";
import Table from 'react-bootstrap/Table';

import styles from "./DrugReportPDF.module.scss"
import { AppService } from "../../../../app.service";


interface DrugReportPDFBodyProps {
    data: IDrugReport[]
}

export function DrugReportPDFBody({data}: DrugReportPDFBodyProps) {

    return (
        <Container className={styles.tableWrap}>
            <Table bordered>
                <thead>
                    <tr>
                        <th rowSpan={3}>Наименование продукции</th>
                        <th rowSpan={3}>Серия</th>
                        <th rowSpan={3}>Годен до</th>
                        <th rowSpan={3}>Ед. измер.</th>
                        <th rowSpan={3}>Наличие на начало отчетного периода</th>
                        <th colSpan={2}>Приход на конец отчетного периода</th>
                        <th ></th>
                    </tr>
                    <tr>
                        <th>Получено от поставщиков</th>
                        <th>Получено от др. получателей</th>
                    </tr>
                </thead>
            </Table>
                {/* <Row className={styles.tHead}>
                    <Col md={5}><h6>Наименование ветеринарного препарата</h6></Col>
                    <Col md={1}><h6>Единицы учета</h6></Col>
                    <Col md={1}><h6>Серия</h6></Col>
                    <Col md={2}><h6>Дата изготовления</h6></Col>
                    <Col md={1}><h6>Кол-во</h6></Col>
                    <Col md={1}><h6>Цена за единицу</h6></Col>
                    <Col md={1}><h6>Сумма</h6></Col>
                </Row> */}
                {/* {data &&
                    data.map(drug => 
                    <Row key={drug.id} className={styles.tBody}>
                        <Col md={5}><h6>{drug.drug_name}</h6></Col>
                        <Col md={1}><h6>доз</h6></Col>
                        <Col md={1}><h6>{drug.batch}</h6></Col>
                        <Col md={2}>
                            <h6>
                                {
                                AppService.convertDateString(
                                    drug.production_date
                                ).shortDate
                                }
                            </h6>
                        </Col>
                        <Col md={1}><h6>{drug.units_amount}</h6></Col>
                        <Col md={1}></Col>
                        <Col md={1}></Col>
                    </Row>

                    )
                } */}
            
                </Container>

    )
}
