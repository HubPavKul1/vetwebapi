import { PDFWrapper } from "shared/ui/PDFWrapper";
import { IDrugMovementDetail } from "entities/drugMovements/model/drugMovementInterfaces";
import {
  ReceiptPDFBody,
  ReceiptPDFFooter,
  ReceiptPDFHeader,
  ReceiptPDFTable,
} from "widgets/drugMovement";
import useReceiptPDFStore from "features/drugMovements/stores/useReceiptPDFStore";

interface ReceiptPDFProps {
  data: IDrugMovementDetail;
}

export function ReceiptPDF({ data }: ReceiptPDFProps) {
  const receiptPDFClose = useReceiptPDFStore((state) => state.receiptPdfClose);
  return (
    <PDFWrapper closePdf={receiptPDFClose} filename="receipt.pdf">
      <ReceiptPDFHeader operationDate={data.operation_date} />
      <ReceiptPDFBody data={data} />
      <ReceiptPDFTable data={data} />
      <ReceiptPDFFooter />
    </PDFWrapper>
  );
}
