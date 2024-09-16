import { AppService } from "shared/services/app.service.ts";

import { useState } from "react";

import { ReportMenu } from "components/menu/ReportMenu.tsx";
import { ReportPage } from "components/ReportPage.tsx";
import { VetWorkReportProps } from "entities/vetWorkReport/model/reportInterfaces.ts";
import { VetWorkReportItem } from "./ReportItem.tsx";
import { VetWorkReportPDF } from "./pdfReport/VetWorkReportPDF.tsx";
import { convertDateString } from "shared/helpers.ts";
import { vaccinationHeaders } from "shared/model/tableHeaders.ts";

export function VaccinationReport({
  data,
  dateEnd,
  setReportActive,
}: VetWorkReportProps) {
  const [pdf, setPdf] = useState(false);

  const date2 = convertDateString(dateEnd);

  return (
    <>
      {!pdf ? (
        <ReportPage
          reportTitle={`Отчет по ветеринарно-профилактическим обработкам за ${date2.month} ${date2.year}`}
          imgSrc="/vetworkBg.jpg"
          menu={
            <ReportMenu setPdf={setPdf} setReportActive={setReportActive} />
          }
          tableHeaders={vaccinationHeaders}
          tableItems={data.map((item, index) => (
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
