import { CreateDrugReceiptForm } from "components/drugs/drugMovements/CreateDrugReceiptForm";
import { drugReceiptsUrl } from "shared/urls/drugUrls";

import { CatalogWrapper } from "components/CatalogWrapper";

export function DrugReceipts() {
  const url = drugReceiptsUrl;

  return (
    <CatalogWrapper
      title="Поступление биопрепаратов"
      btnTitle="Добавить поступление препарата"
      cardsInRow={4}
      url={url}
      queryKey="drugReceipts"
      createForm={<CreateDrugReceiptForm url={url} queryKey="drugReceipts1" />}
      imgSrc="/drugsCard.jpg"
    />
  );
}
