import { CreateItem } from "components/CreateItem";
import { IDrugCatalogCard } from "interfaces/DrugInterfaces";
import { CatalogDrugCard } from "./CatalogDrugCard";
import { CreateCatalogDrugForm } from "./CreateCatalogDrugForm";

interface CatalogDrugCardsProps {
  drugs: IDrugCatalogCard[];
  invQueryName: string;
  btnTitle: string;
  url: string;
}

export function CatalogDrugCards({
  drugs,
  invQueryName,
  btnTitle,
  url,
}: CatalogDrugCardsProps) {
  return (
    <>
      <CreateItem
        btnTitle={btnTitle}
        children={<CreateCatalogDrugForm url={url} queryKey={invQueryName} />}
      />
      {drugs.map((drug: IDrugCatalogCard) => (
        <CatalogDrugCard drug={drug} invQueryName={invQueryName} key={drug.id}/>
      ))}
    </>
  );
}
