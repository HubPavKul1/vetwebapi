
import { PDF } from "../../../../components/pdf";
import { IVetWorkSchema } from "../../../../interfaces/VetWorkInterfaces";
import { ActPDFBody } from "./ActPDFBody";
import { ActPDFFooter } from "./ActPDFFooter";
import { ActPDFHeader } from "./ActPDFHeader";

interface ActPDFProps {
  setPdf: CallableFunction;
  data: IVetWorkSchema;
}

export function ActPDF({ setPdf, data }: ActPDFProps) {
  return (
    <PDF setPdf={setPdf} filename="act.pdf">
      <ActPDFHeader data={data} />
      <ActPDFBody data={data} />
      <ActPDFFooter data={data} />
    </PDF>
  );
}
