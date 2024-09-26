import { IVetwork } from "entities/vetWork/model/vetWorkInterfaces";
import { VetWorkCreateForm } from "features/vetWork";
import { useState } from "react";
import { ErrorLoadDataMessage, Loader, useGetPageData } from "shared/index";
import { CatalogPageWrapper } from "widgets/CatalogPageWrapper";
import { VetWorkCard } from "./ui/VetWorkCard";

interface VetWorksProps {
  url: string;
  queryKey: string;
  title: string;
  btnTitle: string;
  imgSrc: string;
}

export function VetWorks({ ...props }: VetWorksProps) {
  const [pageNum, setPageNum] = useState(1);
  const { url, queryKey, title, btnTitle, imgSrc } = props;
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
      title={title}
      cardsInRow={3}
      btnTitle={btnTitle}
      createForm={<VetWorkCreateForm url={url} queryKey={pageQueryKey} />}
      pageNum={pageNum}
      setPageNum={setPageNum}
    >
      {data.vetworks.map((vetWork: IVetwork) => (
        <VetWorkCard
          key={vetWork.id}
          vetWork={vetWork}
          invQueryName={pageQueryKey}
          imgSrc={imgSrc}
        />
      ))}
    </CatalogPageWrapper>
  );
}
