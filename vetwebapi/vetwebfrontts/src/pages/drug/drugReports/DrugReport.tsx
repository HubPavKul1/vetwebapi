import { ReportMenu } from "widgets/ReportMenu.tsx";
import { DrugReportPDF } from "./DrugReportPDF.tsx";
import { convertDateString } from "shared/helpers.ts";
import { ReportPage } from "widgets/ReportPage.tsx";
import { DrugInReport } from "widgets/drugReport/index.ts";
import { drugReportHeaders } from "shared/model/tableHeaders.ts";
import { IDrugReport } from "entities/drugReport/index.ts";
import useReportStore from "features/vetWork/stores/useReportStore.ts";

export function DrugReport() {
  const isReportPDF = useReportStore((state) => state.isReportPDF);
  const dateRange = useReportStore((state) => state.dateRange);
  const reportData = useReportStore((state) => state.reportData);
  const drugReport: IDrugReport[] = reportData.drugs_report;

  const date1 = convertDateString(dateRange.date_start);
  const date2 = convertDateString(dateRange.date_end);

  return (
    <>
      {!isReportPDF ? (
        <ReportPage
          reportTitle={`Движение биопрепаратов за период с ${date1.shortDate} по ${date2.shortDate}`}
          imgSrc="/drugsBg.jpg"
          menu={<ReportMenu />}
          tableHeaders={drugReportHeaders}
          tableItems={drugReport.map((drug) => (
            <DrugInReport key={drug.id} drug={drug} />
          ))}
        />
      ) : (
        <DrugReportPDF data={drugReport} dateEnd={dateRange.date_end} />
      )}
    </>
  );
}
