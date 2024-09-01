import { CatalogItem } from "components/catalogItem/CatalogItem";
import { IDrugMovement } from "interfaces/DrugInterfaces";
import { AppService } from "services/app.service";
import { drugReceiptDetailUrl, drugReceiptLink } from "urls/drugUrls";

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
      key={drugMovement.id}
      delUrl={drugReceiptDetailUrl(drugMovement.id)}
      url={drugReceiptLink(drugMovement.id)}
      imgSrc={imgSrc}
      invQueryName={invQueryName}
      cardTitle={
        AppService.convertDateString(drugMovement.operation_date).fullDate
      }
      id={drugMovement.id}
    />
  );
}
