import { Row } from "react-bootstrap";
import { DrugService } from "../../drugs/drugs.service";


import { useQuery } from "react-query"
import { Catalog } from "../../catalog/Catalog";
import { catalogItemData } from "../../data/CatalogItemData";
import { CatalogItem } from "../../catalogItem/CatalogItem";
import { DrugMovementCards } from "../../drugs/drugMovementCard/DrugMovementCards";



export function DrugReceipts() {
    
    const { data, error } = useQuery(['drugReceipts'], () => DrugService.getDrugMovements(),
        {
            select: ({data}) => data?.drugMovements
        }
    )
                           
    return (
        <Catalog title="Поступление биопрепаратов">
            {/* <CreateCompany/> */}

            <Row xs={1} md={3} lg={3}>
                {data?.length ? <DrugMovementCards drugMovements={data}/>:
                    catalogItemData.map(item => (  
                    <CatalogItem key={item.id} {...item}/> 
                ))}
            </Row>
                
        </Catalog>
    )
      
}