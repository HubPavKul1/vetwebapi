import { CatalogItem } from "components/catalogItem/CatalogItem";
import { IDrugCard } from "interfaces/DrugInterfaces";
import {
  drugDetailUrl,
  drugFileUploadUrl,
  drugImageUrl,
  drugLink,
} from "urls/drugUrls";
import { DrugCardBody } from "./DrugCardBody";

interface DrugCardProps {
  drug: IDrugCard;
  invQueryName: string;
}

export function DrugCard({ drug, invQueryName }: DrugCardProps) {
  return (
    <CatalogItem
      key={drug.id}
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
