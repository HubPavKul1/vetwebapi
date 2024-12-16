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
      isSmallCardTop
      isSmallCardBody
    >
      <div className="text-xs">{diseases}</div>
    </CatalogCard>
  );
}
