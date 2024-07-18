import { AppService } from "../../../app.service";

import { useState } from "react";

import { ReportMenu } from "../../../components/menu/ReportMenu.tsx";
import { ReportPage } from "../../../components/ReportPage/index.tsx";
import { IVetWorkReport } from "../../../interfaces/VetWorkInterfaces.tsx";
import { diagnosticHeaders } from "../../../Constants.ts";
import { VetWorkReportItem } from "./ReportItem.tsx";
import { VetWorkReportPDF } from "./pdfReport/VetWorkReportPDF.tsx";

interface DiagnosticReportProps {
  data: IVetWorkReport[];
  dateEnd: string;
  dateStart: string;
  setReportActive: CallableFunction;
}

export function DiagnosticReport({
  data,
  dateEnd,
  dateStart,
  setReportActive,
}: DiagnosticReportProps) {
  const [pdf, setPdf] = useState(false);

  const date1 = AppService.convertDateString(dateStart);
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
              key={item.animal_group}
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
