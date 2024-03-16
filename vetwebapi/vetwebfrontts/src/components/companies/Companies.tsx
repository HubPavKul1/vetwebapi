import { Container, Col, Row, Pagination } from "react-bootstrap";
import { CardEmpty } from "../CardEmpty"
import { CompanyCard } from "./company-card/CompanyCard"
import { CompanyService } from "./company.service"
import { CreateCompany } from "./CreateCompany"
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
    
    return (
        <>
        <Container fluid className="pd-4">
                <CreateCompany />
                <Row className="g-4">
                    {data?.length ? data.map(company =>(
                        <Col key={company.id} md={3} sm={1}>
                            <CompanyCard company={company} />
                        </Col>
                            
                        ))
                        :  <CardEmpty/>
                        
                        }
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