import { ReportMenu } from "widgets/ReportMenu.tsx";
import { IVetWorkReport } from "entities/vetWorkReport/model/reportInterfaces.ts";

import { VetWorkReportPDF } from "./VetWorkReportPDF.tsx";
import { convertDateString } from "shared/helpers.ts";
import { diagnosticHeaders } from "shared/model/tableHeaders.ts";
import { ReportPage } from "widgets/ReportPage.tsx";
import { VetWorkReportItem } from "entities/vetWorkReport/index.ts";
import useReportStore from "features/vetWork/stores/useReportStore.ts";

export function DiagnosticReport() {
  const isReportPDf = useReportStore((state) => state.isReportPDF);
  const reportData = useReportStore((state) => state.reportData);
  const dateRange = useReportStore((state) => state.dateRange);
  const diagnosticReport: IVetWorkReport[] = reportData.diagnostics;
  const date2 = convertDateString(dateRange.date_end);

  return (
    <>
      {!isReportPDf ? (
        <ReportPage
          reportTitle={`Отчет по диагностическим исследованиям за ${date2.month} ${date2.year}`}
          imgSrc="/diagnBg.png"
          menu={<ReportMenu />}
          tableHeaders={diagnosticHeaders}
          tableItems={diagnosticReport.map((item, index) => (
            <VetWorkReportItem
              key={index}
              data={item}
              isDiagnostic={true}
              rowNum={index + 1}
            />
          ))}
        />
      ) : (
        <VetWorkReportPDF
          data={diagnosticReport}
          isDiagnostic={true}
          dateEnd={dateRange.date_end}
          fileName="diagnostic"
        />
      )}
    </>
  );
}
