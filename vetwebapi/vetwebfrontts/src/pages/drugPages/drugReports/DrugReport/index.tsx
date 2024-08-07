import { AppService } from "../../../../app.service";

import { useState } from "react";

import { IDrugReport } from "../../../../interfaces/DrugInterfaces";
import { DrugInReport } from "../../../../components/drugs/drugReports/DrugInReport";
import { ReportMenu } from "../../../../components/menu/ReportMenu.tsx";
import { DrugReportPDF } from "../drugReportPdf/DrugReportPDF";
import { drugReportHeaders } from "../../../../TableHeaders.ts";
import { ReportPage } from "../../../../components/ReportPage/index.tsx";

interface DrugReportProps {
  data: IDrugReport[];
  dateEnd: string;
  dateStart: string;
  setReportActive: CallableFunction;
}

export function DrugReport({
  data,
  dateEnd,
  dateStart,
  setReportActive,
}: DrugReportProps) {
  const [pdf, setPdf] = useState(false);

  const date1 = AppService.convertDateString(dateStart);
  const date2 = AppService.convertDateString(dateEnd);

  return (
    <>
      {!pdf ? (
        <ReportPage
          reportTitle={`Движение биопрепаратов за период с ${date1.shortDate} по ${date2.shortDate}`}
          imgSrc="/drugsBg.jpg"
          menu={
            <ReportMenu setPdf={setPdf} setReportActive={setReportActive} />
          }
          reportHeaders={drugReportHeaders}
          reportItems={data.map((drug) => (
            <DrugInReport key={drug.id} drug={drug} />
          ))}
        />
      ) : (
        <DrugReportPDF setPdf={setPdf} data={data} dateEnd={dateEnd} />
      )}
    </>
  );
}
