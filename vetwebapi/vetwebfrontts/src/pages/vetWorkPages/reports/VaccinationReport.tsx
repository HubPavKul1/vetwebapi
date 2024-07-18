import { AppService } from "../../../app.service";

import { useState } from "react";

import { ReportMenu } from "../../../components/menu/ReportMenu.tsx";
import { ReportPage } from "../../../components/ReportPage/index.tsx";
import { VetWorkReportProps } from "../../../interfaces/ReportInterfaces.tsx";
import { vaccinationHeaders } from "../../../Constants.ts";
import { VetWorkReportItem } from "./ReportItem.tsx";
import { VetWorkReportPDF } from "./pdfReport/VetWorkReportPDF.tsx";



export function VaccinationReport({
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
          reportTitle={`Отчет по ветеринарно-профилактическим обработкам за ${date2.month} ${date2.year}`}
          imgSrc="/vetworkBg.jpg"
          menu={
            <ReportMenu setPdf={setPdf} setReportActive={setReportActive} />
          }
          reportHeaders={vaccinationHeaders}
          reportItems={data.map((item, index) => (
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
          setPdf={setPdf}
          data={data}
          isDiagnostic={false}
          dateEnd={dateEnd}
          fileName="vaccination"
        />
      )}
    </>
  );
}
