import { CompaniesCatalog } from "components/companies/CompaniesCatalog";
import { companiesUrl } from "urls/companyUrls";

export function Companies() {
  return (
    <CompaniesCatalog
      url={companiesUrl}
      title="Предприятия"
      btnTitle="Добавить предприятие"
      imgSrc="/animals.jpg"
      invQueryName="companies"
    />
  );
}
