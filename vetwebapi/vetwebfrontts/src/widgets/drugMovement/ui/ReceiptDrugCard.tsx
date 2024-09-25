import { IDrugMovement } from "entities/drugMovements/model/drugMovementInterfaces";
import { CatalogCard } from "features/index";
import { convertDateString } from "shared/helpers";
import { drugReceiptDetailUrl, drugReceiptLink } from "shared/urls/drugUrls";

interface ReceiptDrugCardProps {
  drugMovement: IDrugMovement;
  invQueryName: string;
  imgSrc: string;
}

export function ReceiptDrugCard({ ...props }: ReceiptDrugCardProps) {
  const { drugMovement, invQueryName, imgSrc } = props;
  return (
    <CatalogCard
      itemDetailUrl={drugReceiptLink(drugMovement.id)}
      cardTitle={convertDateString(drugMovement.operation_date).fullDate}
      invQueryName={invQueryName}
      delUrl={drugReceiptDetailUrl(drugMovement.id)}
      imgSrc={imgSrc}
    >
      <h5>ReceiptDrugCardBody</h5>
    </CatalogCard>
  );
}
