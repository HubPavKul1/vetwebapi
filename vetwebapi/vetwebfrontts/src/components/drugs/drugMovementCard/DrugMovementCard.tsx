import { IDrugMovement } from "../../../interfaces/DrugInterfaces";
import { CatalogItem } from "../../catalogItem/CatalogItem";
import { useMutation, useQueryClient } from "react-query";
import { DrugService } from "../drugs.service";


interface DrugMovementCardProps {
    drugMovement: IDrugMovement;
}

export function DrugMovementCard({drugMovement}: DrugMovementCardProps) {

    // const queryClient = useQueryClient()

    // const { mutate } = useMutation(["delete company"], {
    //     mutationFn: () => CompanyService.deleteCompany(company.id.toString()),
    //     onSuccess: () => {
    //         alert("Предприятие успешно удалено!")
    //         queryClient.invalidateQueries(["companies"])
    //     }
    // },
    // )

    // const deleteCompany = () => {
    //     mutate()
    // }

    return (

            <CatalogItem 
                id={drugMovement.id} 
                cardTitle={drugMovement.operation_date} 
                // onClick={deleteCompany} 
                // url={`/companies/${company.id}`}
            />
    )
}