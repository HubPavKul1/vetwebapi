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

export function Vets() {
  const url = "/api/companies/vets";

  const { data }: CompaniesProps = useQuery(
    ["vets"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.companies,
    }
  );

  if (!data) return <p>Загрузка ...</p>;

  return (
    <Catalog
      title="Вет учреждения"
      btnTitle="Добавить ветучреждение"
      cardsInRow={3}
      createForm={<CreateCompanyForm />}
    >
    
    {data.length ? (
        data.map((company: ICompanyCard) => (
          <CatalogItem
            key={company.id}
            delUrl={`/api/companies/${company.id}`}
            url={`/companies/${company.id}`}
            imgSrc="gosvet.jpg"
            invQueryName="vets"
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
        <h5>Ветучреждения отсутствуют</h5>
      )}
     
    </Catalog>
  );
}
