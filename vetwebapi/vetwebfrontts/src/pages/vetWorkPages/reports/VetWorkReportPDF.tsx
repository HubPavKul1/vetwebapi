import { IVetWorkReport } from "entities/vetWorkReport";
import useReportStore from "features/vetWork/stores/useReportStore";
import { PDFWrapper } from "shared/ui/PDFWrapper";
import { VetWorkReportPDFBody } from "widgets/vetWorkReport";

interface VetWorkReportPDFProps {
  data: IVetWorkReport[];
  dateEnd: string;
  isDiagnostic: boolean;
  fileName: string;
}

export function VetWorkReportPDF({
  data,
  dateEnd,
  isDiagnostic,
  fileName,
}: VetWorkReportPDFProps) {
  const closeReportPDF = useReportStore((state) => state.closeReportPDF);
  return (
    <PDFWrapper closePdf={closeReportPDF} filename={`${fileName}.pdf`}>
      <VetWorkReportPDFBody
        isDiagnostic={isDiagnostic}
        dateEnd={dateEnd}
        data={data}
      />
    </PDFWrapper>
  );
}
