import { CompanyQueryKeys } from "shared/constants/companyConst";
import { labsUrl } from "shared/index";
import { CompanyCatalog } from "widgets/company";

export function Labs() {
  const queryKey = CompanyQueryKeys.labs;
  return (
    <CompanyCatalog
      title="Лаборатории"
      btnTitle="Добавить лабораторию"
      queryKey={queryKey}
      url={labsUrl}
      imgSrc="/diagnosticBg.png"
    />
  );
}
