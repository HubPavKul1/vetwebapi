import { IDrugMovement } from "../../../interfaces/DrugInterfaces";
import { CatalogItem } from "../../catalogItem/CatalogItem";
import { useMutation, useQueryClient } from "react-query";
import { AppService } from "../../../app.service";


interface DrugMovementCardProps {
    drugMovement: IDrugMovement;
}

export function DrugMovementCard({drugMovement}: DrugMovementCardProps) {

    const queryClient = useQueryClient()

    const url = `/api/drugs/receipts/${drugMovement.id}/`

    const { mutate } = useMutation(["delete receipt"], {
        mutationFn: () => AppService.deleteItem(url),
        onSuccess: () => {
            alert("Поступление успешно удалено!")
            queryClient.invalidateQueries(['drugReceipts'])
        }
    },
    )

    const deleteReceipt = () => {
        mutate()
    }

    return (

            <CatalogItem 
                id={drugMovement.id} 
                cardTitle={drugMovement.operation_date} 
                imgSrc="drugsCard.jpg"
                onClick={deleteReceipt} 
                url={`/drugs/receipts/${drugMovement.id}`}
            />
    )
}