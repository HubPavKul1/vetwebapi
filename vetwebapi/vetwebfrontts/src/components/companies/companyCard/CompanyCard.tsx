
import { ICompanyCard } from "../../../interfaces/CompanyInterfaces";
import { CatalogItem } from "../../catalogItem/CatalogItem";
import { useMutation, useQueryClient } from "react-query";
import { AppService } from "../../../app.service";
import { CompanyCardBody } from "./CompanyCardBody";



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


                
                
                                 
            >

                <CompanyCardBody 
                
                    address={ company.address &&
                        `${company.address?.street}, ${company.address?.house_number}`
                    }

                    phone={ company.address &&
                        `${company.address?.phone_number1}`
                    }

                    phone2={ company.address &&
                        `${company.address?.phone_number2}`
                    }

                    employee={ company.employee &&
                        `${company.employee?.position} ${company.employee?.fullname}` 
                    }
                   
                 />
            </CatalogItem>
    )
}