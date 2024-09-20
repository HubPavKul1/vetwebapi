import { CatalogDrugCards } from "./drugs/catalogDrug/CatalogDrugCards";
import { DrugCards } from "./drugs/drug/DrugCards";
import { ReceiptDrugCards } from "./drugs/drugMovements/ReceiptDrugCards";
import { VetWorkCards } from "./vetWorks/VetWorkCards";

interface CatalogItemsProps {
  data: any;
  queryKey: string;
  imgSrc?: string;
  url: string;
  btnTitle?: string;
}

export function CatalogItems({
  data,
  queryKey,
  imgSrc,
  url,
  btnTitle,
}: CatalogItemsProps) {
  if (!btnTitle) return;
  return (
    <>
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
      {data.vetworks && imgSrc && (
        <VetWorkCards
          vetWorks={data.vetworks}
          invQueryName={queryKey}
          btnTitle={btnTitle}
          url={url}
          imgSrc={imgSrc}
        />
      )}
    </>
  );
}
