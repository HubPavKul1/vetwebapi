import { CompaniesCatalog } from "../../components/companies/CompaniesCatalog";
import { vetsUrl } from "../../urls/companyUrls";

export function Vets() {
  return (
    <CompaniesCatalog
      url={vetsUrl}
      title="Ветклиники"
      btnTitle="Добавить ветклинику"
      imgSrc="/gosvet.jpg"
      invQueryName="vets"
    />
  );
}
