import { CatalogItem } from "components/catalogItem/CatalogItem";
import { IDrugMovement } from "entities/drugMovements/model/drugMovementInterfaces";
import { convertDateString } from "shared/helpers";
import { drugReceiptDetailUrl, drugReceiptLink } from "shared/urls/drugUrls";

interface ReceiptDrugCardProps {
  drugMovement: IDrugMovement;
  invQueryName: string;
  imgSrc: string;
}

export function ReceiptDrugCard({
  drugMovement,
  invQueryName,
  imgSrc,
}: ReceiptDrugCardProps) {
  return (
    <CatalogItem
      delUrl={drugReceiptDetailUrl(drugMovement.id)}
      url={drugReceiptLink(drugMovement.id)}
      imgSrc={imgSrc}
      invQueryName={invQueryName}
      cardTitle={
        convertDateString(drugMovement.operation_date).fullDate
      }
      id={drugMovement.id}
    />
  );
}
