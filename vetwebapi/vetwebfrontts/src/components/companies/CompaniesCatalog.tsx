import { Catalog } from "../catalog";
import { CreateCompanyForm } from "../../components/companies/createCompany/CreateCompanyForm";

import { AppService } from "../../app.service";
import { ICompanyCard } from "../../interfaces/CompanyInterfaces";
import { CatalogItem } from "../../components/catalogItem/CatalogItem";
import { CompanyCardBody } from "../../components/companies/CompanyCardBody";
import { useGetData } from "../../hooks/useGetData";




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
  const { data, isLoading } = useGetData(invQueryName, url);

  if (isLoading && !data) return (
    <div className="py-20 text-center">
      <h4 className="text-3xl">Загрузка...</h4>
    </div>
    
  )
    

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
            delUrl={`/api/companies/${company.id}`}
            url={`/companies/${company.id}`}
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
