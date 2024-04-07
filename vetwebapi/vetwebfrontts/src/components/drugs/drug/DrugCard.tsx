import { IDrug } from "../../../interfaces/DrugInterfaces";
import { CatalogItem } from "../../catalogItem/CatalogItem";
import { useMutation, useQueryClient } from "react-query";
import { DrugService } from "../drugs.service";


interface DrugCardProps {
    drug: IDrug;
}

export function DrugCard({drug}: DrugCardProps) {

    const queryClient = useQueryClient()

    const { mutate } = useMutation(["delete company"], {
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

    return (

            <CatalogItem 
                id={drug.id} 
                cardTitle={drug.name} 
                imgSrc={drug.image}
                onClick={deleteDrug} 
                // url={`/companies/${company.id}`}
            />
    )
}