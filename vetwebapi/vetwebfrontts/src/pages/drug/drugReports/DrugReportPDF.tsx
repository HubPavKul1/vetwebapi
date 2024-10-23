import { IDrugReport } from "entities/drugReport";
import useReportStore from "features/vetWork/stores/useReportStore";
import { PDFWrapper } from "shared/ui/PDFWrapper";
import {
  DrugReportPDFBody,
  DrugReportPDFFooter,
  DrugReportPDFHeader,
} from "widgets/drugReport";

interface DrugReportPDFProps {
  data: IDrugReport[];
  dateEnd: string;
}

export function DrugReportPDF({ data, dateEnd }: DrugReportPDFProps) {
  const closeReportPDF = useReportStore((state) => state.closeReportPDF);
  return (
    <PDFWrapper
      closePdf={closeReportPDF}
      filename="drugReport.pdf"
      orientation="l"
    >
      <DrugReportPDFHeader dateEnd={dateEnd} />
      <DrugReportPDFBody data={data} />
      <DrugReportPDFFooter />
    </PDFWrapper>
  );
}
