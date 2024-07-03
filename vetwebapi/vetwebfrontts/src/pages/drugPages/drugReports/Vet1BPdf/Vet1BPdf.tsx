import { PDF } from "../../../../components/PDF";
import { IDrugReport } from "../../../../interfaces/DrugInterfaces";
import { VetB1PDFHeader } from "./Vet1BHeader";



interface Vet1BPDFProps {
  setPdf: CallableFunction;
  data: IDrugReport[];
  dateStart: string;
  dateEnd: string;
}

export function VetB1PDF({ setPdf, data, dateEnd, dateStart }: Vet1BPDFProps) {
  return (
    <PDF setPdf={setPdf} filename="vet1B.pdf" orientation="l">
      <VetB1PDFHeader dateEnd={dateEnd} />
    </PDF>
  );
}
