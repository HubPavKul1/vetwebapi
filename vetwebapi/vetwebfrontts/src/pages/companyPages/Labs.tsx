import { CompaniesCatalog } from "../../components/companies/CompaniesCatalog";
import { labsUrl } from "../../Urls";

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
