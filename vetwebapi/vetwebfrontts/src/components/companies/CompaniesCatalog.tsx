import { useQuery } from "@tanstack/react-query";
import { Catalog } from "../../components/catalog";
import { CreateCompanyForm } from "../../components/companies/createCompany/CreateCompanyForm";

import { AppService } from "../../app.service";
import { ICompany, ICompanyCard } from "../../interfaces/CompanyInterfaces";
import { CatalogItem } from "../../components/catalogItem/CatalogItem";
import { CompanyCardBody } from "../../components/companies/CompanyCardBody";

interface CompaniesProps {
  data?: ICompany[];
}

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
  const { data }: CompaniesProps = useQuery(
    {
      queryKey: [{ invQueryName }],
      queryFn: () => AppService.getAll(url),
      select: ({ data }) => data?.companies,
    }
  );

  if (!data) return <p>Загрузка ...</p>;

  return (
    <Catalog
      title={title}
      btnTitle={btnTitle}
      cardsInRow={3}
      createForm={<CreateCompanyForm url={url} invQueryName={invQueryName} />}
      dataLength={data.length}
    >
      {data.length &&
        data.map((company: ICompanyCard) => (
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
