import { AppService } from "../../../app.service";

import { useState } from "react";

import { ReportMenu } from "../../../components/menu/ReportMenu.tsx";
import { ReportPage } from "../../../components/ReportPage.tsx";
import { VetWorkReportProps } from "../../../interfaces/ReportInterfaces.tsx";
import { diagnosticHeaders } from "../../../TableHeaders.ts";
import { VetWorkReportItem } from "./ReportItem.tsx";
import { VetWorkReportPDF } from "./pdfReport/VetWorkReportPDF.tsx";

export function DiagnosticReport({
  data,
  dateEnd,
  setReportActive,
}: VetWorkReportProps) {
  const [pdf, setPdf] = useState(false);

  const date2 = AppService.convertDateString(dateEnd);

  return (
    <>
      {!pdf ? (
        <ReportPage
          reportTitle={`Отчет по диагностическим исследованиям за ${date2.month} ${date2.year}`}
          imgSrc="/diagnostic.jpg"
          menu={
            <ReportMenu setPdf={setPdf} setReportActive={setReportActive} />
          }
          reportHeaders={diagnosticHeaders}
          reportItems={data.map((item, index) => (
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
          setPdf={setPdf}
          data={data}
          isDiagnostic={true}
          dateEnd={dateEnd}
          fileName="diagnostic"
        />
      )}
    </>
  );
}
