import { useParams } from "react-router-dom";
import { useQuery } from "react-query"
import { Container, Row, Col } from "react-bootstrap";

import styles from "./ReceiptDetail.module.scss"
import { AppService } from "../../../../app.service";
import { IDrugMovementDetail } from "../../../../interfaces/DrugInterfaces";




interface ReceiptData {
  data?: IDrugMovementDetail;
  isLoading: boolean;
}

export function ReceiptDetail() {

    const {id} = useParams();
    const url = `/api/drugs/receipts/${id}`;


    const { isLoading, data }: ReceiptData = useQuery(['receipt', id], () => AppService.get(url), {
      enabled: !!id
    }
    );

   
    if(isLoading || !data) return <p>Загрузка ...</p>;
    
    return (

      <>
      <Container className={styles.detailWrap}>
        <Row className={styles.rowTop}>
          <Col sm={4} className={styles.colImg}>
              <img
                src="/drugsBg.jpg"
                alt={data.operation_date}
                />
          </Col>
         
          <Col>
            <h1>Поступление</h1>
            <h5>{data.operation_date}</h5>
            {/* <p>{data.operation_date}</p> */}
          </Col>
        </Row>

        {/* <Row className={styles.rowBody}>
          {data.instruction && 
            <object
            type="application/pdf" 
            data={`/${data.instruction}`}
            width="100%"
            // height="200%"
            ></object>
          }

        </Row> */}
       
  </Container>


      </>

    )
}