import { CompanyCard } from "./company-card/CompanyCard"

import { ICompanies } from "../../interfaces/CompanyInterfaces";


export function CompanyCards({companies}: ICompanies ) {
    
    return (
       <>
            {companies.map(company =>(
               <CompanyCard key={company.id} company={company} />               
           ))} 
       </>
                   
    )
}