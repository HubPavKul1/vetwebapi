import { CompanyQueryKeys } from "shared/constants/companyConst";
import { companiesUrl } from "shared/index";
import { CompanyCatalog } from "widgets/company";

export function Companies() {
  const queryKey = CompanyQueryKeys.companies;
  return (
    <CompanyCatalog
      title="Предприятия"
      btnTitle="Добавить предприятие"
      queryKey={queryKey}
      url={companiesUrl}
      imgSrc="/animals.jpg"
    />
  );
}
