import { Container, CardGroup } from "react-bootstrap";
import { CardEmpty } from "../CardEmpty"
import { CompanyCard } from "./company-card/CompanyCard"
import { CompanyService } from "./company.service"
import { CreateCompany } from "./CreateCompany"
import { useQuery } from "react-query"



export function Companies() {
    
    const { data, isLoading } = useQuery(['companies'], () => CompanyService.getAll(),
        {
            select: ({data}) => data?.companies
        }
    )
    
    if(isLoading) return <p>Загрузка ...</p>
    
    return (
            <Container>
                <h2 className="text-center m-4">Предприятия</h2>
                <CardGroup>
                    {data?.length ? data.map(company =>(
                        <CompanyCard key={company.id} company={company} />
                    ))
                    :  <CardEmpty/>
                      
                    }
                </CardGroup>
            </Container>
            

        
    )
}