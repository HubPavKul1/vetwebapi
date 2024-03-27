import { Container, Col, Row, Pagination } from "react-bootstrap";
import { CardEmpty } from "../CardEmpty"
import { CompanyCard } from "./company-card/CompanyCard"
import { CompanyService } from "./company.service"
import { CreateCompany } from "./createCompany/CreateCompany"
import { useQuery } from "react-query"


export function Companies() {
    
    const { data } = useQuery(['companies'], () => CompanyService.getAll(),
        {
            select: ({data}) => data?.companies
        }
    )
    
    // if(isLoading) return (
    //     <>
    //         <Container>
    //             <LoadingSpinner/>
    //         </Container>
    //     </>
        
    
    // )
    
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
}