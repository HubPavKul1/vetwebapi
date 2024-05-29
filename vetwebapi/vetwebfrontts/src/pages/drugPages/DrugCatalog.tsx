import { Row } from "react-bootstrap";

import { useQuery } from "react-query";
import { Catalog } from "../../components/Catalog";
import { catalogItemData } from "../../components/data/CatalogItemData";
import { CatalogItem } from "../../components/catalogItem/CatalogItem";
import { CreateItem } from "../../components/createItem/CreateItem";
import { IDrugCatalogCard } from "../../interfaces/DrugInterfaces";
import { AppService } from "../../app.service";
import { CatalogDrugCard } from "../../components/drugs/drug/catalogDrugCard/CatalogDrugCard";
import { CreateCatalogDrugForm } from "../../components/drugs/drug/CreateCatalogDrugForm";

interface DrugCatalogData {
  data?: IDrugCatalogCard[];
  isLoading: boolean;
  error?: Error | null;
}

export function DrugCatalog() {
  const url = "/api/drugs/catalog";

  const { data, isLoading, error }: DrugCatalogData = useQuery(
    ["drugCatalog"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.catalog_drugs,
    }
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <Catalog title="Каталог биопрепаратов" btnTitle="Добавить препарат" items={data}>
     
        <CreateCatalogDrugForm />
    

      {/* <Row xs={1} md={3} lg={3}>
        {data.length
          ? data.map((drug) => <CatalogDrugCard key={drug.id} item={drug} />)
          : catalogItemData.map((item) => (
              <CatalogItem key={item.id} {...item} />
            ))}
      </Row> */}
    </Catalog>
  );
}
