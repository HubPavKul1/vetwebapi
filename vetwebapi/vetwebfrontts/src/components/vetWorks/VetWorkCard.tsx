import { CatalogItem } from "../catalogItem/CatalogItem";
import { useMutation, useQueryClient } from "react-query";
import { AppService } from "../../app.service";
import { IVetwork } from "../../interfaces/VetWorkInterfaces";


interface VetWorkCardProps {
    vetWork: IVetwork;
}

export function VetWorkCard({vetWork}: VetWorkCardProps) {

    const queryClient = useQueryClient()

    const url = `/api/vetwork/${vetWork.id}/`

    const { mutate } = useMutation(["delete vetWork"], {
        mutationFn: () => AppService.deleteItem(url),
        onSuccess: () => {
            alert("Мероприятие успешно удалено!")
            queryClient.invalidateQueries(['vetWorks'])
        }
    },
    )

    const deleteVetWork = () => {
        mutate()
    }

    const vetWorkDate = AppService.convertDateString(vetWork.vetwork_date)

    return (

            <CatalogItem 
                id={vetWork.id} 
                cardTitle={vetWorkDate.fullDate} 
                imgSrc="drugsCard.jpg"
                onClick={deleteVetWork} 
                url={`/vetworks/${vetWork.id}`}
            />
    )
}