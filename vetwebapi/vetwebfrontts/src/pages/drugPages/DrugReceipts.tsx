import { Catalog } from "../../components/Catalog";
import { CatalogItem } from "../../components/catalogItem/CatalogItem";
import { CreateDrugReceiptForm } from "../../components/drugs/drugMovements/CreateDrugReceiptForm";
import { IDrugMovement } from "../../interfaces/DrugInterfaces";
import { AppService } from "../../app.service";
import { useGetData } from "../../hooks/useGetData";
import { ErrorLoadDataMessage } from "../../components/ErrorLoadDataMessage";
import { Loader } from "../../components/Loader";
import { drugReceiptsLink, drugReceiptsUrl } from "../../Urls";

interface DrugReceiptsData {
  data?: IDrugMovement[];
  isLoading: boolean;
  error?: Error | null;
  isError: boolean;
}

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
      dataLength={data.drug_movements && data.drug_movements.length}
    >
      {data &&
        data.drug_movements &&
        data.drug_movements.length &&
        data.drug_movements.map((drugMovement: IDrugMovement) => (
          <CatalogItem
            key={drugMovement.id}
            delUrl={`/api/drugs/receipts/${drugMovement.id}`}
            url={drugReceiptsLink(drugMovement.id)}
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
