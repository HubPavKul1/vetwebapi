import { PDF } from "../../../../components/PDF";
import { IDrugReport } from "../../../../interfaces/DrugInterfaces";
import { DrugReportPDFFooter } from "../drugReportPdf/DrugReportPDFFooter";
import { Vet1BPDFBody } from "./Vet1BPDFBody";
import { Vet1BPDFFooter } from "./Vet1BPDFFooter";
import { Vet1BPDFHeader } from "./Vet1BPDFHeader";



interface Vet1BPDFProps {
  setPdf: CallableFunction;
  data: IDrugReport[];
  dateEnd: string;
}

export function Vet1BPDF({ setPdf, data, dateEnd }: Vet1BPDFProps) {
  return (
    <PDF setPdf={setPdf} filename="vet1B.pdf" orientation="l">
      <Vet1BPDFHeader dateEnd={dateEnd} />
      <Vet1BPDFBody data={data} />
      <Vet1BPDFFooter/>
    </PDF>
  );
}
