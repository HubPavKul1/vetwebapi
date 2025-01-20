import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";
import { CatalogCard } from "features/index";
import { convertDateString, diseasesString } from "shared/helpers";
import { vetWorkDetailUrl, vetWorkLink } from "shared/urls/vetWorkUrls";

interface VetWorkCardProps {
  vetWork: IVetWorkSchema;
  invQueryName: string;
  imgSrc: string;
}

export function VetWorkCard({ ...props }: VetWorkCardProps) {
  const { vetWork, imgSrc, invQueryName } = props;
  const diseases = diseasesString(vetWork.diseases);
  return (
    <CatalogCard
      itemDetailUrl={vetWorkLink(vetWork.id)}
      cardTitle={convertDateString(vetWork.vetwork_date).fullDate}
      invQueryName={invQueryName}
      delUrl={vetWorkDetailUrl(vetWork.id)}
      imgSrc={imgSrc}
      topClassName="card-top-small"
      bodyClassName="card-body-small"
    >
      <div className="m-0 mb-1 text-center text-xs text-indigo-900">{diseases}</div>
    </CatalogCard>
  );
}
