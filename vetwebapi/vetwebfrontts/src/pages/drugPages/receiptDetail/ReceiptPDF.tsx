import { Col, Container, Row } from "react-bootstrap";
import { IDrugMovementDetail } from "../../../interfaces/DrugInterfaces";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { AppService } from "../../../app.service";

import styles from "./ReceiptDetail.module.scss"
import { ReceiptDrug } from "../../../components/drugs/drugMovements/ReceiptDrug";


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
        <Container className={styles.pdfWrap}>
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
                    <h5>УТВЕРЖДАЮ:</h5>
                    <h5>Начальник БГУ Ивановской области</h5>
                    <h5>"Ивановская городская СББЖ"</h5>
                    <div className={styles.pdfBoss}>
                       <Col></Col>
                       <Col><h5>/ В.Н. Барашков</h5></Col>
                       
                    </div>
                    <div className={styles.pdfDate}>
                        <Col><h5>" {data.operation_date.split("-")[2]} "</h5></Col>
                        <Col><h5>{data.operation_date.split("-")[1]}</h5></Col>
                        <Col><h5>{data.operation_date.split("-")[0]} г</h5></Col>
                    </div>
                </Col>
            </Row>
            <Row className={styles.pdfTitle}>
                <h3>Требование-заявка № {id}</h3>
                <h5>на отпуск ветеринарных препаратов и диагностических наборов</h5>
            </Row>
            
            <Row className={styles.pdfBody}>
                <h5>   Прошу выделить ветеринарные препараты/диагностические наборы для проведения</h5>
                <Col> <h5>диагностических исследований / обработок против:</h5></Col>   
                <h5>животных г. Иваново в ветклинике на ул. Танкиста Белороссова, д.30А</h5>
            </Row>
            <Row className={styles.tHead}>
                <Col md={5}>Наименование ветеринарного препарата</Col>
                <Col md={1}>Ед. измерения</Col>
                <Col md={1}>Серия</Col>
                <Col md={2}>Дата изготовления</Col>
                <Col md={1}>Кол-во</Col>
                <Col md={1}>Цена за единицу</Col>
                <Col md={1}>Сумма</Col>
            </Row>
            {data.drugs &&
                data.drugs.map(drug => 
                <Row key={drug.id} className={styles.tBody}>
                    <Col md={5}>{drug.name}</Col>
                    <Col md={1}>доз</Col>
                    <Col md={1}>{drug.batch}</Col>
                    <Col md={2}>{drug.production_date}</Col>
                    <Col md={1}>{drug.units_amount}</Col>
                    <Col md={1}></Col>
                    <Col md={1}></Col>
                </Row>

                )
            }
           
            <Row>
                <Col md={4}><h5>Отпустил:</h5></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row className={styles.pdfFooter}>
                <Col md={5}><h5>Уполномоченное ответственное лицо, ветеринарный врач</h5></Col>
                <Col md={3} className={styles.col2}></Col>
                <Col></Col>
                <Col md={3} className={styles.col2}></Col>
            </Row>
            <Row>

            </Row>
            <Row>
                <Col md={4}><h5>Получил:</h5></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col md={5}><h5>Ветврач-исполнитель</h5></Col>
                <Col md={3} className={styles.col2}></Col>
                <Col></Col>
                <Col md={3} className={styles.col2}></Col>
            </Row>
            <Row>
                <Col md={5}><h5>Ветврач-лаборант</h5></Col>
                <Col md={3} className={styles.col2}></Col>
                <Col></Col>
                <Col md={3} className={styles.col2}></Col>
            </Row>
            <Row>

            </Row>

          

        </Container>
    )
}