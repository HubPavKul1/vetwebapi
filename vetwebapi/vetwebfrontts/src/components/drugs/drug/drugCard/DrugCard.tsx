import { IDrugCard } from "../../../../interfaces/DrugInterfaces";
import { CatalogItem } from "../../../catalogItem/CatalogItem";
import { useMutation, useQueryClient } from "react-query";
import { DrugService } from "../../drugs.service";
import { FileUpload } from "../../../fileUpload/FileUpload";
import { DrugCardBody } from "./drugCardBody/DrugCardBody";


interface DrugCardProps {
    drug: IDrugCard;
}

export function DrugCard({drug}: DrugCardProps) {

    
    const queryClient = useQueryClient()

    const { mutate } = useMutation(["delete drug"], {
        mutationFn: () => DrugService.deleteDrug(drug.id.toString()),
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
    const url = `/drugs/${drug.id}/`



    return (
            <>
            <CatalogItem 
                id={drug.id} 
                cardTitle={drug.name} 
                imgSrc={drug.image}
                onClick={deleteDrug}  
                fileUploadUrl={fileUploadUrl} 
                url={url}
            >

                <DrugCardBody
                    drugManufacturer={drug.drug_manufacturer}
                    fileUploadUrl={fileUploadUrl}
                    drugInstr={drug.instruction}
                />
                
            </CatalogItem>
            </>
           
    )
}