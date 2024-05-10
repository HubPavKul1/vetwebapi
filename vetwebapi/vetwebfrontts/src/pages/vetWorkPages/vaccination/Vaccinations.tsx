import { Row } from "react-bootstrap";

import { useQuery } from "react-query";
import { Catalog } from "../../../components/catalog/Catalog";
import { catalogItemData } from "../../../components/data/CatalogItemData";
import { CatalogItem } from "../../../components/catalogItem/CatalogItem";

import { CreateItem } from "../../../components/createItem/CreateItem";
import { CreateDrugReceiptForm } from "../../../components/drugs/drugMovements/CreateDrugReceiptForm";
import { AppService } from "../../../app.service";
import { IVetwork } from "../../../interfaces/VetWorkInterfaces";
import { VetWorkCard } from "../../../components/vetWorks/VetWorkCard";
import { VaccinationCreateForm } from "../../../components/vetWorks/VaccinationCreateForm";


interface VaccinationsData {
    data?: IVetwork[];
    isLoading: boolean;
    error?: Error | null;
}


export function Vaccinations() {

    const url = "/api/vetwork/vaccinations"
    
    const { data, isLoading, error }: VaccinationsData = useQuery(['vaccinations'], () => AppService.getAll(url),
        {
            select: ({data}) => data?.vetworks
            
        }
    )


    if(isLoading || !data) return <p>Загрузка ...</p>;
                           
    return (
        <Catalog title="Вакцинация">

            <CreateItem btnTitle="Добавить вакцинацию">
                <VaccinationCreateForm/>
            </CreateItem>
          
            <Row xs={1} md={3} lg={3}>
                {data.length ? data.map(vetWork => (
                    <VetWorkCard key={vetWork.id} vetWork={vetWork}/>
                )):
                    catalogItemData.map(item => (  
                    <CatalogItem key={item.id} {...item} /> 
                ))}
            </Row>
                
        </Catalog>
    )
      
}