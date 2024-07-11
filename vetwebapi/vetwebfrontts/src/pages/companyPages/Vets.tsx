import { CompaniesCatalog } from "../../components/companies/CompaniesCatalog";

export function Vets() {
  return (
    <CompaniesCatalog
      url="/api/companies/vets"
      title="Ветклиники"
      btnTitle="Добавить ветклинику"
      imgSrc="gosvet.jpg"
      invQueryName="vets"
    />
  );
}
