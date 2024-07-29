import { useQuery } from "@tanstack/react-query";
import { Catalog } from "../../components/Catalog";
import { CatalogItem } from "../../components/catalogItem/CatalogItem";

import { AppService } from "../../app.service";
import { IVetwork } from "../../interfaces/VetWorkInterfaces";

interface VetWorkData {
  data?: IVetwork[];
  isLoading: boolean;
  error?: Error | null;
}

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
  const { data, isLoading, error }: VetWorkData = useQuery({
    queryKey: [{ queryKey }],
    queryFn: () => AppService.getAll(url),
    select: ({ data }) => data?.vetworks
  });

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <Catalog
      title={title}
      btnTitle={btnTitle}
      createForm={createForm}
      cardsInRow={4}
      dataLength={data.length}
    >
      {data.length &&
        data.map((vetWork) => (
          <CatalogItem
            key={vetWork.id}
            delUrl={`/api/vetwork/${vetWork.id}`}
            url={`/vetwork/${vetWork.id}`}
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
