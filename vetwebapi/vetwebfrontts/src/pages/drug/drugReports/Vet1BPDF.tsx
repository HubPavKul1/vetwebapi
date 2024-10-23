import { IDrugReport } from "entities/drugReport";
import useReportStore from "features/vetWork/stores/useReportStore";
import { PDFWrapper } from "shared/ui/PDFWrapper";
import {
  Vet1BPDFBody,
  Vet1BPDFFooter,
  Vet1BPDFHeader,
} from "widgets/drugReport";

interface Vet1BPDFProps {
  data: IDrugReport[];
  dateEnd: string;
}

export function Vet1BPDF({ data, dateEnd }: Vet1BPDFProps) {
  const closeReportPDF = useReportStore((state) => state.closeReportPDF);
  return (
    <PDFWrapper closePdf={closeReportPDF} filename="vet1B.pdf" orientation="l">
      <Vet1BPDFHeader dateEnd={dateEnd} />
      <Vet1BPDFBody data={data} />
      <Vet1BPDFFooter />
    </PDFWrapper>
  );
}
