import { Container, CardGroup, Row, Pagination } from "react-bootstrap";
import { CardEmpty } from "../CardEmpty"
import { CompanyCard } from "./company-card/CompanyCard"
import { CompanyService } from "./company.service"
import { CreateCompany } from "./CreateCompany"
import { useQuery } from "react-query"
import { LoadingSpinner } from "../Spinner";



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
    
    return (
        <>
        <Container>
                <Row>
                    <h2 className="text-center m-4">Предприятия</h2>
                    <CreateCompany />
                    <CardGroup>
                        {data?.length ? data.map(company =>(
                            <CompanyCard key={company.id} company={company} />
                        ))
                        :  <CardEmpty/>
                        
                        }
                    </CardGroup>
                </Row>
                <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
                </Pagination>
                
            </Container>
        </>
            
            

        
    )
}