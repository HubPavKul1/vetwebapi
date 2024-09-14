import { CatalogItem } from "components/catalogItem/CatalogItem";
import {
  drugDetailUrl,
  drugFileUploadUrl,
  drugImageUrl,
  drugLink,
} from "shared/urls/drugUrls";
import { DrugCardBody } from "./DrugCardBody";
import { IDrugCard } from "entities/drug/model/drugInterfaces";

interface DrugCardProps {
  drug: IDrugCard;
  invQueryName: string;
}

export function DrugCard({ drug, invQueryName }: DrugCardProps) {
  return (
    <CatalogItem
      delUrl={drugDetailUrl(drug.id)}
      url={drugLink(drug.id)}
      imgSrc={drug.image && drugImageUrl(drug.id)}
      invQueryName={invQueryName}
      cardTitle={drug.name}
      id={drug.id}
      hasFileUploader={!drug.instruction}
      accept=".pdf"
      mutationName="drugInstr upload"
      fileUploadUrl={drugFileUploadUrl(drug.id)}
      iconSrc="/pdf.jpg"
    >
      <DrugCardBody
        drugManufacturer={drug.drug_manufacturer}
        diseases={drug.diseases}
      />
    </CatalogItem>
  );
}
