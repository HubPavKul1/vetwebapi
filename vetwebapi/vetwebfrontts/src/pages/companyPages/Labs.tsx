import { CompaniesCatalog } from "../../components/companies/CompaniesCatalog";

export function Labs() {
  return (
    <CompaniesCatalog
      url="/api/companies/labs"
      title="Лаборатории"
      btnTitle="Добавить лабораторию"
      imgSrc="diagnostic.jpg"
      invQueryName="labs"
    />
  );
}
