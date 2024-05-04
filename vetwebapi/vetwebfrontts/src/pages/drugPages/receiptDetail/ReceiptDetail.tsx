import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./ReceiptDetail.module.scss";
import { AppService } from "../../../app.service";
import { IDrugMovementDetail } from "../../../interfaces/DrugInterfaces";
import { CreateItem } from "../../../components/createItem/CreateItem";
import { AddDrugForm } from "../../../components/drugs/drugMovements/AddDrugForm";
import { ReceiptDrug } from "../../../components/drugs/drugMovements/ReceiptDrug";
import { CustomButton } from "../../../components/button/CustomButton";
import { useState } from "react";
import { ReceiptPDF } from "./receiptPdf/ReceiptPDF";




interface ReceiptData {
  data?: IDrugMovementDetail;
  isLoading: boolean;
}

export function ReceiptDetail() {

    const [pdf, setPdf] = useState(false)
    const {id} = useParams();
    const url = `/api/drugs/receipts/${id}`;


    const { isLoading, data }: ReceiptData = useQuery(['receipt', id], () => AppService.get(url), {
      enabled: !!id
    }
    );
   
    if(isLoading || !data) return <p>Загрузка ...</p>;

    const date = AppService.convertDateString(data.operation_date)
    
    
    return (  

      <>
      { !pdf ?
       ( <Container className={styles.detailWrap}>
        <Row className={styles.rowTop}>
          <Col sm={4} className={styles.colImg}>
              <img
                src="/drugsBg.jpg"
                alt={data.operation_date}
                />
          </Col>
         
          <Col>
            <h1>Поступление</h1>
            <h5>{date.fullDate}</h5>
          <div className={styles.buttonWrap}>
              <CreateItem btnTitle="Добавить препарат">
                  <AddDrugForm/>
              </CreateItem>
              <CustomButton 
                  className="btn-large"
                  title="Требование-заявка"
                  onClick={() => setPdf(true)}
                />

          </div>

            
          </Col>
        </Row>

        <Container className={styles.drugWrap}>
          <h5>Препараты </h5>
            <table className="table">

              <tbody >
                <tr>
                  <th>Наименование препарата</th>
                  <th>Серия</th>
                  <th>Контроль</th>
                  <th>Дата Изготовления</th>
                  <th>Количество упаковок</th>
                  <th>Количество единиц учета</th>
                  <th />
                </tr>
                {data.drugs?.length && data.drugs.map(
                  drug => <ReceiptDrug key={drug.id} drug={drug}/>
                )
                }
              </tbody>
            </table>

        </Container>
       
  </Container>)
      : <ReceiptPDF setPdf={setPdf} data={data}/>
      
}

      </>

    )
}