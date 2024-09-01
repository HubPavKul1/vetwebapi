import { ICompanyCard } from "interfaces/CompanyInterfaces";
import { CreateItem } from "components/CreateItem";
import { CreateCompany } from "./CreateCompany";
import { CompanyCard } from "./CompanyCard";

interface CompanyCardsProps {
  companies: ICompanyCard[];
  invQueryName: string;
  imgSrc: string;
  url: string;
  btnTitle: string;
}

export function CompanyCards({
  companies,
  invQueryName,
  imgSrc,
  url,
  btnTitle,
}: CompanyCardsProps) {
  return (
    <>
      <CreateItem
        btnTitle={btnTitle}
        children={<CreateCompany url={url} queryKey={invQueryName} />}
      />

      {companies.map((company: ICompanyCard) => (
        <CompanyCard
          company={company}
          invQueryName={invQueryName}
          imgSrc={imgSrc}
        />
      ))}
    </>
  );
}
