import { IDrugCatalogCard } from "../../../../interfaces/DrugInterfaces";
import { CatalogItem } from "../../../catalogItem/CatalogItem";
import { useMutation, useQueryClient } from "react-query";
import { AppService } from "../../../../app.service";


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

    

    return (
            <>
            <CatalogItem 
                id={item.id} 
                cardTitle={item.name} 
                imgSrc={item.image}
                onClick={deleteDrug}  
                url={`/drugs/catalog/${item.id}`}
            >

                {/* <DrugCardBody
                    drugManufacturer={drug.drug_manufacturer}
                    fileUploadUrl={fileUploadUrl}
                    drugInstr={drug.instruction}
                /> */}
                
            </CatalogItem>
            </>
           
    )
}