import { CompanyCardBody } from "entities/company";
import { ICompanyCard } from "entities/company/model/companyInterfaces";
import { CatalogCard } from "features/index";
import { companyDetailUrl, companyLink } from "shared/index";

interface CompanyCardProps {
  company: ICompanyCard;
  invQueryName: string;
  imgSrc: string;
}

export function CompanyCard({ ...props }: CompanyCardProps) {
  const {company, invQueryName, imgSrc} = props
  return (
    <CatalogCard
      itemDetailUrl={companyLink(company.id)}
      cardTitle={company.short_name}
      invQueryName={invQueryName}
      delUrl={companyDetailUrl(company.id)}
      imgSrc={imgSrc}
    >
      <CompanyCardBody
        address={company.address && company.address}
        phone={
          company.address && `${company.address.phone_number1}`
        }
        phone2={
          company.address && `${company.address.phone_number2}`
        }
        employee={company.employee && company.employee}
      />
    </CatalogCard>
  );
}
