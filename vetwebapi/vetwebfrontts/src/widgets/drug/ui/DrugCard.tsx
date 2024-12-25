import { drugDetailUrl, drugImageUrl, drugLink } from "shared/urls/drugUrls";

import { IDrugCard } from "entities/drug/model/drugInterfaces";
import { DrugCardBody } from "entities/drug";
import { CatalogCard } from "features/index";

interface DrugCardProps {
  drug: IDrugCard;
  invQueryName: string;
}

export function DrugCard({ ...props }: DrugCardProps) {
  const { drug, invQueryName } = props;
  return (
    <CatalogCard
      itemDetailUrl={drugLink(drug.id)}
      cardTitle={drug.name}
      invQueryName={invQueryName}
      delUrl={drugDetailUrl(props.drug.id)}
      imgSrc={drug.image && drugImageUrl(drug.id)}
      isDrugCard={true}
      drugId={drug.id}
      isDrugInstr={!!drug.instruction}
      topClassName="card-top"
      bodyClassName="card-body-small"
    >
      <DrugCardBody
        drugManufacturer={drug.drug_manufacturer}
        diseases={drug.diseases}
      />
    </CatalogCard>
  );
}
