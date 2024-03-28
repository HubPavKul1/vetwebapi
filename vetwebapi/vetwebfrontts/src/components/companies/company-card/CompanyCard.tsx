
import { Link } from "react-router-dom"
import { ICompany } from "../../../interfaces/CompanyInterfaces"
import { CatalogItem } from "../../catalogItem/CatalogItem";


interface CompanyCard {
    company: ICompany;
}

export function CompanyCard({company}: CompanyCard) {
    return (

        <Link to={`/companies/${company.id}`} >
            <CatalogItem id={company.id} cardTitle={company.full_name}/>
        </Link>

        
    )
}