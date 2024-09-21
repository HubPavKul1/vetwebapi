import { ICompanyCard } from "entities/company/model/companyInterfaces";
import { CreateCompany } from "features/company";
import { useState } from "react";
import { ErrorLoadDataMessage, Loader, useGetPageData } from "shared/index";
import { CatalogPageWrapper } from "widgets/CatalogPageWrapper";
import { CompanyCard } from "./ui/CompanyCard";

interface CompanyCatalogProps {
  url: string;
  queryKey: string;
  title: string;
  btnTitle: string;
  imgSrc: string;
}

export function CompanyCatalog({ ...props }: CompanyCatalogProps) {
  const [pageNum, setPageNum] = useState(1);
  const url = props.url;
  const pageQueryKey = `${props.queryKey}${pageNum}`;
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
      title={props.title}
      cardsInRow={3}
      btnTitle={props.btnTitle}
      createForm={<CreateCompany url={url} queryKey={pageQueryKey} />}
      pageNum={pageNum}
      setPageNum={setPageNum}
    >
      {data.companies.map((company: ICompanyCard) => (
        <CompanyCard
          key={company.id}
          company={company}
          invQueryName={pageQueryKey}
          cardTitle={company.short_name}
          imgSrc={props.imgSrc}
        />
      ))}
    </CatalogPageWrapper>
  );
}