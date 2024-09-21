import { drugDetailUrl, drugImageUrl, drugLink } from "shared/urls/drugUrls";

import { IDrugCard } from "entities/drug/model/drugInterfaces";
import { DrugCardBody } from "entities/drug";
import { CatalogCard } from "features/index";

interface DrugCardProps {
  drug: IDrugCard;
  invQueryName: string;
}

export function DrugCard({ ...props }: DrugCardProps) {
  return (
    <CatalogCard
      itemDetailUrl={drugLink(props.drug.id)}
      cardTitle={props.drug.name}
      invQueryName={props.invQueryName}
      delUrl={drugDetailUrl(props.drug.id)}
      imgSrc={props.drug.image && drugImageUrl(props.drug.id)}
      isDrugCard={true}
      drugId={props.drug.id}
      isDrugInstr={!!props.drug.instruction}
    >
      <DrugCardBody
        drugManufacturer={props.drug.drug_manufacturer}
        diseases={props.drug.diseases}
      />
    </CatalogCard>
   
  );
}
