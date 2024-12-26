import { CreateCompany } from "features/company";
import { useEffect, useState } from "react";
import {
  ErrorLoadDataMessage,
  filteredCompaniesUrl,
  Loader,
  useGetPageData,
} from "shared/index";
import { CatalogPageWrapper } from "widgets/CatalogPageWrapper";
import { CompanyCard } from "./ui/CompanyCard";
import { ICompanyCard } from "entities/company";
import useCompaniesFilter from "features/company/stores/useCompaniesFilter";

interface CompanyCatalogProps {
  url: string;
  queryKey?: string;
  title: string;
  btnTitle: string;
  imgSrc: string;
  filterButtons?: React.ReactNode | React.ReactElement;
}

export function CompanyCatalog({ ...props }: CompanyCatalogProps) {
  const { url, queryKey, title, btnTitle, imgSrc } = props;
  const [pageNum, setPageNum] = useState(1);
  const animalGroupId = useCompaniesFilter((state) => state.animalGroup);
  const pageQueryKey = `${queryKey}${pageNum}`;
  const { data, isLoading, isError, error } = useGetPageData(
    pageQueryKey,
    url,
    pageNum,
    animalGroupId
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  // const animalGroups: string[] = data.companies.map(
  //   (company: ICompanyCard) => company.animal?.animal_group
  // );

  // const uniqueAnimalGroups = ["Все", ...new Set(animalGroups)].filter(
  //   (item) => item !== undefined
  // );

  // let filteredCompanies = data.companies.filter(
  //   (company: ICompanyCard) => company.animal?.animal_group === animalGroup
  // );
  // if (["Все"].includes(animalGroup)) {
  //   filteredCompanies = data.companies;
  // }

  return (
    <CatalogPageWrapper
      data={data}
      title={title}
      cardsInRow={3}
      btnTitle={btnTitle}
      createForm={<CreateCompany url={url} queryKey={pageQueryKey} />}
      pageNum={pageNum}
      setPageNum={setPageNum}
      filterButtons={props.filterButtons}
    >
      {data.companies &&
        data.companies.map((company: ICompanyCard) => (
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
