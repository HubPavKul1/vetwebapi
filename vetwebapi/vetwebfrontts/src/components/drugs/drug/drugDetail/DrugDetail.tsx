import { useParams } from "react-router-dom";
import { useQuery } from "react-query"
import { Container, Row, Col } from "react-bootstrap";

import styles from "./DrugDetail.module.scss"
import { AppService } from "../../../../app.service";
import { IDrugDetail } from "../../../../interfaces/DrugInterfaces";




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
          
          {/* <h5>{data.name}</h5> */}
          {/* <p className={styles.animalCounter}>Всего голов: {data?.animals?.length}</p> */}
            {/* <table className="table">
              

                    <tbody className="animals-rows">
                      <tr>
                        <th>Наименование препарата</th>
                        <th>Пол животных</th>
                        <th>Дата рождения</th>
                        <th>Кличка</th>
                        <th>Идентификация</th>
                        <th />
                      </tr>
                      {data.animals?.length ? data.animals.map(animal => <CompanyAnimal key={animal.id} animal={animal}/>)
                      
                      
                      : ""
                      
                      }
                    </tbody>
                  </table> */}

        </Row>
       
  </Container>


      </>

    )
}