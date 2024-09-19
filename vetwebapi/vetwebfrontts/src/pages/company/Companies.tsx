import { CreateCompany } from "features/index";
import { useState } from "react";
import { ErrorLoadDataMessage, Loader, useGetPageData } from "shared/index";
import { companiesUrl } from "shared/urls/companyUrls";
import { CatalogPageWrapper } from "widgets/CatalogPageWrapper";
import { CompanyCards } from "widgets/company";

export function Companies() {
  const [pageNum, setPageNum] = useState(1);
  const url = companiesUrl;
  const queryKey = "companies";
  const pageQueryKey = `${queryKey}${pageNum}`;
  const { data, isLoading, isError, error } = useGetPageData(
    queryKey,
    url,
    pageNum
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;
  return (
    <CatalogPageWrapper
      data={data}
      title="Предприятия"
      cardsInRow={3}
      btnTitle="Добавить предприятие"
      createForm={<CreateCompany url={url} queryKey={pageQueryKey} />}
      pageNum={pageNum}
      setPageNum={setPageNum}
    >
      <CompanyCards companies={data.companies} invQueryName={pageQueryKey} />
    </CatalogPageWrapper>
    // <CatalogWrapper
    //   title="Предприятия"
    //   cardsInRow={3}
    //   queryKey="companies"
    //   url={companiesUrl}
    //   imgSrc="/animals.jpg"
    //   btnTitle="Добавить предприятие"
    //   createForm={<CreateCompany url={companiesUrl} queryKey="companies1" />}
    // />
  );
}
