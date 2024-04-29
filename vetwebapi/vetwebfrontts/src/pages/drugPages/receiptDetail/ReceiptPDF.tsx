import { Col, Container, Row } from "react-bootstrap";
import { IDrugMovementDetail } from "../../../interfaces/DrugInterfaces";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { AppService } from "../../../app.service";

import styles from "./ReceiptDetail.module.scss"


interface ReceiptData {
    data?: IDrugMovementDetail;
    isLoading: boolean;
  }

export function ReceiptPDF() {

    const {id} = useParams()
    const url = `/api/drugs/receipts/${id}`;


    const { isLoading, data }: ReceiptData = useQuery(['receipt', id], () => AppService.get(url), {
      enabled: !!id
    }
    );

   
    if(isLoading || !data) return <p>Загрузка ...</p>;

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col>
                    <p> Приложение № 4 к Порядку учета, хранения,
                        использования и списания лекарственных средств и
                        препаратов для ветеринарного применения,
                        поступающих за счет средств федерального и
                        областного бюджетов, бюджетными
                        государственными учреждениями ветеринарии
                        Ивановской области
                    </p>
                    
                </Col>
            </Row>
            <Row className={styles.pdfHeader}>
                <Col></Col>
                <Col>
                    <h2>УТВЕРЖДАЮ:</h2>
                    <h3>Начальник БГУ Ивановской области</h3>
                    <h3>"Ивановская городская СББЖ"</h3>
                    <div className={styles.pdfBoss}>
                       <Col></Col>
                       <Col><h3>/ В.Н. Барашков</h3></Col>
                       
                    </div>
                    <div className={styles.pdfDate}>
                        <Col><h3>" {data.operation_date.split("-")[2]} "</h3></Col>
                        <Col><h3>{data.operation_date.split("-")[1]}</h3></Col>
                        <Col><h3>{data.operation_date.split("-")[0]} г</h3></Col>
                    </div>
                </Col>
            </Row>
            <Row className={styles.pdfTitle}>
                <h2>Требование-заявка № {id}</h2>
                <h3>на отпуск ветеринарных препаратов и диагностических наборов</h3>
            </Row>
            
            <Row className={styles.pdfBody}>
                <h3>   Прошу выделить ветеринарные препараты/диагностические наборы для проведения</h3>
                <Col> <h3>диагностических исследований / обработок против:</h3></Col>   
                <h3>животных г. Иваново в ветклинике на ул. Танкиста Белороссова, д.30А</h3>
            </Row>

            <table>
                <tr>
                    <th>Наименование ветеринарного препарата</th>
                    <th>единицы измерения</th>
                    <th>серия</th>
                    <th>дата изготовления</th>
                    <th>количество</th>
                    <th>Цена за единицу</th>
                    <th>Сумма</th>
                    <th />
                </tr>
            </table>

        </Container>
    )
}