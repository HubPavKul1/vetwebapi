import { PDFWrapper } from "../../../../components/PDFWrapper";
import { IDrugReport } from "../../../../interfaces/DrugInterfaces";
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
    <PDFWrapper setPdf={setPdf} filename="vet1B.pdf" orientation="l">
      <Vet1BPDFHeader dateEnd={dateEnd} />
      <Vet1BPDFBody data={data} />
      <Vet1BPDFFooter />
    </PDFWrapper>
  );
}
