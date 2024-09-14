import { CatalogItem } from "components/catalogItem/CatalogItem";
import {
  catalogDrugDetailUrl,
  catalogDrugLink,
  drugImageUrl,
} from "shared/urls/drugUrls";
import { CatalogDrugCardBody } from "./CatalogDrugCardBody";
import { convertDateString } from "shared/helpers";
import { IDrugCatalogCard } from "entities/drugCatalog/model/drugCatalogInterfaces";

interface CatalogDrugCardProps {
  drug: IDrugCatalogCard;
  invQueryName: string;
}

export function CatalogDrugCard({ drug, invQueryName }: CatalogDrugCardProps) {
  return (
    <CatalogItem
      delUrl={catalogDrugDetailUrl(drug.id)}
      url={catalogDrugLink(drug.id)}
      imgSrc={!drug.image ? "/drugsCard.jpg" : drugImageUrl(drug.drug_id)}
      invQueryName={invQueryName}
      cardTitle={drug.name}
      id={drug.id}
    >
      <CatalogDrugCardBody
        batch={drug.batch}
        control={drug.control}
        expiration_date={drug.expiration_date}
        production_date={
          convertDateString(drug.production_date).shortDate
        }
        drugId={drug.id}
      />
    </CatalogItem>
  );
}
