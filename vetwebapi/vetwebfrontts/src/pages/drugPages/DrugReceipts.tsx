import { Row } from "react-bootstrap";

import { useQuery } from "react-query";
import { Catalog } from "../../components/Catalog";
import { catalogItemData } from "../../components/data/CatalogItemData";
import { CatalogItem } from "../../components/catalogItem/CatalogItem";
import { DrugMovementCard } from "../../components/drugs/drugMovements/DrugMovementCard";
import { CreateItem } from "../../components/createItem/CreateItem";
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
      title="Поступление биопрепаратов"
      btnTitle="Добавить поступление препарата"
      items={data}
      cardsInRow={4}
      imgSrc="drugsCard.jpg"
      invQueryName="drugReceipts"
      createForm={<CreateDrugReceiptForm />}
    >
      

      {/* <Row xs={1} md={3} lg={3}>
        {data.length
          ? data.map((drugMovement) => (
              <DrugMovementCard
                key={drugMovement.id}
                drugMovement={drugMovement}
              />
            ))
          : catalogItemData.map((item) => (
              <CatalogItem key={item.id} {...item} />
            ))}
      </Row> */}
    </Catalog>
  );
}
