import { useParams } from "react-router-dom";
import { ReceiptPDF } from "./ReceiptPDF";

import { useGetDataById } from "shared/hooks/useGetDataById";

import { Loader } from "shared/ui/Loader";
import { drugReceiptDetailUrl } from "shared/urls/drugUrls";
import { ErrorLoadDataMessage } from "shared/index";
import { IDrugMovementDetail } from "entities/drugMovements/model/drugMovementInterfaces";
import { convertDateString } from "shared/helpers";
import { drugReceiptHeaders } from "shared/model/tableHeaders";
import { ReceiptPageMenu } from "widgets/drugMovement";
import { ReceiptDrug } from "entities/drugMovements/ui/ReceiptDrug";
import { ReportPage } from "widgets/ReportPage";
import useReceiptPDFStore from "features/drugMovements/stores/useReceiptPDFStore";

interface ReceiptData {
  data?: IDrugMovementDetail;
  isLoading: boolean;
}

export function ReceiptDetail() {
  const isReceiptPdf = useReceiptPDFStore((state) => state.isReceiptPDF);
  const { id } = useParams();
  const receiptId = Number(id);
  const url = drugReceiptDetailUrl(receiptId);

  const { isLoading, data, isError, error }: ReceiptData = useGetDataById(
    "receipt",
    url,
    id
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  const date = convertDateString(data.operation_date);

  return (
    <>
      {!isReceiptPdf ? (
        <ReportPage
          reportTitle={`Поступление от ${date.shortDate}`}
          imgSrc="/vaccinesBg.png"
          menu={<ReceiptPageMenu url={url} />}
          tableHeaders={drugReceiptHeaders}
          tableItems={
            data.drugs?.length &&
            data.drugs.map((drug) => <ReceiptDrug key={drug.id} drug={drug} />)
          }
        />
      ) : (
        <ReceiptPDF data={data} />
      )}
    </>
  );
}
