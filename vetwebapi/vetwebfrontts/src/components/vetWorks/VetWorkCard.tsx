import { CatalogItem } from "components/catalogItem/CatalogItem";
import { IVetwork } from "entities/vetWork/model/vetWorkInterfaces";
import { convertDateString } from "shared/helpers";
import { vetWorkDetailUrl, vetWorkLink } from "shared/urls/vetWorkUrls";

interface VetWorkCardProps {
  vetWork: IVetwork;
  invQueryName: string;
  imgSrc: string;
}

export function VetWorkCard({
  vetWork,
  imgSrc,
  invQueryName,
}: VetWorkCardProps) {
  return (
    <CatalogItem
      delUrl={vetWorkDetailUrl(vetWork.id)}
      url={vetWorkLink(vetWork.id)}
      imgSrc={imgSrc}
      invQueryName={invQueryName}
      cardTitle={
        convertDateString(vetWork.vetwork_date).fullDate +
        " " +
        vetWork.diseases
      }
      id={vetWork.id}
    ></CatalogItem>
  );
}