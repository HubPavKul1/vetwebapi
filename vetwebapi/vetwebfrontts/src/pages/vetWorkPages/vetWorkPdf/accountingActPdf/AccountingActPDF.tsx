import { PDFWrapper } from "components/PDFWrapper";
import { IVetWorkSchema } from "interfaces/VetWorkInterfaces";
import { ActPDFHeader } from "../actPdf/ActPDFHeader";
import { ActPDFBody } from "../actPdf/ActPDFBody";
import { ActPDFFooter } from "../actPdf/ActPDFFooter";
import { AccountingActHeader } from "./AccountingActHeader";
import AccountingActBody from "./AccountingActBody";

interface AccountingActPDFProps {
  setPdf: CallableFunction;
  data: IVetWorkSchema;
}

export default function AccountingActPDF({
  data,
  setPdf,
}: AccountingActPDFProps) {
  return (
    <PDFWrapper setPdf={setPdf} filename="accountingAct.pdf">
     <AccountingActHeader data={data}/>
      <AccountingActBody data={data} />
      <ActPDFFooter data={data} />
    </PDFWrapper>
  );
}
