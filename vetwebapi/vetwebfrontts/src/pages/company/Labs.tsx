import { labsUrl } from "shared/index";
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
