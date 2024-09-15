import { addressString } from "entities/address/addressHelper";
import { ICompanyCard } from "entities/company/model/companyInterfaces";
import { employeeString } from "entities/employee/employeeHelper";
import { CompanyCardBody } from "entities/index";
import { CatalogCard } from "features/index";
import { companyDetailUrl, companyLink } from "shared/index";

interface CompanyCardProps {
  cardTitle: string;
  itemDetailUrl: string;
  company: ICompanyCard;
  invQueryName: string;
}

export function CompanyCard({ ...props }: CompanyCardProps) {
  return (
    <CatalogCard
      itemDetailUrl={companyLink(props.company.id)}
      cardTitle={props.company.short_name}
      invQueryName={props.invQueryName}
      delUrl={companyDetailUrl(props.company.id)}
      imgSrc="/animals.jpg"
    >
      <CompanyCardBody 
       address={props.company.address && addressString(props.company.address)}
       phone={props.company.address && `${props.company.address.phone_number1}`}
       phone2={props.company.address && `${props.company.address.phone_number2}`}
       employee={
         props.company.employee && employeeString(props.company.employee)
       }
       />
    </CatalogCard>
  );
}
