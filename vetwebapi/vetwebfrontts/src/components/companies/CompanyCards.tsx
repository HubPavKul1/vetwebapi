import { CatalogItem } from "components/catalogItem/CatalogItem";
import { ICompanyCard } from "interfaces/CompanyInterfaces";
import { companyDetailUrl, companyLink } from "urls/companyUrls";
import { CompanyCardBody } from "./CompanyCardBody";
import { AppService } from "services/app.service";
import { CreateItem } from "components/CreateItem";
import { CreateCompany } from "./CreateCompany";

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
      ))}
    </>
  );
}
