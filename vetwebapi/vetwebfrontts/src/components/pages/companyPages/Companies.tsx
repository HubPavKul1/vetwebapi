import { Row } from "react-bootstrap";

import { CompanyService } from "../../companies/company.service";
import { CreateCompany } from "../../companies/createCompany/CreateCompany";
import { useQuery } from "react-query"
import { Catalog } from "../../catalog/Catalog";
import { catalogItemData } from "../../data/CatalogItemData";
import { CatalogItem } from "../../catalogItem/CatalogItem";
import { CompanyCard } from "../../companies/company-card/CompanyCard";



export function Companies() {
    
    const { data } = useQuery(['companies'], () => CompanyService.getAll(),
        {
            select: ({data}) => data?.companies
        }
    )
                           
    return (
        <Catalog title="Предприятия">
            <CreateCompany/>

            <Row xs={1} md={3} lg={3}>
                {data?.length ? data.map(company => (
                    <CompanyCard key={company.id} company={company}/>
                )):
                    catalogItemData.map(item => (  
                    <CatalogItem key={item.id} {...item}/> 
                ))}
            </Row>
                
        </Catalog>
    )
      
}


