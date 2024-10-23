import { DrugInReport } from "widgets/drugReport/ui/DrugInReport";
import { ReportMenu } from "widgets/ReportMenu";

import { convertDateString } from "shared/helpers.ts";
import { drugReportHeaders } from "shared/model/tableHeaders.ts";
import { Vet1BPDF } from "./Vet1BPDF";
import { ReportPage } from "widgets/ReportPage";
import { IDrugReport } from "entities/drugReport";
import useReportStore from "features/vetWork/stores/useReportStore";

export function Vet1B() {
  const isReportPDF = useReportStore((state) => state.isReportPDF);
  const dateRange = useReportStore((state) => state.dateRange);
  const reportData = useReportStore((state) => state.reportData);
  const drugReport: IDrugReport[] = reportData.vet1B_report;

  const reportDate = convertDateString(dateRange.date_end);

  return (
    <>
      {!isReportPDF ? (
        <ReportPage
          reportTitle={`Отчет 1-вет В за ${reportDate.quarter} квартал ${reportDate.year} г.`}
          imgSrc="/drugsBg.jpg"
          menu={<ReportMenu />}
          tableHeaders={drugReportHeaders}
          tableItems={drugReport.map((drug) => (
            <DrugInReport key={drug.id} drug={drug} />
          ))}
        />
      ) : (
        <Vet1BPDF data={drugReport} dateEnd={dateRange.date_end} />
      )}
    </>
  );
}
