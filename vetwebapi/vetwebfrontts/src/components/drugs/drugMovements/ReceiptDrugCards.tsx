import { CreateItem } from "components/CreateItem";
import { IDrugMovement } from "interfaces/DrugInterfaces";
import { CreateDrugReceiptForm } from "./CreateDrugReceiptForm";
import { ReceiptDrugCard } from "./ReceiptDrugCard";

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
        <ReceiptDrugCard
          key={drugMovement.id}
          drugMovement={drugMovement}
          invQueryName={invQueryName}
          imgSrc={imgSrc}
        />
      ))}
    </>
  );
}
