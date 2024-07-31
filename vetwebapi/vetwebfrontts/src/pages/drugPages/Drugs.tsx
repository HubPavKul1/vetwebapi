import { useQuery } from "react-query";
import { Catalog } from "../../components/catalog";
import { CatalogItem } from "../../components/catalogItem/CatalogItem";
import { CreateDrugForm } from "../../components/drugs/drug/CreateDrugForm";
import { IDrugCard } from "../../interfaces/DrugInterfaces";
import { AppService } from "../../app.service";
import { DrugCardBody } from "../../components/drugs/drug/DrugCardBody";

interface DrugsData {
  data?: IDrugCard[];
  isLoading: boolean;
  error?: Error | null;
}

export function Drugs() {
  const url = "/api/drugs";

  const { data, isLoading, error }: DrugsData = useQuery(
    ["drugs"],
    () => AppService.getAll(url),
    {
      select: ({ data }) => data?.drugs,
    }
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  return (
    <Catalog
      title="Справочник биопрепаратов"
      btnTitle="Добавить препарат"
      cardsInRow={3}
      createForm={<CreateDrugForm />}
      dataLength={data.length}
    >
      {data.length && (
        data.map((drug) => (
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
