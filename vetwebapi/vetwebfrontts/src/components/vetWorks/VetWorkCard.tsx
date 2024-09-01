import { CatalogItem } from "components/catalogItem/CatalogItem";
import { IVetwork } from "interfaces/VetWorkInterfaces";
import { AppService } from "services/app.service";
import { vetWorkDetailUrl, vetWorkLink } from "urls/vetWorkUrls";

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
      key={vetWork.id}
      delUrl={vetWorkDetailUrl(vetWork.id)}
      url={vetWorkLink(vetWork.id)}
      imgSrc={imgSrc}
      invQueryName={invQueryName}
      cardTitle={
        AppService.convertDateString(vetWork.vetwork_date).fullDate +
        " " +
        vetWork.diseases
      }
      id={vetWork.id}
    ></CatalogItem>
  );
}
