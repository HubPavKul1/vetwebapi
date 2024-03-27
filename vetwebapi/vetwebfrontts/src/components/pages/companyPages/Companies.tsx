import { Container, Col, Row, Pagination } from "react-bootstrap";
import { CardEmpty } from "../CardEmpty"
import { CompanyService } from "../../companies/company.service";
import { CreateCompany } from "../../companies/createCompany/CreateCompany";
import { useQuery } from "react-query"
import { Catalog } from "../../catalog/Catalog";


export function Companies() {
    
    const { data } = useQuery(['companies'], () => CompanyService.getAll(),
        {
            select: ({data}) => data?.companies
        }
    )

    if (!data?.length) return (
        <Catalog>
            <CreateCompany/>
            <h2>Хозяйства отсутствуют</h2>
        </Catalog>
    )
    
       
    return (
            <Catalog items={data}>
                <CreateCompany/>
            </Catalog>
           
    )

        
  
}


// return (
//     <>
//     <Container className="companies-container">
//             <CreateCompany />

//             <ul className="company-items list-reset flex">
                
//                 {data?.length ? data.map(company =>(
//                     <li className="company-item flex" key={company.id}>
//                          <CompanyCard company={company} />
//                     </li>
                        
//                     ))
//                     : <>
//                          <li className="company-item flex">
//                              <CardEmpty/>
//                         </li>
//                         <li className="company-item flex">
//                              <CardEmpty/>
//                         </li>
//                         <li className="company-item flex">
//                              <CardEmpty/>
//                         </li>
//                         <li className="company-item flex">
//                              <CardEmpty/>
//                         </li>
                       
//                     </>      
                    
                    
                    
//                     }
            

//             </ul>
            
//         </Container>
//     </>
        
// )