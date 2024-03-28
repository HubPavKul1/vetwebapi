import { Row } from "react-bootstrap";

import { CompanyService } from "../../companies/company.service";
import { CreateCompany } from "../../companies/createCompany/CreateCompany";
import { useQuery } from "react-query"
import { Catalog } from "../../catalog/Catalog";
import { CompanyCards } from "../../companies/CompanyCards";
import { catalogItemData } from "../../catalogItem/CatalogItemData";
import { CatalogItem } from "../../catalogItem/CatalogItem";



export function Companies() {
    
    const { data } = useQuery(['companies'], () => CompanyService.getAll(),
        {
            select: ({data}) => data?.companies
        }
    )
                           
    return (
        <Catalog>
            <CreateCompany/>

            <Row xs={1} md={2} lg={2}>
                {data?.length ? <CompanyCards companies={data}/>:
                    catalogItemData.map(item => (  
                    <CatalogItem key={item.id} {...item}/> 
                ))}
            </Row>
                
        </Catalog>
    )
      
}


