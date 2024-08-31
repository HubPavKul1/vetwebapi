import { CreateDrugForm } from "components/drugs/drug/CreateDrugForm";
import { drugsUrl } from "urls/drugUrls";
import { CatalogWrapper } from "components/CatalogWrapper";

export function Drugs() {
  return (
    <CatalogWrapper
      title="Справочник биопрепаратов"
      btnTitle="Добавить препарат"
      cardsInRow={3}
      queryKey="drugs"
      createForm={<CreateDrugForm url={drugsUrl} queryKey="drugs1" />}
      url={drugsUrl}
    />
  );
}
