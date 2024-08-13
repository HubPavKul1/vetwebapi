import { IDrugMovementDetail } from "../../../../interfaces/DrugInterfaces";
import { ReceiptPDFHeader } from "./ReceiptPDFHeader";
import { ReceiptPDFBody } from "./ReceiptPDFBody";
import { ReceiptPDFTable } from "./ReceiptPDFTable";
import { ReceiptPDFFooter } from "./ReceiptPDFFooter";
import { PDFWrapper } from "../../../../components/PDFWrapper";

interface ReceiptPDFProps {
  setPdf: CallableFunction;
  data: IDrugMovementDetail;
}

export function ReceiptPDF({ setPdf, data }: ReceiptPDFProps) {
  return (
    <PDFWrapper setPdf={setPdf} filename="receipt.pdf">
      <ReceiptPDFHeader operationDate={data.operation_date} />
      <ReceiptPDFBody data={data} />
      <ReceiptPDFTable data={data} />
      <ReceiptPDFFooter />
    </PDFWrapper>
  );
}
