import { PDFWrapper } from "shared/ui/PDFWrapper";
import { ActPDFFooter } from "../actPdf/ActPDFFooter";
import { AccountingActHeader } from "./AccountingActHeader";
import { AccountingActBody } from "./AccountingActBody";
import useAccountingActStore from "features/vetWork/stores/useAccountingActStore";

export function AccountingActPDF() {
  const actClose = useAccountingActStore((state) => state.actClose);

  return (
    <PDFWrapper closePdf={actClose} filename="accountingAct.pdf">
      <AccountingActHeader />
      <AccountingActBody />
      <ActPDFFooter />
    </PDFWrapper>
  );
}
