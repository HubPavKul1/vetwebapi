import { PDFWrapper } from "shared/ui/PDFWrapper";
import { Vet1BPDFBody } from "../../../widgets/drugReport/ui/vet1BPDF/Vet1BPDFBody";
import { Vet1BPDFFooter } from "../../../widgets/drugReport/ui/vet1BPDF/Vet1BPDFFooter";
import { Vet1BPDFHeader } from "../../../widgets/drugReport/ui/vet1BPDF/Vet1BPDFHeader";
import { IDrugReport } from "entities/drugReport/model/drugReportInterfaces";

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
