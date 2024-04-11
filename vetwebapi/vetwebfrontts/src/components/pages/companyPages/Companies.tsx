import { Row } from "react-bootstrap";

import { CompanyService } from "../../companies/company.service";
import { useQuery } from "react-query";
import { Catalog } from "../../catalog/Catalog";
import { catalogItemData } from "../../data/CatalogItemData";
import { CatalogItem } from "../../catalogItem/CatalogItem";
import { CompanyCard } from "../../companies/company-card/CompanyCard";
import { CreateCompanyForm } from "../../companies/createCompany/CreateCompanyForm";
import { CreateItem } from "../../createItem/CreateItem";



export function Companies() {
    
    const { data } = useQuery(['companies'], () => CompanyService.getAll(),
        {
            select: ({data}) => data?.companies
        }
    )
                           
    return (
            <Catalog title="Предприятия">
                <CreateItem btnTitle="Добавить предприятие">
                    <CreateCompanyForm/>
            </CreateItem>
            

            <Row xs={1} md={3} lg={3}>
                {data?.length ? data.map(company => (
                    <CompanyCard key={company.id} company={company}/>
                )):
                    catalogItemData.map(item => (  
                    <CatalogItem key={item.id} {...item }/> 
                ))}
            </Row>
                
        </Catalog>
    )
      
}


