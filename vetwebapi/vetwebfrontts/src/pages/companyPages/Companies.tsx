import { CatalogWrapper } from "components/CatalogWrapper";
import { CreateCompany } from "components/companies/CreateCompany";
import { companiesUrl } from "urls/companyUrls";

export function Companies() {
  return (
    <CatalogWrapper
      title="Предприятия"
      cardsInRow={3}
      queryKey="companies"
      url={companiesUrl}
      imgSrc="/animals.jpg"
      btnTitle="Добавить предприятие"
      createForm={<CreateCompany url={companiesUrl} queryKey="companies1" />}
    />
  );
}
