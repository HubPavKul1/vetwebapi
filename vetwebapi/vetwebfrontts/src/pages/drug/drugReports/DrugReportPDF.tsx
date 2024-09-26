import { PDFWrapper } from "shared/ui/PDFWrapper";
import { IDrugReport } from "entities/drugReport/model/drugReportInterfaces";
import {
  DrugReportPDFBody,
  DrugReportPDFFooter,
  DrugReportPDFHeader,
} from "widgets/drugReport";

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
