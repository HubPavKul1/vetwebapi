import { useQuery } from "react-query";
import { Catalog } from "../../components/Catalog";
import { CatalogItem } from "../../components/catalogItem/CatalogItem";
import { IDrugCatalogCard } from "../../interfaces/DrugInterfaces";
import { AppService } from "../../app.service";
import { CreateCatalogDrugForm } from "../../components/drugs/drug/CreateCatalogDrugForm";
import { CatalogDrugCardBody } from "../../components/drugs/drug/CatalogDrugCardBody";

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
    <Catalog
      title="Каталог биопрепаратов"
      btnTitle="Добавить препарат"
      createForm={<CreateCatalogDrugForm />}
      cardsInRow={3}
      
    >

        {data.length
          ? data.map((drug) => 
          <CatalogItem 
            key={drug.id}
            delUrl={`/api/drugs/catalog/${drug.id}`}
            url={`/drugs/catalog/${drug.id}`}
            imgSrc={!drug.image ? "drugsCard.jpg": drug.image}
            invQueryName="drugCatalog"
            cardTitle={drug.name}
            id={drug.id}
          >
            <CatalogDrugCardBody
              batch={drug.batch}
              control={drug.control}
              expiration_date={AppService.convertDateString(drug.expiration_date).shortDate}
              production_date={AppService.convertDateString(drug.production_date).shortDate}
              
            />
          </CatalogItem>
        )
          : (
            <h5>Биопрепараты отсутствуют</h5>
          )}

    </Catalog>
  );
}
