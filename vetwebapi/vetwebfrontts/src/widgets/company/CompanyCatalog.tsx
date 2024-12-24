import { CreateCompany } from "features/company";
import { useState } from "react";
import { ErrorLoadDataMessage, Loader, useGetPageData } from "shared/index";
import { CatalogPageWrapper } from "widgets/CatalogPageWrapper";
import { CompanyCard } from "./ui/CompanyCard";
import { ICompanyCard } from "entities/company";
import useCompaniesFilter from "features/company/stores/useCompaniesFilter";

interface CompanyCatalogProps {
  url: string;
  queryKey: string;
  title: string;
  btnTitle: string;
  imgSrc: string;
}

export function CompanyCatalog({ ...props }: CompanyCatalogProps) {
  const { url, queryKey, title, btnTitle, imgSrc } = props;
  const [pageNum, setPageNum] = useState(1);
  const pageQueryKey = `${queryKey}${pageNum}`;
  const { data, isLoading, isError, error } = useGetPageData(
    pageQueryKey,
    url,
    pageNum
  );

  const animalGroup = useCompaniesFilter((state) => state.animalGroup);

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;
  return (
    <CatalogPageWrapper
      data={data}
      title={title}
      cardsInRow={3}
      btnTitle={btnTitle}
      createForm={<CreateCompany url={url} queryKey={pageQueryKey} />}
      pageNum={pageNum}
      setPageNum={setPageNum}
    >
      {data.companies.map((company: ICompanyCard) => (
        <CompanyCard
          key={company.id}
          company={company}
          invQueryName={pageQueryKey}
          imgSrc={imgSrc}
        />
      ))}
    </CatalogPageWrapper>
  );
}
