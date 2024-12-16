import { ReceiptDrugCardBody } from "entities/drugMovements";
import { IDrugMovementDetail } from "entities/drugMovements/model/drugMovementInterfaces";
import { CatalogCardSmallTop } from "features/index";
import { convertDateString } from "shared/helpers";
import { drugReceiptDetailUrl, drugReceiptLink } from "shared/urls/drugUrls";

interface ReceiptDrugCardProps {
  drugMovement: IDrugMovementDetail;
  invQueryName: string;
  imgSrc: string;
}

export function ReceiptDrugCard({ ...props }: ReceiptDrugCardProps) {
  const { drugMovement, invQueryName, imgSrc } = props;
  return (
    <CatalogCardSmallTop
      itemDetailUrl={drugReceiptLink(drugMovement.id)}
      cardTitle={convertDateString(drugMovement.operation_date).fullDate}
      invQueryName={invQueryName}
      delUrl={drugReceiptDetailUrl(drugMovement.id)}
      imgSrc={imgSrc}
    >
      {drugMovement.drugs &&
        drugMovement.drugs.map((drug) => (
          <ReceiptDrugCardBody key={drug.id} drug={drug} />
        ))}
    </CatalogCardSmallTop>
  );
}
