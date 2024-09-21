
import { CreateItem } from "components/CreateItem";
import { CreateDrugForm } from "./CreateDrugForm";
import { DrugCard } from "./DrugCard";
import { IDrugCard } from "entities/drug/model/drugInterfaces";

interface DrugCardsProps {
  drugs: IDrugCard[];
  invQueryName: string;
  btnTitle: string;
  url: string;
}

export function DrugCards({
  drugs,
  invQueryName,
  btnTitle,
  url,
}: DrugCardsProps) {
  return (
    <>
      <CreateItem
        btnTitle={btnTitle}
        children={<CreateDrugForm url={url} queryKey={invQueryName} />}
      />
      {drugs.map((drug: IDrugCard) => (
        <DrugCard key={drug.id} drug={drug} invQueryName={invQueryName} />
      ))}
    </>
  );
}