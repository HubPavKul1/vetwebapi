import { companiesUrl } from "shared/urls/companyUrls";
import { CompanyCatalog } from "widgets/company";

export function Companies() {
  return (
    <CompanyCatalog
      title="Предприятия"
      btnTitle="Добавить предприятие"
      queryKey="companies"
      url={companiesUrl}
      imgSrc="/animals.jpg"
    />
  );
}
