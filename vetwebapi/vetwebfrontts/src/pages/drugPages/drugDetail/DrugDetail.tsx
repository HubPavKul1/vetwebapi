import { useParams } from "react-router-dom";
import { useQuery } from "react-query"
import { Container, Row, Col } from "react-bootstrap";

import styles from "./DrugDetail.module.scss"
import { AppService } from "../../../app.service";
import { IDrugDetail } from "../../../interfaces/DrugInterfaces";




interface DrugData {
  data?: IDrugDetail;
  isLoading: boolean;
}

export function DrugDetail() {

    const {id} = useParams();
    const url = `/api/drugs/${id}`;


    const { isLoading, data }: DrugData = useQuery(['drug', id], () => AppService.get(url), {
      enabled: !!id
    }
    );

   
    if(isLoading || !data) return <p>Загрузка ...</p>;
    
    return (

      <>
      <Container className={styles.drugDetailWrap}>
        <Row className={styles.rowTop}>
          <Col sm={4} className={styles.colImg}>
              <img
                src={`/${data.image}`}
                alt={data.name}
                />
          </Col>
         
          <Col>
            <h5>{data.name}</h5>
            <p>{data.drug_manufacturer}</p>
          </Col>
        </Row>

        <Row className={styles.rowBody}>
          {data.instruction && 
            <object
            type="application/pdf" 
            data={`/${data.instruction}`}
            width="100%"
            // height="200%"
            ></object>
          }

        </Row>
       
  </Container>


      </>

    )
}