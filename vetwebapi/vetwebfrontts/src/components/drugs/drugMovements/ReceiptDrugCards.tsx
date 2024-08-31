import { CreateItem } from "components/CreateItem";
import { IDrugMovement } from "interfaces/DrugInterfaces";
import { CreateDrugReceiptForm } from "./CreateDrugReceiptForm";
import { CatalogItem } from "components/catalogItem/CatalogItem";
import { drugReceiptDetailUrl, drugReceiptLink } from "urls/drugUrls";
import { AppService } from "services/app.service";

interface ReceiptDrugCardsProps {
  drugMovements: IDrugMovement[];
  invQueryName: string;
  btnTitle: string;
  url: string;
  imgSrc: string;
}

export function ReceiptDrugCards({
  drugMovements,
  invQueryName,
  btnTitle,
  url,
  imgSrc,
}: ReceiptDrugCardsProps) {
  return (
    <>
      <CreateItem
        btnTitle={btnTitle}
        children={<CreateDrugReceiptForm url={url} queryKey={invQueryName} />}
      />
      {drugMovements.map((drugMovement: IDrugMovement) => (
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
      ))}
    </>
  );
}
