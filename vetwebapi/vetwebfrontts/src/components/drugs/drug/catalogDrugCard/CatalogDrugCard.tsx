import { IDrugCatalogCard } from "../../../../interfaces/DrugInterfaces";
import { CatalogItem } from "../../../catalogItem/CatalogItem";
import { useMutation, useQueryClient } from "react-query";
import { AppService } from "../../../../app.service";
import { CatalogDrugCardBody } from "./catalogDrugCardBody/CatalogDrugCardBody";


interface CatalogDrugCardProps {
    item: IDrugCatalogCard;
}

export function CatalogDrugCard({item}: CatalogDrugCardProps) {

   
    const queryClient = useQueryClient()
    const url = `/api/drugs/catalog/${item.id}`;

    const { mutate } = useMutation(["delete catalogDrug"], {
        mutationFn: () => AppService.deleteItem(url),
        onSuccess: () => {
            alert("Препарат успешно удален!")
            queryClient.invalidateQueries(["drugCatalog"])
        }
    },
    )

    const deleteDrug = () => {
        mutate()
    }

    const productionDate = AppService.convertDateString(item.production_date).shortDate;
    const expirationDate = AppService.convertDateString(item.expiration_date).shortDate;

    return (
            <>
            <CatalogItem 
                id={item.id} 
                cardTitle={item.name} 
                imgSrc={item.image}
                onClick={deleteDrug}  
                url={`/drugs/catalog/${item.id}`}
            >

                <CatalogDrugCardBody
                    batch={item.batch}
                    control={item.control}
                    production_date={productionDate}
                    expiration_date={expirationDate}
                    
                />
                
            </CatalogItem>
            </>
           
    )
}