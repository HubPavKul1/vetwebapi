import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./VaccinationDetail.module.scss";
import { AppService } from "../../../../app.service";
import { CreateItem } from "../../../../components/createItem/CreateItem";
import { CustomButton } from "../../../../components/button/CustomButton";
import { useState } from "react";
import { IVaccinationDetail } from "../../../../interfaces/VetWorkInterfaces";
import { AddDrugForm } from "../../../../components/drugs/drugMovements/AddDrugForm";
import { AddAnimalForm } from "../../../../components/companies/animal/AddAnimalForm";
import { ReceiptDrug } from "../../../../components/drugs/drugMovements/ReceiptDrug";
import { AddAnimalsToVetWorkForm } from "../../../../components/vetWorks/AddAnimalsToVetWorkForm";





interface VaccinationData {
  data?: IVaccinationDetail;
  isLoading: boolean;
}

export function VaccinationDetail() {

    const [pdf, setPdf] = useState(false)
    const {id} = useParams();
    const url = `/api/vetwork/${id}`;


    const { isLoading, data }: VaccinationData = useQuery(['vaccination', id], () => AppService.get(url), {
      enabled: !!id
    }
    );
   
    if(isLoading || !data) return <p>Загрузка ...</p>;

    const date = AppService.convertDateString(data.vetwork_date)
    
    
    return (  

      <>
      { !pdf ?
       ( <Container className={styles.detailWrap}>
        <Row className={styles.rowTop}>
          <Col sm={4} className={styles.colImg}>
              <img
                src="/vetworkBg.jpg"
                alt={data.vetwork_date}
                />
          </Col>
         
          <Col>
            <h1>Вакцинация</h1>
            <h5>{date.fullDate}</h5>
          <div className={styles.buttonWrap}>
              <CreateItem btnTitle="Добавить препарат">
                  <AddDrugForm url={`/api/vetwork/${id}/drug`} queryKey="vaccination"/>
              </CreateItem>
              <CreateItem btnTitle="Добавить животных">
                  <AddAnimalsToVetWorkForm/>
              </CreateItem>
              <CustomButton 
                  className="btn-large"
                  title="Акт на обработку"
                  onClick={() => setPdf(true)}
                />

          </div>

            
          </Col>
        </Row>

        <Container className={styles.drugWrap}>
          <h5>Препарат </h5>
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
                {data.drug  && 
                   <ReceiptDrug drug={data.drug}/>
                }
              </tbody>
            </table>

        </Container>
       
  </Container>)
      : ""
      // <ReceiptPDF setPdf={setPdf} data={data}/>
      
}

      </>

    )
}