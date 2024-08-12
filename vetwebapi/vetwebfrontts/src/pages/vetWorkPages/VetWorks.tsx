import { Catalog } from "../../components/Catalog";
import { CatalogItem } from "../../components/catalogItem/CatalogItem";

import { AppService } from "../../app.service";
import { IVetwork } from "../../interfaces/VetWorkInterfaces";
import { ErrorLoadDataMessage } from "../../components/ErrorLoadDataMessage";
import { Loader } from "../../components/Loader";
import { useGetData } from "../../hooks/useGetData";
import { vetWorkDetailUrl, vetWorkLink } from "../../Urls";

interface VetWorksProps {
  url: string;
  createForm: React.ReactElement;
  title: string;
  btnTitle: string;
  imgSrc: string;
  queryKey: string;
}

export function VetWorks({
  url,
  createForm,
  title,
  btnTitle,
  imgSrc,
  queryKey,
}: VetWorksProps) {
  const { data, isLoading, error, isError } = useGetData(queryKey, url);

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  return (
    <Catalog
      title={title}
      btnTitle={btnTitle}
      createForm={createForm}
      cardsInRow={4}
      dataLength={data && data.vetworks && data.vetworks.length}
    >
      {data &&
        data.vetworks.length &&
        data.vetworks.map((vetWork: IVetwork) => (
          <CatalogItem
            key={vetWork.id}
            delUrl={vetWorkDetailUrl(vetWork.id)}
            url={vetWorkLink(vetWork.id)}
            imgSrc={imgSrc}
            invQueryName={queryKey}
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
