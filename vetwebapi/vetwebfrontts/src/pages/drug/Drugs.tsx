import { drugsUrl } from "shared/urls/drugUrls";
import { useState } from "react";
import { ErrorLoadDataMessage, Loader, useGetPageData } from "shared/index";
import { CatalogPageWrapper } from "widgets/CatalogPageWrapper";
import { DrugCard } from "widgets/drug";
import { CreateDrugForm } from "features/drug";
import { IDrugCard } from "entities/drug/model/drugInterfaces";

export function Drugs() {
  const [pageNum, setPageNum] = useState(1);
  const url = drugsUrl;
  const queryKey = "drugs";
  const pageQueryKey = `${queryKey}${pageNum}`;
  const { data, isLoading, isError, error } = useGetPageData(
    pageQueryKey,
    url,
    pageNum
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;
  return (
    <CatalogPageWrapper
      data={data}
      title="Справочник биопрепаратов"
      cardsInRow={3}
      btnTitle="Добавить препарат"
      createForm={<CreateDrugForm url={url} queryKey={pageQueryKey} />}
      pageNum={pageNum}
      setPageNum={setPageNum}
    >
      {data.drugs.map((drug: IDrugCard) => (
        <DrugCard key={drug.id} drug={drug} invQueryName={pageQueryKey} />
      ))}
    </CatalogPageWrapper>
   
  );
}
