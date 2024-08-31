import { CatalogItem } from "components/catalogItem/CatalogItem";
import { IDrugCard } from "interfaces/DrugInterfaces";
import { DrugCardBody } from "./DrugCardBody";
import {
  drugDetailUrl,
  drugFileUploadUrl,
  drugImageUrl,
  drugLink,
} from "urls/drugUrls";
import { CreateItem } from "components/CreateItem";
import { CreateDrugForm } from "./CreateDrugForm";

interface DrugCardsProps {
  drugs: IDrugCard[];
  invQueryName: string;
  btnTitle: string;
  url: string;
  // imgSrc: string;
}

export function DrugCards({
  drugs,
  invQueryName,
  btnTitle,
  url,
}: DrugCardsProps) {
  return (
    <>
      <CreateItem
        btnTitle={btnTitle}
        children={<CreateDrugForm url={url} queryKey={invQueryName} />}
      />
      {drugs.map((drug: IDrugCard) => (
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
      ))}
    </>
  );
}
