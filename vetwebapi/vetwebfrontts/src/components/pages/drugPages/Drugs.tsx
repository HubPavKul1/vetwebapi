import { Row } from "react-bootstrap";
import { DrugService } from "../../drugs/drugs.service";


import { useQuery } from "react-query"
import { Catalog } from "../../catalog/Catalog";
import { catalogItemData } from "../../data/CatalogItemData";
import { CatalogItem } from "../../catalogItem/CatalogItem";
import { DrugCard } from "../../drugs/drug/DrugCard";
import { CreateItem } from "../../createItem/CreateItem";
import { CreateDrugForm } from "../../drugs/drug/CreateDrugForm";



export function Drugs() {
    
    const { data, error } = useQuery(['drugs'], () => DrugService.getDrugs(),
        {
            select: ({data}) => data?.drugs
        }
    )

                           
    return (
        <Catalog title="Справочник биопрепаратов">

            <CreateItem btnTitle="Добавить препарат">
                <CreateDrugForm/>
            </CreateItem>
          

            <Row xs={1} md={3} lg={3}>
                {data?.length ? data.map(drug => (
                    <DrugCard key={drug.id} drug={drug}/>
                )):
                    catalogItemData.map(item => (  
                    <CatalogItem key={item.id} {...item}/> 
                ))}
            </Row>
                
        </Catalog>
    )
      
}