import { Container } from "react-bootstrap";
import { AppService } from "../../../../app.service";
import { PageTable } from "../../../../components/PageTable";
import {
  diagnosticHeaders,
  vaccinationHeaders,
} from "../../../../TableHeaders";
import { IVetWorkReport } from "../../../../interfaces/ReportInterfaces";
import { VetWorkReportItem } from "../ReportItem";

interface VetWorkReportPDFBodyProps {
  isDiagnostic: boolean;
  dateEnd: string;
  data: IVetWorkReport[];
}

export function VetWorkReportPDFBody({
  isDiagnostic,
  dateEnd,
  data,
}: VetWorkReportPDFBodyProps) {
  const reportHeaders = isDiagnostic ? diagnosticHeaders : vaccinationHeaders;
  const date = AppService.convertDateString(dateEnd);
  const title = isDiagnostic
    ? `I. Диагностические исследования ${date.month} ${date.year}`
    : `II. Лечебно-профилактические обработки ${date.month} ${date.year}`;
  return (
    <Container className="text-center text-xl">
      <h1 className="mb-3">{title}</h1>
      <PageTable
        reportHeaders={reportHeaders}
        reportItems={data.map((item, index) => (
          <VetWorkReportItem
            key={index}
            data={item}
            isDiagnostic={isDiagnostic}
            rowNum={index + 1}
          />
        ))}
      />
    </Container>
  );
}
