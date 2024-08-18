import { CompaniesCatalog } from "components/companies/CompaniesCatalog";
import { labsUrl } from "urls/companyUrls";

export function Labs() {
  return (
    <CompaniesCatalog
      url={labsUrl}
      title="Лаборатории"
      btnTitle="Добавить лабораторию"
      imgSrc="/diagnostic.jpg"
      invQueryName="labs"
    />
  );
}
