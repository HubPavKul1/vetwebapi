import { Container } from "react-bootstrap";
import { AppService } from "../../../../app.service";
import { PageTable } from "../../../../components/PageTable";
import { diagnosticHeaders } from "../../../../Constants";
import { IVetWorkReport } from "../../../../interfaces/VetWorkInterfaces";
import { VetWorkReportItem } from "../ReportItem";

interface VetWorkReportPDFHeaderProps {
  isDiagnostic: boolean;
  dateEnd: string;
  data: IVetWorkReport[];
}

export function VetWorkReportPDFHeader({
  isDiagnostic,
  dateEnd,
  data,
}: VetWorkReportPDFHeaderProps) {
  const reportHeaders = diagnosticHeaders;
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
            key={item.animal_group}
            data={item}
            isDiagnostic={true}
            rowNum={index + 1}
          />
        ))}
      />
    </Container>
  );
}
