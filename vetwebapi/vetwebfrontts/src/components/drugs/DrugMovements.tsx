import { useQuery } from "react-query"
import { DrugService } from "./drugs.service"
import { Container, Row, CardGroup, Pagination } from "react-bootstrap"
import { CardEmpty } from "../CardEmpty"



export function DrugMovements() {
    
    const { data, error } = useQuery(['drugs'], () => DrugService.getDrugMovements(),
        {
            select: ({data}) => data?.drug_movements
        }
    )
    
    
    
    return (
  
        <>
        <Container>
                <Row>
                    <h2 className="text-center m-4">Поступления препаратов</h2>
                    {/* <CreateCompany /> */}
                    <CardGroup>
                        {data?.length ? data.map(company =>(
                            <CardEmpty key={company.id} />
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