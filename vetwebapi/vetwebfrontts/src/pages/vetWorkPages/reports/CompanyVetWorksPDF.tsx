import { ICompanyVetWorksReport } from "features/vetWork/models/interfaces";
import useCompanyVetWorksDataStore from "features/vetWork/stores/useCompanyVetWorksDataStore";
import { PDFWrapper } from "shared/ui/PDFWrapper";
import { CompanyVetWorksPDFBody } from "widgets/vetWorkReport/ui/CompanyVetWorksPDFBody";

interface CompanyVetWorksPDFProps {
  data: ICompanyVetWorksReport[];
  fileName: string;
}

export function CompanyVetWorksPDF({
  data,
  fileName,
}: CompanyVetWorksPDFProps) {
  const closeReportPDF = useCompanyVetWorksDataStore(
    (state) => state.closeReportPDF
  );
  return (
    <PDFWrapper closePdf={closeReportPDF} filename={`${fileName}.pdf`}>
      <CompanyVetWorksPDFBody data={data} />
    </PDFWrapper>
  );
}
