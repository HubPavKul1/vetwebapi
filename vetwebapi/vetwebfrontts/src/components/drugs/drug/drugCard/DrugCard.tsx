import { IDrugCard } from "../../../../interfaces/DrugInterfaces";
import { CatalogItem } from "../../../catalogItem/CatalogItem";
import { useMutation, useQueryClient } from "react-query";
import { DrugCardBody } from "./drugCardBody/DrugCardBody";
import { AppService } from "../../../../app.service";


interface DrugCardProps {
    drug: IDrugCard;
}

export function DrugCard({drug}: DrugCardProps) {

    
    const queryClient = useQueryClient()

    const url = `/api/drugs/${drug.id}`;

    const { mutate } = useMutation(["delete drug"], {
        mutationFn: () => AppService.deleteItem(url),
        onSuccess: () => {
            alert("Препарат успешно удален!")
            queryClient.invalidateQueries(["drugs"])
        }
    },
    )

    const deleteDrug = () => {
        mutate()
    }

    const fileUploadUrl = `/api/drugs/${drug.id}/upload/`


    return (
            <>
            <CatalogItem 
                id={drug.id} 
                cardTitle={drug.name} 
                imgSrc={drug.image}
                fileUploadUrl={fileUploadUrl} 
                url={`/drugs/${drug.id}/`}
            >

                <DrugCardBody
                    drugManufacturer={drug.drug_manufacturer}
                    drugInstr={drug.instruction}
                />
                
            </CatalogItem>
            </>
           
    )
}