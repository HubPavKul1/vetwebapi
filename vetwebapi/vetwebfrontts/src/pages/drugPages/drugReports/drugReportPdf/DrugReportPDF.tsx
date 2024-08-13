import { PDFWrapper } from "../../../../components/PDFWrapper";
import { IDrugReport } from "../../../../interfaces/DrugInterfaces";
import { DrugReportPDFBody } from "./DrugReportPDFBody";
import { DrugReportPDFFooter } from "./DrugReportPDFFooter";
import { DrugReportPDFHeader } from "./drugReportPDFHeader";

interface DrugReportPDFProps {
  setPdf: CallableFunction;
  data: IDrugReport[];
  dateEnd: string;
}

export function DrugReportPDF({ setPdf, data, dateEnd }: DrugReportPDFProps) {
  return (
    <PDFWrapper setPdf={setPdf} filename="drugReport.pdf" orientation="l">
      <DrugReportPDFHeader dateEnd={dateEnd} />
      <DrugReportPDFBody data={data} />
      <DrugReportPDFFooter />
    </PDFWrapper>
  );
}
