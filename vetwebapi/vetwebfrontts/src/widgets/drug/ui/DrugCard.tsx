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
      isDrugCard
      drugId={props.drug.id}
    >
      <DrugCardBody
        drugManufacturer={props.drug.drug_manufacturer}
        diseases={props.drug.diseases}
      />
    </CatalogCard>
    // <CatalogItem
    //   delUrl={drugDetailUrl(drug.id)}
    //   url={drugLink(drug.id)}
    //   imgSrc={drug.image && drugImageUrl(drug.id)}
    //   invQueryName={invQueryName}
    //   cardTitle={drug.name}
    //   id={drug.id}
    //   hasFileUploader={!drug.instruction}
    //   accept=".pdf"
    //   mutationName="drugInstr upload"
    //   fileUploadUrl={drugFileUploadUrl(drug.id)}
    //   iconSrc="/pdf.jpg"
    // >
    //   <DrugCardBody
    //     drugManufacturer={drug.drug_manufacturer}
    //     diseases={drug.diseases}
    //   />
    // </CatalogItem>
  );
}
