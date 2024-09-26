import { PDFWrapper } from "shared/ui/PDFWrapper";
import { IDrugMovementDetail } from "entities/drugMovements/model/drugMovementInterfaces";
import {
  ReceiptPDFBody,
  ReceiptPDFFooter,
  ReceiptPDFHeader,
  ReceiptPDFTable,
} from "widgets/drugMovement";

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
