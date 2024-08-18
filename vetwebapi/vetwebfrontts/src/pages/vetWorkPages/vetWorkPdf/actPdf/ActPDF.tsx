import { PDFWrapper } from "components/PDFWrapper";
import { IVetWorkSchema } from "interfaces/VetWorkInterfaces";
import { ActPDFBody } from "./ActPDFBody";
import { ActPDFFooter } from "./ActPDFFooter";
import { ActPDFHeader } from "./ActPDFHeader";

interface ActPDFProps {
  setPdf: CallableFunction;
  data: IVetWorkSchema;
}

export function ActPDF({ setPdf, data }: ActPDFProps) {
  return (
    <PDFWrapper setPdf={setPdf} filename="act.pdf">
      <ActPDFHeader data={data} />
      <ActPDFBody data={data} />
      <ActPDFFooter data={data} />
    </PDFWrapper>
  );
}
