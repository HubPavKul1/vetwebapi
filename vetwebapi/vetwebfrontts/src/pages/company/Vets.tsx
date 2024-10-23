import { CompanyQueryKeys } from "shared/constants/companyConst";
import { vetsUrl } from "shared/index";
import { CompanyCatalog } from "widgets/company";

export function Vets() {
  const queryKey = CompanyQueryKeys.vets;
  return (
    <CompanyCatalog
      title="Ветклиники"
      btnTitle="Добавить ветклинику"
      queryKey={queryKey}
      url={vetsUrl}
      imgSrc="/gosvet.jpg"
    />
  );
}
