import { IVetWorkReport } from "entities/vetWorkReport/model/reportInterfaces.ts";
import { VetWorkReportPDF } from "./VetWorkReportPDF.tsx";
import { convertDateString } from "shared/helpers.ts";
import { vaccinationHeaders } from "shared/model/tableHeaders.ts";
import { ReportPage } from "widgets/ReportPage.tsx";
import { ReportMenu } from "widgets/ReportMenu.tsx";
import { VetWorkReportItem } from "entities/vetWorkReport/index.ts";
import useReportStore from "features/vetWork/stores/useReportStore.ts";

export function VaccinationReport() {
  const isReportPDf = useReportStore((state) => state.isReportPDF);
  const reportData = useReportStore((state) => state.reportData);
  const dateRange = useReportStore((state) => state.dateRange);
  const vaccinationReport: IVetWorkReport[] = reportData.vaccinations;
  const date2 = convertDateString(dateRange.date_end);

  return (
    <>
      {!isReportPDf ? (
        <ReportPage
          reportTitle={`Отчет по ветеринарно-профилактическим обработкам за ${date2.month} ${date2.year}`}
          imgSrc="/vaccination.png"
          menu={<ReportMenu />}
          tableHeaders={vaccinationHeaders}
          tableItems={vaccinationReport.map((item, index) => (
            <VetWorkReportItem
              key={index}
              data={item}
              isDiagnostic={false}
              rowNum={index + 1}
            />
          ))}
        />
      ) : (
        <VetWorkReportPDF
          data={vaccinationReport}
          isDiagnostic={false}
          dateEnd={dateRange.date_end}
          fileName="vaccination"
        />
      )}
    </>
  );
}
