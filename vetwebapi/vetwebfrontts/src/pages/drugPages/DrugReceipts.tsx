import { Catalog } from "components/Catalog";
import { CatalogItem } from "components/catalogItem/CatalogItem";
import { CreateDrugReceiptForm } from "components/drugs/drugMovements/CreateDrugReceiptForm";
import { IDrugMovement } from "interfaces/DrugInterfaces";
import { AppService } from "services/app.service";
import { ErrorLoadDataMessage } from "components/ErrorLoadDataMessage";
import { Loader } from "components/Loader";
import {
  drugReceiptDetailUrl,
  drugReceiptLink,
  drugReceiptsUrl,
} from "urls/drugUrls";
import { useState } from "react";
import { useGetPageData } from "hooks/useGetPageData";

export function DrugReceipts() {
  const [pageNum, setPageNum] = useState(1);
  const url = drugReceiptsUrl
  const pageQueryKey = "drugReceipts" + pageNum.toString()
  const { data, isLoading, isError, error } = useGetPageData(
    pageQueryKey,
    url,
    pageNum
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  return (
    <Catalog
      title="Поступление биопрепаратов"
      btnTitle="Добавить поступление препарата"
      cardsInRow={4}
      createForm={<CreateDrugReceiptForm url={url} queryKey={pageQueryKey}/>}
      dataTotal={data.total_count}
      dataPerPage={data.per_page}
      pageNum={pageNum}
      setPageNum={setPageNum}
    >
      {data &&
        data.drug_movements &&
        data.drug_movements.length &&
        data.drug_movements.map((drugMovement: IDrugMovement) => (
          <CatalogItem
            key={drugMovement.id}
            delUrl={drugReceiptDetailUrl(drugMovement.id)}
            url={drugReceiptLink(drugMovement.id)}
            imgSrc="/drugsCard.jpg"
            invQueryName={pageQueryKey}
            cardTitle={
              AppService.convertDateString(drugMovement.operation_date).fullDate
            }
            id={drugMovement.id}
          />
        ))}
    </Catalog>
  );
}
