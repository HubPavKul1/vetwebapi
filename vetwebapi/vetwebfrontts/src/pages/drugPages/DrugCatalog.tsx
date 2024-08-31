import { CreateCatalogDrugForm } from "components/drugs/drug/CreateCatalogDrugForm";

import { catalogDrugsUrl } from "urls/drugUrls";
import { useState } from "react";
import { useGetPageData } from "hooks/useGetPageData";
import { CatalogWrapper } from "components/CatalogWrapper";

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
