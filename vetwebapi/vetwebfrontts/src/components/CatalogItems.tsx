import { CompanyCards } from "./companies/CompanyCards";
import { CatalogDrugCards } from "./drugs/catalogDrug/CatalogDrugCards";
import { DrugCards } from "./drugs/drug/DrugCards";
import { ReceiptDrugCards } from "./drugs/drugMovements/ReceiptDrugCards";

interface CatalogItemsProps {
  data: object;
  queryKey: string;
  imgSrc?: string;
  url: string;
  btnTitle?: string;
}

export default function CatalogItems({
  data,
  queryKey,
  imgSrc,
  url,
  btnTitle,
}: CatalogItemsProps) {
  if (!btnTitle) return;
  return (
    <>
      {data.companies && imgSrc && (
        <CompanyCards
          companies={data.companies}
          invQueryName={queryKey}
          imgSrc={imgSrc}
          url={url}
          btnTitle={btnTitle}
        />
      )}
      {data.drugs && (
        <DrugCards
          drugs={data.drugs}
          invQueryName={queryKey}
          btnTitle={btnTitle}
          url={url}
        />
      )}
      {data.catalog_drugs && (
        <CatalogDrugCards
          drugs={data.catalog_drugs}
          invQueryName={queryKey}
          btnTitle={btnTitle}
          url={url}
        />
      )}
      {data.drug_movements && imgSrc && (
        <ReceiptDrugCards
          drugMovements={data.drug_movements}
          invQueryName={queryKey}
          btnTitle={btnTitle}
          url={url}
          imgSrc={imgSrc}
        />
      )}
    </>
  );
}
