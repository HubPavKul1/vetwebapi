import { IDrugCard } from "entities/drug/model/drugInterfaces";
import { DrugCard } from "./ui/DrugCard";

interface DrugCardsProps {
  drugs: IDrugCard[];
  invQueryName: string;
}

export function DrugCards({ drugs, invQueryName }: DrugCardsProps) {
  return (
    <>
      {drugs.map((drug: IDrugCard) => (
        <DrugCard key={drug.id} drug={drug} invQueryName={invQueryName} />
      ))}
    </>
  );
}
