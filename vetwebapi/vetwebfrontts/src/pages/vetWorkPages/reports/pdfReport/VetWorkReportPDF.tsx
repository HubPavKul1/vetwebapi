import { PDF } from "../../../../components/PDF";
import { IVetWorkReport } from "../../../../interfaces/ReportInterfaces";
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
    <PDF setPdf={setPdf} filename={`${fileName}.pdf`}>
      <VetWorkReportPDFBody
        isDiagnostic={isDiagnostic}
        dateEnd={dateEnd}
        data={data}
      />
    </PDF>
  );
}
