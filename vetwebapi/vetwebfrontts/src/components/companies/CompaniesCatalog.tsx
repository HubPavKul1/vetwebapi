import { Catalog } from "../Catalog";
import { CreateCompanyForm } from "./CreateCompanyForm";

import { AppService } from "../../app.service";
import { ICompanyCard } from "../../interfaces/CompanyInterfaces";
import { CatalogItem } from "../../components/catalogItem/CatalogItem";
import { CompanyCardBody } from "../../components/companies/CompanyCardBody";
import { useGetData } from "../../hooks/useGetData";
import { ErrorLoadDataMessage } from "../ErrorLoadDataMessage";
import { Loader } from "../Loader";
import { companyDetailUrl, companyLink } from "../../urls/companyUrls";

interface CompaniesCatalogProps {
  url: string;
  title: string;
  btnTitle: string;
  imgSrc: string;
  invQueryName: string;
}

export function CompaniesCatalog({
  url,
  title,
  btnTitle,
  imgSrc,
  invQueryName,
}: CompaniesCatalogProps) {
  const { data, isLoading, isError, error } = useGetData(invQueryName, url);

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  return (
    <Catalog
      title={title}
      btnTitle={btnTitle}
      cardsInRow={3}
      createForm={<CreateCompanyForm url={url} invQueryName={invQueryName} />}
      dataLength={data && data.companies && data.companies.length}
    >
      {data &&
        data.companies &&
        data.companies.length &&
        data.companies.map((company: ICompanyCard) => (
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
    </Catalog>
  );
}
