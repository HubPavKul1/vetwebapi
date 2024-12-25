import { catalogDrugsUrl } from "shared/urls/drugUrls";
import { useState } from "react";
import { ErrorLoadDataMessage, Loader, useGetPageData } from "shared/index";
import { CatalogPageWrapper } from "widgets/CatalogPageWrapper";
import { CreateCatalogDrugForm } from "features/catalogDrug";
import { CatalogDrugCard } from "widgets/catalogDrug";
import { IDrugCatalogCard } from "entities/catalogDrug/model/drugCatalogInterfaces";
import useCatalogDrugFilter from "features/catalogDrug/stores/useCatalogDrugFilter";

export function DrugCatalog() {
  const [pageNum, setPageNum] = useState(1);
  const url = catalogDrugsUrl;
  const queryKey = "drugCatalog";
  const pageQueryKey = `${queryKey}${pageNum}`;
  const { data, isLoading, isError, error } = useGetPageData(
    pageQueryKey,
    url,
    pageNum
  );
  const disease = useCatalogDrugFilter((state) => state.disease);
  const filter = useCatalogDrugFilter((state) => state.setDisease);

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  return (
    <CatalogPageWrapper
      data={data}
      title="Каталог биопрепаратов"
      cardsInRow={3}
      btnTitle="Добавить препарат"
      createForm={<CreateCatalogDrugForm url={url} queryKey={pageQueryKey} />}
      pageNum={pageNum}
      setPageNum={setPageNum}
    >
      {data.catalog_drugs.map((drug: IDrugCatalogCard) => (
        <CatalogDrugCard
          key={drug.id}
          drug={drug}
          invQueryName={pageQueryKey}
        />
      ))}
    </CatalogPageWrapper>
  );
}
