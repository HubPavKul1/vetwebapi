import { Catalog } from "components/Catalog";
import { CatalogItem } from "components/catalogItem/CatalogItem";
import { IDrugCatalogCard } from "interfaces/DrugInterfaces";
import { AppService } from "services/app.service";
import { CreateCatalogDrugForm } from "components/drugs/drug/CreateCatalogDrugForm";
import { CatalogDrugCardBody } from "components/drugs/drug/CatalogCardBody";
import { useGetData } from "hooks/useGetData";
import { ErrorLoadDataMessage } from "components/ErrorLoadDataMessage";
import { Loader } from "components/Loader";
import {
  catalogDrugDetailUrl,
  catalogDrugLink,
  catalogDrugsUrl,
  drugImageUrl,
} from "urls/drugUrls";
import { useState } from "react";
import { useGetDataPage } from "hooks/useGetDataPage";

export function DrugCatalog() {
  const [pageNum, setPageNum] = useState(1);
  const { data, isLoading, isError, error } = useGetDataPage(
    "drugCatalog",
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
      createForm={<CreateCatalogDrugForm />}
      cardsInRow={3}
      dataTotal={data && data.total_count && data.total_count}
      dataPerPage={data && data.per_page && data.per_page}
      setPageNum={setPageNum}
      pageNum={pageNum}
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
            invQueryName="drugCatalog"
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
