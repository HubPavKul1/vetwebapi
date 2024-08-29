import { Catalog } from "components/Catalog";
import { ErrorLoadDataMessage } from "components/ErrorLoadDataMessage";
import { Loader } from "components/Loader";
import { useState } from "react";
import { useGetPageData } from "hooks/useGetPageData";
import { CompanyCards } from "./companies/CompanyCards";

interface CatalogPageProps {
  url: string;
  title: string;
  btnTitle: string;
  imgSrc: string;
  invQueryName: string;
  createForm: React.ReactElement;
  catalogItems: React.ReactElement;
}

export function CatalogPage({
  url,
  title,
  btnTitle,
  imgSrc,
  invQueryName,
  createForm,
}: CatalogPageProps) {
  const [pageNum, setPageNum] = useState(1);

  const { data, isLoading, isError, error } = useGetPageData(
    invQueryName + pageNum.toString(),
    url,
    pageNum
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  return (
    <Catalog
      title={title}
      btnTitle={btnTitle}
      cardsInRow={3}
      createForm={createForm}
      pageNum={pageNum}
      setPageNum={setPageNum}
      dataTotal={data.total_count}
      dataPerPage={data.per_page}
    >
      {data.companies && (
        <CompanyCards
          invQueryName={invQueryName}
          imgSrc={imgSrc}
          companies={data.companies}
        />
      )}
    </Catalog>
  );
}
