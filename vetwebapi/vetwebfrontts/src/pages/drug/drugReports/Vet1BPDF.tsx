import { IDrugReport } from "entities/drugReport";
import { PDFWrapper } from "shared/ui/PDFWrapper";
import { Vet1BPDFBody, Vet1BPDFFooter, Vet1BPDFHeader } from "widgets/drugReport";


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
