import { CatalogWrapper } from "components/CatalogWrapper";
import { CreateCompany } from "features/index";
import { companiesUrl } from "shared/urls/companyUrls";

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
