import { CatalogWrapper } from "components/CatalogWrapper";
import { CreateCompany } from "features/company/ui/CreateCompany";
import { labsUrl } from "shared/urls/companyUrls";

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
