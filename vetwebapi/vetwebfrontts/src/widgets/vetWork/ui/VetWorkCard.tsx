import { IVetwork } from "entities/vetWork/model/vetWorkInterfaces";
import { CatalogCard } from "features/index";
import { convertDateString } from "shared/helpers";
import { vetWorkDetailUrl, vetWorkLink } from "shared/urls/vetWorkUrls";

interface VetWorkCardProps {
  vetWork: IVetwork;
  invQueryName: string;
  imgSrc: string;
}

export function VetWorkCard({ ...props }: VetWorkCardProps) {
  const { vetWork, imgSrc, invQueryName } = props;
  return (
    <CatalogCard
      itemDetailUrl={vetWorkLink(vetWork.id)}
      cardTitle={
        convertDateString(vetWork.vetwork_date).fullDate +
        " " +
        vetWork.diseases
      }
      invQueryName={invQueryName}
      delUrl={vetWorkDetailUrl(vetWork.id)}
      imgSrc={imgSrc}
    >
      <div>VetWorkCardBody</div>
    </CatalogCard>
  );
}
