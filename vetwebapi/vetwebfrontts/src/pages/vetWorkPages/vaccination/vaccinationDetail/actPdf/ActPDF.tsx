import { PDF } from "../../../../../components/PDF";
import { IVetWorkSchema } from "../../../../../interfaces/VetWorkInterfaces";
import { ActPDFBody } from "./ActPDFBody";
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
    </PDF>
  );
}
