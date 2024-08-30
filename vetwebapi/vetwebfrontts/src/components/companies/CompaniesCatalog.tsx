import { Catalog } from "components/Catalog";
import { ErrorLoadDataMessage } from "components/ErrorLoadDataMessage";
import { Loader } from "components/Loader";
import { CreateCompany } from "./CreateCompany";
import { CompanyCards } from "./CompanyCards";
import { useState } from "react";
import { useGetPageData } from "hooks/useGetPageData";

interface CompaniesCatalogProps {
  url: string;
  title: string;
  btnTitle: string;
  imgSrc: string;
  invQueryName: string;
}

export function CompaniesCatalog({
  url,
  title,
  btnTitle,
  imgSrc,
  invQueryName,
}: CompaniesCatalogProps) {
  const [pageNum, setPageNum] = useState(1);
  const pageQueryKey = invQueryName + pageNum.toString();

  const { data, isLoading, isError, error } = useGetPageData(
    pageQueryKey,
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
      createForm={<CreateCompany url={url} queryKey={pageQueryKey} />}
      pageNum={pageNum}
      setPageNum={setPageNum}
      dataTotal={data.total_count}
      dataPerPage={data.per_page}
    >
      {data && data.companies && data.companies.length && (
        <CompanyCards
          companies={data.companies}
          invQueryName={pageQueryKey}
          imgSrc={imgSrc}
        />
      )}
    </Catalog>
  );
}
