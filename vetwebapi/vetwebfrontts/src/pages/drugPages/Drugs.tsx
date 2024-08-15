import { Catalog } from "../../components/Catalog";
import { CatalogItem } from "../../components/catalogItem/CatalogItem";
import { CreateDrugForm } from "../../components/drugs/drug/CreateDrugForm";

import { DrugCardBody } from "../../components/drugs/drug/DrugCardBody";
import { useGetData } from "../../hooks/useGetData";
import { Loader } from "../../components/Loader";
import { ErrorLoadDataMessage } from "../../components/ErrorLoadDataMessage";
import {
  drugDetailUrl,
  drugFileUploadUrl,
  drugImageUrl,
  drugLink,
  drugsUrl,
} from "../../urls/drugUrls";
import { IDrugCard } from "../../interfaces/DrugInterfaces";

export function Drugs() {
  const { data, isLoading, isError, error } = useGetData("drugs", drugsUrl);

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  return (
    <Catalog
      title="Справочник биопрепаратов"
      btnTitle="Добавить препарат"
      cardsInRow={3}
      createForm={<CreateDrugForm />}
      dataLength={data && data.drugs && data.drugs.length}
    >
      {data &&
        data.drugs.length &&
        data.drugs.map((drug: IDrugCard) => (
          <CatalogItem
            key={drug.id}
            delUrl={drugDetailUrl(drug.id)}
            url={drugLink(drug.id)}
            imgSrc={drug.image && drugImageUrl(drug.id)}
            invQueryName="drugs"
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
    </Catalog>
  );
}
