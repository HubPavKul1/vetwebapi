import { catalogDrugsUrl } from "urls/drugUrls";
import { CatalogWrapper } from "components/CatalogWrapper";
import { CreateCatalogDrugForm } from "components/drugs/catalogDrug/CreateCatalogDrugForm";

export function DrugCatalog() {
  return (
    <CatalogWrapper
      title="Каталог биопрепаратов"
      btnTitle="Добавить препарат"
      url={catalogDrugsUrl}
      queryKey="drugCatalog"
      createForm={
        <CreateCatalogDrugForm url={catalogDrugsUrl} queryKey="drugCatalog1" />
      }
      cardsInRow={3}
    />
  );
}
