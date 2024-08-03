import { Catalog } from "../../components/catalog";
import { CatalogItem } from "../../components/catalogItem/CatalogItem";
import { CreateDrugForm } from "../../components/drugs/drug/CreateDrugForm";
import { IDrugCard } from "../../interfaces/DrugInterfaces";

import { DrugCardBody } from "../../components/drugs/drug/DrugCardBody";
import { useGetData } from "../../hooks/useGetData";
import { Loader } from "../../components/Loader";
import { ErrorLoadDataMessage } from "../../components/ErrorLoadDataMessage";

interface DrugsData {
  data?: IDrugCard[];
  isLoading: boolean;
}

export function Drugs() {
  const url = "/api/drugs";

  const { data, isLoading, isError, error } = useGetData("drugs", url);
   
  if (isError) return <ErrorLoadDataMessage error={error}/>;
  if (isLoading || !data) return <Loader />;

  return (
    <Catalog
      title="Справочник биопрепаратов"
      btnTitle="Добавить препарат"
      cardsInRow={3}
      createForm={<CreateDrugForm />}
      dataLength={data && data.drugs && data.drugs.length}
    >
      {data && data.drugs.length && (
        data.drugs.map((drug) => (
          <CatalogItem
            key={drug.id}
            delUrl={`/api/drugs/${drug.id}`}
            url={`/drugs/${drug.id}`}
            imgSrc={drug.image}
            invQueryName="drugs"
            cardTitle={drug.name}
            id={drug.id}
            hasFileUploader={!drug.instruction}
            accept=".pdf"
            mutationName="drugInstr upload"
            fileUploadUrl={`/api/drugs/${drug.id}/upload/`}
            iconSrc="/pdf.jpg"
          >
            <DrugCardBody
              drugManufacturer={drug.drug_manufacturer}
              drugInstr={drug.instruction}
            />
          </CatalogItem>
        ))
      )}
    </Catalog>
  );
}
