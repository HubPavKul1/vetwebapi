import { CatalogWrapper } from "components/CatalogWrapper";
import { CreateCompany } from "features/company/ui/CreateCompany";
import { vetsUrl } from "shared/urls/companyUrls";

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
  );
}
