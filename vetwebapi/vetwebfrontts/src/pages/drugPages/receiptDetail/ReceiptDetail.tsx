import { useParams } from "react-router-dom";

import { ReceiptDrug } from "components/drugs/drugMovements/ReceiptDrug";
import { useState } from "react";
import { ReceiptPDF } from "./receiptPdf/ReceiptPDF";
import { ReceiptPageMenu } from "components/menu/ReceiptPageMenu";
import { ReportPage } from "components/ReportPage";
import { drugReceiptHeaders } from "data/TableHeaders";
import { useGetDataById } from "shared/hooks/useGetDataById";

import { Loader } from "shared/ui/Loader";
import { drugReceiptDetailUrl } from "shared/urls/drugUrls";
import { ErrorLoadDataMessage } from "shared/index";
import { IDrugMovementDetail } from "entities/drugMovements/model/drugMovementInterfaces";
import { convertDateString } from "shared/helpers";

interface ReceiptData {
  data?: IDrugMovementDetail;
  isLoading: boolean;
}

export function ReceiptDetail() {
  const [pdf, setPdf] = useState(false);
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
      {!pdf ? (
        <ReportPage
          reportTitle={`Поступление от ${date.shortDate}`}
          imgSrc="/drugsBg.jpg"
          menu={<ReceiptPageMenu url={url} setPdf={setPdf} />}
          tableHeaders={drugReceiptHeaders}
          tableItems={
            data.drugs?.length &&
            data.drugs.map((drug) => <ReceiptDrug key={drug.id} drug={drug} />)
          }
        />
      ) : (
        <ReceiptPDF setPdf={setPdf} data={data} />
      )}
    </>
  );
}
