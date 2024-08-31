import { CatalogWrapper } from "components/CatalogWrapper";
import { CompaniesCatalog } from "components/companies/CompaniesCatalog";
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

    // <CompaniesCatalog
    //   url={labsUrl}
    //   title="Лаборатории"
    //   btnTitle="Добавить лабораторию"
    //   imgSrc="/diagnostic.jpg"
    //   invQueryName="labs"
    // />
  );
}
