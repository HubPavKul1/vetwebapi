import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Container, Row, Col } from "react-bootstrap";
import { IoAddCircleOutline } from "react-icons/io5";

import styles from "./VaccinationDetail.module.scss";
import { AppService } from "../../../../app.service";
import { CreateItem } from "../../../../components/createItem/CreateItem";
import { CustomButton } from "../../../../components/button/CustomButton";
import { useState } from "react";
import { IVetWorkSchema } from "../../../../interfaces/VetWorkInterfaces";
import { AddDrugForm } from "../../../../components/drugs/drugMovements/AddDrugForm";
import { AddAnimalForm } from "../../../../components/companies/animal/AddAnimalForm";
import { ReceiptDrug } from "../../../../components/drugs/drugMovements/ReceiptDrug";
import { AddAnimalsToVetWorkForm } from "../../../../components/vetWorks/AddAnimalsToVetWorkForm/AddAnimalsToVetWorkForm";
import { AnimalInVetwork } from "../../../../components/vetWorks/AnimalInVetwork";
import { ActPDF } from "./actPdf/ActPDF";
import { VetWorkPageMenu } from "../../../../components/menu/VetWorkPageMenu";
import { CompanyAddress } from "../../../../components/companies/address/CompanyAddress";
import { AnimalsListPDF } from "./animalsListPdf/AnimalsListPDF";





interface VaccinationData {
  data?: IVetWorkSchema;
  isLoading: boolean;
}

export function VaccinationDetail() {

    const [act, showAct] = useState(false)
    const [animalsList, showAnimalsList] = useState(false)
    const [animals, setAnimals] = useState(false)
    const [companyId, setCompanyId] = useState("")

    const {id} = useParams();
    const url = `/api/vetwork/${id}`;


    const { isLoading, data }: VaccinationData = useQuery(['vaccination', id], () => AppService.get(url), {
      enabled: !!id
    }
    );
   
    if(isLoading || !data) return <p>Загрузка ...</p>;

    const date = AppService.convertDateString(data.vetwork_date)

    const addAnimals = (company_id: string) => {
      setAnimals(true);
      setCompanyId(company_id)
    }
    
    
    return (  

      <>
      { !act && !animalsList && !animals ?
       ( <Container className={styles.detailWrap}>
        <Row className={styles.rowTop}>
          <Col sm={8} className={styles.colImg}>
              <img
                src="/vetworkBg.jpg"
                alt={data.vetwork_date}
                />
          </Col>

          <Col>
              <VetWorkPageMenu />
              <Container className={styles.pdfButtons}>
                <div>
                  <CustomButton 
                    className="btn-submit"
                    title="Акт на обработку"
                    onClick={() => showAct(true)}
                  />
                </div>
                <div>
                  <CustomButton 
                    className="btn-submit"
                    title="Опись к акту"
                    onClick={() => showAnimalsList(true)}
                  />

                </div>
                
              </Container>
              
          </Col>
        </Row>
         
        <Container className={styles.drugWrap}>
        <p className={styles.animalCounter}>Всего голов: {data?.animals?.length}</p>
        <h5>Предприятия </h5>
          {data.companies?.length && data.companies.map(
            company => (
              <>
                <div key={company.id}>
                  <Row className={styles.companyTitle}> 
                    <Col sm={6}><h5><Link to={`/companies/${company.id}`}>{company.full_name}</Link></h5></Col>
                    <Col>
                      <CustomButton 
                        className="btn-submit" 
                        title="Добавить животных"
                        onClick={() => addAnimals(company.id.toString())}
                      />
                    </Col>
                    <Col></Col>
                    
                  </Row>
                  
                  <p>адрес: {`${company.address?.street}, ${company.address?.house_number}`}</p>
                  <p>телефон: {`${company.address?.phone_number1}, ${company.address?.phone_number2}`}</p>

                </div>

                <Container>
                <h5>Животные </h5>
                  <table className="table">
                    

                          <tbody className="animals-rows">
                            <tr>
                              <th>Вид животных</th>
                              <th>Пол животных</th>
                              <th>Дата рождения</th>
                              <th>Кличка</th>
                              <th>Идентификация</th>
                              <th />
                            </tr>
                            {data.animals?.length && data.animals.filter((animal) => animal.company_id === company.id)
                            .map(animal => <AnimalInVetwork key={animal.animal_id} animal={animal}/>)
                            
                            }
                          </tbody>
                        </table>

                </Container>

              </>
              

            
           )
          )

          }
                  
                 
        </Container>

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
      : act ? <ActPDF setPdf={showAct} data={data}/>
      : animalsList ? <AnimalsListPDF setPdf={showAnimalsList} data={data}/>
      : animals && <AddAnimalsToVetWorkForm setAnimals={setAnimals} companyId={companyId}/>
      
      
}



      </>

    )
}