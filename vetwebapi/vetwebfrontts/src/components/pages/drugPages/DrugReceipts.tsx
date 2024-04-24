import { Row } from "react-bootstrap";

import { useQuery } from "react-query";
import { Catalog } from "../../catalog/Catalog";
import { catalogItemData } from "../../data/CatalogItemData";
import { CatalogItem } from "../../catalogItem/CatalogItem";
import { DrugMovementCard } from "../../drugs/drugMovements/DrugMovementCard";
import { CreateItem } from "../../createItem/CreateItem";
import { CreateDrugReceiptForm } from "../../drugs/drugMovements/CreateDrugReceiptForm";
import { IDrugMovement } from "../../../interfaces/DrugInterfaces";
import { AppService } from "../../../app.service";


interface DrugReceiptsData {
    data?: IDrugMovement[];
    isLoading: boolean;
    error?: Error | null;
}


export function DrugReceipts() {

    const url = "/api/drugs/receipts"
    
    const { data, isLoading, error }: DrugReceiptsData = useQuery(['drugReceipts'], () => AppService.getAll(url),
        {
            select: ({data}) => data?.drug_movements
        }
    )

    if(isLoading || !data) return <p>Загрузка ...</p>;
                           
    return (
        <Catalog title="Поступление биопрепаратов">

            <CreateItem btnTitle="Добавить поступление препарата">
                <CreateDrugReceiptForm/>
            </CreateItem>
          

            <Row xs={1} md={3} lg={3}>
                {data.length ? data.map(drugMovement => (
                    <DrugMovementCard key={drugMovement.id} drugMovement={drugMovement}/>
                )):
                    catalogItemData.map(item => (  
                    <CatalogItem key={item.id} {...item} /> 
                ))}
            </Row>
                
        </Catalog>
    )
      
}