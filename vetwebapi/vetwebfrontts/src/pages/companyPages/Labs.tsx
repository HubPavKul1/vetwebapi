import { CatalogWrapper } from "components/CatalogWrapper";
import { CreateCompany } from "components/companies/CreateCompany";
import { labsUrl } from "urls/companyUrls";

export function Labs() {
  return (
    <CatalogWrapper
      title="Лаборатории"
      cardsInRow={3}
      queryKey="labs"
      url={labsUrl}
      imgSrc="/diagnostic.jpg"
      btnTitle="Добавить лабораторию"
      createForm={<CreateCompany url={labsUrl} queryKey="labs1" />}
    />
  );
}
