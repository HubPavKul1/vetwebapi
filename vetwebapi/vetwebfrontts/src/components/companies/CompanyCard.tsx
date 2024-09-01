import { CatalogItem } from "components/catalogItem/CatalogItem";
import { CompanyCardBody } from "./CompanyCardBody";
import { ICompanyCard } from "interfaces/CompanyInterfaces";
import { companyDetailUrl, companyLink } from "urls/companyUrls";
import { AppService } from "services/app.service";


interface CompanyCardProps {
    company: ICompanyCard;
    invQueryName: string;
    imgSrc: string
}

export function CompanyCard({company, invQueryName, imgSrc}: CompanyCardProps) {
  return (
    <CatalogItem
          key={company.id}
          delUrl={companyDetailUrl(company.id)}
          url={companyLink(company.id)}
          imgSrc={imgSrc}
          invQueryName={invQueryName}
          cardTitle={company.short_name}
          id={company.id}
        >
          <CompanyCardBody
            address={
              company.address && AppService.addressString(company.address)
            }
            phone={company.address && `${company.address.phone_number1}`}
            phone2={company.address && `${company.address.phone_number2}`}
            employee={
              company.employee && AppService.employeeString(company.employee)
            }
          />
        </CatalogItem>
  )
}
