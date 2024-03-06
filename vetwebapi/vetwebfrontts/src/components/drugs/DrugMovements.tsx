import { useQuery } from "react-query"
import { DrugService } from "./drugs.service"



export function DrugMovements() {
    
    const { data, isLoading, error } = useQuery(['drugs'], () => DrugService.getDrugMovements(),
        {
            select: ({data}) => data?.drug_movements
        }
    )
    
    if(isLoading) return <p>Загрузка ...</p>
    
    return (
  
            <div id="colorlib-services">
            <div className="container">
                <div className="row animate-box">
                    {/* <CreateCompany /> */}
                </div>
                {/* <div className="row">
                    {data?.length ? data.map(drug =>(
                        <CompanyCard key={company.id} company={company} />
                    ))
                    : <p>There are no companies</p>
                    }
                </div> */}
            </div>
        </div>
        
    )
}