import { CreateItem } from "components/CreateItem";
import { IDrugCatalogCard } from "interfaces/DrugInterfaces";
import { CreateCatalogDrugForm } from "../drug/CreateCatalogDrugForm";
import { CatalogItem } from "components/catalogItem/CatalogItem";
import { AppService } from "services/app.service";
import { CatalogDrugCardBody } from "../drug/CatalogDrugCardBody";
import {
  catalogDrugDetailUrl,
  catalogDrugLink,
  drugImageUrl,
} from "urls/drugUrls";

interface CatalogDrugCardsProps {
  drugs: IDrugCatalogCard[];
  invQueryName: string;
  btnTitle: string;
  url: string;
  // imgSrc: string;
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
        <CatalogItem
          key={drug.id}
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
              AppService.convertDateString(drug.production_date).shortDate
            }
            drugId={drug.id}
          />
        </CatalogItem>
      ))}
    </>
  );
}
