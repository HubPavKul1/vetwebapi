import { IVetWorkReport } from "entities/vetWorkReport";
import { PDFWrapper } from "shared/ui/PDFWrapper";
import { VetWorkReportPDFBody } from "widgets/vetWorkReport";


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
