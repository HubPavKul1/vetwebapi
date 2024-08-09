import { useParams } from "react-router-dom";

import { AppService } from "../../../app.service";
import { IDrugMovementDetail } from "../../../interfaces/DrugInterfaces";
import { ReceiptDrug } from "../../../components/drugs/drugMovements/ReceiptDrug";
import { useState } from "react";
import { ReceiptPDF } from "./receiptPdf/ReceiptPDF";
import { ReceiptPageMenu } from "../../../components/menu/ReceiptPageMenu";
import { ReportPage } from "../../../components/ReportPage";
import { drugReceiptHeaders } from "../../../TableHeaders";
import { useGetDataById } from "../../../hooks/useGetDataById";
import { ErrorLoadDataMessage } from "../../../components/ErrorLoadDataMessage";
import { Loader } from "../../../components/Loader";

interface ReceiptData {
  data?: IDrugMovementDetail;
  isLoading: boolean;
}

export function ReceiptDetail() {
  const [pdf, setPdf] = useState(false);
  const { id } = useParams();
  const url = `/api/drugs/receipts/${id}`;

  const { isLoading, data, isError, error }: ReceiptData = useGetDataById(
    "receipt",
    url,
    id
  );

  if (isError) return <ErrorLoadDataMessage error={error} />;
  if (isLoading || !data) return <Loader />;

  const date = AppService.convertDateString(data.operation_date);

  return (
    <>
      {!pdf ? (
        <ReportPage
          reportTitle={`Поступление от ${date.fullDate}`}
          imgSrc="/drugsBg.jpg"
          menu={<ReceiptPageMenu url={url} setPdf={setPdf} />}
          reportHeaders={drugReceiptHeaders}
          reportItems={
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
