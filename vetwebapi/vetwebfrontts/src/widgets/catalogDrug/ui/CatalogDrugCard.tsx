import {
  catalogDrugDetailUrl,
  catalogDrugLink,
  drugImageUrl,
} from "shared/urls/drugUrls";
import { convertDateString } from "shared/helpers";
import { IDrugCatalogCard } from "entities/catalogDrug/model/drugCatalogInterfaces";
import { CatalogDrugCardBody } from "entities/catalogDrug/ui/CatalogDrugCardBody";
import { CatalogCard } from "features/index";

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
    >
      <CatalogDrugCardBody
        batch={drug.batch}
        control={drug.control}
        expiration_date={drug.expiration_date}
        production_date={convertDateString(drug.production_date).shortDate}
        drugId={drug.id}
      />
    </CatalogCard>

    // <CatalogItem
    //   delUrl={catalogDrugDetailUrl(drug.id)}
    //   url={catalogDrugLink(drug.id)}
    //   imgSrc={!drug.image ? "/drugsCard.jpg" : drugImageUrl(drug.drug_id)}
    //   invQueryName={invQueryName}
    //   cardTitle={drug.name}
    //   id={drug.id}
    // >

    // </CatalogItem>
  );
}
