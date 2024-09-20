import { drugsUrl } from "shared/urls/drugUrls";
import { useState } from "react";
import { ErrorLoadDataMessage, Loader, useGetPageData } from "shared/index";
import { CatalogPageWrapper } from "widgets/CatalogPageWrapper";
import { DrugCards } from "widgets/drug";
import { CreateDrugForm } from "features/drug";

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
      <DrugCards drugs={data.drugs} invQueryName={pageQueryKey} />
    </CatalogPageWrapper>
    // <CatalogWrapper
    //   title="Справочник биопрепаратов"
    //   btnTitle="Добавить препарат"
    //   cardsInRow={3}
    //   queryKey="drugs"
    //   createForm={<CreateDrugForm url={drugsUrl} queryKey="drugs1" />}
    //   url={drugsUrl}
    // />
  );
}
