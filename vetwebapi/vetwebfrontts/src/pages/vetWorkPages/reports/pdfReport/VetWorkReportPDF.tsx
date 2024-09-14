import { PDFWrapper } from "components/PDFWrapper";
import { IVetWorkReport } from "entities/vetWorkReport/model/reportInterfaces";
import { VetWorkReportPDFBody } from "./VetWorkReportPDFBody";

interface VetWorkReportPDFProps {
  setPdf: CallableFunction;
  data: IVetWorkReport[];
  dateEnd: string;
  isDiagnostic: boolean;
  fileName: string;
}

export function VetWorkReportPDF({
  setPdf,
  data,
  dateEnd,
  isDiagnostic,
  fileName,
}: VetWorkReportPDFProps) {
  return (
    <PDFWrapper setPdf={setPdf} filename={`${fileName}.pdf`}>
      <VetWorkReportPDFBody
        isDiagnostic={isDiagnostic}
        dateEnd={dateEnd}
        data={data}
      />
    </PDFWrapper>
  );
}
