import { IDrug } from "../../../interfaces/DrugInterfaces";
import { CatalogItem } from "../../catalogItem/CatalogItem";
import { useMutation, useQueryClient } from "react-query";
import { DrugService } from "../drugs.service";
import { FileUpload } from "../../fileUpload/FileUpload";


interface DrugCardProps {
    drug: IDrug;
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
                hasFile={true}
                fileUploadUrl={fileUploadUrl} 
                fileSrc={drug.instruction && drug.instruction}
                url={url}
            >

                {/* <FileUpload
                    uploadUrl={fileUploadUrl}
                    accept="image/*"
                    mutationName="drugImage upload"
                    invQueryName="drugs"
                    imgSrc="/emptyImage.jpg"
                /> */}
                
            </CatalogItem>
            </>
           
    )
}