import { CatalogWrapper } from "components/CatalogWrapper";
import { CompaniesCatalog } from "components/companies/CompaniesCatalog";
import { CreateCompany } from "components/companies/CreateCompany";
import { vetsUrl } from "urls/companyUrls";

export function Vets() {
  return (
    <CatalogWrapper
      title="Ветклиники"
      cardsInRow={3}
      queryKey="vets"
      url={vetsUrl}
      imgSrc="/gosvet.jpg"
      btnTitle="Добавить ветклинику"
      createForm={<CreateCompany url={vetsUrl} queryKey="vets1" />}
    />

    // <CompaniesCatalog
    //   url={vetsUrl}
    //   title="Ветклиники"
    //   btnTitle="Добавить ветклинику"
    //   imgSrc="/gosvet.jpg"
    //   invQueryName="vets"
    // />
  );
}
