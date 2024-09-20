import { labsUrl } from "shared/urls/companyUrls";
import { CompanyCatalog } from "widgets/company";

export function Labs() {
  return (
    <CompanyCatalog
      title="Лаборатории"
      btnTitle="Добавить лабораторию"
      queryKey="labs"
      url={labsUrl}
      imgSrc="/diagnostic.jpg"
    />
  );
}
