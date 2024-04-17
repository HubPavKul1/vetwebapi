
import { ICompany, ICompanyCard } from "../../../interfaces/CompanyInterfaces";
import { CatalogItem } from "../../catalogItem/CatalogItem";
import { useMutation, useQueryClient } from "react-query";
import { AppService } from "../../../app.service";



interface CompanyCard {
    company: ICompanyCard;
}

export function CompanyCard({company}: CompanyCard) {

    const queryClient = useQueryClient()
    const url = `/api/companies/${company.id}`


    const { mutate } = useMutation(["delete company"], {
        mutationFn: () => AppService.deleteItem(url),
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
                imgSrc="/animals.jpg"
                onClick={deleteCompany} 
                url={`/companies/${company.id}`} 
                cardText={ `${company.address?.street}, ${company.address?.house_number}`}
                                 

            />
    )
}