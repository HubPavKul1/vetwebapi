import { CompaniesCatalog } from "../../components/companies/CompaniesCatalog";

export function Companies() {
  return (
    <CompaniesCatalog
      url="/api/companies/"
      title="Предприятия"
      btnTitle="Добавить предприятие"
      imgSrc="animals.jpg"
      invQueryName="companies"
    />
  );
}
