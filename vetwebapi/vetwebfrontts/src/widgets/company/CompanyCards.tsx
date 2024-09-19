import { ICompanyCard } from "entities/company/model/companyInterfaces";
import { CompanyCard } from "./CompanyCard";

interface CompanyCardsProps {
  companies: ICompanyCard[];
  invQueryName: string;
}

export function CompanyCards({ companies, invQueryName }: CompanyCardsProps) {
  return (
    <>
      {companies.map((company: ICompanyCard) => (
        <CompanyCard
          key={company.id}
          company={company}
          invQueryName={invQueryName}
          cardTitle={company.short_name}
        />
      ))}
    </>
  );
}
