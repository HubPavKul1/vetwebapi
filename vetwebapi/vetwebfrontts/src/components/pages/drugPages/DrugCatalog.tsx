import { Row } from "react-bootstrap";

import { useQuery } from "react-query"
import { Catalog } from "../../catalog/Catalog";
import { catalogItemData } from "../../data/CatalogItemData";
import { CatalogItem } from "../../catalogItem/CatalogItem";
import { CreateItem } from "../../createItem/CreateItem";
import { CreateDrugForm } from "../../drugs/drug/CreateDrugForm";
import { IDrugCatalogCard } from "../../../interfaces/DrugInterfaces";
import { AppService } from "../../../app.service";
import { CatalogDrugCard } from "../../drugs/drug/catalogDrugCard/CatalogDrugCard";


interface DrugCatalogData {
    data?: IDrugCatalogCard[];
    isLoading: boolean;
    error?: Error | null;
}

export function DrugCatalog() {

    const url = "api/drugs/catalog"
    
    const { data, isLoading, error }: DrugCatalogData = useQuery(['drugCatalog'], () => AppService.getAll(url),
        {
            select: ({data}) => data?.catalog_drugs
        }
    )


    if(isLoading || !data) return <p>Загрузка ...</p>;

    console.log("data>>>", data)

                           
    return (
        <Catalog title="Каталог биопрепаратов">

            <CreateItem btnTitle="Добавить препарат">
                <CreateDrugForm/>
            </CreateItem>
          

            <Row xs={1} md={3} lg={3}>
                {data.length ? data.map(drug => (
                    <CatalogDrugCard key={drug.id} item={drug}/>
                )):
                    catalogItemData.map(item => (  
                    <CatalogItem key={item.id} {...item}/> 
                ))}
            </Row>
                
        </Catalog>
    )
      
}