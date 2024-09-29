import { Container } from "react-bootstrap";
import { convertDateString } from "shared/helpers";
import { PageTable } from "shared/index";
import {
  diagnosticHeaders,
  vaccinationHeaders,
} from "shared/model/tableHeaders";
import { IVetWorkReport, VetWorkReportItem } from "entities/vetWorkReport";

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
  const date = convertDateString(dateEnd);
  const title = isDiagnostic
    ? `I. Диагностические исследования ${date.month} ${date.year}`
    : `II. Лечебно-профилактические обработки ${date.month} ${date.year}`;
  return (
    <Container className="text-center text-xl">
      <h1 className="mb-3">{title}</h1>
      <PageTable
        tableHeaders={reportHeaders}
        tableItems={data.map((item, index) => (
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
