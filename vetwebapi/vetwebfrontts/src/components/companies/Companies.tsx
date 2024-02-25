import CompanyCard from "./company-card/CompanyCard"
import { CompanyService } from "./company.service"
import CreateCompany from "./CreateCompany"
import { useQuery } from "react-query"



export default function Companies() {
    
    const { data, isLoading, error } = useQuery(['companies'], () => CompanyService.getAll(),
        {
            select: ({data}) => data?.companies
        }
    )
    
    if(isLoading) return <p>Загрузка ...</p>
    
    return (
  
            <div id="colorlib-services">
            <div className="container">
                <div className="row animate-box">
                    <CreateCompany />
                </div>
                <div className="row">
                    {data?.length ? data.map(company =>(
                        <CompanyCard key={company.id} company={company} />
                    ))
                    : <p>There are no companies</p>
                    }
                </div>
            </div>
        </div>
        
    )
}