import { Container, Row, Col } from "react-bootstrap";
import { IDrugReport } from "../../../../interfaces/DrugInterfaces";
import Table from 'react-bootstrap/Table';

import styles from "./DrugReportPDF.module.scss"
import { AppService } from "../../../../app.service";
import { DrugReportTableItem } from "./DrugReportTableItem";


interface DrugReportPDFBodyProps {
    data: IDrugReport[]
}

export function DrugReportPDFBody({data}: DrugReportPDFBodyProps) {

    return (
        <Container className={styles.tableWrap}>
            <Table>
                <thead>
                    <tr>
                        <th rowSpan={3}>Наименование продукции</th>
                        <th rowSpan={3}>Серия</th>
                        <th rowSpan={3}>Годен до</th>
                        <th rowSpan={3}>Ед. измер.</th>
                        <th rowSpan={3}>Наличие на нач. отчет. периода</th>
                        <th colSpan={4}>Приход на конец отчет. периода</th>
                        <th colSpan={4}>Расход ед. учета</th>
                        <th rowSpan={3}>Утилизир-но</th>
                        <th rowSpan={3}>Расход Утилизация</th>
                        <th rowSpan={3}>Остаток ед. учета на конец отчет. периода</th>
                    </tr>
                    <tr>
                        <th colSpan={2}>Получено от поставщиков</th>
                        <th colSpan={2}>Получено от др. получателей</th>
                        <th colSpan={2}>Израсход-но на противоэпизоот. мероприятия</th>
                        <th colSpan={2}>Передано другим получателям</th>
                    </tr>
                    <tr>
                        <th>кол-во</th>
                        <th>сумма</th>
                        <th>кол-во</th>
                        <th>сумма</th>
                        <th>кол-во</th>
                        <th>сумма</th>
                        <th>кол-во</th>
                        <th>сумма</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(drug => <DrugReportTableItem key={drug.id} drug={drug} />)}
                </tbody>
            </Table>    
        </Container>

    )
}
