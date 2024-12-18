import { convertDateString } from "shared/helpers";

import { CatalogCard } from "features/index";
import { CatalogDrugCardBody, IDrugCatalogCard } from "entities/catalogDrug";
import {
  catalogDrugDetailUrl,
  catalogDrugLink,
  drugImageUrl,
} from "shared/index";

interface CatalogDrugCardProps {
  drug: IDrugCatalogCard;
  invQueryName: string;
}

export function CatalogDrugCard({ ...props }: CatalogDrugCardProps) {
  const { drug, invQueryName } = props;
  return (
    <CatalogCard
      itemDetailUrl={catalogDrugLink(drug.id)}
      cardTitle={drug.name}
      invQueryName={invQueryName}
      delUrl={catalogDrugDetailUrl(drug.id)}
      imgSrc={!drug.image ? "/drugsCard.jpg" : drugImageUrl(drug.drug_id)}
      topClassName="card-top"
      bodyClassName="card-body"
    >
      <CatalogDrugCardBody
        batch={drug.batch}
        control={drug.control}
        expiration_date={drug.expiration_date}
        production_date={convertDateString(drug.production_date).shortDate}
        drugId={drug.id}
      />
    </CatalogCard>
  );
}
