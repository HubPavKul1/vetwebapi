import { Catalog } from "components/Catalog";
import { CatalogItem } from "components/catalogItem/CatalogItem";
import { CreateDrugForm } from "components/drugs/drug/CreateDrugForm";

import { DrugCardBody } from "components/drugs/drug/DrugCardBody";
import { Loader } from "components/Loader";
import { ErrorLoadDataMessage } from "components/ErrorLoadDataMessage";
import {
  drugDetailUrl,
  drugFileUploadUrl,
  drugImageUrl,
  drugLink,
  drugsUrl,
} from "urls/drugUrls";
import { IDrugCard } from "interfaces/DrugInterfaces";
import { useGetPageData } from "hooks/useGetPageData";
import { useState } from "react";

export function Drugs() {
  const[pageNum, setPageNum] = useState(1)
  const pageQueryKey = "drugs" + pageNum.toString()
  const url = drugsUrl
  const { data, isLoading, isError, error } = useGetPageData(pageQueryKey, url, pageNum);

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  return (
    <Catalog
      title="Справочник биопрепаратов"
      btnTitle="Добавить препарат"
      cardsInRow={3}
      createForm={<CreateDrugForm url={url} queryKey={pageQueryKey}/>}
      dataTotal={data.total_count}
      dataPerPage={data.per_page}
      pageNum={pageNum}
      setPageNum={setPageNum}
    >
      {data &&
        data.drugs.length &&
        data.drugs.map((drug: IDrugCard) => (
          <CatalogItem
            key={drug.id}
            delUrl={drugDetailUrl(drug.id)}
            url={drugLink(drug.id)}
            imgSrc={drug.image && drugImageUrl(drug.id)}
            invQueryName={pageQueryKey}
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
