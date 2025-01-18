import { CatalogDrugMovement, ICatalogDrugDetails } from "entities/catalogDrug";
import { useParams } from "react-router-dom";
import {
  Loader,
  PageDetailContentWrapper,
  PageTable,
  useGetDataById,
} from "shared/index";
import { catalogDrugMovementHeaders } from "shared/model/tableHeaders";

interface CatalogDrugMovementTableProps {
  url: string;
  queryKey: string;
  tableTitle: string;
}

interface CatalogDrugSpentData {
  data: ICatalogDrugDetails;
  isLoading: boolean;
}

export function CatalogDrugMovementTable({
  ...props
}: CatalogDrugMovementTableProps) {
  const { url, queryKey, tableTitle } = props;
  const { id } = useParams();

  const { data, isLoading }: CatalogDrugSpentData = useGetDataById(
    queryKey,
    url,
    id
  );

  if (isLoading || !data) return <Loader />;

  return (
    <PageDetailContentWrapper title={tableTitle}>
      <PageTable
        tableHeaders={catalogDrugMovementHeaders}
        tableItems={
          data.catalog_drugs &&
          data.catalog_drugs.map((drug) => (
            <CatalogDrugMovement key={drug.operation_date} drug={drug} />
          ))
        }
      />
    </PageDetailContentWrapper>
  );
}
