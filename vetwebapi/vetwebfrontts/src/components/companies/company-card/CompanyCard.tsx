
import { ICompany } from "../../../interfaces/CompanyInterfaces";
import { CatalogItem } from "../../catalogItem/CatalogItem";
import { useMutation, useQueryClient } from "react-query";
import { CompanyService } from "../company.service";


interface CompanyCard {
    company: ICompany;
}

export function CompanyCard({company}: CompanyCard) {

    const queryClient = useQueryClient()

    const { mutate } = useMutation(["delete company"], {
        mutationFn: () => CompanyService.deleteCompany(company.id.toString()),
        onSuccess: () => {
            alert("Предприятие успешно удалено!")
            queryClient.invalidateQueries(["companies"])
        }
    },
    )

    const deleteCompany = () => {
        mutate()
    }

    return (

            <CatalogItem 
                id={company.id} 
                cardTitle={company.short_name} 
                onClick={deleteCompany} 
                url={`/companies/${company.id}`}
            />
    )
}