import { PDFWrapper } from "shared/ui/PDFWrapper";
import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";
import { ActPDFFooter } from "../actPdf/ActPDFFooter";
import { AccountingActHeader } from "./AccountingActHeader";
import AccountingActBody from "./AccountingActBody";
import { useContext } from "react";
import { VetWorkPageContext } from "features/vetWork";
import { IVetWorkPageContext } from "features/vetWork/models/interfaces";



export function AccountingActPDF() {
  const context: IVetWorkPageContext = useContext(VetWorkPageContext)


  return (
    <PDFWrapper setPdf={context.setShowAccountingAct} filename="accountingAct.pdf">
      <AccountingActHeader  />
      <AccountingActBody />
      <ActPDFFooter />
    </PDFWrapper>
  );
}
