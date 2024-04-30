import { Col, Container, Row } from "react-bootstrap";
import { IDrugMovementDetail } from "../../../interfaces/DrugInterfaces";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { usePDF } from "react-to-pdf";
import { AppService } from "../../../app.service";

import styles from "./ReceiptDetail.module.scss";


interface ReceiptData {
    data: IDrugMovementDetail;
  }

export function ReceiptPDF({data}: ReceiptData) {
   
    const {id} = useParams()
    const { toPDF, targetRef } = usePDF({filename: "receipt.pdf"});
    // const url = `/api/drugs/receipts/${id}`;


    // const { isLoading, data }: ReceiptData = useQuery(['receipt', id], () => AppService.get(url), {
    //   enabled: !!id
    // }
    // );

   
    // if(isLoading || !data) return <p>Загрузка ...</p>;

    const diseases = new Set(data.drugs?.map(drug => drug.disease.toLowerCase() + ", "));

    const date = new Date(data.operation_date)
    const month = date.toLocaleString('default', { month: 'long' });


    return (
        <Container>
            <button onClick={() => toPDF()}>Загрузить PDF</button>
            <div className={styles.pdfWrap} ref={targetRef}>
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
                        <Row className={styles.pdfBoss}>
                            <Col></Col>
                            <Col><h5>/ В.Н. Барашков</h5></Col>
                        </Row>
                        <Row className={styles.pdfDate}>
                            <Col><h5>" {data.operation_date.split("-")[2]} "</h5></Col>
                            <Col><h5>{month}</h5></Col>
                            <Col><h5>{data.operation_date.split("-")[0]} г</h5></Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={styles.pdfTitle}>
                    <h3>Требование-заявка № {data.id}</h3>
                    <h5>на отпуск ветеринарных препаратов и диагностических наборов</h5>
                </Row>
                
                <Row className={styles.pdfBody}>
                    <h5>   Прошу выделить ветеринарные препараты/диагностические наборы для проведения</h5>
                </Row>
                <Row className={styles.pdfBody}>
                    <Col> <h5>диагностических исследований / обработок против:</h5></Col>
                    <Col className={styles.disease}><h5>{diseases}</h5></Col>   
                </Row>
                <Row className={styles.pdfBody}>
                    <h5>животных г. Иваново в ветклинике на ул. Танкиста Белороссова, д.30А</h5>
                </Row>

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
                        <Col md={2}><h6>{drug.production_date}</h6></Col>
                        <Col md={1}><h6>{drug.units_amount}</h6></Col>
                        <Col md={1}></Col>
                        <Col md={1}></Col>
                    </Row>

                    )
                }
            
                </Container>
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
            </div>
            

          

        </Container>
    )
}