import { Catalog } from "../../components/catalog";
import { CatalogItem } from "../../components/catalogItem/CatalogItem";
import { IDrugCatalogCard } from "../../interfaces/DrugInterfaces";
import { AppService } from "../../app.service";
import { CreateCatalogDrugForm } from "../../components/drugs/drug/CreateCatalogDrugForm";
import { CatalogDrugCardBody } from "../../components/drugs/drug/CatalogDrugCardBody";
import { useGetData } from "../../hooks/useGetData";

interface DrugCatalogData {
  data?: IDrugCatalogCard[];
  isLoading: boolean;
  error?: Error | null;
}

export function DrugCatalog() {
  const url = "/api/drugs/catalog";

  const { data, isLoading }: DrugCatalogData = useGetData("drugCatalog", url);
    

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <Catalog
      title="Каталог биопрепаратов"
      btnTitle="Добавить препарат"
      createForm={<CreateCatalogDrugForm />}
      cardsInRow={3}
      dataLength={data.length}
      
    >

        {data.length
          && data.map((drug) => 
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
        )}

    </Catalog>
  );
}
