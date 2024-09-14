import { CatalogItem } from "components/catalogItem/CatalogItem";
import { CompanyCardBody } from "./CompanyCardBody";
import { companyDetailUrl, companyLink } from "shared/urls/companyUrls";
import { addressString } from "entities/address/addressHelper";
import { employeeString } from "entities/employee/employeeHelper";
import { ICompanyCard } from "entities/company/model/companyInterfaces";

interface CompanyCardProps {
  company: ICompanyCard;
  invQueryName: string;
  imgSrc: string;
}

export function CompanyCard({
  company,
  invQueryName,
  imgSrc,
}: CompanyCardProps) {
  return (
    <CatalogItem
      delUrl={companyDetailUrl(company.id)}
      url={companyLink(company.id)}
      imgSrc={imgSrc}
      invQueryName={invQueryName}
      cardTitle={company.short_name}
      id={company.id}
    >
      <CompanyCardBody
        address={company.address && addressString(company.address)}
        phone={company.address && `${company.address.phone_number1}`}
        phone2={company.address && `${company.address.phone_number2}`}
        employee={
          company.employee && employeeString(company.employee)
        }
      />
    </CatalogItem>
  );
}
