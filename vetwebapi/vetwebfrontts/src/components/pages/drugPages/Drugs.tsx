import { Row } from "react-bootstrap";

import { useQuery } from "react-query"
import { Catalog } from "../../catalog/Catalog";
import { catalogItemData } from "../../data/CatalogItemData";
import { CatalogItem } from "../../catalogItem/CatalogItem";
import { DrugCard } from "../../drugs/drug/drugCard/DrugCard";
import { CreateItem } from "../../createItem/CreateItem";
import { CreateDrugForm } from "../../drugs/drug/CreateDrugForm";
import { IDrugCard } from "../../../interfaces/DrugInterfaces";
import { AppService } from "../../../app.service";


interface DrugsData {
    data?: IDrugCard[];
    isLoading: boolean;
    error?: Error | null;
}

export function Drugs() {
    const url = "/api/drugs"
    
    const { data, isLoading, error }: DrugsData = useQuery(['drugs'], () => AppService.getAll(url),
        {
            select: ({data}) => data?.drugs
        }
    )

    if(isLoading || !data) return <p>Загрузка ...</p>;

                           
    return (
        <Catalog title="Справочник биопрепаратов">

            <CreateItem btnTitle="Добавить препарат">
                <CreateDrugForm/>
            </CreateItem>

            <Row xs={1} md={3} lg={3}>
                {data.length ? data.map(drug => (
                    <DrugCard key={drug.id} drug={drug}/>
                )):
                    catalogItemData.map(item => (  
                    <CatalogItem key={item.id} {...item}/> 
                ))}
            </Row>
                
        </Catalog>
    )
      
}