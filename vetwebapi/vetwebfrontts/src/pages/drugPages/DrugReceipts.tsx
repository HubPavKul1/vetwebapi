
import { useQuery } from "react-query";
import { Catalog } from "../../components/catalog";
import { CatalogItem } from "../../components/catalogItem/CatalogItem";
import { CreateDrugReceiptForm } from "../../components/drugs/drugMovements/CreateDrugReceiptForm";
import { IDrugMovement } from "../../interfaces/DrugInterfaces";
import { AppService } from "../../app.service";

interface DrugReceiptsData {
  data?: IDrugMovement[];
  isLoading: boolean;
  error?: Error | null;
}

export function DrugReceipts() {
  const url = "/api/drugs/receipts";

  const { data, isLoading, error }: DrugReceiptsData = useQuery(
    ["drugReceipts"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.drug_movements,
    }
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <Catalog
      title="Поступления биопрепаратов"
      btnTitle="Добавить поступление препарата"
      cardsInRow={4}
      createForm={<CreateDrugReceiptForm />}
      dataLength={data.length}
    >
        {data.length
          && data.map((drugMovement) => (
              <CatalogItem
                key={drugMovement.id}
                delUrl={`/api/drugs/receipts/${drugMovement.id}`}
                url={`/drugs/receipts/${drugMovement.id}`}
                imgSrc="drugsCard.jpg"
                invQueryName="drugReceipts"
                cardTitle={AppService.convertDateString(drugMovement.operation_date).fullDate}
                id={drugMovement.id}  
              />
            ))}
      
    </Catalog>
  );
}
