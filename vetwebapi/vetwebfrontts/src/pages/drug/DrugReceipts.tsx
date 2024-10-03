import { drugReceiptsUrl } from "shared/urls/drugUrls";
import { useState } from "react";
import { ErrorLoadDataMessage, Loader, useGetPageData } from "shared/index";
import { CatalogPageWrapper } from "widgets/CatalogPageWrapper";
import { IDrugMovementDetail } from "entities/drugMovements/model/drugMovementInterfaces";
import { ReceiptDrugCard } from "widgets/drugMovement";
import { CreateDrugReceiptForm } from "features/drugMovements/ui/CreateDrugReceiptForm";

export function DrugReceipts() {
  const [pageNum, setPageNum] = useState(1);
  const url = drugReceiptsUrl;
  const queryKey = "drugReceipts";
  const pageQueryKey = `${queryKey}${pageNum}`;
  const { data, isLoading, isError, error } = useGetPageData(
    pageQueryKey,
    url,
    pageNum
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  return (
    <CatalogPageWrapper
      data={data}
      title="Поступление биопрепаратов"
      cardsInRow={3}
      btnTitle="Добавить поступление препарата"
      createForm={<CreateDrugReceiptForm url={url} queryKey={pageQueryKey} />}
      pageNum={pageNum}
      setPageNum={setPageNum}
    >
      {data.drug_movements.map((drugMovement: IDrugMovementDetail) => (
        <ReceiptDrugCard
          key={drugMovement.id}
          drugMovement={drugMovement}
          invQueryName={pageQueryKey}
          imgSrc="/drugsCard.jpg"
        />
      ))}
    </CatalogPageWrapper>
  );
}
