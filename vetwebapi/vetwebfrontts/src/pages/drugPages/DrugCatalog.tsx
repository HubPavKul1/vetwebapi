import { Catalog } from "components/Catalog";
import { CatalogItem } from "components/catalogItem/CatalogItem";
import { IDrugCatalogCard } from "interfaces/DrugInterfaces";
import { AppService } from "services/app.service";
import { CreateCatalogDrugForm } from "components/drugs/drug/CreateCatalogDrugForm";
import { CatalogDrugCardBody } from "components/drugs/drug/CatalogDrugCardBody";
import { ErrorLoadDataMessage } from "components/ErrorLoadDataMessage";
import { Loader } from "components/Loader";
import {
  catalogDrugDetailUrl,
  catalogDrugLink,
  catalogDrugsUrl,
  drugImageUrl,
} from "urls/drugUrls";
import { useState } from "react";
import { useGetPageData } from "hooks/useGetPageData";

export function DrugCatalog() {
  const [pageNum, setPageNum] = useState(1);
  const pageQueryKey = "drugCatalog" + pageNum.toString()
  const { data, isLoading, isError, error } = useGetPageData(
    pageQueryKey,
    catalogDrugsUrl,
    pageNum
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;
  console.log("DATA>>>>>", data);

  return (
    <Catalog
      title="Каталог биопрепаратов"
      btnTitle="Добавить препарат"
      createForm={<CreateCatalogDrugForm url={catalogDrugsUrl} queryKey={pageQueryKey}/>}
      cardsInRow={3}
      dataTotal={data.total_count}
      pageNum={pageNum}
      setPageNum={setPageNum}
      dataPerPage={data.per_page}
    >
      {data &&
        data.catalog_drugs &&
        data.catalog_drugs.length &&
        data.catalog_drugs.map((drug: IDrugCatalogCard) => (
          <CatalogItem
            key={drug.id}
            delUrl={catalogDrugDetailUrl(drug.id)}
            url={catalogDrugLink(drug.id)}
            imgSrc={!drug.image ? "/drugsCard.jpg" : drugImageUrl(drug.drug_id)}
            invQueryName={pageQueryKey}
            cardTitle={drug.name}
            id={drug.id}
          >
            <CatalogDrugCardBody
              batch={drug.batch}
              control={drug.control}
              expiration_date={drug.expiration_date}
              production_date={
                AppService.convertDateString(drug.production_date).shortDate
              }
              drugId={drug.id}
            />
          </CatalogItem>
        ))}
    </Catalog>
  );
}
