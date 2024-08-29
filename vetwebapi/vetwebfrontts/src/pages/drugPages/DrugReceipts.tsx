import { Catalog } from "components/Catalog";
import { CatalogItem } from "components/catalogItem/CatalogItem";
import { CreateDrugReceiptForm } from "components/drugs/drugMovements/CreateDrugReceiptForm";
import { IDrugMovement } from "interfaces/DrugInterfaces";
import { AppService } from "services/app.service";
import { useGetData } from "hooks/useGetData";
import { ErrorLoadDataMessage } from "components/ErrorLoadDataMessage";
import { Loader } from "components/Loader";
import {
  drugReceiptDetailUrl,
  drugReceiptLink,
  drugReceiptsUrl,
} from "urls/drugUrls";

export function DrugReceipts() {
  const { data, isLoading, isError, error } = useGetData(
    "drugReceipts",
    drugReceiptsUrl
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  return (
    <Catalog
      title="Поступление биопрепаратов"
      btnTitle="Добавить поступление препарата"
      cardsInRow={4}
      createForm={<CreateDrugReceiptForm />}
      dataTotal={data.total_count}
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
            invQueryName="drugReceipts"
            cardTitle={
              AppService.convertDateString(drugMovement.operation_date).fullDate
            }
            id={drugMovement.id}
          />
        ))}
    </Catalog>
  );
}
