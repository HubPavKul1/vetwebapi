import { CompanyCardBody } from "entities/company";
import { ICompanyCard } from "entities/company/model/companyInterfaces";
import { CatalogCard } from "features/index";
import { companyDetailUrl, companyLink } from "shared/index";

interface CompanyCardProps {
  cardTitle: string;
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
        address={props.company.address && props.company.address}
        phone={
          props.company.address && `${props.company.address.phone_number1}`
        }
        phone2={
          props.company.address && `${props.company.address.phone_number2}`
        }
        employee={props.company.employee && props.company.employee}
      />
    </CatalogCard>
  );
}
