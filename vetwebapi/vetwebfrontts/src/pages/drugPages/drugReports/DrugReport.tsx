import { AppService } from "shared/services/app.service.ts";

import { useState } from "react";

import { IDrugReport } from "interfaces/DrugInterfaces.tsx";
import { DrugInReport } from "components/drugs/drugReports/DrugInReport.tsx";
import { ReportMenu } from "components/menu/ReportMenu.tsx";
import { DrugReportPDF } from "./drugReportPdf/DrugReportPDF.tsx";
import { drugReportHeaders } from "../../../data/TableHeaders.ts";
import { ReportPage } from "components/ReportPage.tsx";

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
          tableHeaders={drugReportHeaders}
          tableItems={data.map((drug) => (
            <DrugInReport key={drug.id} drug={drug} />
          ))}
        />
      ) : (
        <DrugReportPDF setPdf={setPdf} data={data} dateEnd={dateEnd} />
      )}
    </>
  );
}
