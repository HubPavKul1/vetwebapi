import { IVetwork } from "interfaces/VetWorkInterfaces";
import { ErrorLoadDataMessage } from "components/ErrorLoadDataMessage";
import { Loader } from "components/Loader";
import { vetWorkDetailUrl, vetWorkLink } from "urls/vetWorkUrls";
import { CatalogItem } from "components/catalogItem/CatalogItem";
import { Catalog } from "components/Catalog";
import { AppService } from "services/app.service";
import { useState } from "react";
import { useGetPageData } from "hooks/useGetPageData";
import { VetWorkCreateForm } from "components/vetWorks/VetWorkCreateForm";

interface VetWorksProps {
  url: string;
  title: string;
  btnTitle: string;
  imgSrc: string;
  queryKey: string;
}

export function VetWorks({
  url,
  title,
  btnTitle,
  imgSrc,
  queryKey,
}: VetWorksProps) {
  const [pageNum, setPageNum] = useState(1);
  const pageQueryKey = queryKey + pageNum.toString();
  const { data, isLoading, error, isError } = useGetPageData(
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
      createForm={<VetWorkCreateForm url={url} queryKey={pageQueryKey} />}
      cardsInRow={4}
      dataTotal={data.total_count}
      dataPerPage={data.per_page}
      pageNum={pageNum}
      setPageNum={setPageNum}
    >
      {data &&
        data.vetworks.length &&
        data.vetworks.map((vetWork: IVetwork) => (
          <CatalogItem
            key={vetWork.id}
            delUrl={vetWorkDetailUrl(vetWork.id)}
            url={vetWorkLink(vetWork.id)}
            imgSrc={imgSrc}
            invQueryName={pageQueryKey}
            cardTitle={
              AppService.convertDateString(vetWork.vetwork_date).fullDate +
              " " +
              vetWork.diseases
            }
            id={vetWork.id}
          ></CatalogItem>
        ))}
    </Catalog>
  );
}
