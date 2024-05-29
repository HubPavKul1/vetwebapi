import { useQuery } from "react-query";
import { Catalog } from "../../components/Catalog";
import { CreateCompanyForm } from "../../components/companies/createCompany/CreateCompanyForm";

import { AppService } from "../../app.service";
import { ICompany } from "../../interfaces/CompanyInterfaces";

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
    items={data}
    cardsInRow={3}
    imgSrc="animals.jpg"
    invQueryName="companies"
    >
      <CreateCompanyForm />

      {/* <Row xs={1} md={3} lg={3}>
        {data.length
          ? data.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))
          : catalogItemData.map((item) => (
              <CatalogItem key={item.id} {...item} />
            ))}
      </Row> */}
    </Catalog>
  );
}
