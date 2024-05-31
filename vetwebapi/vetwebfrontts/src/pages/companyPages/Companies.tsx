import { useQuery } from "react-query";
import { Catalog } from "../../components/Catalog";
import { CreateCompanyForm } from "../../components/companies/createCompany/CreateCompanyForm";

import { AppService } from "../../app.service";
import { ICompany, ICompanyCard } from "../../interfaces/CompanyInterfaces";
import { CatalogItem } from "../../components/catalogItem/CatalogItem";
import { CompanyCardBody } from "../../components/companies/CompanyCardBody";

interface CompaniesProps {
  data?: ICompany[];
}

export function Companies() {
  const url = "/api/companies/";

  const { data }: CompaniesProps = useQuery(
    ["companies"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.companies,
    }
  );

  if (!data) return <p>Загрузка ...</p>;

  return (
    <Catalog
      title="Предприятия"
      btnTitle="Добавить предприятие"
      cardsInRow={3}
      createForm={<CreateCompanyForm />}
    >
      {data.length ? (
        data.map((company: ICompanyCard) => (
          <CatalogItem
            key={company.id}
            delUrl={`/api/companies/${company.id}`}
            url={`/companies/${company.id}`}
            imgSrc="animals.jpg"
            invQueryName="companies"
            cardTitle={company.short_name}
            id={company.id}
          >
            <CompanyCardBody
              address={
                company.address &&
                `${company.address.street}, ${company.address.house_number}`
              }
              phone={company.address && `${company.address.phone_number1}`}
              phone2={company.address && `${company.address.phone_number2}`}
              employee={
                company.employee &&
                `${company.employee.position} ${company.employee.fullname}`
              }
            />
          </CatalogItem>
        ))
      ) : (
        <h5>Предприятия отсутствуют</h5>
      )}
    </Catalog>
  );
}
