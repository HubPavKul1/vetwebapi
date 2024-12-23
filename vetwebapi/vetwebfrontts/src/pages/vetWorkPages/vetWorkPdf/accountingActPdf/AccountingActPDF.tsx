import { PDFWrapper } from "shared/ui/PDFWrapper";
import { AccountingActHeader } from "./AccountingActHeader";
import { AccountingActBody } from "./AccountingActBody";
import useAccountingActStore from "features/vetWork/stores/useAccountingActStore";
import { ActPDFFooter } from "../ActPDFFooter";

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
