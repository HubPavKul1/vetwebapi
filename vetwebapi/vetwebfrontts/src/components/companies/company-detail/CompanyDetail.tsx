import { useParams } from "react-router-dom";
import { CompanyService } from "../company.service";
import { useQuery } from "react-query"
import { CompanyAddress } from "../address/CompanyAddress";
import { CompanyEmployee } from "../employee/CompanyEmployee";
import { CompanyAnimal } from "../animal/CompanyAnimal";
import { CompanyPageMenu } from "./CompanyPageMenu";
import { Container, Row, Col } from "react-bootstrap";


export function CompanyDetail() {
    const {id} = useParams();

    const { data, isLoading } = useQuery(['company', id], () => CompanyService.getById(id), {
      enabled: !!id
    }
    );

   
    if(isLoading) return <p>Загрузка ...</p>

    return (

      <>
      <Container className="company-detail-container">
        <Container className="company-detail-top flex">
          <div className="container company-detail-image-wrap">
            <img
                className="company-detail-image"
                src="/animals2-2.png"
                alt="animals2.png"
              />

          </div>
          
          <div className="container company-menu-wrap">
            <CompanyPageMenu compId={data?.id}/>
          </div>  

        </Container>

               
        <Container className="company-detail-title-wrap flex">
                  <h2>
                  <a href="#">
                    {data?.full_name} 
                  </a>
                  </h2>
                    {data?.address ? 
                    <CompanyAddress address={data.address}/>
                    : <p>Адрес</p>
                    }
                 
        </Container>

        <Container className="company-detail-employee">
          <h5 className="section-title">Работники</h5>
            <table className="table">
                    <tbody>
                      <tr>
                        <th>Должность</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                      </tr>
    
                      {data?.employees?.length ? 
                        data.employees.map(empoloyee => <CompanyEmployee key={empoloyee.id} employee={empoloyee} />)
                      
                      : <tr>
                          <td>Работники</td>
                        </tr>
                      }
                      
                    </tbody>
                  </table>
            
        </Container>
        <Container className="company-detail-animals">
          <h5 className="section-title">Животные </h5>
          <p className="animal-counter">Всего голов: {data?.animals?.length}</p>
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
                      {data?.animals?.length ? data.animals.map(animal => <CompanyAnimal key={animal.id} animal={animal}/>)
                      
                      
                      : <tr>
                          <td>Животные</td>
                         </tr>
                      
                      }
                    </tbody>
                  </table>

        </Container>
       
  </Container>


      </>

    )
}